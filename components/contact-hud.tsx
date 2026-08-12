"use client"

function RadarSweep() {
  return (
    <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-2 xl:flex">
      <span className="font-mono text-[9px] tracking-[0.3em] text-blood/70">RADAR.SCAN</span>
      <div className="relative h-32 w-32 rounded-full border border-blood/40">
        <span className="absolute inset-4 rounded-full border border-blood/25" />
        <span className="absolute inset-9 rounded-full border border-blood/20" />
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-blood/20" />
        <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-blood/20" />
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, var(--blood) 0deg, transparent 55deg)",
            opacity: 0.5,
            animation: "hud-sweep 3.4s linear infinite",
          }}
        />
        <span className="absolute left-[62%] top-[34%] h-1.5 w-1.5 rounded-full bg-blood shadow-[0_0_10px_2px_var(--blood)]" />
        <span
          className="absolute left-[62%] top-[34%] h-1.5 w-1.5 rounded-full border border-blood"
          style={{ animation: "hud-ping 2s ease-out infinite" }}
        />
        <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blood" />
      </div>
      <span className="font-mono text-[9px] tracking-[0.25em] text-paper-faint">RANGE 4.2KM</span>
    </div>
  )
}

function UplinkBuffer() {
  const rows = Array.from({ length: 6 })
  return (
    <div className="absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-2 xl:flex">
      <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] text-blood/70">
        <span className="h-1.5 w-1.5 rounded-full bg-blood" style={{ animation: "hud-uplink 1.2s ease-in-out infinite" }} />
        UPLINK.BUFFER
      </div>
      <div className="flex flex-col gap-1.5">
        {rows.map((_, r) => (
          <div key={r} className="flex gap-1">
            {Array.from({ length: 8 }).map((_, c) => (
              <span
                key={c}
                className="h-2 w-2 bg-blood"
                style={{ animation: `hud-uplink ${1.6 + (r % 3) * 0.4}s ease-in-out ${(r * 8 + c) * 0.06}s infinite` }}
              />
            ))}
          </div>
        ))}
      </div>
      <span className="font-mono text-[9px] tracking-[0.25em] text-paper-faint">TX 2.4 MB/s</span>
    </div>
  )
}

function FrequencyBand() {
  const ticks = Array.from({ length: 40 })
  return (
    <div className="absolute inset-x-0 bottom-4 z-10 hidden items-center justify-center gap-4 lg:flex">
      <span className="font-mono text-[10px] tracking-[0.2em] text-paper-dim">FREQ</span>
      <div className="flex h-6 items-end gap-[3px]">
        {ticks.map((_, i) => (
          <span
            key={i}
            className="w-[2px] origin-bottom bg-blood/70"
            style={{
              height: `${20 + Math.abs(Math.sin(i * 1.7)) * 80}%`,
              animation: `hud-eq ${1 + (i % 6) * 0.2}s ease-in-out ${i * 0.05}s infinite`,
            }}
          />
        ))}
      </div>
      <span className="font-mono text-[10px] tracking-[0.2em] text-blood">147.3 MHz</span>
    </div>
  )
}

export function ContactHud() {
  return (
    <>
      <RadarSweep />
      <UplinkBuffer />
      <FrequencyBand />
    </>
  )
}
