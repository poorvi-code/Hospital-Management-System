import React from 'react';

const Gauge = ({ value, color = "#2563eb", max = 200 }) => {
  const percentage = Math.min(Math.max(value / max, 0), 1);
  const rotation = percentage * 180 - 90;

  return (
    <div className="relative flex flex-col items-center">
      <svg width="160" height="100" viewBox="0 0 200 120">
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#e5e7eb" strokeWidth="12" strokeLinecap="round" />
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" 
          strokeDasharray="251.32" strokeDashoffset={251.32 * (1 - percentage)} />
        <g transform={`rotate(${rotation} 100 100)`}>
          <line x1="100" y1="100" x2="100" y2="30" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
          <circle cx="100" cy="100" r="6" fill="#1f2937" />
        </g>
      </svg>
      <div className="mt-2 text-xl font-bold text-neutral-900">{value}</div>
    </div>
  );
};

export default Gauge;
