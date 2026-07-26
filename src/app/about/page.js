'use client';
import React, { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  const [activeTeam, setActiveTeam] = useState('Project');
  const [activeYear, setActiveYear] = useState('2025');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Who can join?",
      answer: "Any student enrolled at IIT (ISM) Dhanbad with a passion for environmental science and sustainability can join the society."
    },
    {
      question: "Does the society conduct workshops?",
      answer: "Yes, we regularly conduct technical workshops, guest lectures, and hands-on sessions related to environmental engineering and sustainability."
    },
    {
      question: "What is the annual membership fees?",
      answer: "The annual membership fee details are communicated during our recruitment drives. We strive to keep it accessible for all students."
    }
  ];

  const teams = ['Project', 'PR', 'Finance', 'Design', 'Media', 'Tech'];

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
  }, [activeYear, activeTeam]);

  return (
    <>
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
                <p style={{ fontSize: '1.8rem', lineHeight: '1.6' }}>
                  The Society of Environmental Science & Engineering is a vibrant student-led organization at IIT (ISM) Dhanbad. We are deeply dedicated to spreading environmental awareness, promoting sustainable practices, and nurturing the next generation of environmental leaders and technological innovators to solve real-world challenges.
                </p>
              </div>
            </div>

            {/* Section 2: What is our mission */}
            <div className={`${styles.infoSection} ${styles.reverse} reveal ${styles.revealRight}`}>
              <div className={`${styles.imageContainer} ${styles.blueBorder}`}>
                {/* User requested to just use logo_nobg for all info parts for now */}
                <img src="/logo_nobg.png" alt="Mission" className={styles.sectionImage} />
              </div>
              <div className={`${styles.textContent} ${styles.blueText}`} style={{ paddingLeft: '40px' }}>
                <h2>What is our mission?</h2>
                <ul>
                  <li>To cultivate a community of passionate individuals dedicated to environmental solutions.</li>
                  <li>To promote education, research, and leadership in environmental engineering.</li>
                  <li>To drive positive change through hands-on projects, workshops, and industry collaborations.</li>
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
              <h2>Faculty In-Charge</h2>
            </div>
            
            <div className={styles.facultyAdvisors}>
              <div className={styles.avatarCard}>
                <div className={styles.avatarWrapper}>
                  <img src={`https://ui-avatars.com/api/?name=Chief+Advisor&background=random`} alt="Chief Faculty Advisor" className={styles.avatarImg} />
                </div>
                <h3 className={styles.avatarName}>Advisor Name</h3>
                <p className={styles.avatarRole}>Chief Faculty Advisor</p>
              </div>
              <div className={styles.avatarCard}>
                <div className={styles.avatarWrapper}>
                  <img src={`https://ui-avatars.com/api/?name=Faculty+Mentor&background=random`} alt="Faculty Mentor" className={styles.avatarImg} />
                </div>
                <h3 className={styles.avatarName}>Mentor Name</h3>
                <p className={styles.avatarRole}>Faculty Mentor</p>
              </div>
              <div className={styles.avatarCard}>
                <div className={styles.avatarWrapper}>
                  <img src={`https://ui-avatars.com/api/?name=Faculty+Treasurer&background=random`} alt="Faculty Treasurer" className={styles.avatarImg} />
                </div>
                <h3 className={styles.avatarName}>Treasurer Name</h3>
                <p className={styles.avatarRole}>Faculty Treasurer</p>
              </div>
            </div>

            <div className={styles.membersHeader} style={{ marginTop: '50px' }}>
              <h2>Executive Members</h2>
              <div className={styles.yearTabs}>
                {['2024', '2025'].map((year) => (
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
              <div className={styles.avatarCard}>
                <div className={styles.avatarWrapper}>
                  <img src={`https://ui-avatars.com/api/?name=President+${activeYear}&background=random`} alt="President" className={styles.avatarImg} />
                </div>
                <h3 className={styles.avatarName}>President Name</h3>
                <p className={styles.avatarRole}>President</p>
              </div>
              <div className={styles.avatarCard}>
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
              <div className={styles.avatarCard}>
                <div className={styles.avatarWrapper}>
                  <img src={`https://ui-avatars.com/api/?name=Head+${activeTeam.replace(' ','+')}+${activeYear}&background=random`} alt="Head" className={styles.avatarImg} />
                </div>
                <h3 className={styles.avatarName}>Head Name</h3>
                <p className={styles.avatarRole}>{activeTeam} Head</p>
              </div>
              <div className={styles.avatarCard}>
                <div className={styles.avatarWrapper}>
                  <img src={`https://ui-avatars.com/api/?name=CoHead+${activeTeam.replace(' ','+')}+${activeYear}&background=random`} alt="Co-Head" className={styles.avatarImg} />
                </div>
                <h3 className={styles.avatarName}>Co-Head Name</h3>
                <p className={styles.avatarRole}>Co-Head</p>
              </div>
            </div>

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
