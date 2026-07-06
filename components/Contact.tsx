'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getComments, addComment, type Comment } from '@/app/actions/comments';

// ── Accent colours cycling per bubble ─────────────────────────────────────────
const BUBBLE_COLORS = ['#FFE135', '#4ECDC4', '#FF6B9D', '#C77DFF', '#95E06C', '#FF8C42'];

// Avatar initials background colours
const AVATAR_BG = ['#FF6B9D', '#4ECDC4', '#C77DFF', '#FFE135', '#95E06C', '#FF8C42'];

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

// ── Single bubble ──────────────────────────────────────────────────────────────
function CommentBubble({ comment, index }: { comment: Comment; index: number }) {
  const isRight = index % 2 !== 0;
  const accent   = BUBBLE_COLORS[index % BUBBLE_COLORS.length];
  const avatarBg = AVATAR_BG[index % AVATAR_BG.length];

  const date = new Date(comment.created_at).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 240, damping: 20 }}
      className="comment-bubble-row"
      style={{
        display: 'flex',
        flexDirection: isRight ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        gap: '0.55rem',
        paddingLeft: isRight ? '14%' : 0,
        paddingRight: isRight ? 0 : '14%',
      }}
    >
      {/* Avatar circle */}
      <div
        style={{
          flexShrink: 0,
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          background: avatarBg,
          border: '2.5px solid #1a1a1a',
          boxShadow: '2px 2px 0 #1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 700,
          fontSize: '0.65rem',
          color: '#1a1a1a',
          letterSpacing: '0.02em',
          userSelect: 'none',
        }}
      >
        {getInitials(comment.name)}
      </div>

      {/* Bubble wrapper — tail + bubble */}
      <div style={{ position: 'relative', maxWidth: '100%' }}>

        {/* ── Tail (outer border colour) ── */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            ...(isRight
              ? { right: '-9px', borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '9px solid #1a1a1a' }
              : { left: '-9px', borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderRight: '9px solid #1a1a1a' }),
            width: 0,
            height: 0,
          }}
        />
        {/* ── Tail (inner bubble colour) ── */}
        <div
          style={{
            position: 'absolute',
            bottom: '11px',
            ...(isRight
              ? { right: '-6px', borderTop: '7px solid transparent', borderBottom: '7px solid transparent', borderLeft: `7px solid ${accent}` }
              : { left: '-6px', borderTop: '7px solid transparent', borderBottom: '7px solid transparent', borderRight: `7px solid ${accent}` }),
            width: 0,
            height: 0,
            zIndex: 1,
          }}
        />

        {/* ── Bubble body ── */}
        <motion.div
          whileHover={{ y: -2 }}
          style={{
            background: accent,
            border: '2.5px solid #1a1a1a',
            boxShadow: isRight ? '-4px 4px 0 #1a1a1a' : '4px 4px 0 #1a1a1a',
            borderRadius: isRight
              ? '18px 18px 4px 18px'
              : '18px 18px 18px 4px',
            padding: '0.7rem 1rem',
            cursor: 'default',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Name */}
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.07em',
              color: '#1a1a1a',
              opacity: 0.65,
              marginBottom: '0.25rem',
            }}
          >
            {comment.name}
          </div>

          {/* Message */}
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.84rem',
              lineHeight: 1.6,
              color: '#1a1a1a',
              margin: 0,
              wordBreak: 'break-word',
            }}
          >
            {comment.message}
          </p>

          {/* Timestamp */}
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.58rem',
              color: '#1a1a1a',
              opacity: 0.45,
              marginTop: '0.35rem',
              textAlign: isRight ? 'right' : 'left',
            }}
          >
            {date}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}


// ── Main Component ────────────────────────────────────────────────────────────
export default function Contact() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'note' | 'inbox'>('note');
  const bottomRef = useRef<HTMLDivElement>(null);

  // ── Fetch comments + polling ──────────────────────────────────────────────
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments();
        setComments(data);
      } catch {
        // silently fail — guestbook shows empty
      } finally {
        setLoading(false);
      }
    };

    fetchComments();

    // Poll every 10 seconds for new comments
    const interval = setInterval(fetchComments, 10000);
    return () => clearInterval(interval);
  }, []);

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;

    setSubmitting(true);
    setError(null);

    const result = await addComment(form.name.trim(), form.message.trim());

    setSubmitting(false);

    if (!result.success) {
      setError(result.error || 'Failed to post comment. Try again!');
    } else {
      setSent(true);
      setForm({ name: '', message: '' });
      // Immediately fetch new comments
      const data = await getComments();
      setComments(data);
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      setTimeout(() => setSent(false), 3000);
    }
  };


  return (
    <section
      id="contact"
      style={{ padding: '5rem 1.5rem', background: '#f5f0e8', position: 'relative', overflow: 'hidden' }}
    >
      {/* Marquee */}
      <div className="marquee-wrapper" style={{ marginBottom: '4rem' }}>
        <div className="marquee-track">
          {Array(10)
            .fill('GUESTBOOK ✦ LEAVE A NOTE ✦ SAY HI ✦ DROP A COMMENT ✦ ')
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
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <span className="neo-section-label">[ 06 — GUESTBOOK ]</span>
          <h2 className="neo-section-title" style={{ marginTop: '0.5rem' }}>
            Let&apos;s Talk
          </h2>
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.85rem',
              color: '#666',
              marginTop: '0.5rem',
            }}
          >
            Leave a note, say hi, or drop a thought — I read every single one! 👋
          </p>
        </div>

        <div
          className="contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            alignItems: 'start',
          }}
        >
          {/* ── Left: Chat Bubbles ──────────────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {/* Header bar */}
            <div
              className="neo-card"
              style={{
                padding: '0.7rem 1rem',
                background: '#1a1a1a',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                borderBottom: 'none',
                borderRadius: '4px 4px 0 0',
              }}
            >
              <span style={{ fontSize: '1rem' }}>💬</span>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                }}
              >
                GUESTBOOK — {loading ? '...' : comments.length} NOTES
              </span>
              {/* Live dot */}
              <span
                className="pulse-dot"
                style={{
                  width: '8px',
                  height: '8px',
                  background: '#95E06C',
                  border: '2px solid #fff',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginLeft: 'auto',
                }}
              />
            </div>

            {/* Bubble area */}
            <div
              style={{
                border: '3px solid #1a1a1a',
                borderTop: 'none',
                borderRadius: '0 0 4px 4px',
                background: '#faf7f0',
                padding: '1.25rem 1rem',
                minHeight: '380px',
                maxHeight: '480px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem',
                boxShadow: '5px 5px 0 #1a1a1a',
              }}
            >
              {loading ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    gap: '0.5rem',
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.8rem',
                    color: '#999',
                  }}
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    style={{ display: 'inline-block' }}
                  >
                    ⏳
                  </motion.span>
                  Loading notes…
                </div>
              ) : comments.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    opacity: 0.6,
                  }}
                >
                  <span style={{ fontSize: '2.5rem' }}>🫙</span>
                  <p
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '0.8rem',
                      color: '#777',
                    }}
                  >
                    No notes yet. Be the first! 👇
                  </p>
                </div>
              ) : (
                <AnimatePresence>
                  {comments.map((c, i) => (
                    <CommentBubble key={c.id} comment={c} index={i} />
                  ))}
                </AnimatePresence>
              )}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* ── Right: Tabbed Panel ──────────────────────────────────────── */}
          <div className="neo-card" style={{ padding: '0', overflow: 'hidden' }}>

            {/* Tab switcher */}
            <div style={{ display: 'flex', borderBottom: '3px solid #1a1a1a' }}>
              {(['note', 'inbox'] as const).map((tab) => {
                const isActive = activeTab === tab;
                const label    = tab === 'note' ? '✍️  Leave a Note' : '📬  Direct Inbox';
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      flex: 1,
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.07em',
                      padding: '0.85rem 0.5rem',
                      background: isActive ? '#FFE135' : '#f5f0e8',
                      color: '#1a1a1a',
                      border: 'none',
                      borderRight: tab === 'note' ? '3px solid #1a1a1a' : 'none',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                      outline: 'none',
                    }}
                  >
                    {label}
                    {isActive && (
                      <motion.div
                        layoutId="tab-indicator"
                        style={{
                          height: '3px',
                          background: '#1a1a1a',
                          marginTop: '0.4rem',
                          borderRadius: '2px',
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab content */}
            <div style={{ padding: '1.75rem' }}>
              <AnimatePresence mode="wait">

                {/* ── Tab 1: Guestbook note ── */}
                {activeTab === 'note' && (
                  <motion.div
                    key="note-tab"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AnimatePresence mode="wait">
                      {sent ? (
                        <motion.div
                          key="success"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          style={{ textAlign: 'center', padding: '3rem 1rem' }}
                        >
                          <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>🎉</div>
                          <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.4rem' }}>
                            Note Posted!
                          </h3>
                          <p style={{ color: '#555', fontSize: '0.9rem' }}>
                            Your bubble is live in the guestbook! 🫧
                          </p>
                        </motion.div>
                      ) : (
                        <motion.form
                          key="form"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onSubmit={handleSubmit}
                          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                        >
                          <div>
                            <label
                              htmlFor="comment-name"
                              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem', letterSpacing: '0.06em' }}
                            >
                              YOUR NAME *
                            </label>
                            <input
                              id="comment-name"
                              required
                              className="neo-input"
                              placeholder="e.g. Alex Rivera"
                              value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="comment-message"
                              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem', letterSpacing: '0.06em' }}
                            >
                              YOUR NOTE *
                            </label>
                            <textarea
                              id="comment-message"
                              required
                              className="neo-input"
                              placeholder="Say something nice... or roast me 😄"
                              rows={4}
                              value={form.message}
                              onChange={(e) => setForm({ ...form, message: e.target.value })}
                              style={{ resize: 'vertical' }}
                            />
                          </div>

                          {error && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', color: '#E1306C', background: '#fff0f5', border: '2px solid #E1306C', padding: '0.5rem 0.75rem', borderRadius: '3px', boxShadow: '2px 2px 0 #E1306C' }}
                            >
                              ⚠️ {error}
                            </motion.p>
                          )}

                          <motion.button
                            type="submit"
                            disabled={submitting}
                            whileTap={submitting ? {} : { x: 3, y: 3 }}
                            className="neo-btn neo-btn-black"
                            style={{ fontSize: '1rem', padding: '0.9rem', justifyContent: 'center', width: '100%', transition: 'none', opacity: submitting ? 0.6 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
                          >
                            {submitting ? '⏳ Posting...' : '🫧 Post Note'}
                          </motion.button>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* ── Tab 2: Direct Inbox via Gmail ── */}
                {activeTab === 'inbox' && (
                  <motion.div
                    key="inbox-tab"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                  >
                    {/* Info card */}
                    <div
                      style={{
                        background: '#fff',
                        border: '2.5px solid #1a1a1a',
                        boxShadow: '4px 4px 0 #1a1a1a',
                        borderRadius: '4px',
                        padding: '1rem 1.1rem',
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'flex-start',
                      }}
                    >
                      <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>📬</span>
                      <div>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                          Direct to My Inbox
                        </div>
                        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: '#555', lineHeight: 1.6, margin: 0 }}>
                          For serious inquiries, collaborations, or job offers — reach me directly on Gmail. I usually reply within 24 hours! ⚡
                        </p>
                      </div>
                    </div>

                    {/* Inbox form (composes Gmail URL) */}
                    <InboxForm />
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Inline Gmail Compose Form ─────────────────────────────────────────────────
function InboxForm() {
  const [inbox, setInbox] = useState({ subject: '', body: '' });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const to      = 'amanjhaa.work@gmail.com';
    const subject = encodeURIComponent(inbox.subject || 'Hi Aman!');
    const body    = encodeURIComponent(inbox.body);
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`,
      '_blank'
    );
  };

  return (
    <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label
          htmlFor="inbox-subject"
          style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem', letterSpacing: '0.06em' }}
        >
          SUBJECT
        </label>
        <input
          id="inbox-subject"
          className="neo-input"
          placeholder="e.g. Collaboration Opportunity"
          value={inbox.subject}
          onChange={(e) => setInbox({ ...inbox, subject: e.target.value })}
        />
      </div>

      <div>
        <label
          htmlFor="inbox-body"
          style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem', letterSpacing: '0.06em' }}
        >
          MESSAGE
        </label>
        <textarea
          id="inbox-body"
          required
          className="neo-input"
          placeholder="Hey Aman, I'd love to discuss..."
          rows={4}
          value={inbox.body}
          onChange={(e) => setInbox({ ...inbox, body: e.target.value })}
          style={{ resize: 'vertical' }}
        />
      </div>

      {/* Gmail badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', background: '#fff', border: '2px solid #1a1a1a', borderRadius: '3px', boxShadow: '2px 2px 0 #1a1a1a' }}>
        <span style={{ fontSize: '1rem' }}>📧</span>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: '#555' }}>
          Will open Gmail compose → <a href="mailto:amanjhaa.work@gmail.com" style={{ textDecoration: 'underline', color: 'inherit', fontWeight: 'bold' }}>amanjhaa.work@gmail.com</a>
        </span>
      </div>

      <motion.button
        type="submit"
        whileTap={{ x: 3, y: 3 }}
        className="neo-btn"
        style={{
          fontSize: '1rem',
          padding: '0.9rem',
          justifyContent: 'center',
          width: '100%',
          transition: 'none',
          background: '#FF6B9D',
          border: '3px solid #1a1a1a',
          boxShadow: '4px 4px 0 #1a1a1a',
          color: '#fff',
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        📬 Open Gmail &amp; Send
      </motion.button>
    </form>
  );
}
