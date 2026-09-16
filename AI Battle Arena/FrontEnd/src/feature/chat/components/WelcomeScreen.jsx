import React from 'react';

export default function WelcomeScreen({ onSelectExample }) {
  const examples = [
    'Explain MCP servers and how to start using and build own MCP server',
    'Explain the difference between TCP and UDP with examples',
    'How does a database index work internally?',
    'Compare REST vs GraphQL for a high-traffic API',
  ];

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 48px',
        gap: 40,
        maxWidth: 720,
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Hero icon */}
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(168,85,247,0.15))',
            border: '1px solid rgba(124,58,237,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            boxShadow: '0 0 32px rgba(124,58,237,0.25)',
          }}
        >
          ⚔️
        </div>
        <div>
          <h1
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 32,
              fontWeight: 700,
              color: 'var(--text-hi)',
              letterSpacing: '-0.02em',
              marginBottom: 10,
            }}
          >
            AI Battle Arena
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              color: 'var(--text-body)',
              lineHeight: 1.7,
              maxWidth: 480,
              margin: '0 auto',
            }}
          >
            Submit your challenge or prompt. Two AI models will generate competing solutions,
            and an independent AI judge will analyze and declare the winner.
          </p>
        </div>
      </div>

      {/* Example prompts */}
      <div style={{ width: '100%' }}>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--text-muted)',
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          Click an example prompt to start
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {examples.map((ex, i) => (
            <div
              key={i}
              onClick={() => onSelectExample && onSelectExample(ex)}
              style={{
                padding: '14px 20px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(124,58,237,0.08)';
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <span style={{ color: 'var(--color-primary)', fontSize: 16, opacity: 0.8, flexShrink: 0 }}>›</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-hi)', fontWeight: 500 }}>{ex}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
