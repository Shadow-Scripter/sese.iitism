'use client';
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import styles from './ProjectsPage.module.css';

const projectTopics = {
  Air: [
    "Aerosol Impact on Climate", "Urban Smog Mitigation", "Carbon Capture Tech", 
    "Wind Current Analysis", "Indoor Air Purification", "Drone-based Air Sampling",
    "Ozone Layer Monitoring", "Emission Source Tracking"
  ],
  Water: [
    "Microplastics in Oceans", "Deep Sea Ecosystems", "Groundwater Contamination",
    "Desalination Efficiency", "River Basin Management", "Coral Reef Bleaching",
    "Wastewater Bioremediation", "Flood Prediction Models"
  ],
  Soil: [
    "Heavy Metal Remediation", "Soil Microbiome Health", "Erosion Control Systems",
    "Agricultural Runoff", "Permafrost Thawing", "Landfill Seepage",
    "Desertification Reversal", "Nitrogen Cycle Mapping"
  ],
  Waste: [
    "E-Waste Recycling", "Biodegradable Plastics", "Composting Optimization",
    "Nuclear Waste Storage", "Circular Economy Models", "Space Debris Tracking",
    "Ocean Garbage Patches", "Upcycling Construction Materials"
  ]
};

const BranchSection = ({ title, leaves, position, imagePath, globalActiveTopic, setGlobalActiveTopic }) => {
  return (
    <div id={`branch-${title}`} className={styles.branchSection}>
      <div className={`${styles.branchWrapper} ${styles[position]}`}>
        
        <div className={styles.imageBranchContainer}>
          <img src={imagePath} alt="Branch" className={styles.branchImage} />
          
          <div className={styles.branchTextOverlay}>
            <h2 className={styles.branchTitle}>{title}</h2>
            <div className={styles.floatingTitlesContainer}>
              {leaves.map((leaf, idx) => {
                const delay = (idx * 0.4) + (idx % 3);
                const isHidden = globalActiveTopic && globalActiveTopic.title === leaf;
                return (
                  <div 
                    key={idx} 
                    className={`${styles.floatingTitle} ${isHidden ? styles.hiddenTitle : ''}`} 
                    style={{ animationDelay: `-${delay}s` }}
                    onClick={() => setGlobalActiveTopic(
                      globalActiveTopic && globalActiveTopic.title === leaf 
                        ? null 
                        : { title: leaf, category: title, position }
                    )}
                  >
                    {leaf}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Professional Expanded Card */}
        {globalActiveTopic && globalActiveTopic.category === title && (
          <div className={`${styles.professionalCard} ${styles[position + 'Card']}`}>
             <div className={styles.cardHeader}>
               <h3 className={styles.cardExpandedTitle}>{globalActiveTopic.title}</h3>
               <button className={styles.closeArrowBtn} onClick={() => setGlobalActiveTopic(null)}>
                 {position === 'left' ? '←' : '→'}
               </button>
             </div>
             <div className={styles.cardBody}>
               <p className={styles.cardDetails}>
                 This is an expanded detailed view of the <strong>{globalActiveTopic.title}</strong> project. It covers all the latest research, methodologies, and environmental findings related to this topic.
               </p>
             </div>
             <div className={styles.cardFooter}>
               <button className={styles.downloadBtn}>
                 ↓ Download PDF
               </button>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default function ProjectsPage() {
  const [offsetY, setOffsetY] = useState(0);
  const [globalActiveTopic, setGlobalActiveTopic] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * 0.5); // Slower scroll speed
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allTopics = [
    ...projectTopics.Air.map(t => ({ title: t, category: 'Air', position: 'left' })),
    ...projectTopics.Water.map(t => ({ title: t, category: 'Water', position: 'right' })),
    ...projectTopics.Soil.map(t => ({ title: t, category: 'Soil', position: 'left' })),
    ...projectTopics.Waste.map(t => ({ title: t, category: 'Waste', position: 'right' })),
  ];

  const filteredTopics = searchQuery
    ? allTopics.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className={styles.pageContainer} style={{ backgroundPositionY: `-${offsetY}px` }}>
      <div className={styles.overlay}></div>
      <NavBar />
      
      {/* Global Search Component */}
      <div className={styles.globalSearchWrapper}>
        <div className={styles.searchToggle} onClick={() => setIsSearchOpen(!isSearchOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        
        {isSearchOpen && (
          <div className={styles.searchDropdown}>
            <input 
              type="text" 
              className={styles.searchInput} 
              placeholder="Search project titles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <ul className={styles.searchResults}>
                {filteredTopics.length > 0 ? (
                  filteredTopics.map((topic, idx) => (
                    <li 
                      key={idx} 
                      className={styles.searchResultItem}
                      onClick={() => {
                        setGlobalActiveTopic(topic);
                        setIsSearchOpen(false);
                        setSearchQuery("");
                        setTimeout(() => {
                          const element = document.getElementById(`branch-${topic.category}`);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }
                        }, 100);
                      }}
                    >
                      {topic.title} <span className={styles.searchCategoryBadge}>{topic.category}</span>
                    </li>
                  ))
                ) : (
                  <li className={styles.noResults}>No projects found.</li>
                )}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Explore<br/>Nature</h1>
          <p className={styles.heroSubtitle}>Discover environmental projects</p>
        </section>

        {/* Branch Sections */}
        <div style={{ marginTop: '150px' }}>
          <BranchSection 
            title="Air" 
            leaves={projectTopics.Air} 
            position="left" 
            imagePath="/images/trees/branch_only_transparent.png" 
            globalActiveTopic={globalActiveTopic}
            setGlobalActiveTopic={setGlobalActiveTopic}
          />
        </div>
        <BranchSection 
          title="Water" 
          leaves={projectTopics.Water} 
          position="right" 
          imagePath="/images/trees/branch_only_transparent.png" 
          globalActiveTopic={globalActiveTopic}
          setGlobalActiveTopic={setGlobalActiveTopic}
        />
        <BranchSection 
          title="Soil" 
          leaves={projectTopics.Soil} 
          position="left" 
          imagePath="/images/trees/branch_only_transparent.png" 
          globalActiveTopic={globalActiveTopic}
          setGlobalActiveTopic={setGlobalActiveTopic}
        />
        <BranchSection 
          title="Waste" 
          leaves={projectTopics.Waste} 
          position="right" 
          imagePath="/images/trees/branch_only_transparent.png" 
          globalActiveTopic={globalActiveTopic}
          setGlobalActiveTopic={setGlobalActiveTopic}
        />
        
        {/* Decorative Minimalist Trees */}
        <img src="/images/trees/tree_1.png" className={`${styles.decoTree} ${styles.tree1}`} alt=""/>
        <img src="/images/trees/tree_2.png" className={`${styles.decoTree} ${styles.tree2}`} alt=""/>
        <img src="/images/trees/tree_3.png" className={`${styles.decoTree} ${styles.tree3}`} alt=""/>
        <img src="/images/trees/tree_4.png" className={`${styles.decoTree} ${styles.tree4}`} alt=""/>
        <img src="/images/trees/tree_5.png" className={`${styles.decoTree} ${styles.tree5}`} alt=""/>
        <img src="/images/trees/tree_6.png" className={`${styles.decoTree} ${styles.tree6}`} alt=""/>

        <Footer />
      </div>
    </div>
  );
}
