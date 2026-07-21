'use client';
import React, { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import CustomCursor from '@/components/CustomCursor/CustomCursor';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  const [activeTeam, setActiveTeam] = useState('Tech Team');
  const [activeYear, setActiveYear] = useState('2025');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = Array.from({ length: 7 }).map((_, i) => ({
    question: `Frequently Asked Question ${i + 1}?`,
    answer: `This is the detailed answer for question ${i + 1}. It provides all the necessary information requested by the user and expands gracefully using the new accordion animation.`
  }));

  const teams = ['Tech Team', 'PR Team', 'Design Team', 'Doc Team', 'Social Media Team'];

  // Dummy data (25 members) to demonstrate pagination
  const members = Array.from({ length: 25 }).map((_, i) => ({
    name: `Member ${i + 1}`,
    dept: 'Environmental Engineering',
    // Dynamic based on year and team
    avatar: `https://ui-avatars.com/api/?name=${activeTeam.replace(' ', '+')}+Member+${i + 1}+${activeYear}&background=random`
  }));

  const totalPages = Math.ceil(members.length / ITEMS_PER_PAGE);
  const paginatedMembers = members.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Reset page to 1 when changing filters
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTeam, activeYear]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        } else {
          entry.target.classList.remove(styles.visible);
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [activeYear, activeTeam, currentPage]);

  return (
    <>
      <CustomCursor />
      <NavBar />
      
      <main className={styles.pageContainer}>
        {/* Background Animations */}
        <div className={`${styles.cloud} ${styles.cloud1}`}></div>
        <div className={`${styles.cloud} ${styles.cloud2}`}></div>
        <div className={`${styles.cloud} ${styles.cloud3}`}></div>
        
        {/* Birds */}
        <svg className={`${styles.bird} ${styles.bird1}`} viewBox="0 0 20 10">
          <path d="M 0 5 Q 5 0 10 5 Q 15 0 20 5" />
        </svg>
        <svg className={`${styles.bird} ${styles.bird2}`} viewBox="0 0 20 10">
          <path d="M 0 5 Q 5 0 10 5 Q 15 0 20 5" />
        </svg>

        <div className={styles.contentWrapper}>
          
          {/* Page Title */}
          <div className={styles.pageTitle}>
            <h1>About Us</h1>
            <p>Discover the Society of Environmental Science & Engineering at IIT (ISM) Dhanbad.</p>
          </div>

          {/* Alternating Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '80px' }}>
            
            {/* Section 1: What is our society */}
            <div className={`${styles.infoSection} reveal ${styles.revealLeft}`}>
              <div className={`${styles.imageContainer} ${styles.greenBorder}`}>
                <img src="/logo_nobg.png" alt="SESE Logo" className={styles.sectionImage} />
              </div>
              <div className={`${styles.textContent} ${styles.greenText}`}>
                <h2>What is our society?</h2>
                <ul>
                  <li>A vibrant student-led organization at IIT (ISM) Dhanbad.</li>
                  <li>Dedicated to environmental awareness, sustainability, and technological innovation.</li>
                  <li>A platform connecting students, researchers, and professionals to solve real-world problems.</li>
                </ul>
              </div>
            </div>

            {/* Section 2: What is our mission */}
            <div className={`${styles.infoSection} ${styles.reverse} reveal ${styles.revealRight}`}>
              <div className={`${styles.imageContainer} ${styles.blueBorder}`}>
                {/* User requested to just use logo_nobg for all info parts for now */}
                <img src="/logo_nobg.png" alt="Mission" className={styles.sectionImage} />
              </div>
              <div className={`${styles.textContent} ${styles.blueText}`} style={{ textAlign: 'right' }}>
                <h2>What is our mission?</h2>
                <ul style={{ direction: 'rtl' }}>
                  <li style={{ direction: 'ltr' }}>To cultivate a community of passionate individuals dedicated to environmental solutions.</li>
                  <li style={{ direction: 'ltr' }}>To promote education, research, and leadership in environmental engineering.</li>
                  <li style={{ direction: 'ltr' }}>To drive positive change through hands-on projects, workshops, and industry collaborations.</li>
                </ul>
              </div>
            </div>

            {/* Section 3: Perks of being a member */}
            <div className={`${styles.infoSection} reveal ${styles.revealLeft}`}>
              <div className={`${styles.imageContainer} ${styles.yellowBorder}`}>
                <img src="/logo_nobg.png" alt="Perks" className={styles.sectionImage} />
              </div>
              <div className={`${styles.textContent} ${styles.yellowText}`}>
                <h2>What are the perks?</h2>
                <ul>
                  <li>Access to exclusive technical workshops, hackathons, and guest lectures.</li>
                  <li>Networking opportunities with alumni, professors, and industry leaders.</li>
                  <li>Hands-on experience in impactful environmental projects and research initiatives.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Executive & Divisional Members Section */}
          <div className={styles.membersSection}>
            <div className={styles.membersHeader}>
              <h2>Executive Members</h2>
              <div className={styles.yearTabs}>
                {['2024', '2025', '2026'].map((year) => (
                  <button 
                    key={year}
                    onClick={() => setActiveYear(year)}
                    className={`${styles.yearTab} ${activeYear === year ? styles.active : ''}`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
            
            {/* President and Vice President (Dynamic to Year) */}
            <div className={styles.executives} key={`exec-${activeYear}`}>
              <div className={`${styles.avatarCard} reveal ${styles.revealTop}`} style={{ transitionDelay: '0.1s' }}>
                <div className={styles.avatarWrapper}>
                  <img src={`https://ui-avatars.com/api/?name=President+${activeYear}&background=random`} alt="President" className={styles.avatarImg} />
                </div>
                <h3 className={styles.avatarName}>President Name</h3>
                <p className={styles.avatarRole}>President</p>
              </div>
              <div className={`${styles.avatarCard} reveal ${styles.revealTop}`} style={{ transitionDelay: '0.3s' }}>
                <div className={styles.avatarWrapper}>
                  <img src={`https://ui-avatars.com/api/?name=VP+${activeYear}&background=random`} alt="Vice President" className={styles.avatarImg} />
                </div>
                <h3 className={styles.avatarName}>VP Name</h3>
                <p className={styles.avatarRole}>Vice President</p>
              </div>
            </div>

            {/* Divisional Members Tab Bar */}
            <div className={styles.divisionTabs}>
              {teams.map((team) => (
                <button
                  key={team}
                  onClick={() => setActiveTeam(team)}
                  className={`${styles.divisionTab} ${activeTeam === team ? styles.active : ''}`}
                >
                  {team}
                </button>
              ))}
            </div>

            {/* Divisional Head and Co-Head (Dynamic to Team AND Year) */}
            <div className={styles.heads} key={`head-${activeTeam}-${activeYear}`}>
              <div className={`${styles.avatarCard} reveal ${styles.revealTop}`} style={{ transitionDelay: '0.1s' }}>
                <div className={styles.avatarWrapper}>
                  <img src={`https://ui-avatars.com/api/?name=Head+${activeTeam.replace(' ','+')}+${activeYear}&background=random`} alt="Head" className={styles.avatarImg} />
                </div>
                <h3 className={styles.avatarName}>Head Name</h3>
                <p className={styles.avatarRole}>{activeTeam} Head</p>
              </div>
              <div className={`${styles.avatarCard} reveal ${styles.revealTop}`} style={{ transitionDelay: '0.3s' }}>
                <div className={styles.avatarWrapper}>
                  <img src={`https://ui-avatars.com/api/?name=CoHead+${activeTeam.replace(' ','+')}+${activeYear}&background=random`} alt="Co-Head" className={styles.avatarImg} />
                </div>
                <h3 className={styles.avatarName}>Co-Head Name</h3>
                <p className={styles.avatarRole}>Co-Head</p>
              </div>
            </div>

            {/* Responsive Grid Members with Pagination */}
            <div className={styles.grid} key={`grid-${activeTeam}-${activeYear}-${currentPage}`}>
              {paginatedMembers.map((member, idx) => (
                <div key={idx} className={`${styles.memberItem} reveal ${styles.revealTop}`} style={{ transitionDelay: `${(idx % 5) * 0.1}s` }}>
                  <div className={styles.avatarWrapper}>
                    <img src={member.avatar} alt={member.name} className={styles.avatarImg} />
                  </div>
                  <h3 className={styles.avatarName}>{member.name}</h3>
                  <p className={styles.avatarRole}>Member</p>
                </div>
              ))}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className={styles.paginationControls}>
                <button 
                  className={styles.pageButton} 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    className={`${styles.pageButton} ${currentPage === idx + 1 ? styles.active : ''}`}
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button 
                  className={styles.pageButton} 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
            
          </div>

          {/* FAQ Section */}
          <div className={styles.faqSection}>
            <div className={styles.faqHeader}>
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className={styles.faqList}>
              {faqs.map((faq, index) => (
                <div key={index} className={`${styles.faqItem} reveal ${styles.revealLeft}`} style={{ transitionDelay: `${index * 0.1}s` }}>
                  <button 
                    className={styles.faqQuestion} 
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>
                    <span className={`${styles.faqIcon} ${openFaqIndex === index ? styles.open : ''}`}>
                      +
                    </span>
                  </button>
                  <div className={`${styles.faqAnswer} ${openFaqIndex === index ? styles.open : ''}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </>
  );
}
