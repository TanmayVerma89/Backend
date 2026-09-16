import React from 'react';

const LoadingState = () => {
  return (
    <div className="flex-1 flex flex-col gap-4 p-4 min-h-0">
      {/* Two shimmer panels side by side */}
      <div className="flex gap-3 flex-1 min-h-0">
        {[0, 1].map(i => (
          <div
            key={i}
            className="flex-1 rounded-xl overflow-hidden"
            style={{
              background: 'rgba(14,14,22,0.7)',
              border: `1px solid ${i === 0 ? 'rgba(0,240,255,0.2)' : 'rgba(176,38,255,0.2)'}`,
              borderTop: `2px solid ${i === 0 ? 'rgba(0,240,255,0.4)' : 'rgba(176,38,255,0.4)'}`,
            }}
          >
            {/* Fake header */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{
                background: i === 0 ? 'rgba(0,240,255,0.04)' : 'rgba(176,38,255,0.04)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div className="shimmer rounded w-7 h-7" />
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="shimmer rounded h-3 w-28" />
                <div className="shimmer rounded h-2 w-16" />
              </div>
            </div>

            {/* Fake content lines */}
            <div className="p-4 flex flex-col gap-3">
              {[80, 65, 90, 50, 75, 60, 85, 45, 70].map((w, j) => (
                <div
                  key={j}
                  className="shimmer rounded h-2.5"
                  style={{ width: `${w}%`, animationDelay: `${j * 0.1}s` }}
                />
              ))}
              {/* Fake code block */}
              <div
                className="shimmer rounded mt-2"
                style={{
                  height: '60px',
                  borderLeft: `2px solid ${i === 0 ? 'rgba(0,240,255,0.2)' : 'rgba(176,38,255,0.2)'}`,
                }}
              />
              {[55, 80, 40, 70].map((w, j) => (
                <div
                  key={j + 10}
                  className="shimmer rounded h-2.5"
                  style={{ width: `${w}%`, animationDelay: `${(j + 9) * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Fake judge panel */}
      <div
        className="flex-shrink-0 rounded-xl overflow-hidden"
        style={{
          background: 'rgba(14,14,22,0.7)',
          border: '1px solid rgba(255,176,32,0.2)',
          borderTop: '2px solid rgba(255,176,32,0.4)',
        }}
      >
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{
            background: 'rgba(255,176,32,0.04)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="shimmer rounded-lg w-8 h-8" />
            <div className="flex flex-col gap-1.5">
              <div className="shimmer rounded h-3 w-32" />
              <div className="shimmer rounded h-2 w-44" />
            </div>
          </div>
          <div className="shimmer rounded-lg h-7 w-36" />
        </div>
        <div className="flex gap-4 px-5 py-4">
          {[0, 1].map(i => (
            <div key={i} className="flex gap-4 flex-1 items-center">
              <div className="shimmer rounded-full w-16 h-16 flex-shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="shimmer rounded h-3 w-20" />
                <div className="shimmer rounded h-2 w-full" />
                <div className="shimmer rounded h-2 w-4/5" />
                <div className="shimmer rounded h-2 w-3/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
