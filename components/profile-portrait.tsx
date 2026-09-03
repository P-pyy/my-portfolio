"use client"

type Props = {
  tiltX: number
  tiltY: number
}

export function ProfilePortrait({ tiltX, tiltY }: Props) {
  return (
    <div
      className="relative w-full max-w-[520px] transition-transform duration-300 ease-out"
      style={{ transform: `translate(${tiltX * 0.4}px, ${tiltY * 0.4}px)` }}
    >
      {/* ambient glow */}
      <div className="absolute -inset-6 -z-10 bg-blood/20 blur-3xl" />

      {/* circular targeting reticle behind the frame */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blood/25"
        style={{ animation: "hero-spin-slow 40s linear infinite" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[104%] w-[104%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-blood/20"
        style={{ animation: "hero-spin-reverse 60s linear infinite" }}
      />

      {/* outer red HUD frame */}
      <div className="hud-clip bg-blood/50 p-[2px]">
        <div className="hud-clip relative aspect-[4/5] w-full overflow-hidden bg-ink-soft">
          {/* photo */}
          <img
            src="/images/profile.jpg"
            alt="Chrestine Hiangan, Full Stack Developer, seated portrait"
            className="h-full w-full object-cover object-top grayscale-[0.15]"
          />
          {/* red tint + bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-blood/15" />
          {/* scanning line */}
          <div
            className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-blood/25 to-transparent"
            style={{ animation: "hero-scan 4.5s ease-in-out infinite" }}
          />
          {/* scanline texture */}
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(0,0,0,0.18)_4px)] opacity-40" />

          {/* HUD readout, top-left */}
          <div className="absolute left-4 top-5 font-mono text-[10px] leading-relaxed text-blood/90">
            <p className="hero-flicker">● REC 00:24:07</p>
            <p className="text-paper/70">ID // PS-CRS-001</p>
          </div>

          {/* status chip, bottom */}
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-blood/40 bg-ink/75 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_2px_rgba(74,222,128,0.7)]" />
            <span className="font-mono text-[10px] font-semibold tracking-widest text-paper">
              AVAILABLE FOR WORK
            </span>
          </div>
        </div>
      </div>

      {/* floating corner brackets */}
      <span className="absolute -left-2 -top-2 h-6 w-6 border-l-2 border-t-2 border-blood" />
      <span className="absolute -bottom-2 -right-2 h-6 w-6 border-b-2 border-r-2 border-blood" />
    </div>
  )
}
