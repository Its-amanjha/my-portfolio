'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { blogPosts } from '@/data/blog';

export default function Blog() {
  // Show all posts in the list on the homepage
  const displayedPosts = blogPosts.slice(0, 3);

  return (
    <section
      id="blogs"
      style={{
        padding: '5rem 1.5rem',
        background: '#f5f0e8',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Marquee divider top */}
      <div className="marquee-wrapper" style={{ marginBottom: '4rem' }}>
        <div className="marquee-track">
          {Array(10)
            .fill('MY BLOG ★ STORIES ★ SYSTEM SPECIFICATIONS ★ ')
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
          <span className="neo-section-label">[ 05 — BLOGS ]</span>
          <h2 className="neo-section-title" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
            Writings
          </h2>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem', color: '#666', marginTop: '0.5rem', margin: 0 }}>
            Deep dives into AI engineering, autonomous loops, and software architectures.
          </p>
        </div>

        {/* Bento/Grid of Posts */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {displayedPosts.map((post) => (
            <motion.article
              key={post.slug}
              whileHover={{ y: -4, x: -2 }}
              style={{
                background: '#ffffff',
                border: '3px solid #1a1a1a',
                boxShadow: '5px 5px 0px #1a1a1a',
                borderRadius: '4px',
                padding: '1.5rem',
                borderLeft: `6px solid ${post.color}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '260px',
                transition: 'box-shadow 0.15s ease',
              }}
            >
              <div>
                {/* Meta details */}
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: '#777', fontWeight: 700 }}>
                    {post.date}
                  </span>
                  <span style={{ color: '#ccc', fontSize: '0.65rem' }}>✦</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: '#777', fontWeight: 700 }}>
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <Link href={`/blogs/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '1.3rem',
                      fontWeight: 800,
                      margin: '0 0 0.75rem 0',
                      lineHeight: 1.25,
                      cursor: 'pointer',
                    }}
                  >
                    {post.title}
                  </h3>
                </Link>

                {/* Excerpt */}
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#444', margin: 0, marginBottom: '1.25rem' }}>
                  {post.excerpt}
                </p>
              </div>

              {/* Bottom Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                {/* Tags */}
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        border: '1.5px solid #1a1a1a',
                        padding: '0.1rem 0.4rem',
                        borderRadius: '2px',
                        background: '#faf7f0',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read Button */}
                <Link href={`/blogs/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <motion.div
                    whileHover={{ x: 3 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#1a1a1a',
                      cursor: 'pointer',
                    }}
                  >
                    <span>Read</span>
                    <svg width="10" height="10" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" />
                    </svg>
                  </motion.div>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
