"use client"

/* ==========================================================================
   Skills section HUD — "DIAGNOSTICS / SPECTRUM ANALYZER" theme.
   Distinct from the contact HUD (radar/uplink) and the shared HudChrome.
   ========================================================================== */

/* Left rail: vertical spectrum-analyzer bars that pulse independently. */
function SpectrumAnalyzer() {
  const bars = Array.from({ length: 16 })
  return (
    <div className="absolute left-5 top-1/2 z-10 hidden -translate-y-1/2 xl:flex">
      <div className="flex flex-col items-center gap-3">
        <span className="font-mono text-[9px] tracking-[0.3em] text-blood/70 [writing-mode:vertical-rl]">
          SPECTRUM.ANALYZER
        </span>
        <div className="flex h-40 items-end gap-[3px]">
          {bars.map((_, i) => (
            <span
              key={i}
              className="w-[3px] origin-bottom bg-blood"
              style={{
                height: "100%",
                opacity: 0.4 + (i % 4) * 0.15,
                animation: `hud-eq ${1.1 + (i % 5) * 0.24}s ease-in-out ${i * 0.09}s infinite`,
              }}
            />
          ))}
        </div>
        <span className="font-mono text-[9px] tracking-[0.25em] text-paper-faint">20Hz–20kHz</span>
      </div>
    </div>
  )
}

/* Right: stacked diagnostic load meters. */
function LoadMeters() {
  const meters = [
    { label: "CPU", value: 82 },
    { label: "MEM", value: 64 },
    { label: "GPU", value: 91 },
  ]
  return (
    <div className="absolute right-5 top-1/2 z-10 hidden w-40 -translate-y-1/2 flex-col gap-3 xl:flex">
      <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.25em] text-blood/70">
        <span>SYS.LOAD</span>
        <span className="h-1 w-1 animate-pulse bg-blood" />
      </div>
      {meters.map((m) => (
        <div key={m.label}>
          <div className="mb-1 flex items-center justify-between font-mono text-[10px] text-paper-dim">
            <span>{m.label}</span>
            <span className="text-blood">{m.value}%</span>
          </div>
          <div className="h-1.5 w-full bg-blood/15">
            <span
              className="block h-full bg-blood"
              style={{
                width: `${m.value}%`,
                animation: "hud-uplink 3.4s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/* Bottom-left: diagnostics pass readout with a scanning bar. */
function DiagnosticsReadout() {
  return (
    <div className="absolute bottom-6 left-6 z-10 hidden font-mono lg:block">
      <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] text-paper-dim">
        <span className="h-1.5 w-1.5 rotate-45 border border-blood" />
        DIAGNOSTICS
      </div>
      <div className="mt-1 text-[11px] font-bold tracking-[0.2em] text-blood">ALL SYSTEMS // PASS</div>
      <div className="relative mt-2 h-1 w-40 overflow-hidden bg-blood/15">
        <span
          className="absolute inset-y-0 w-1/3 bg-blood"
          style={{ animation: "hero-marquee 2.4s linear infinite" }}
        />
      </div>
    </div>
  )
}

/* Bottom-right: module id tag. */
function ModuleTag() {
  return (
    <div className="absolute bottom-6 right-6 z-10 hidden text-right font-mono lg:block">
      <div className="text-[10px] tracking-[0.25em] text-paper-dim">ANALYZER.MODULE</div>
      <div className="text-[11px] text-blood">DIAG.7734</div>
    </div>
  )
}

export function SkillsHud() {
  return (
    <>
      <SpectrumAnalyzer />
      <LoadMeters />
      <DiagnosticsReadout />
      <ModuleTag />
    </>
  )
}
