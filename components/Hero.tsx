'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiGithub, SiX } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const roles = ['AI Engineer', 'Agentic Driven Systems', 'ML Systems Builder', 'Automation Architect'];

function CustomTypewriter({ words, typeSpeed = 70, deleteSpeed = 50, delaySpeed = 2000 }: { words: string[], typeSpeed?: number, deleteSpeed?: number, delaySpeed?: number }) {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = words[currentWordIdx];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, deleteSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) => currentWord.slice(0, prev.length + 1));
      }, typeSpeed);
    }

    if (!isDeleting && currentText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), delaySpeed);
    }

    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIdx((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIdx, words, typeSpeed, deleteSpeed, delaySpeed]);

  return (
    <span>
      {currentText}
      <span className="typewriter-cursor">_</span>
      <style jsx>{`
        .typewriter-cursor {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          from, to { color: transparent }
          50% { color: inherit }
        }
      `}</style>
    </span>
  );
}

const socials = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/Its-amanjha',
    icon: SiGithub,
    color: '#1a1a1a',
    textColor: '#ffffff',
    rotate: -18,
    idleAnim: { rotate: [-18, -22, -18, -14, -18], y: [0, -6, 0] },
    idleDuration: 5,
    pos: { top: '22%', left: '25%' },
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/its-amanjha',
    icon: FaLinkedin,
    color: '#0077B5',
    textColor: '#ffffff',
    rotate: 12,
    idleAnim: { y: [0, -10, 0], rotate: [12, 15, 12, 9, 12] },
    idleDuration: 4,
    pos: { top: '16%', right: '25%' },
  },
  {
    id: 'email',
    label: 'Email',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=amanjhaa.work@gmail.com',
    icon: MdEmail,
    color: '#FFE135',
    textColor: '#1a1a1a',
    rotate: 22,
    idleAnim: { rotate: [22, 28, 22, 16, 22] },
    idleDuration: 6,
    pos: { bottom: '22%', left: '25%' },
  },
  {
    id: 'x',
    label: 'X',
    href: '#',
    icon: SiX,
    color: '#000000',
    textColor: '#ffffff',
    rotate: -14,
    idleAnim: { y: [0, 10, 0], rotate: [-14, -10, -14, -18, -14] },
    idleDuration: 3.5,
    pos: { bottom: '22%', right: '25%' },
  },
];

// Desktop — absolute positioned, scattered
function SocialIconDesktop({ social, delay }: { social: typeof socials[0]; delay: number }) {
  const [clicked, setClicked] = useState(false);
  const Icon = social.icon;

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 600);
  };

  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={social.label}
      initial={{ opacity: 0, scale: 0, rotate: social.rotate + 30 }}
      animate={{ opacity: 1, scale: 1, rotate: social.rotate }}
      transition={{ delay, duration: 0.6, type: 'spring', stiffness: 160, damping: 12 }}
      style={{
        position: 'absolute',
        ...social.pos,
        textDecoration: 'none',
        zIndex: 4,
        display: 'block',
      }}
    >
      <motion.div
        animate={social.idleAnim}
        transition={{ duration: social.idleDuration, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.5 }}
      >
        <AnimatePresence>
          {clicked && (
            <motion.div
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2.4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                inset: 0,
                border: `3px solid ${social.color}`,
                borderRadius: '4px',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            />
          )}
        </AnimatePresence>

        <motion.div
          whileHover={{
            scale: 1.15,
            rotate: 0,
            boxShadow: '7px 7px 0 #1a1a1a',
            y: -4,
            x: -4,
          }}
          whileTap={{
            scale: 0.88,
            x: 5,
            y: 5,
            boxShadow: '0px 0px 0 #1a1a1a',
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.3rem',
            background: social.color,
            border: '3px solid #1a1a1a',
            boxShadow: '5px 5px 0 #1a1a1a',
            padding: '0.75rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            minWidth: '70px',
            transition: 'background 0s',
          }}
        >
          <Icon style={{ width: '1.6rem', height: '1.6rem', color: social.textColor, display: 'block' }} />
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.62rem',
              fontWeight: 700,
              color: social.textColor,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            {social.label}
          </span>
        </motion.div>
      </motion.div>
    </motion.a>
  );
}

// Mobile — compact row of icon-only buttons with idle floating animation
function SocialIconMobile({ social, delay }: { social: typeof socials[0]; delay: number }) {
  const [clicked, setClicked] = useState(false);
  const Icon = social.icon;

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 600);
  };

  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0, rotate: social.rotate }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay, duration: 0.4, type: 'spring', stiffness: 180, damping: 14 }}
      style={{ textDecoration: 'none', flexShrink: 0 }}
    >
      {/* Idle float animation wrapper */}
      <motion.div
        animate={social.idleAnim}
        transition={{
          duration: social.idleDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay + 0.5,
        }}
        style={{ position: 'relative' }}
      >
        {/* Click burst ring */}
        <AnimatePresence>
          {clicked && (
            <motion.div
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              style={{
                position: 'absolute',
                inset: 0,
                border: `2.5px solid ${social.color}`,
                borderRadius: '4px',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            />
          )}
        </AnimatePresence>

        <motion.div
          whileHover={{ scale: 1.15, y: -4, boxShadow: '5px 5px 0 #1a1a1a' }}
          whileTap={{ scale: 0.88, x: 3, y: 3, boxShadow: '0px 0px 0 #1a1a1a' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: social.color,
            border: '3px solid #1a1a1a',
            boxShadow: '4px 4px 0 #1a1a1a',
            padding: '0.6rem',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '52px',
            height: '52px',
          }}
        >
          <Icon style={{ width: '1.4rem', height: '1.4rem', color: social.textColor }} />
        </motion.div>
      </motion.div>
    </motion.a>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="grid-bg"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '6rem 1.5rem 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative sticker elements — hidden on mobile via className */}
      <motion.div
        className="hero-sticker-corner"
        animate={{ rotate: [6, 4, 8, 6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.05, rotate: -2, y: -2 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'absolute',
          top: '22%',
          right: '8%',
          background: '#FF6B9D',
          border: '3px solid #1a1a1a',
          boxShadow: '6px 6px 0 #1a1a1a',
          padding: '0.5rem 0.8rem 0.5rem 0.6rem',
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 800,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          borderRadius: '2px',
          zIndex: 2,
          userSelect: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#f5f0e8',
          border: '2px solid #1a1a1a',
          flexShrink: 0,
        }} />
        <span>Open to Work</span>
      </motion.div>

      <motion.div
        className="hero-sticker-corner"
        animate={{ rotate: [0, -4, 0, 4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '5%',
          background: '#4ECDC4',
          border: '3px solid #1a1a1a',
          boxShadow: '4px 4px 0 #1a1a1a',
          padding: '0.4rem 0.8rem',
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 600,
          fontSize: '0.8rem',
          borderRadius: '3px',
          transform: 'rotate(-5deg)',
          zIndex: 2,
          userSelect: 'none',
        }}
      >
        🚀 2026
      </motion.div>

      <motion.div
        className="hero-sticker-corner"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '25%',
          left: '7%',
          background: '#95E06C',
          border: '3px solid #1a1a1a',
          boxShadow: '4px 4px 0 #1a1a1a',
          padding: '0.4rem 0.8rem',
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 600,
          fontSize: '0.8rem',
          borderRadius: '3px',
          transform: 'rotate(4deg)',
          zIndex: 2,
          userSelect: 'none',
        }}
      >
        ⚡ ML Systems
      </motion.div>

      <motion.div
        className="hero-sticker-corner"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '28%',
          right: '7%',
          background: '#C77DFF',
          border: '3px solid #1a1a1a',
          boxShadow: '4px 4px 0 #1a1a1a',
          padding: '0.4rem 0.8rem',
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 600,
          fontSize: '0.8rem',
          borderRadius: '3px',
          transform: 'rotate(-4deg)',
          zIndex: 2,
          userSelect: 'none',
        }}
      >
        🧠 LLMs
      </motion.div>

      {/* ───── Main content ───── */}
      <div style={{ textAlign: 'center', maxWidth: '900px', width: '100%', position: 'relative', zIndex: 3 }}>

        {/* Hello label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <span
            className="pulse-dot"
            style={{ width: '10px', height: '10px', background: '#95E06C', border: '2px solid #1a1a1a', borderRadius: '50%', display: 'inline-block' }}
          />
          <span className="neo-section-label">Hello World 👋</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            lineHeight: 1,
            letterSpacing: '0.05em',
            marginBottom: '0.5rem',
          }}
        >
          Aman
          <br />
          <span style={{
            background: '#FFE135',
            border: '4px solid #1a1a1a',
            boxShadow: '6px 6px 0 #1a1a1a',
            padding: '0 0.3em',
            display: 'inline-block',
            transform: 'rotate(-1deg)',
          }}>
            Kumar Jha
          </span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ marginTop: '1.5rem', marginBottom: '2rem' }}
        >
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 'clamp(0.8rem, 3vw, 1.5rem)',
              fontWeight: 600,
              border: '3px solid #1a1a1a',
              padding: '0.4rem 1rem',
              background: '#fff',
              boxShadow: '4px 4px 0 #1a1a1a',
              display: 'inline-block',
              maxWidth: '100%',
            }}
          >
            &gt; <CustomTypewriter words={roles} />
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}
        >
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="neo-btn neo-btn-black"
            data-cursor="search"
            style={{ fontSize: '1rem', padding: '0.9rem 2rem' }}
          >
            🚀 View Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="neo-btn neo-btn-yellow"
            data-cursor="edit"
            style={{ fontSize: '1rem', padding: '0.9rem 2rem' }}
          >
            📬 Let&apos;s Talk
          </a>
        </motion.div>

        {/* Mobile social icons — horizontal row below CTA */}
        <motion.div
          className="hero-socials-mobile"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          style={{
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          {socials.map((s, i) => (
            <SocialIconMobile key={s.id} social={s} delay={0.85 + i * 0.08} />
          ))}
        </motion.div>
      </div>

      {/* Desktop social icons — absolute scattered positions */}
      <div className="hero-socials-desktop">
        {socials.map((s, i) => (
          <SocialIconDesktop key={s.id} social={s} delay={0.85 + i * 0.1} />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
        }}
      >
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em' }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: '28px',
            height: '44px',
            border: '3px solid #1a1a1a',
            borderRadius: '14px',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '6px',
            boxShadow: '3px 3px 0 #1a1a1a',
          }}
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: '6px', height: '6px', background: '#1a1a1a', borderRadius: '50%' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
