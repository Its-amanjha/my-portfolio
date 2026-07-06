import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog';

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: BlogPostProps) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Parse custom mock markdown format into JSX components
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return null;

      // Header h3
      if (trimmed.startsWith('###')) {
        const headerText = trimmed.replace('###', '').trim();
        const subHeaderMatch = headerText.split('\n');
        return (
          <div key={index}>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', fontWeight: 800, marginTop: '2rem', marginBottom: '1rem', color: '#1a1a1a' }}>
              {subHeaderMatch[0]}
            </h3>
            {subHeaderMatch.length > 1 && subHeaderMatch.slice(1).map((subLine, idx) => (
              <p key={idx} style={{ fontSize: '1.02rem', lineHeight: '1.8', color: '#333', marginBottom: '1.25rem', textAlign: 'justify' }}>
                {subLine.trim()}
              </p>
            ))}
          </div>
        );
      }

      // Unordered list
      if (trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').map((item) => item.replace('- ', '').trim());
        return (
          <ul key={index} style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {items.map((item, idx) => {
              const boldParts = item.split('**');
              if (boldParts.length >= 3) {
                return (
                  <li key={idx} style={{ fontSize: '1.02rem', lineHeight: '1.7', color: '#333' }}>
                    <strong>{boldParts[1]}</strong>
                    {boldParts.slice(2).join('')}
                  </li>
                );
              }
              return (
                <li key={idx} style={{ fontSize: '1.02rem', lineHeight: '1.7', color: '#333' }}>
                  {item}
                </li>
              );
            })}
          </ul>
        );
      }

      // Inline code blocks
      if (trimmed.startsWith('```')) {
        const codeLines = trimmed.split('\n');
        const codeText = codeLines.slice(1, -1).join('\n');
        const lang = codeLines[0].replace('```', '').trim();
        return (
          <pre
            key={index}
            style={{
              background: '#1a1a1a',
              color: '#f8f8f2',
              padding: '1.25rem',
              borderRadius: '4px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.85rem',
              overflowX: 'auto',
              border: '2.5px solid #1a1a1a',
              boxShadow: '4px 4px 0 #1a1a1a',
              margin: '1.5rem 0',
            }}
          >
            <code className={lang}>{codeText}</code>
          </pre>
        );
      }

      return (
        <p key={index} style={{ fontSize: '1.02rem', lineHeight: '1.8', color: '#333', marginBottom: '1.25rem', textAlign: 'justify' }}>
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f0e8', color: '#1a1a1a', padding: '3rem 1.5rem 6rem 1.5rem' }}>
      
      {/* Container */}
      <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
        
        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <Link href="/#blogs" style={{ textDecoration: 'none' }}>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '0.9rem',
                border: '2.5px solid #1a1a1a',
                padding: '0.4rem 1.2rem',
                background: 'transparent',
                color: '#1a1a1a',
                boxShadow: '3px 3px 0 #1a1a1a',
                borderRadius: '3px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
                <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" />
              </svg>
              <span>Back to blogs</span>
            </div>
          </Link>
        </div>

        {/* Article header */}
        <header style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: '#666', fontWeight: 700 }}>
              {post.date}
            </span>
            <span style={{ color: '#aaa', fontSize: '0.75rem' }}>✦</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: '#666', fontWeight: 700 }}>
              {post.readTime}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '2.8rem',
              fontWeight: 800,
              lineHeight: 1.15,
              margin: '0 0 1.5rem 0',
              letterSpacing: '-0.02em',
              color: '#1a1a1a',
            }}
          >
            {post.title}
          </h1>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  border: '2.5px solid #1a1a1a',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '3px',
                  background: post.color,
                  boxShadow: '2px 2px 0 #1a1a1a',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Separator */}
        <div style={{ borderBottom: '3px solid #1a1a1a', marginBottom: '3rem' }}></div>

        {/* Post content body */}
        <article className="blog-post-content" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {renderContent(post.content)}
        </article>

      </div>
    </div>
  );
}
