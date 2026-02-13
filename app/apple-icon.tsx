import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(135deg, #0A0E27 0%, #1a1f3a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Moon */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #F0F0F0 0%, #D0D0D0 40%, #A0A0A0 100%)',
            boxShadow: 'inset -15px -15px 30px rgba(0,0,0,0.25), 0 0 40px rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Divide line - subtle */}
          <div
            style={{
              position: 'absolute',
              width: 2,
              height: 70,
              background: 'linear-gradient(180deg, transparent 0%, rgba(0,217,255,0.4) 50%, transparent 100%)',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
