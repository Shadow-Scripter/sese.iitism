'use client';
import React, { useState, useEffect } from 'react';
import { getEventById } from '@/data/eventsData';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './EventDetails.module.css';
import { useAuth } from '@/context/AuthContext';

export default function EventDetailsPage({ params }) {
  const resolvedParams = React.use(params);
  const event = getEventById(resolvedParams.slug);
  const { user } = useAuth();
  const [isPurchased, setIsPurchased] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!event) {
    notFound();
  }

  const isPastEvent = new Date(event.date) < new Date();

  useEffect(() => {
    if (user) {
      fetch(`/api/purchases?email=${encodeURIComponent(user.email)}`)
        .then(res => res.json())
        .then(data => {
          if (data.purchases) {
            const hasPurchased = data.purchases.some(p => p.eventId === event.id);
            setIsPurchased(hasPurchased);
          }
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoading(false);
        });
    } else {
      setIsPurchased(false);
      setIsLoading(false);
    }
  }, [user, event.id]);

  const handleActionClick = async () => {
    if (!user) {
      alert("Please sign in from the navbar before purchasing!");
      return;
    }

    try {
      const res = await fetch('/api/purchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, eventId: event.id })
      });
      const data = await res.json();
      if (data.success || data.error === 'Already purchased') {
        setIsPurchased(true);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while purchasing.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Immersive Background */}
      <div className={styles.bgWrapper}>
        <img src={event.image} alt="Background" className={styles.bgImage} />
        <div className={styles.bgOverlay}></div>
      </div>

      <NavBar />
      
      <main className={styles.mainContent}>
        <Link href="/events" className={styles.backLink}>
          ← Back to Events
        </Link>
        
        <div className={styles.glassCard}>
          <div className={styles.headerImageWrapper}>
            <img src={event.image} alt={event.title} className={styles.headerImage} />
            <div className={styles.categoryBadge}>{event.category}</div>
          </div>
          
          <div className={styles.cardBody}>
            <h1 className={styles.title}>{event.title}</h1>
            
            <div className={styles.badgesGrid}>
              <div className={styles.badge}>
                <span className={styles.badgeIcon}>📅</span>
                <div className={styles.badgeInfo}>
                  <span className={styles.badgeLabel}>Date</span>
                  <span className={styles.badgeValue}>{event.date}</span>
                </div>
              </div>
              <div className={styles.badge}>
                <span className={styles.badgeIcon}>📍</span>
                <div className={styles.badgeInfo}>
                  <span className={styles.badgeLabel}>Location</span>
                  <span className={styles.badgeValue}>{event.location}</span>
                </div>
              </div>
              <div className={styles.badge}>
                <span className={styles.badgeIcon}>🎤</span>
                <div className={styles.badgeInfo}>
                  <span className={styles.badgeLabel}>Speaker</span>
                  <span className={styles.badgeValue}>{event.speaker}</span>
                </div>
              </div>
              <div className={styles.badge}>
                <span className={styles.badgeIcon}>🎟️</span>
                <div className={styles.badgeInfo}>
                  <span className={styles.badgeLabel}>Price</span>
                  <span className={styles.badgeValue}>{event.price}</span>
                </div>
              </div>
            </div>
            
            <div className={styles.description}>
              {event.description}
            </div>

            <div className={styles.actionSection}>
              {isPastEvent ? (
                <>
                  <div className={styles.statusText}>This event has already concluded.</div>
                  {!isPurchased ? (
                    <button className={styles.buyBtn} onClick={handleActionClick} disabled={isLoading}>
                      {isLoading ? 'Loading...' : 'Get Materials / Recordings'}
                    </button>
                  ) : (
                    <div className={styles.materialsSection}>
                      <h4 className={styles.materialsTitle}>✓ Access Unlocked</h4>
                      <a href="#" className={styles.materialLink}>📄 Download Presentation Slides (.pdf)</a>
                      <a href="#" className={styles.materialLink}>🎥 Watch Event Recording</a>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className={styles.statusText}>Secure your spot for this upcoming event!</div>
                  {!isPurchased ? (
                    <button className={styles.buyBtn} onClick={handleActionClick} disabled={isLoading}>
                      {isLoading ? 'Loading...' : 'Buy Tickets / Register'}
                    </button>
                  ) : (
                    <div className={styles.materialsSection}>
                      <h4 className={styles.materialsTitle}>✓ Registration Confirmed!</h4>
                      <p>Your tickets have been secured. We will email you the details shortly.</p>
                      <br/>
                      <h4 className={styles.materialsTitle}>Pre-event Materials</h4>
                      <a href="#" className={styles.materialLink}>📄 Download Event Schedule (.pdf)</a>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
