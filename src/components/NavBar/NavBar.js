'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavBar.module.css';

export default function NavBar() {
  const pathname = usePathname();
  const mainLinks = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Events", path: "/events" },
  ];

  return (
    <nav className={styles.navContainer}>
      <Link href="/" className={styles.logo}>
        <img src="/logo_nobg.png" alt="SESE Logo" className={styles.logoImg} />
        <span className={styles.logoText}>SESE</span>
      </Link>

      <ul className={styles.navLinks}>
        {mainLinks.map((link, index) => (
          <li key={index} className={styles.linkItem}>
            <Link href={link.path} className={`${styles.link} ${pathname === link.path ? styles.active : ''}`}>
              {link.title}
            </Link>
          </li>
        ))}
        
        {/* Dropdown for Academics */}
        <li className={styles.linkItem}>
          <div className={`${styles.link} ${pathname.startsWith('/academics') ? styles.active : ''}`}>
            Academics <span style={{ fontSize: '0.8rem' }}>▼</span>
          </div>
          <div className={styles.dropdownMenu}>
            <Link href="/academics/projects" className={styles.dropdownLink}>Projects</Link>
            <a href="https://iitism.irins.org/faculty/index/Department+of+Environmental+Science+and+Engineering" target="_blank" rel="noopener noreferrer" className={styles.dropdownLink}>Professors</a>
            <a href="https://people.iitism.ac.in/~academics/Academic/ese-ug" target="_blank" rel="noopener noreferrer" className={styles.dropdownLink}>Curriculum (UG)</a>
            <a href="https://people.iitism.ac.in/~academics/Academic/ese" target="_blank" rel="noopener noreferrer" className={styles.dropdownLink}>Curriculum (PG)</a>
            <a href="https://www.iitism.ac.in/environmental-science-and-engineering-newsletter" target="_blank" rel="noopener noreferrer" className={styles.dropdownLink}>Newsletter</a>
          </div>
        </li>

        <li className={styles.linkItem}>
          <a href="https://ismdhanbad.almaconnect.com/directory/filter/?page=1&applied_tags[branch][]=Environment%20Science&applied_tags[branch][]=Environmental%20Engineering&applied_tags[branch][]=Environmental%20Science%20&%20Engineering" target="_blank" rel="noopener noreferrer" className={styles.link}>
            Alumni
          </a>
        </li>
      </ul>

      <div className={styles.collegeLogoContainer}>
        <img src="/collegelogo.png" alt="IIT Dhanbad Logo" className={styles.collegeLogo} />
      </div>
    </nav>
  );
}
