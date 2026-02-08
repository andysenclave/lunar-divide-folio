import { ImageResponse } from 'next/og';

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
          fontSize: 24,
          background: 'linear-gradient(135deg, #0A0E27 0%, #1a1f3a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 50%, #808080 100%)',
            boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.3)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
