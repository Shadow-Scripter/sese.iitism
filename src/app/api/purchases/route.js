import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const purchases = await prisma.purchase.findMany({
      where: { userEmail: email }
    });
    return NextResponse.json({ purchases });
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

    const purchase = await prisma.purchase.create({
      data: {
        userEmail: email,
        eventId: eventId
      }
    });

    return NextResponse.json({ success: true, purchase });
  } catch (error) {
    console.error('POST Error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Already purchased' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Error processing purchase', details: String(error) }, { status: 500 });
  }
}
