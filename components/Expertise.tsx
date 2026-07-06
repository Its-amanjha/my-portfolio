'use client';

import { motion } from 'framer-motion';
import ExpertiseCardAnimation from '@/components/ExpertiseCardAnimation';
import { expertiseData } from '@/data/portfolio';

export default function Expertise() {
  return (
    <section id="expertise" style={{ padding: '5rem 1.5rem', background: '#f5f0e8', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        {/* Section header */}
        <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="neo-section-label">[ 02 — EXPERTISE ]</span>
            <h2 className="neo-section-title" style={{ marginTop: '0.5rem' }}>What I Do</h2>
          </div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.85rem',
              fontWeight: 600,
              border: '2.5px solid #1a1a1a',
              padding: '0.4rem 0.8rem',
              background: '#FFE135',
              boxShadow: '3px 3px 0 #1a1a1a',
              transform: 'rotate(-1deg)',
            }}
          >
            Building the future ✦
          </div>
        </div>

        {/* Expertise grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full overflow-visible">
          {expertiseData.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className={`group neo-card p-5 sm:p-6 flex flex-col w-full ${item.cls}`}
              style={{
                cursor: 'default',
              }}
            >
              {/* Animation container at the top */}
              <div className="mb-6 h-[130px] w-full border-2 border-neo-border neo-panel overflow-hidden relative shadow-neo-sm crt-screen" data-cursor-text="LIVE TELEMETRY">
                <ExpertiseCardAnimation
                  index={idx}
                  title={item.title}
                  animationType={item.animationType}
                />
              </div>

              {/* Title Badge row */}
              <div className="card-top mb-4 mt-2">
                <span className="card-cat font-extrabold">{item.title}</span>
              </div>

              {/* Description */}
              <p className="text-sm font-semibold text-[color:var(--neo-ink-soft)] leading-relaxed flex-grow text-justify">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom marquee */}
        <div style={{ marginTop: '3rem' }}>
          <div className="marquee-wrapper">
            <div className="marquee-track">
              {Array(8).fill(null).flatMap(() =>
                expertiseData.map((item) => (
                  <span key={Math.random()} style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    marginRight: '2rem',
                    opacity: 0.8,
                  }}>
                    ★ {item.title}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
