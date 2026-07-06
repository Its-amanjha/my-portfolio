'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" style={{ padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Marquee divider top */}
      <div className="marquee-wrapper" style={{ marginBottom: '4rem' }}>
        <div className="marquee-track">
          {Array(10)
            .fill('ABOUT ME ★ WHO AM I ★ AMAN KUMAR JHA ★ ')
            .map((t, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '1.2rem',
                  letterSpacing: '0.1em',
                  marginRight: '2rem',
                }}
              >
                {t}
              </span>
            ))}
        </div>
      </div>

      <div className="container">
        {/* Section header */}
        <div style={{ marginBottom: '3rem' }}>
          <span className="neo-section-label">[ 01 — ABOUT ]</span>
          <h2 className="neo-section-title" style={{ marginTop: '0.5rem' }}>
            Who Am I?
          </h2>
        </div>

        {/* Single Card: Bio Overview + CV Button */}
        <div
          className="neo-card"
          style={{
            borderLeft: '6px solid #FFE135',
            padding: '2.25rem',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <div>
            <p style={{ fontSize: '1rem', lineHeight: '1.85', color: '#333', textAlign: 'justify', marginBottom: '1.25rem' }}>
              A Computer Science student building at the intersection of Artificial Intelligence and software engineering. I design AI-driven systems focused on intelligent automation, real-world execution, and scalable product thinking.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: '1.85', color: '#333', textAlign: 'justify', margin: 0 }}>
              I use autonomous coding agents to accelerate development and experimentation, while maintaining full ownership of architecture, design, and implementation across everything I build.
            </p>
          </div>

          <motion.a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 3, y: 3 }}
            className="neo-btn neo-btn-black"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              alignSelf: 'flex-start',
              gap: '0.5rem',
              fontSize: '0.95rem',
              padding: '0.8rem 1.75rem',
              transition: 'none',
              boxSizing: 'border-box',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 2.5C3 2.22386 3.22386 2 3.5 2H11.5C11.7761 2 12 2.22386 12 2.5V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM4.5 5C4.22386 5 4 5.22386 4 5.5C4 5.77614 4.22386 6 4.5 6H10.5C10.7761 6 11 5.77614 11 5.5C11 5.22386 10.7761 5 10.5 5H4.5ZM4.5 7.5C4.22386 7.5 4 7.72386 4 8C4 8.27614 4.22386 8.5 4.5 8.5H10.5C10.7761 8.5 11 8.27614 11 8C11 7.72386 10.7761 7.5 10.5 7.5H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H8.5C8.77614 11 8.99998 10.7761 8.99998 10.5C8.99998 10.2239 8.77614 10 8.5 10H4.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" />
            </svg>
            <span>CV</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
