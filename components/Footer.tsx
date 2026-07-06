'use client';

export default function Footer() {
  const year = new Date().getFullYear();

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
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
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

        <div className="footer-links" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {[
            { label: 'GitHub', href: 'https://github.com/Its-amanjha' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/its-amanjha' },
            { label: 'Email', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=amanjhaa.work@gmail.com' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#aaa',
                textDecoration: 'none',
                borderBottom: '1.5px solid transparent',
                transition: 'color 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#FFE135';
                (e.currentTarget as HTMLElement).style.borderBottomColor = '#FFE135';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#aaa';
                (e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent';
              }}
            >
              {label}
            </a>
          ))}
        </div>

        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem', color: '#666' }}>
          Built with Next.js + Neobrutalism ✦
        </div>
      </div>
    </footer>
  );
}
