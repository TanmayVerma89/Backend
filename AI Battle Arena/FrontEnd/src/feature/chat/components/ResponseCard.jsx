import React from 'react';
import { MD } from '../lib/constants';

/* Score ring SVG */
function ScoreRing({ score, color }) {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const fill = (score / 10) * circ;
  return (
    <div className="score-circle" style={{
      background: `${color}18`,
      border: `2px solid ${color}40`,
      color,
      position: 'relative',
    }}>
      <svg
        width="56" height="56"
        style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}
      >
        <circle cx="28" cy="28" r={r} fill="none" stroke={`${color}20`} strokeWidth="3" />
        <circle
          cx="28" cy="28" r={r} fill="none"
          stroke={color} strokeWidth="3"
          strokeDasharray={`${fill} ${circ}`}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px ${color})`, transition: 'stroke-dasharray 0.8s ease' }}
        />
      </svg>
      <span style={{ position: 'relative', zIndex: 1, fontSize: 15, fontWeight: 700 }}>{score}</span>
    </div>
  );
}

export default function ResponseCard({ label, accent, score, content, isWinner }) {
  const scoreLabel = score >= 8 ? 'Excellent' : score >= 6 ? 'Good' : score >= 4 ? 'Fair' : 'Poor';
  const pillClass = score >= 7
    ? 'pill pill-green'
    : score >= 5
    ? 'pill pill-amber'
    : 'pill pill-red';

  return (
    <div
      className="card animate-fade-up"
      style={{
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        border: `1px solid ${accent}30`,
        boxShadow: `0 0 32px -4px ${accent}18`,
        transition: 'box-shadow 0.3s',
      }}
    >
      {/* Card header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: `${accent}08`,
          borderRadius: '12px 12px 0 0',
          flexShrink: 0,
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          {/* Accent dot */}
          <div
            className="dot"
            style={{
              background: accent,
              boxShadow: `0 0 6px ${accent}`,
              flexShrink: 0,
            }}
          />
          <div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: 14,
                color: 'var(--text-hi)',
                lineHeight: 1.2,
              }}
            >
              {label}
            </div>
          </div>
        </div>

        {/* Score badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {isWinner && (
            <span className="pill pill-amber" style={{ gap: 4 }}>
              🏆 Winner
            </span>
          )}
          <span className={pillClass}>
            {score}/10 · {scoreLabel}
          </span>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '28px 28px',
          minHeight: 0,
        }}
      >
        <MD>{content}</MD>
      </div>
    </div>
  );
}
