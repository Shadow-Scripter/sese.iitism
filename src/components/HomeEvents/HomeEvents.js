'use client';
import React from 'react';
import Link from 'next/link';
import styles from './HomeEvents.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';
import { upcomingEvents, pastEvents } from '@/data/eventsData';

function RecentEventCard({ event }) {
  const [ref, isVisible] = useScrollReveal(0.2);
  
  return (
    <Link 
      href={`/events?scrollTo=${event.id}`}
      ref={ref} 
      className={`${styles.recentCard} ${isVisible ? styles.fadeIn : styles.fadeOut}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <h3 className={styles.recentTitle}>{event.title}</h3>
      <p className={styles.recentDesc}>{event.description}</p>
    </Link>
  );
}

function UpcomingEventCard({ event }) {
  const [ref, isVisible] = useScrollReveal(0.2);
  const dateObj = new Date(event.date);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[dateObj.getMonth()];
  const day = dateObj.getDate();
  
  return (
    <Link 
      href={`/events?scrollTo=${event.id}`}
      ref={ref} 
      className={`${styles.upcomingCard} ${isVisible ? styles.fadeIn : styles.fadeOut}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}
    >
      <div className={styles.dateBox}>
        <div className={styles.month}>{month}</div>
        <div className={styles.day}>{day}</div>
      </div>
      <div className={styles.upcomingContent}>
        <h3 className={styles.upcomingTitle}>{event.title}</h3>
        <p className={styles.upcomingDesc}>{event.description}</p>
      </div>
    </Link>
  );
}

export default function HomeEvents() {
  // Use the shared data source. Limit to exactly 7 recent and max 3 upcoming.
  const displayRecent = pastEvents.slice(0, 7);
  const displayUpcoming = upcomingEvents.slice(0, 3);

  return (
    <section className={styles.eventsSection} id="events">
      <div className={styles.container}>
        
        {/* Recent Events Column */}
        <div className={`${styles.column} ${styles.recentCol}`}>
          <h2 className={styles.heading}>Recent Events</h2>
          <div className={styles.cardList}>
            {displayRecent.map((event) => (
              <RecentEventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* Upcoming Events Column */}
        <div className={`${styles.column} ${styles.upcomingCol}`}>
          <h2 className={styles.heading}>Upcoming Events</h2>
          <div className={styles.cardList}>
            {displayUpcoming.map((event) => (
              <UpcomingEventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
