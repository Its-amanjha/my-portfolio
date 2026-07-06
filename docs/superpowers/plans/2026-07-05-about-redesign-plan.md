# About Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the About section in `components/About.tsx` to display a single top-level bio card and a bottom row containing location/weather (with client-side API weather fetching and custom SVGs), an empty space slot, and the CV button.

**Architecture:** Convert `components/About.tsx` into a responsive 2-row bento grid. Perform client-side fetch from Open-Meteo API in a `useEffect` hook to display live New Delhi weather, mapping weather codes to custom inline SVGs (no emojis).

**Tech Stack:** React, Next.js (Client Component), Tailwind CSS, Framer Motion (`framer-motion`).

## Global Constraints
* **No Emojis**: Emojis are strictly banned from all code, text, markup, and SVGs.
* **App Styling Consistency**: Use `border: 3px solid #1a1a1a` borders, `box-shadow: 5px 5px 0px #1a1a1a` shadows, and default colors (`#FFE135`, `#4ECDC4`, `#FF6B9D`, `#95E06C`).
* **Clean Empty Slot**: Column 2 of the bottom row must be completely empty but reserve space in the grid.

---

### Task 1: Redesign About Component Layout and Weather Fetching

**Files:**
* Modify: [components/About.tsx](file:///d:/portfolio-2/components/About.tsx)

**Interfaces:**
* Consumes: `aboutContent` details (specifically the bio text descriptions) from `data/portfolio.ts`
* Produces: Clean unified About bento layout

- [ ] **Step 1: Write the updated About component implementation**

Write the complete code for `components/About.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Inline SVGs for Weather Codes (No Emojis)
function SunIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#FFE135' }}>
      <circle cx="12" cy="12" r="4" fill="#FFE135" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#a0aec0' }}>
      <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.42-1.89-1.72-3.5-3.5-4-2.67-.77-5.5.9-6.5 3.5C3.52 11.23 2 13.14 2 15.5A3.5 3.5 0 0 0 5.5 19z" fill="#fff" />
    </svg>
  );
}

function RainIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#3b82f6' }}>
      <path d="M17 18a5 5 0 0 0-10 0" />
      <path d="M8 22v-2M12 22v-2M16 22v-2" />
    </svg>
  );
}

function CloudLightningIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#FFE135' }}>
      <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 8.58" />
      <path d="M13 11l-4 6h3l-2 5" />
    </svg>
  );
}

function CloudSnowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#93c5fd' }}>
      <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
      <path d="M8 16h.01M8 20h.01M12 18h.01M12 22h.01M16 16h.01M16 20h.01" />
    </svg>
  );
}

interface WeatherData {
  temp: number;
  condition: string;
  code: number;
}

export default function About() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current_weather=true'
        );
        const data = await res.json();
        const current = data.current_weather;

        const temp = Math.round(current.temperature);
        const code = current.weathercode;

        let condition = 'Clear';
        if (code === 0) condition = 'Clear Sky';
        else if (code >= 1 && code <= 3) condition = 'Partly Cloudy';
        else if (code >= 45 && code <= 48) condition = 'Foggy';
        else if (code >= 51 && code <= 67) condition = 'Rainy';
        else if (code >= 71 && code <= 77) condition = 'Snowy';
        else if (code >= 80 && code <= 82) condition = 'Rain Showers';
        else if (code >= 95 && code <= 99) condition = 'Thunderstorm';

        setWeather({ temp, condition, code });
      } catch (err) {
        // Silently fail on weather error
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code === 0) return <SunIcon />;
    if (code >= 1 && code <= 3) return <CloudIcon />;
    if (code >= 45 && code <= 48) return <CloudIcon />; // Use cloud for fog
    if (code >= 51 && code <= 67) return <RainIcon />;
    if (code >= 71 && code <= 77) return <CloudSnowIcon />;
    if (code >= 80 && code <= 82) return <RainIcon />;
    if (code >= 95 && code <= 99) return <CloudLightningIcon />;
    return <SunIcon />;
  };

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

        {/* Bento Grid Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* Top Row: Large Single About Card */}
          <div
            className="neo-card"
            style={{
              borderLeft: '6px solid #FFE135',
              padding: '2rem',
              background: '#ffffff',
            }}
          >
            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', textAlign: 'justify', marginBottom: '1.25rem' }}>
              Designing and deploying autonomous AI agents that reason, code, and self-correct using multi-step LLM loops. Building systems where software writes, tests, and ships itself.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', textAlign: 'justify', margin: 0 }}>
              Building full-stack applications with React, Next.js, and Node.js on the frontend, and Python, Go, and PostgreSQL on the backend. Clean architecture, fast APIs, and scalable systems.
            </p>
          </div>

          {/* Bottom Row: 3-column Layout */}
          <div
            className="about-bottom-row"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {/* Box 1: Location & Weather combined */}
            <div
              className="neo-card"
              style={{
                borderLeft: '6px solid #4ECDC4',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '140px',
                background: '#ffffff',
              }}
            >
              <div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: '#777', fontWeight: 700, letterSpacing: '0.05em' }}>
                  LOCATION & WEATHER
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>New Delhi, India</span>
                  <span className="pulse-dot" style={{ width: '8px', height: '8px', background: '#95E06C', borderRadius: '50%' }} />
                </div>
              </div>

              <div style={{ borderBottom: '2px dashed #1a1a1a', margin: '0.5rem 0' }} />

              {loading ? (
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: '#888' }}>
                  Loading weather...
                </div>
              ) : weather ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{weather.temp}°C</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#555' }}>{weather.condition}</div>
                    <div style={{ flexShrink: 0 }}>{getWeatherIcon(weather.code)}</div>
                  </div>
                </div>
              ) : (
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: '#888' }}>
                  Weather service offline
                </div>
              )}
            </div>

            {/* Box 2: Empty Space Placeholder (Leaves space, no box outline) */}
            <div style={{ minHeight: '140px' }} />

            {/* Box 3: CV Button Card */}
            <div style={{ minHeight: '140px' }}>
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 3, y: 3 }}
                className="neo-btn neo-btn-black"
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '1rem',
                  padding: 0,
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

        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify production compilation passes**

Run: `npm run build`
Expected: SUCCESS

- [ ] **Step 3: Commit the changes**

```bash
git add components/About.tsx
git commit -m "feat: redesign About section with Bento layout and live weather"
```
