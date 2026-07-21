'use client';
import React, { useEffect, useState } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const [offset, setOffset] = useState(150);

  // Marquee flows right to left now
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setOffset((prev) => {
        if (prev < -200) return 150;
        return prev - 0.1;
      });
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className={styles.heroContainer}>
      
      {/* Background Elements */}
      <div className={`${styles.cloud} ${styles.cloud1}`}></div>
      <div className={`${styles.cloud} ${styles.cloud2}`}></div>
      <div className={`${styles.cloud} ${styles.cloud3}`}></div>
      {/* More clouds added */}
      <div className={`${styles.cloud} ${styles.cloud4}`}></div>
      <div className={`${styles.cloud} ${styles.cloud5}`}></div>
      
      {/* Exactly 3 Elegant Birds */}
      <svg className={`${styles.bird} ${styles.bird1}`} viewBox="0 0 20 10">
        <path d="M 0 5 Q 5 0 10 5 Q 15 0 20 5" />
      </svg>
      <svg className={`${styles.bird} ${styles.bird2}`} viewBox="0 0 20 10">
        <path d="M 0 5 Q 5 0 10 5 Q 15 0 20 5" />
      </svg>
      <svg className={`${styles.bird} ${styles.bird3}`} viewBox="0 0 20 10">
        <path d="M 0 5 Q 5 0 10 5 Q 15 0 20 5" />
      </svg>
      
      <div className={styles.hillGroup}>
        <div className={styles.hillBase}></div>
        <div className={styles.hillBack}></div>
        <div className={styles.hillFront}></div>
        
        {/* Animated Forest using extracted trees */}
        <div className={styles.trees}>
          {/* Deep Forest (Small trees in the back) */}
          <img src="/images/trees/tree_1.png" alt="Forest Tree" className={`${styles.forestTree} ${styles.backLayer}`} style={{ left: '10%', bottom: '28vh', height: '340px' }} />
          <img src="/images/trees/tree_2.png" alt="Forest Tree" className={`${styles.forestTree} ${styles.backLayer}`} style={{ left: '25%', bottom: '32vh', height: '270px' }} />
          <img src="/images/trees/tree_3.png" alt="Forest Tree" className={`${styles.forestTree} ${styles.backLayer}`} style={{ right: '35%', bottom: '30vh', height: '315px' }} />
          <img src="/images/trees/tree_4.png" alt="Forest Tree" className={`${styles.forestTree} ${styles.backLayer}`} style={{ right: '15%', bottom: '26vh', height: '385px' }} />
          <img src="/images/trees/tree_5.png" alt="Forest Tree" className={`${styles.forestTree} ${styles.backLayer}`} style={{ right: '5%', bottom: '31vh', height: '295px' }} />
          
          {/* Mid Forest (Medium trees) */}
          <img src="/images/trees/tree_6.png" alt="Forest Tree" className={`${styles.forestTree} ${styles.midLayer}`} style={{ left: '5%', bottom: '22vh', height: '495px' }} />
          <img src="/images/trees/tree_7.png" alt="Forest Tree" className={`${styles.forestTree} ${styles.midLayer}`} style={{ left: '35%', bottom: '25vh', height: '450px' }} />
          <img src="/images/trees/tree_8.png" alt="Forest Tree" className={`${styles.forestTree} ${styles.midLayer}`} style={{ right: '25%', bottom: '24vh', height: '430px' }} />
          
          {/* Front Forest (Large trees) */}
          <img src="/images/trees/tree_9.png" alt="Forest Tree" className={`${styles.forestTree} ${styles.frontLayer}`} style={{ left: '18%', bottom: '18vh', height: '630px' }} />
          <img src="/images/trees/tree_1.png" alt="Forest Tree" className={`${styles.forestTree} ${styles.frontLayer}`} style={{ right: '8%', bottom: '15vh', height: '720px' }} />
        </div>
      </div>

      {/* Curvy Water River + SVG Text Marquee */}
      <div className={styles.waterBodyWrapper}>
        <svg className={styles.waterBodySvg} viewBox="0 0 1440 320" preserveAspectRatio="none">
          <defs>
            <linearGradient id="riverGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4da1db" />
              <stop offset="100%" stopColor="#2c81ba" />
            </linearGradient>
          </defs>
          <path id="waterCurve" fill="url(#riverGrad)" d="M0,192L60,197.3C120,203,240,213,360,202.7C480,192,600,160,720,165.3C840,171,960,213,1080,218.7C1200,224,1320,192,1380,176L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          
          <path id="textCurve" fill="none" stroke="none" d="M0,230L60,235C120,240,240,250,360,240C480,230,600,200,720,205C840,210,960,250,1080,255C1200,260,1320,230,1380,215L1440,200"></path>
          
          <text className={styles.marqueeTextPath}>
            <textPath href="#textCurve" startOffset={`${offset}%`}>
              Upcoming Event: Annual Sustainability Summit on Oct 15! Join industry leaders to discuss the future of sustainable engineering.
            </textPath>
          </text>
        </svg>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        <img src="/logo_nobg.png" alt="SESE Logo" className={styles.mainLogo} />
        <h1 className={styles.title}>
          SESE<br />
          <span className={styles.subtitleSpan}>Society of Environmental Science<br />&<br />Engineering</span>
        </h1>
      </div>
    </section>
  );
}
