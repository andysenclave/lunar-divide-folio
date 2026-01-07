export default function ScrollCue({ label }: { label: string }) {
  return (
    <div className="mt-8">
      <p className="text-xs tracking-[0.35em] uppercase text-text/50">
        {label}
      </p>
      <div className="mx-auto mt-3 h-8 w-px bg-border/40" />
    </div>
  );
}
