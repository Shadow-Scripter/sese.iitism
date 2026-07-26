'use client';
import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        
        {/* Left Column: Map */}
        <div className={styles.column}>
          <iframe 
            className={styles.mapFrame}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.1175999612465!2d86.43867407446673!3d23.81441687862682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6bc9fac678481%3A0x122cb1d133a89995!2sIndian%20Institute%20of%20Technology%20(Indian%20School%20of%20Mines)%2C%20Dhanbad!5e0!3m2!1sen!2sin!4v1727617688198!5m2!1sen!2sin" 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Center Column: Address */}
        <div className={styles.column} style={{ padding: '0 20px' }}>
          <h2 className={styles.columnHeading}>Address</h2>
          <p className={styles.textLine}>Department of ESE</p>
          <p className={styles.textLine}>IIT (ISM) Dhanbad</p>
          <p className={styles.textLine}>Near Upper Ground</p>
          <p className={styles.textLine}>IIT ISM Rd, Sardar Patel Nagar</p>
          <p className={styles.textLine}>Kalyanpur, Dhanbad, Jharkhand, 826004</p>
        </div>

        {/* Right Column: Socials */}
        <div className={styles.column}>
          <h2 className={styles.columnHeading}>Socials</h2>
          <div className={styles.socialList}>
            <a href="https://www.linkedin.com/company/sese-iitism/" target="_blank" rel="noreferrer" className={styles.socialLink}>
              <svg className={styles.socialIcon} viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              LinkedIn
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className={styles.socialLink}>
              <svg className={styles.socialIcon} viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path></svg>
              Instagram
            </a>
          </div>
        </div>

        {/* Contact Us Column */}
        <div className={`${styles.column} ${styles.contactColumn}`}>
          <h2 className={styles.columnHeading}>Contact Us</h2>
          <div className={styles.contactItem} style={{ marginBottom: '15px' }}>
            <span style={{ color: 'white', marginRight: '10px' }}>Email:</span>
            <a href="mailto:sese@iitism.ac.in" style={{ color: '#4da1db', textDecoration: 'none' }}>sese@iitism.ac.in</a>
          </div>
          <div className={styles.contactItem}>
            <span style={{ color: 'white', marginRight: '10px' }}>Phone:</span>
            <span style={{ color: 'white' }}>+91 81055 11776</span>
          </div>
          <div className={styles.contactItem}>
            <span style={{ color: 'white', marginRight: '10px' }}>Phone:</span>
            <span style={{ color: 'white' }}>+91 98765 43210</span>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <p>© 2026 SESE - Society of Environmental Science & Engineering. All rights reserved.</p>
      </div>
    </footer>
  );
}
