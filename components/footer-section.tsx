export function FooterSection() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative w-full overflow-hidden">
      {/* top glow line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blood to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-24 w-96 -translate-x-1/2 rounded-full bg-blood/10 blur-[80px]"
      />

      <div className="relative mx-auto flex max-w-[1400px] flex-col items-center gap-2 px-6 py-10 text-center">
        {/* HUD status line */}
        <p aria-hidden className="mb-1 whitespace-nowrap font-mono text-[10px] tracking-[0.4em] text-blood/60">
          [ SYS.END // CONNECTION STABLE ]
        </p>
        <p className="font-mono text-sm text-paper">
          &copy; {year} <span className="font-bold text-blood">Chrestine Hiangan</span>.
        </p>
        <p className="font-mono text-sm text-paper-dim">All rights reserved.</p>
      </div>
    </footer>
  )
}
