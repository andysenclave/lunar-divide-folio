import { useTheme } from '@/theme/ThemeProvider';

const Tile = () => {
  const { colors } = useTheme();

  return (
    <h1
      style={{
        fontSize: 'clamp(32px, 6vw, 64px)',
        fontWeight: 700,
        color: colors.text,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        margin: 0,
        lineHeight: 1.2,
      }}
    >
      ANINDYA
      <br />
      MUKHERJEE
    </h1>
  );
};

export default Tile;
