'use client';
import React from 'react';
import styles from './HomeAbout.module.css';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function HomeAbout() {
  const [ref1, isVisible1] = useScrollReveal(0.2);
  const [ref2, isVisible2] = useScrollReveal(0.2);
  const [ref3, isVisible3] = useScrollReveal(0.2);
  const [refImg, isVisibleImg] = useScrollReveal(0.2);

  return (
    <section className={styles.aboutSection} id="about">
      <div className={styles.container}>
        
        <h1 className={styles.title}>What is SESE?</h1>
        
        <div className={styles.answersContainer}>
          <p 
            ref={ref1} 
            className={`${styles.answerCard} ${styles.shape1} ${isVisible1 ? styles.slideInLeft : styles.hiddenLeft}`}
          >
            <strong className={styles.answerTitle}>1. A Hub for Sustainability</strong>
            We are a dedicated community focused on exploring, promoting, and implementing sustainable environmental practices.
          </p>

          <p 
            ref={ref2} 
            className={`${styles.answerCard} ${styles.shape2} ${isVisible2 ? styles.slideInRight : styles.hiddenRight}`}
          >
            <strong className={styles.answerTitle}>2. Bridge to Engineering</strong>
            We connect core engineering principles with ecological conservation to solve complex environmental challenges.
          </p>

          <p 
            ref={ref3} 
            className={`${styles.answerCard} ${styles.shape1} ${isVisible3 ? styles.slideInLeft : styles.hiddenLeft}`}
          >
            <strong className={styles.answerTitle}>3. Platform for Growth</strong>
            SESE provides a vibrant platform for students to network, participate in impactful projects, and grow as conscious leaders.
          </p>
        </div>
      </div>
    </section>
  );
}
