type Props = {
  size?: number;
  className?: string;
};

export default function FloatingMoon({ size = 300, className = '' }: Props) {
  return (
    <div className={['absolute z-10', className].join(' ')}>
      <div
        className="relative -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ height: size, width: size }}
      >
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-full shadow-[0_0_100px_rgba(180,190,180,0.12)]" />

        {/* Moon base gradient */}
        <div className="absolute inset-0 overflow-hidden rounded-full bg-linear-to-br from-[#e8e8e0] via-[#c8c8c0] to-[#888880]">
          {/* Radial lighting from top-left */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.35) 0%, rgba(200,200,195,0.15) 30%, rgba(136,136,128,0) 60%)',
            }}
          />

          {/* Tilted terminator shadow - the key feature! */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(110deg, transparent 0%, transparent 42%, rgba(0,0,0,0.15) 48%, rgba(0,0,0,0.45) 52%, rgba(0,0,0,0.65) 58%, rgba(0,0,0,0.75) 70%, rgba(0,0,0,0.85) 100%)',
            }}
          />

          {/* Additional shadow gradient for depth */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 70% 70%, transparent 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)',
            }}
          />
        </div>

        {/* Craters - Larger main crater */}
        <div className="absolute left-[15%] top-[35%] h-[48%] w-[48%] rounded-full bg-black/12 blur-[0.5px]">
          <div className="absolute inset-[15%] rounded-full bg-[#787875]/20" />
        </div>

        {/* Medium craters */}
        <div className="absolute left-[28%] top-[18%] h-[24%] w-[24%] rounded-full bg-black/11">
          <div className="absolute inset-[20%] rounded-full bg-[#888880]/15" />
        </div>

        <div className="absolute left-[55%] top-[28%] h-[20%] w-[20%] rounded-full bg-black/15">
          <div className="absolute inset-[18%] rounded-full bg-[#787875]/20" />
        </div>

        <div className="absolute left-[58%] top-[58%] h-[22%] w-[22%] rounded-full bg-black/13">
          <div className="absolute inset-[16%] rounded-full bg-[#888880]/18" />
        </div>

        {/* Small craters scattered */}
        <div className="absolute left-[14%] top-[16%] h-[10%] w-[10%] rounded-full bg-black/8" />
        <div className="absolute left-[72%] top-[22%] h-[8%] w-[8%] rounded-full bg-black/9" />
        <div className="absolute left-[12%] top-[72%] h-[9%] w-[9%] rounded-full bg-black/[0.07]" />
        <div className="absolute left-[68%] top-[78%] h-[11%] w-[11%] rounded-full bg-black/8" />

        {/* Inner shadow to give depth */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow:
              'inset -20px -15px 40px rgba(0,0,0,0.4), inset 8px 8px 30px rgba(255,255,255,0.05)',
          }}
        />

        {/* Orbital Rings - Very subtle */}
        <div className="absolute -inset-8 rounded-full border border-border/8" />
        <div className="absolute -inset-12 rounded-full border border-dashed border-border/5" />
        <div className="absolute -inset-16 rounded-full border border-border/3" />
      </div>
    </div>
  );
}
