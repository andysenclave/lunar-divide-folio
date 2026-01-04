import ThemeToggle from '@/components/ThemeToggle';

export default function Page() {
  return (
    <main className="min-h-screen p-6">
      <ThemeToggle />

      <h1 className="t-h1 mt-6">THE TWO SIDES OF THE MOON</h1>
      <p className="t-body-lg text-text-muted mt-2">
        Tokens are now centralized, Tailwind is mapped, and light/dark works.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="bg-bg-secondary border border-border rounded-md p-5">
          <div className="t-label">TECH SIDE</div>
          <button className="mt-3 bg-cyan text-white px-4 py-2 rounded-md shadow-cyan-glow hover:bg-cyan-hover">
            Cyan Action
          </button>
        </div>

        <div className="bg-bg-secondary border border-border rounded-md p-5">
          <div className="t-label">LIFE SIDE</div>
          <button className="mt-3 bg-orange text-white px-4 py-2 rounded-md shadow-orange-glow hover:bg-orange-hover">
            Orange Action
          </button>
        </div>
      </div>

      <div className="mt-8">
        Inline:{' '}
        <code className="t-code-inline">const App = () =&gt; &#123;&#125;</code>
        <pre className="t-code-block mt-4">{`export const x = 1;\nconsole.log(x);`}</pre>
      </div>
    </main>
  );
}
