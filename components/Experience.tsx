'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '@/data/portfolio';
import { getTechIcon } from './TechIcon';

interface ExperienceProps {
  limit?: number;
}

export default function Experience({ limit }: ExperienceProps) {
  const [showAll, setShowAll] = useState(false);
  const items = limit && !showAll ? experiences.slice(0, limit) : experiences;

  return (
    <section id="experience" style={{ padding: '5rem 1.5rem', background: '#1a1a1a', color: 'white', position: 'relative', overflow: 'hidden' }}>
      {/* BG pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <div style={{ marginBottom: '3rem' }}>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#FFE135',
            border: '2px solid #FFE135',
            padding: '0.25rem 0.75rem',
            display: 'inline-block',
          }}>[ 04 — EXPERIENCE ]</span>
          <h2 className="neo-section-title" style={{ marginTop: '0.5rem', color: 'white' }}>My Journey</h2>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '16px',
            top: 0,
            bottom: 0,
            width: '3px',
            background: '#FFE135',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingLeft: '3rem' }}>
            <AnimatePresence initial={false}>
            {items.map((exp, idx) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -30, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, x: -30, height: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute',
                  left: '-2.6rem',
                  top: '1.2rem',
                  width: '18px',
                  height: '18px',
                  background: exp.color,
                  border: '3px solid white',
                  borderRadius: '50%',
                  boxShadow: `0 0 0 3px ${exp.color}`,
                }} />

                <div style={{
                  border: '3px solid',
                  borderColor: exp.color,
                  background: 'rgba(255,255,255,0.04)',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '4px',
                  boxShadow: `5px 5px 0 ${exp.color}`,
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  cursor: 'default',
                }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translate(-2px, -2px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = `7px 7px 0 ${exp.color}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translate(0,0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = `5px 5px 0 ${exp.color}`;
                  }}
                >
                  <div className="exp-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div>
                      <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.2rem' }}>{exp.title}</h3>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: '0.75rem',
                          background: exp.color,
                          color: '#1a1a1a',
                          padding: '0.15rem 0.5rem',
                          fontWeight: 700,
                          borderRadius: '2px',
                        }}>{exp.role}</span>
                        <span style={{ color: '#aaa', fontSize: '0.8rem', fontFamily: "'IBM Plex Mono', monospace" }}>{exp.company}</span>
                      </div>
                    </div>
                    <span style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '0.72rem',
                      color: '#FFE135',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                    }}>{exp.date}</span>
                  </div>

                  <p style={{ color: '#ccc', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>{exp.desc}</p>

                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {exp.tech.map((t) => {
                      const icon = getTechIcon(t);
                      return (
                        <span key={t} style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: '0.72rem',
                          border: '1.5px solid #444',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '2px',
                          color: '#ccc',
                          background: 'rgba(255,255,255,0.02)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                        }}>
                          {icon && <span style={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem' }}>{icon}</span>}
                          {t}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Show all / Show less button */}
        {limit && experiences.length > limit && (
          <div style={{ marginTop: '2.5rem', paddingLeft: '3rem' }}>
            <button
              onClick={() => setShowAll((v) => !v)}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '0.9rem',
                border: '2.5px solid #FFE135',
                padding: '0.6rem 1.5rem',
                color: '#FFE135',
                background: 'transparent',
                cursor: 'pointer',
                borderRadius: '3px',
                boxShadow: '3px 3px 0 #FFE135',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                transition: 'all 0.1s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#FFE135';
                (e.currentTarget as HTMLElement).style.color = '#1a1a1a';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = '#FFE135';
              }}
            >
              {showAll ? `↑ Show Less` : `See All ${experiences.length} Experiences →`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
