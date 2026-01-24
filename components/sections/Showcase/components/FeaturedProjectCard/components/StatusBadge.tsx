'use client';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const isActive = status === 'Active';

  return (
    <span
      className="absolute"
      style={{
        top: '16px',
        right: '16px',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        background: isActive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(168, 85, 247, 0.15)',
        color: isActive ? '#10B981' : '#A855F7',
      }}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
