import React, { useState } from 'react';
import { MD } from '../lib/constants';

export default function JudgePanel({ judgement }) {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'sol1' | 'sol2'

  const score1 = judgement?.solution1_score ?? 0;
  const score2 = judgement?.solution2_score ?? 0;
  const feedback1 = judgement?.solution1_feedback || '';
  const feedback2 = judgement?.solution2_feedback || '';

  const isWinner1 = score1 > score2;
  const isWinner2 = score2 > score1;
  const isTie = score1 === score2;

  const winnerText = isWinner1
    ? 'Solution 1 Won'
    : isWinner2
    ? 'Solution 2 Won'
    : 'Tie Match';

  return (
    <div
      className="card animate-fade-up"
      style={{
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'var(--color-surface)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 28px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.015)',
          borderRadius: '12px 12px 0 0',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, rgba(255,176,32,0.2), rgba(255,75,75,0.2))',
              border: '1px solid rgba(255,176,32,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
            }}
          >
            ⚖️
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 15,
                color: 'var(--text-hi)',
              }}
            >
              AI Judge Verdict
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--text-lo)',
                marginTop: 2,
              }}
            >
              Independent automated evaluation & feedback
            </div>
          </div>
        </div>

        {/* Winner Badge & Navigation Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="pill pill-amber" style={{ fontSize: 12, padding: '4px 12px', gap: 6 }}>
            🏆 {winnerText}
          </span>

          <div
            style={{
              display: 'flex',
              background: 'rgba(0,0,0,0.3)',
              padding: 3,
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <button
              onClick={() => setActiveTab('summary')}
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                fontFamily: 'var(--font-sans)',
                fontSize: 12,
                fontWeight: 600,
                background: activeTab === 'summary' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'summary' ? '#000' : 'var(--text-med)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              All Analysis
            </button>
            <button
              onClick={() => setActiveTab('sol1')}
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                fontFamily: 'var(--font-sans)',
                fontSize: 12,
                fontWeight: 600,
                background: activeTab === 'sol1' ? 'var(--color-cyan)' : 'transparent',
                color: activeTab === 'sol1' ? '#000' : 'var(--text-med)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Solution 1 ({score1}/10)
            </button>
            <button
              onClick={() => setActiveTab('sol2')}
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                fontFamily: 'var(--font-sans)',
                fontSize: 12,
                fontWeight: 600,
                background: activeTab === 'sol2' ? 'var(--color-violet)' : 'transparent',
                color: activeTab === 'sol2' ? '#fff' : 'var(--text-med)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Solution 2 ({score2}/10)
            </button>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div style={{ padding: '24px 28px' }}>
        {activeTab === 'summary' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Solution 1 Review */}
            <div
              style={{
                background: 'rgba(0,240,255,0.02)',
                border: `1px solid ${isWinner1 ? 'var(--color-cyan)' : 'rgba(0,240,255,0.15)'}`,
                borderRadius: 12,
                padding: 20,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 14,
                  paddingBottom: 10,
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: 14,
                      color: 'var(--color-cyan)',
                    }}
                  >
                    Solution 1 Review
                  </span>
                  {isWinner1 && <span className="pill pill-amber">Winner</span>}
                </div>
                <span className="pill pill-green">{score1}/10</span>
              </div>
              <MD>{feedback1}</MD>
            </div>

            {/* Solution 2 Review */}
            <div
              style={{
                background: 'rgba(176,38,255,0.02)',
                border: `1px solid ${isWinner2 ? 'var(--color-violet)' : 'rgba(176,38,255,0.15)'}`,
                borderRadius: 12,
                padding: 20,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 14,
                  paddingBottom: 10,
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: 14,
                      color: 'var(--color-violet)',
                    }}
                  >
                    Solution 2 Review
                  </span>
                  {isWinner2 && <span className="pill pill-amber">Winner</span>}
                </div>
                <span className="pill pill-amber">{score2}/10</span>
              </div>
              <MD>{feedback2}</MD>
            </div>
          </div>
        )}

        {activeTab === 'sol1' && (
          <div
            style={{
              background: 'rgba(0,240,255,0.02)',
              border: '1px solid rgba(0,240,255,0.2)',
              borderRadius: 12,
              padding: 24,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span className="pill pill-cyan">Solution 1</span>
              <span className="pill pill-green">Score: {score1} / 10</span>
              {isWinner1 && <span className="pill pill-amber">🏆 Winner</span>}
            </div>
            <MD>{feedback1}</MD>
          </div>
        )}

        {activeTab === 'sol2' && (
          <div
            style={{
              background: 'rgba(176,38,255,0.02)',
              border: '1px solid rgba(176,38,255,0.2)',
              borderRadius: 12,
              padding: 24,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span className="pill pill-violet">Solution 2</span>
              <span className="pill pill-amber">Score: {score2} / 10</span>
              {isWinner2 && <span className="pill pill-amber">🏆 Winner</span>}
            </div>
            <MD>{feedback2}</MD>
          </div>
        )}
      </div>
    </div>
  );
}
