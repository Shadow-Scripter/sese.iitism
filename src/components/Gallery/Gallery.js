'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './Gallery.module.css';

export default function Gallery() {
  const highlights = [
    { title: "SESE Main Building", img: "/building.jpg" },
    { title: "Environmental Initiatives", img: "/environmental_tree.png" },
    { title: "Campus Greenery", img: "/background.png" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  // Auto-swipe every 5 seconds (pause if dragging)
  useEffect(() => {
    if (isDragging) return; // Pause auto-swipe while dragging
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

  // Support mouse and touch swipe gestures
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
      handleNext(); // swipe left significantly
    } else if (dragOffset > 75) {
      handlePrev(); // swipe right significantly
    }
    // Snap back
    setDragOffset(0);
  };

  return (
    <section className={styles.gallerySection}>
      <h2 className={styles.heading}><span>|</span> Highlights</h2>
      
      <div 
        className={styles.sliderContainer}
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
              <div className={styles.cardOverlay}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={handlePrev}>
          &#10094;
        </button>
        <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={handleNext}>
          &#10095;
        </button>
      </div>

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
