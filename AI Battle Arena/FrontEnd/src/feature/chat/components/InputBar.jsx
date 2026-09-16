import React, { useRef, useEffect, useState } from 'react';

export default function InputBar({ onSubmit, isLoading }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
  }, [text]);

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    onSubmit(trimmed);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      style={{
        padding: '16px 32px 24px 32px',
        background: 'transparent',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'flex-end',
          gap: 16,
          background: 'var(--color-surface)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 14,
          padding: '12px 18px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
          transition: 'border-color 0.2s',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 16,
            color: 'var(--color-primary)',
            lineHeight: 1.5,
            paddingBottom: 2,
            userSelect: 'none',
          }}
        >
          ❯
        </span>

        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question or challenge here… (Press Ctrl + Enter to submit)"
          disabled={isLoading}
          rows={1}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'none',
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            color: 'var(--text-hi)',
            minHeight: 28,
            maxHeight: 120,
            lineHeight: 1.5,
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: text.length > 800 ? 'var(--amber)' : 'var(--text-muted)',
            }}
          >
            {text.length} chars
          </span>

          <button
            onClick={handleSubmit}
            disabled={!text.trim() || isLoading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              borderRadius: 10,
              background: !text.trim() || isLoading ? 'rgba(255,255,255,0.05)' : 'var(--color-primary)',
              color: !text.trim() || isLoading ? 'var(--text-muted)' : '#000',
              fontWeight: 700,
              fontSize: 14,
              fontFamily: 'var(--font-sans)',
              border: 'none',
              cursor: !text.trim() || isLoading ? 'not-allowed' : 'pointer',
              boxShadow: text.trim() && !isLoading ? '0 0 20px rgba(124,58,237,0.4)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                </svg>
                Evaluating…
              </>
            ) : (
              <>
                ⚔️ Start Battle
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
