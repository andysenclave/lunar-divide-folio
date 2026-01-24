'use client';

interface DecorativeCirclesProps {
  color?: string;
}

const DecorativeCircles = ({ color = 'rgba(16, 185, 129, 0.2)' }: DecorativeCirclesProps) => {
  return (
    <>
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-20px',
          left: '-20px',
          width: '100px',
          height: '100px',
          border: `1px solid ${color}`,
          borderRadius: '50%',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '10px',
          left: '10px',
          width: '60px',
          height: '60px',
          border: `1px solid ${color.replace('0.2', '0.15')}`,
          borderRadius: '50%',
        }}
      />
    </>
  );
};

export default DecorativeCircles;
