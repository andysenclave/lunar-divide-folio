import { useTheme } from '@/theme/ThemeProvider';

const EngineeringPortrait = () => {
  const { colors } = useTheme();

  return (
    <section
      className="engineering-portrait"
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background:
          'linear-gradient(145deg, #0a1628 0%, #0d1f35 50%, #051018 100%)',
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
        src="/images/engineering-portrait.png"
        alt="Andy working on laptop with headphones"
        style={{
          maxWidth: '110%',
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
          position: 'absolute',
          opacity: 0.82,
        }}
      />

      {/* Cyan theme overlay */}
      <section
        className="engineering-portrait__theme-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: colors.cyan,
          opacity: 0.08,
        }}
      />

      <section
        className="engineering-portrait__glow-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 40%, ${colors.cyanGlow} 0%, transparent 60%)`,
        }}
      />

      <section
        className="engineering-portrait__shadow-overlay"
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

export default EngineeringPortrait;
