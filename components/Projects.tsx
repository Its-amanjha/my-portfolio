'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '@/data/portfolio';
import { getTechIcon } from './TechIcon';

const categories = ['All', ...Array.from(new Set(projectsData.map(p => p.category)))];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered = activeCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <section id="projects" style={{ padding: '5rem 1.5rem', background: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative large text */}
      <div style={{
        position: 'absolute',
        bottom: '-2rem',
        right: '-1rem',
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(6rem, 15vw, 14rem)',
        color: 'rgba(0,0,0,0.04)',
        lineHeight: 1,
        pointerEvents: 'none',
        userSelect: 'none',
        letterSpacing: '0.05em',
      }}>PROJECTS</div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="neo-section-label">[ 03 — PROJECTS ]</span>
          <h2 className="neo-section-title" style={{ marginTop: '0.5rem' }}>What I Built</h2>
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.78rem',
                fontWeight: 700,
                border: '2.5px solid #1a1a1a',
                padding: '0.4rem 0.9rem',
                cursor: 'pointer',
                borderRadius: '3px',
                background: activeCategory === cat ? '#1a1a1a' : '#fff',
                color: activeCategory === cat ? '#FFE135' : '#1a1a1a',
                boxShadow: activeCategory === cat ? 'none' : '3px 3px 0 #1a1a1a',
                transition: 'all 0.1s ease',
                letterSpacing: '0.05em',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  border: '3px solid #1a1a1a',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  background: '#fff',
                  boxShadow: hovered === idx ? '8px 8px 0 #1a1a1a' : '5px 5px 0 #1a1a1a',
                  transform: hovered === idx ? 'translate(-3px, -3px)' : 'translate(0, 0)',
                  transition: 'all 0.15s ease',
                  cursor: 'pointer',
                }}
              >
                {/* Image area */}
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden', borderBottom: '3px solid #1a1a1a', background: project.color }}>
                  {/* Neobrutalist grid background */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    opacity: 0.5,
                  }} />
                  {/* Decorative telemetry markings */}
                  <div style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.6rem',
                    color: 'rgba(0,0,0,0.4)',
                    fontWeight: 700,
                  }}>
                    SYS_ID // 00{idx + 1}
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '0.5rem',
                    left: '0.5rem',
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.6rem',
                    color: 'rgba(0,0,0,0.4)',
                    fontWeight: 700,
                  }}>
                    STATUS: ACTIVE
                  </div>
                  {/* Centered Emoji */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4.5rem',
                    transform: 'translateY(-5px)',
                  }}>
                    {project.category === 'AI / ML' && '🧠'}
                    {project.category === 'Web App' && '⚡'}
                    {project.category === 'Automation' && '🤖'}
                  </div>

                  {/* Category badge */}
                  <div style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    background: '#1a1a1a',
                    color: project.color,
                    border: '2px solid #1a1a1a',
                    padding: '0.2rem 0.6rem',
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    borderRadius: '2px',
                    letterSpacing: '0.05em',
                  }}>{project.category}</div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem' }}>{project.title}</h3>
                  <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1rem' }}>{project.desc}</p>

                  {/* Tech tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                    {project.tech.map(t => {
                      const icon = getTechIcon(t);
                      return (
                        <span key={t} style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: '0.72rem',
                          border: '1.5px solid #1a1a1a',
                          padding: '0.2rem 0.5rem',
                          background: project.color,
                          fontWeight: 600,
                          borderRadius: '2px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                        }}>
                          {icon && <span style={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem' }}>{icon}</span>}
                          {t}
                        </span>
                      );
                    })}
                  </div>

                  <a
                    href={project.link}
                    data-cursor="link"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: '#1a1a1a',
                      textDecoration: 'none',
                      borderBottom: '2px solid #1a1a1a',
                      paddingBottom: '1px',
                    }}
                  >
                    View Project →
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
