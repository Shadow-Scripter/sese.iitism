'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './Hero.module.css';

import { upcomingEvents } from '@/data/eventsData';

export default function Hero() {
  const highlights = [
    { title: "SESE Main Building", img: "/building.jpg" },
    { title: "Environmental Initiatives", img: "/environmental_tree.png" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isDragging]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % highlights.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + highlights.length) % highlights.length);
  };

  const setSlide = (index) => {
    setCurrentIndex(index);
  };

  const swipeStartX = useRef(0);

  const handleDragStart = (clientX) => {
    swipeStartX.current = clientX;
    setIsDragging(true);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    const currentX = clientX;
    const diff = currentX - swipeStartX.current;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (dragOffset < -75) {
      handleNext();
    } else if (dragOffset > 75) {
      handlePrev();
    }
    setDragOffset(0);
  };

  const nextEvent = upcomingEvents[0];

  return (
    <section 
      className={styles.heroContainer}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      <div 
        className={styles.sliderTrack} 
        style={{ 
          transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
          transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      >
        {highlights.map((item, index) => (
          <div key={index} className={styles.slide}>
            <img src={item.img} alt={item.title} className={styles.cardImg} />
          </div>
        ))}
      </div>

      {nextEvent && (
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeText}>
            🔥 Upcoming Event: {nextEvent.title} on {nextEvent.date.split('-').reverse().join('-')} at {nextEvent.location}
          </div>
        </div>
      )}

      <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={handlePrev}>
        &#10094;
      </button>
      <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={handleNext}>
        &#10095;
      </button>

      <div className={styles.pagination}>
        {highlights.map((_, index) => (
          <div 
            key={index} 
            className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => setSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
