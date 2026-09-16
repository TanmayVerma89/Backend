import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SolutionPanel = ({ modelName, modelLabel, solution, accentColor, delay = 0 }) => {
  const scrollRef = useRef(null);

  const isCyan = accentColor === 'cyan';
  const accent = isCyan ? '#00f0ff' : '#b026ff';
  const accentDim = isCyan ? 'rgba(0,240,255,0.08)' : 'rgba(176,38,255,0.08)';
  const accentBorder = isCyan ? 'rgba(0,240,255,0.35)' : 'rgba(176,38,255,0.35)';
  const accentGlow = isCyan
    ? '0 0 20px rgba(0,240,255,0.12), 0 8px 32px rgba(0,0,0,0.5)'
    : '0 0 20px rgba(176,38,255,0.12), 0 8px 32px rgba(0,0,0,0.5)';

  return (
    <div
      className="flex flex-col flex-1 min-w-0 animate-slide-up"
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0,
        animationFillMode: 'forwards',
      }}
    >
      {/* Panel container */}
      <div
        className="flex flex-col h-full rounded-xl overflow-hidden"
        style={{
          background: 'rgba(14, 14, 22, 0.7)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${accentBorder}`,
          boxShadow: accentGlow,
          borderTop: `2px solid ${accent}`,
        }}
      >
        {/* Panel header */}
        <div
          className="flex items-center justify-between px-4 py-3 flex-shrink-0"
          style={{
            background: accentDim,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex items-center gap-2.5">
            {/* Model icon */}
            <div
              className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${accent}22, ${accent}11)`,
                border: `1px solid ${accent}44`,
                color: accent,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '9px',
                letterSpacing: '0.02em',
              }}
            >
              {isCyan ? 'M1' : 'M2'}
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--color-on-surface)',
                  lineHeight: 1,
                }}
              >
                {modelName}
              </div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '9px',
                  color: accent,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginTop: '2px',
                }}
              >
                {modelLabel}
              </div>
            </div>
          </div>

          {/* Status chip */}
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded"
            style={{
              background: `${accent}11`,
              border: `1px solid ${accent}33`,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '9px',
              color: accent,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <span
              className="status-dot animate-dot-pulse"
              style={{ background: accent, boxShadow: `0 0 5px ${accent}` }}
            />
            RESPONSE
          </div>
        </div>

        {/* Solution content — scrollable */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4"
          style={{ minHeight: 0 }}
        >
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {solution}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionPanel;
