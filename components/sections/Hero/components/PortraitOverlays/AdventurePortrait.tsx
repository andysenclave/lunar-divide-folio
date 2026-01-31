import { useTheme } from '@/theme/ThemeProvider';

const AdventurePortrait = () => {
  const { colors } = useTheme();

  return (
    <section
      className="adventure-portrait"
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background:
          'linear-gradient(145deg, #1a1005 0%, #2a1a0a 50%, #100800 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Using native img to avoid Next.js Image processing */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/adventure-portrait.jpeg"
        alt="Skydiving adventure with mountains in the background"
        style={{
          transform: 'scale(1.3)',
          opacity: 0.82,
        }}
      />

      {/* Orange theme overlay */}
      <section
        className="adventure-portrait__theme-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: colors.orange,
          opacity: 0.08,
        }}
      />

      <section
        className="adventure-portrait__glow-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: `radial-gradient(circle at 70% 40%, ${colors.orangeGlow} 0%, transparent 60%)`,
        }}
      />

      <section
        className="adventure-portrait__shadow-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          boxShadow: 'inset 0 0 80px rgba(0,0,0,0.6)',
        }}
      />
    </section>
  );
};

export default AdventurePortrait;
