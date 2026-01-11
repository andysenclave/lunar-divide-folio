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
      <section
        className="engineering-portrait__code"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.15,
          fontSize: 9,
          fontFamily: 'monospace',
          color: colors.cyan,
          lineHeight: 1.6,
          padding: 20,
          overflow: 'hidden',
        }}
      >
        {`const engineer = {
  name: 'Andy',
  role: 'Tech Lead',
  stack: ['React', 'Node', 
    'GraphQL', 'AWS'],
};

async function build() {
  const vision = await 
    architect(ideas);
  return ship(vision);
}`}
      </section>

      <section
        className="engineering-portrait__body"
        style={{
          width: 140,
          height: 160,
          background: 'linear-gradient(180deg, #1a2a3a 0%, #0d1a25 100%)',
          borderRadius: '70px 70px 35px 35px',
          position: 'relative',
        }}
      >
        <section
          className="engineering-portrait__screen"
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '50%',
            transform: 'translateX(-50%) perspective(100px) rotateX(10deg)',
            width: 80,
            height: 50,
            background: 'linear-gradient(180deg, #2a3a4a 0%, #1a2a35 100%)',
            borderRadius: 4,
          }}
        >
          <section
            className="engineering-portrait__screen-glow"
            style={{
              position: 'absolute',
              inset: 4,
              background: `linear-gradient(180deg, ${colors.cyan}33 0%, ${colors.cyan}0d 100%)`,
              borderRadius: 2,
            }}
          />
        </section>
      </section>

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
