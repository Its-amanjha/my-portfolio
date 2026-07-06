'use client';

import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { SiX } from 'react-icons/si';

export default function Footer() {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub size={20} />, href: 'https://github.com/Its-amanjha', label: 'GitHub' },
    { icon: <FaLinkedin size={20} />, href: 'https://linkedin.com/in/its-amanjha', label: 'LinkedIn' },
    { icon: <FaEnvelope size={20} />, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=amanjhaa.work@gmail.com', label: 'Email' },
    { icon: <FaWhatsapp size={20} />, href: 'https://wa.me/919217036208', label: 'WhatsApp' },
    { icon: <SiX size={17} />, href: '#', label: 'X (Twitter)' },
  ];

  return (
    <footer style={{
      background: '#1a1a1a',
      color: 'white',
      borderTop: '4px solid #FFE135',
      padding: '2.5rem 1.5rem',
    }}>
      <div className="container footer-inner" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}>
        {/* Left Column: Brand Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', flex: '1 1 200px' }}>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '1.4rem',
            letterSpacing: '0.1em',
            background: '#FFE135',
            color: '#1a1a1a',
            border: '2.5px solid #FFE135',
            padding: '0.1rem 0.6rem',
          }}>portfolio</div>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: '#aaa' }}>
            Aman Kumar Jha © {year}
          </span>
        </div>

        {/* Center Column: Social Icons */}
        <div className="footer-links" style={{
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center',
          justifyContent: 'center',
          flex: '1 1 200px',
        }}>
          {socialLinks.map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                color: '#aaa',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                transition: 'color 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#FFE135';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#aaa';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Right Column: Spacer to prevent overlap with floating ScrollToTop button */}
        <div className="footer-spacer" style={{ flex: '1 1 200px' }}></div>
      </div>
    </footer>
  );
}
