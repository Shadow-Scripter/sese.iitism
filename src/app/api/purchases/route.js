import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getEventById } from '@/data/eventsData';

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ purchases: [] });

    const tickets = await prisma.ticket.findMany({
      where: { userId: user.id }
    });
    return NextResponse.json({ purchases: tickets });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Error fetching purchases', details: String(error) }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, eventId } = body;

    if (!email || !eventId) {
      return NextResponse.json({ error: 'Email and eventId are required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'User not found in DB' }, { status: 404 });
    }

    const staticEvent = getEventById(eventId);
    if (!staticEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Upsert Event to ensure it exists in DB for foreign key constraint
    const event = await prisma.event.upsert({
      where: { id: eventId },
      update: {},
      create: {
        id: eventId,
        title: staticEvent.title,
        description: staticEvent.description,
        price: staticEvent.price === 'Free' ? 0 : parseFloat(staticEvent.price) || 0,
        date: new Date(staticEvent.date),
      }
    });

    // Mock an Order since Razorpay isn't set up yet
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        razorpayOrderId: 'mock_' + Date.now(),
        status: 'COMPLETED'
      }
    });

    // Create Ticket
    const ticket = await prisma.ticket.create({
      data: {
        userId: user.id,
        eventId: event.id,
        orderId: order.id
      }
    });

    return NextResponse.json({ success: true, purchase: ticket });
  } catch (error) {
    console.error('POST Error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Already purchased' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Error processing purchase', details: String(error) }, { status: 500 });
  }
}
