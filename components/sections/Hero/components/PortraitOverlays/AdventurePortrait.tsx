import { useTheme } from '@/theme/ThemeProvider';

const AdventurePortrait = () => {
  const { colors } = useTheme();

  return (
    <section
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
      <section
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: `linear-gradient(180deg, transparent 0%, ${colors.orangeGlow} 100%)`,
          clipPath:
            'polygon(0% 100%, 15% 60%, 30% 80%, 45% 40%, 55% 55%, 70% 25%, 85% 50%, 100% 30%, 100% 100%)',
        }}
      />

      <section
        style={{
          width: 140,
          height: 160,
          background: 'linear-gradient(180deg, #2a1a0a 0%, #1a0d05 100%)',
          borderRadius: '70px 70px 35px 35px',
          position: 'relative',
          marginTop: -20,
        }}
      >
        <section
          style={{
            position: 'absolute',
            bottom: '25%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 55,
            height: 38,
            background: 'linear-gradient(180deg, #3a2a1a 0%, #2a1a0a 100%)',
            borderRadius: 6,
          }}
        >
          <section
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 22,
              height: 22,
              border: '3px solid #4a3a2a',
              borderRadius: '50%',
            }}
          />
        </section>
      </section>

      <section
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: `radial-gradient(circle at 70% 40%, ${colors.orangeGlow} 0%, transparent 60%)`,
        }}
      />

      <section
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
