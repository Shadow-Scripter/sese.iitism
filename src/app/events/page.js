'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import styles from './EventsPage.module.css';
import { allEvents, upcomingEvents, pastEvents } from '@/data/eventsData';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function EventsPage() {
  // Search State
  const [showSearch, setShowSearch] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchSpeaker, setSearchSpeaker] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // Filter Cascade Logic
  const availableCategories = useMemo(() => [...new Set(allEvents.map(e => e.category))], [allEvents]);

  const eventsAfterCategory = useMemo(() => searchCategory 
    ? allEvents.filter(e => e.category === searchCategory)
    : allEvents, [allEvents, searchCategory]);
  
  const availableLocations = useMemo(() => [...new Set(eventsAfterCategory.map(e => e.location))], [eventsAfterCategory]);

  const eventsAfterLocation = useMemo(() => searchLocation 
    ? eventsAfterCategory.filter(e => e.location === searchLocation)
    : eventsAfterCategory, [eventsAfterCategory, searchLocation]);

  const availableSpeakers = useMemo(() => [...new Set(eventsAfterLocation.map(e => e.speaker))], [eventsAfterLocation]);

  // Reset child filters if parent filter change invalidates them
  useEffect(() => {
    if (searchLocation && !availableLocations.includes(searchLocation)) {
      setSearchLocation("");
    }
  }, [availableLocations, searchLocation]);

  useEffect(() => {
    if (searchSpeaker && !availableSpeakers.includes(searchSpeaker)) {
      setSearchSpeaker("");
    }
  }, [availableSpeakers, searchSpeaker]);

  // Handle scrollTo from URL params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const scrollToId = urlParams.get('scrollTo');
      
      if (scrollToId) {
        setTimeout(() => {
          const element = document.getElementById(scrollToId);
          if (element) {
            // Scroll it into the middle of the screen smoothly
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Optional: highlight it temporarily
            const originalShadow = element.style.boxShadow;
            element.style.boxShadow = '0 0 20px 5px rgba(27, 69, 40, 0.5)';
            element.style.transition = 'box-shadow 0.5s ease-in-out';
            
            setTimeout(() => {
              element.style.boxShadow = originalShadow;
            }, 2500);
          }
        }, 500); // Wait half a second for animations/rendering to settle
      }
    }
  }, []);

  const handleSearch = () => {
    let filtered = allEvents;

    if (searchTitle) {
      filtered = filtered.filter(e => e.title.toLowerCase().includes(searchTitle.toLowerCase()));
    }
    if (searchCategory) {
      filtered = filtered.filter(e => e.category === searchCategory);
    }
    if (searchLocation) {
      filtered = filtered.filter(e => e.location === searchLocation);
    }
    if (searchSpeaker) {
      filtered = filtered.filter(e => e.speaker === searchSpeaker);
    }
    if (searchDate) {
      const filterDate = new Date(searchDate);
      filtered = filtered.filter(e => {
        const evtDate = new Date(e.date);
        return evtDate >= filterDate;
      });
    }

    setSearchResults(filtered);
    setIsSearching(true);
  };

  const clearSearch = () => {
    setSearchTitle("");
    setSearchCategory("");
    setSearchLocation("");
    setSearchSpeaker("");
    setSearchDate("");
    setIsSearching(false);
    setSearchResults([]);
  };

  const EventCard = ({ evt, index, animationType }) => {
    const [ref, isVisible, hiddenPosition] = useScrollReveal(0.1);
    
    let hiddenClass = styles.hiddenRight;
    let transitionDelay = '0s';

    if (animationType === 'train') {
      hiddenClass = styles.hiddenRight;
      transitionDelay = `${index * 0.15}s`;
    } else {
      if (index % 3 === 0) hiddenClass = styles.hiddenLeft;
      else if (index % 3 === 1) {
        hiddenClass = hiddenPosition === "top" ? styles.hiddenTop : styles.hiddenBottom;
      }
    }
    
    return (
      <div 
        id={evt.id}
        ref={ref} 
        className={`${styles.revealWrapper} ${isVisible ? styles.visibleCard : hiddenClass}`}
        style={{ transitionDelay: isVisible ? transitionDelay : '0s' }}
      >
        <Link href={`/events/${evt.id}`} className={styles.eventCard}>
          <div className={styles.cardImageWrapper}>
            <img src={evt.image} alt={evt.title} className={styles.cardImage} />
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{evt.title}</h3>
            <p className={styles.cardSubtitle}>
              <span className={styles.categoryHighlight}>{evt.category}</span> • {evt.date.split('-').reverse().join('-')}
            </p>
            
            <div className={styles.metaRow}>
              <span className={styles.metaItem}>📍 {evt.location}</span>
              <span className={styles.metaItem}>👁️ <span className={styles.speakerHighlight}>{evt.speaker}</span></span>
              <span className={styles.metaItem}>🏷️ {evt.price}</span>
            </div>
            
            <p className={styles.cardDesc}>{evt.description}</p>

            <div className={styles.cardFooter}>
              <div className={styles.primaryBtn}>Explore Event Details</div>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className={styles.pageContainer}>
      <NavBar />
      
      {/* Hero Collage 5 images */}
      <div className={styles.heroCollage}>
        <div className={styles.heroPanel}>
          <img src="/building.jpg" alt="Building" className={styles.heroImg} />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroPanel}>
          <img src="/nature_square.png" alt="Nature" className={styles.heroImg} />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroPanel}>
          <img src="/environmental_tree.png" alt="Tree" className={styles.heroImg} style={{ objectPosition: 'center', backgroundColor: '#8fc76f' }} />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroPanel}>
          <img src="/building.jpg" alt="Building" className={styles.heroImg} style={{ filter: 'grayscale(50%)' }} />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroPanel}>
          <img src="/nature_square.png" alt="Nature" className={styles.heroImg} style={{ filter: 'brightness(0.8)' }} />
          <div className={styles.heroOverlay}></div>
        </div>
      </div>

      {/* Search Toggle Button */}
      <div className={styles.searchToggleContainer}>
        <button 
          className={styles.searchToggleBtn}
          onClick={() => setShowSearch(!showSearch)}
        >
          {showSearch ? '✕ Close Filters' : '🔍 Find Your Experience'}
        </button>
      </div>

      {/* Horizontal Search Bar */}
      <div className={`${styles.searchWrapper} ${showSearch ? styles.visible : ''}`}>
        <div className={styles.searchBar}>
          <input 
            type="text" 
            placeholder="Search Event Title..." 
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className={styles.searchInput}
          />
          
          <input 
            type="date" 
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className={styles.searchDate}
          />

          <select 
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className={styles.searchSelect}
          >
            <option value="">All Categories</option>
            {availableCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <select 
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className={styles.searchSelect}
          >
            <option value="">All Locations</option>
            {availableLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>

          <select 
            value={searchSpeaker}
            onChange={(e) => setSearchSpeaker(e.target.value)}
            className={styles.searchSelect}
          >
            <option value="">All Speakers</option>
            {availableSpeakers.map(spk => <option key={spk} value={spk}>{spk}</option>)}
          </select>
          
          <button onClick={handleSearch} className={styles.searchButton}>
            Search
          </button>

          {isSearching && (
            <button onClick={clearSearch} className={styles.clearButton}>
              Clear
            </button>
          )}
        </div>
      </div>

      <div className={styles.contentArea}>
        {isSearching ? (
          <div>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Search <span>Results</span></h2>
              <div className={styles.divider}>
                <div className={styles.line}></div>
                <div className={styles.icon}>🔍</div>
                <div className={styles.line}></div>
              </div>
            </div>
            
            {searchResults.length > 0 ? (
              <div className={styles.eventsGrid}>
                {searchResults.map((evt, idx) => (
                  <EventCard key={`search-${evt.id}`} evt={evt} index={idx} />
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                No events match your current search filters. Try adjusting them or clearing the search.
              </div>
            )}
          </div>
        ) : (
          <>
            <div>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>On-The-Horizon <span>Events</span></h2>
                <div className={styles.divider}>
                  <div className={styles.line}></div>
                  <div className={styles.icon}>📅</div>
                  <div className={styles.line}></div>
                </div>
              </div>
              <div className={styles.eventsGrid}>
                {upcomingEvents.map((evt, idx) => (
                  <EventCard key={`upcoming-${evt.id}`} evt={evt} index={idx} animationType="train" />
                ))}
              </div>
            </div>

            <div style={{ marginTop: '40px' }}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Past <span>Events</span></h2>
                <div className={styles.divider}>
                  <div className={styles.line}></div>
                  <div className={styles.icon}>📅</div>
                  <div className={styles.line}></div>
                </div>
              </div>
              <div className={styles.eventsGrid}>
                {pastEvents.map((evt, idx) => (
                  <EventCard key={`past-${evt.id}`} evt={evt} index={idx} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
