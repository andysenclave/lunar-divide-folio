import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Anindya Mukherjee - The Lunar Divide';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0A0E27 0%, #0f1535 50%, #1a1f3a 100%)',
          position: 'relative',
        }}
      >
        {/* Background gradient orbs */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,217,255,0.15) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Moon */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #F0F0F0 0%, #D0D0D0 40%, #A0A0A0 100%)',
            boxShadow: 'inset -20px -20px 40px rgba(0,0,0,0.25), 0 0 60px rgba(255,255,255,0.15)',
            marginBottom: 40,
          }}
        />

        {/* Name */}
        <div
          style={{
            display: 'flex',
            fontSize: 64,
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: 16,
            letterSpacing: '-0.02em',
          }}
        >
          Anindya Mukherjee
        </div>

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: 'rgba(255,255,255,0.7)',
            marginBottom: 32,
          }}
        >
          Senior Technical Lead & Adventure Creator
        </div>

        {/* Divide line */}
        <div
          style={{
            width: 200,
            height: 2,
            background: 'linear-gradient(90deg, #00D9FF 0%, #FF6B35 100%)',
            marginBottom: 32,
          }}
        />

        {/* Footer text */}
        <div
          style={{
            display: 'flex',
            fontSize: 20,
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          The Lunar Divide
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
