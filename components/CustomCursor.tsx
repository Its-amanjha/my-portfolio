'use client';

import React, { useState, useEffect } from 'react';
import { useMouse } from '@/hooks/use-mouse';
import { FaEdit, FaSearch, FaPlay, FaArrowRight } from 'react-icons/fa';

const ICONS: Record<string, React.ReactNode> = {
  edit: <FaEdit size={13} color="#1a1a1a" />,
  search: <FaSearch size={13} color="#1a1a1a" />,
  play: <FaPlay size={13} color="#1a1a1a" />,
  link: <FaArrowRight size={13} color="#1a1a1a" />,
};

export default function CustomCursor() {
  const [mouseState] = useMouse();
  const [cursorContent, setCursorContent] = useState<string | null>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Check if the user has a fine pointer (desktop mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointer(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointer(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorEl = target.closest('[data-cursor], [data-cursor-text]');
      
      if (cursorEl) {
        setIsHovering(true);
        const cursorData = cursorEl.getAttribute('data-cursor');
        const cursorText = cursorEl.getAttribute('data-cursor-text');
        setCursorContent(cursorData || cursorText || null);
      } else {
        setIsHovering(false);
        setCursorContent(null);
      }

      setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, []);

  if (!isPointer || !isVisible || mouseState.x === null || mouseState.y === null) {
    return null;
  }

  const iconElement = cursorContent ? ICONS[cursorContent] : null;
  const isIcon = !!iconElement;

  return (
    <div
      className="pointer-events-none z-[9999]"
      style={{
        position: 'fixed',
        left: mouseState.x,
        top: mouseState.y,
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.08s ease-out',
      }}
    >
      {/* Target Dot Pointer */}
      <div 
        style={{
          width: isHovering ? '22px' : '16px',
          height: isHovering ? '22px' : '16px',
          background: isHovering ? 'transparent' : '#4ECDC4',
          border: '2.5px solid #1a1a1a',
          borderRadius: '50%',
          boxShadow: isHovering ? 'none' : '2px 2px 0 rgba(0,0,0,0.15)',
          transition: 'all 0.15s ease',
        }} 
      />

      {/* Floating Neobrutalist Tooltip Badge */}
      {cursorContent && (
        <div
          style={{
            position: 'absolute',
            left: '24px',
            top: '0px',
            transform: 'translateY(-50%)',
            background: '#4ECDC4',
            color: '#1a1a1a',
            border: '2.5px solid #1a1a1a',
            boxShadow: '3px 3px 0 #1a1a1a',
            padding: isIcon ? '0.35rem' : '0.25rem 0.65rem',
            borderRadius: isIcon ? '50%' : '3px',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.72rem',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            letterSpacing: '0.02em',
            animation: 'cursorFadeIn 0.15s ease-out forwards',
          }}
        >
          {iconElement ? iconElement : cursorContent}
        </div>
      )}

      <style jsx global>{`
        /* Hide native cursor when hovering over elements with custom cursors */
        [data-cursor], [data-cursor-text] {
          cursor: none !important;
        }
        
        @keyframes cursorFadeIn {
          from {
            opacity: 0;
            transform: translateY(-50%) scale(0.8) translateX(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) scale(1) translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
