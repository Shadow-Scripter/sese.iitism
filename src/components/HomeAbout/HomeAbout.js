'use client';
import React from 'react';
import styles from './HomeAbout.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function HomeAbout() {
  const [ref1, isVisible1] = useScrollReveal(0.2);

  return (
    <section className={styles.aboutSection} id="about">
      <div className={styles.container}>
        
        <h1 className={styles.title}>What is SESE?</h1>
        
        <div className={styles.answersContainer}>
          <p 
            ref={ref1} 
            className={`${styles.answerCard} ${isVisible1 ? styles.fadeIn : styles.fadeOut}`}
          >
            SESE is a vibrant community dedicated to environmental awareness, sustainability, and technological innovation.
          </p>
        </div>
      </div>
    </section>
  );
}
