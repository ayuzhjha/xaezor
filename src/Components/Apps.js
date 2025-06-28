import React, { useState } from 'react'
import '../Assets/css/hstyle.css';
import '../Assets/css/appstyles.css';
import '../Assets/css/projectstyles.css';
import { Link } from 'react-router-dom';
import { useClickSound } from '../Assets/hooks/useHoverSound';
import twitter from '../Assets/css/img/ams.png';
import xarvis from '../Assets/css/img/xarviscover.jpg';
import bgmi from '../Assets/css/img/bgmi.jpeg';
import chat from '../Assets/css/img/chatapp.jpeg';
import wpa from '../Assets/css/img/wpa.jpeg';
import bannerImg from '../Assets/css/img/ARC.jpg';
import arcv from '../Assets/css/img/arcv.mp4';
import sumo from '../Assets/css/img/sumobot.png';
import ttt from '../Assets/css/img/tictactoe.png';
import rc from '../Assets/css/img/rcbot.png';
import WorkInProgress from './WorkInProgress';
import bms from '../Assets/css/img/bms.png';
import grub from '../Assets/css/img/grub.png';

// Placeholder icons (use your own images if available)
const placeholder1 = twitter;
const placeholder2 = bgmi;
const placeholder3 = twitter;
const placeholder4 = bgmi;
const placeholder5 = twitter;
const placeholder6 = bgmi;

export const Apps = () => {
  const playClickSound = useClickSound();
  const [search, setSearch] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Unique app data for each category
  const sections = [
    { 
      title: 'Web Apps', 
      appList: [
        { name: 'AMS', icon: twitter, link: 'https://github.com/xaezor/attendance-management-system' },
        { name: 'Weather App', icon: wpa, link: '/wip' }
      ] 
    },
    { 
      title: 'Mobile Apps', 
      appList: [
        { name: 'Chat App', icon: chat, link: 'https://github.com/ayuzhjha/Chatroom-Android' },
      ] 
    },
    { 
      title: 'CS Projetcs', 
      appList: [
        { name: 'Xarvis Desktop', icon: xarvis, link: 'https://github.com/xaezor/XARVIS' },
        { name: 'Tic Tac Toe', icon: ttt, link: 'https://github.com/xaezor/tictactoe' },
        { name: 'BMS', icon: bms, link: 'https://github.com/ayuzhjha/bank-management-system' }
      ] 
    },
    {
      title: 'Linux',
      appList: [
        { name: 'Grub Theme', icon: grub, link: 'https://github.com/ayuzhjha/LOQGRUB' }
      ]
    },
    { 
      title: 'Robotic Projects', 
      appList: [
        { name: 'Sumo Bot', icon: sumo, link: 'https://www.hackster.io/xaezor/wired-sumo-bot-597338' },
        { name: 'RC Bot', icon: rc, link: 'https://rcbot-xaezors-projects.vercel.app/' },
       ] 
    },
  ];

  // Gather all unique app names for filtering
  const allApps = sections.flatMap(section => section.appList);
  const filteredApps = search
    ? allApps.filter(app => app.name.toLowerCase().includes(search.toLowerCase()))
    : allApps;

  // App details data
  const appDetails = {
    'AMS': {
      description: 'A comprehensive attendance management system for educational institutions.',
      rating: 4.5,
      reviews: 12,
      bugs: 2,
      openLink: 'https://github.com/xaezor/attendance-management-system'
    },
    'Weather App': {
      description: 'Real-time weather forecasting application with location-based services.',
      rating: 4.2,
      reviews: 8,
      bugs: 1,
      openLink: '/wip'
    },
    'Chat App': {
      description: 'Real-time messaging application with modern UI and secure communication.',
      rating: 4.7,
      reviews: 15,
      bugs: 0,
      openLink: 'https://github.com/ayuzhjha/Chatroom-Android'
    },
    'Xarvis Desktop': {
      description: 'Advanced desktop assistant with AI-powered features and automation.',
      rating: 4.8,
      reviews: 23,
      bugs: 1,
      openLink: 'https://github.com/xaezor/XARVIS'
    },
    'Tic Tac Toe': {
      description: 'Classic Tic Tac Toe game with modern graphics and multiplayer support.',
      rating: 4.0,
      reviews: 6,
      bugs: 0,
      openLink: 'https://github.com/xaezor/tictactoe'
    },
    'BMS': {
      description: 'Bank management system for handling customer accounts and transactions.',
      rating: 4.3,
      reviews: 9,
      bugs: 2,
      openLink: 'https://github.com/ayuzhjha/bank-management-system'
    },
    'Sumo Bot': {
      description: 'Autonomous sumo wrestling robot with advanced sensors and AI algorithms.',
      rating: 4.6,
      reviews: 18,
      bugs: 1,
      openLink: 'https://www.hackster.io/xaezor/wired-sumo-bot-597338'
    },
    'RC Bot': {
      description: 'Remote controlled robot with wireless communication and real-time control.',
      rating: 4.4,
      reviews: 11,
      bugs: 1,
      openLink: 'https://rcbot-xaezors-projects.vercel.app/'
    }
  };

  const handleBannerClick = () => {
    setIsClicked(true);
    playClickSound();
    setTimeout(() => setIsClicked(false), 300); // Reset after animation
  };

  const handleVideoEnded = (e) => {
    e.target.pause();
  };

  const handleViewClick = (app) => {
    setSelectedApp(app);
    setShowPopup(true);
    playClickSound();
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedApp(null);
  };

  const handleOpenApp = () => {
    if (selectedApp && selectedApp.link) {
      if (selectedApp.link.startsWith('/')) {
        // Internal route
        window.location.href = selectedApp.link;
      } else {
        // External link
        window.open(selectedApp.link, '_blank');
      }
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push('☆');
    }
    return stars.join('');
  };

  return (
    <div style={{ 
      background: 'transparent', 
      width: '100vw', 
      height: '100%', 
      justifyContent: 'center', 
      alignItems: 'center', 
      marginTop: '9%', 
      marginBottom: '10%'
    }}>
      {/* Banner */}
      <div 
        className="project-banner"
        onClick={handleBannerClick}
        style={{
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          transform: isClicked ? 'scale(0.98)' : 'scale(1)',
          filter: isClicked ? 'brightness(1.2) drop-shadow(0 0 15px rgba(0, 255, 231, 0.5))' : 'none'
        }}
      >
        <a href='https://arc-os-xaezors-projects.vercel.app/'>
          <video 
            src={arcv} 
            autoPlay
            muted
            onEnded={handleVideoEnded}
            style={{
              transition: 'all 0.3s ease',
              borderRadius: '1rem',
              width: '100%',
              height: 'auto'
            }}
          />
        </a>
      </div>

      {/* Search Bar */}
      <div className="project-search-bar">
        <input
          className="project-search-input"
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span className="project-search-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </span>
      </div>
      {/* Underline */}
      <div className="project-search-underline"></div>

      {/* App Categories */}
      {sections.map((section, idx) => (
        <div key={section.title} className="app-section">
          <h2 className="app-section-title">{section.title}</h2>
          <div className="app-scroll-row">
            {section.appList
              .filter(app => filteredApps.includes(app))
              .map((appItem, i) => (
                <div key={i} className="app-card">
                  {/* App Icon Only */}
                  <div className="app-card-icon-container">
                    <img src={appItem.icon} alt="App Icon" className="app-card-icon" />
                  </div>
                  {/* App Name */}
                  <div className="app-card-name">{appItem.name}</div>
                  {/* View Button */}
                  <button 
                    className="app-card-install-btn"
                    onClick={() => handleViewClick(appItem)}
                  >
                    View
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* Popup Modal */}
      {showPopup && selectedApp && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{
            backgroundColor: '#1a1a1a',
            borderRadius: '1rem',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            border: '2px solid #00ffe7',
            boxShadow: '0 0 30px rgba(0, 255, 231, 0.3)'
          }}>
            {/* Header with Logo and Open Button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              borderBottom: '1px solid #333',
              paddingBottom: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img 
                  src={selectedApp.icon} 
                  alt={selectedApp.name}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '0.5rem',
                    objectFit: 'cover'
                  }}
                />
                <h2 style={{ color: '#00ffe7', margin: 0 }}>{selectedApp.name}</h2>
              </div>
              <button
                onClick={handleOpenApp}
                style={{
                  backgroundColor: '#00ffe7',
                  color: '#1a1a1a',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}
              >
                Open
              </button>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#00ffe7', marginBottom: '0.5rem' }}>Description</h3>
              <p style={{ color: '#ccc', lineHeight: '1.6', margin: 0 }}>
                {appDetails[selectedApp.name]?.description || 'No description available.'}
              </p>
            </div>

            {/* Ratings */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#00ffe7', marginBottom: '0.5rem' }}>Rating</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: '#ffd700', fontSize: '1.2rem' }}>
                  {renderStars(appDetails[selectedApp.name]?.rating || 0)}
                </span>
                <span style={{ color: '#ccc' }}>
                  {appDetails[selectedApp.name]?.rating || 0}/5 ({appDetails[selectedApp.name]?.reviews || 0} reviews)
                </span>
              </div>
            </div>

            {/* Bugs and Reviews */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#00ffe7', marginBottom: '0.5rem' }}>Status</h3>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <div>
                  <span style={{ color: '#ff6b6b' }}>🐛 Bugs: </span>
                  <span style={{ color: '#ccc' }}>{appDetails[selectedApp.name]?.bugs || 0}</span>
                </div>
                <div>
                  <span style={{ color: '#4ecdc4' }}>📝 Reviews: </span>
                  <span style={{ color: '#ccc' }}>{appDetails[selectedApp.name]?.reviews || 0}</span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClosePopup}
              style={{
                backgroundColor: 'transparent',
                color: '#00ffe7',
                border: '1px solid #00ffe7',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                width: '100%',
                fontSize: '1rem'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
