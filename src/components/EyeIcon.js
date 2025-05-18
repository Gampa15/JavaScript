import React from 'react';

const EyeIcon = ({ visible, onClick }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4a5568"  /* nice gray color */
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ cursor: 'pointer', position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}
    >
      {visible ? (
        // Eye open
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M2 12c1.5-4 7.5-7 10-7s8.5 3 10 7c-1.5 4-7.5 7-10 7s-8.5-3-10-7z" />
        </>
      ) : (
        // Eye closed (a simple line crossing the eye)
        <>
          <path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-11-8-11-8a21.2 21.2 0 014.29-5.55" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      )}
    </svg>
  );
};

export default EyeIcon;
