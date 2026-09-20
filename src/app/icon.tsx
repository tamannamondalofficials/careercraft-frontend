import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" fill="white" />
          <polyline points="14 2 14 8 20 8" stroke="#818cf8" strokeWidth="2" />
          <line x1="16" y1="13" x2="8" y2="13" stroke="#4f46e5" strokeWidth="2" />
          <line x1="16" y1="17" x2="8" y2="17" stroke="#4f46e5" strokeWidth="2" />
          <line x1="10" y1="9" x2="8" y2="9" stroke="#4f46e5" strokeWidth="2" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
