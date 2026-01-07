export default function SideLabels() {
  return (
    <div className="flex items-center justify-between text-xs tracking-[0.35em] uppercase">
      <div className="text-accent">
        ENGINEERING{' '}
        <span className="ml-4 inline-block w-10 border-t border-border/50" />
      </div>
      <div className="text-text/40">
        <span className="mr-4 inline-block w-10 border-t border-border/50" />{' '}
        ADVENTURE
      </div>
    </div>
  );
}
