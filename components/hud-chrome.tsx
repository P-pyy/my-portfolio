"use client"

import { useEffect, useMemo, useState } from "react"

/* Shared sci-fi HUD peripheral widgets used across sections. */

export function HeartbeatLine() {
  return (
    <svg viewBox="0 0 120 24" className="h-6 w-full text-blood" fill="none" aria-hidden>
      <polyline
        points="0,12 14,12 20,4 26,20 34,8 40,14 52,12 66,12 72,6 78,18 86,10 92,13 120,13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function SystemStatus() {
  return (
    <div className="absolute left-6 top-8 z-20 hidden w-44 border border-blood/40 bg-ink/60 p-3 backdrop-blur-sm lg:block">
      <span className="font-mono text-[10px] tracking-[0.25em] text-paper-dim">SYSTEM STATUS</span>
      <div className="mt-1 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-blood" style={{ animation: "hero-blink 1.4s steps(1) infinite" }} />
        <span className="font-mono text-xs font-bold tracking-widest text-blood">ONLINE</span>
      </div>
      <div className="mt-2">
        <HeartbeatLine />
      </div>
    </div>
  )
}

export function DataStream({ label = "ACTIVE" }: { label?: string }) {
  return (
    <div className="absolute right-6 top-8 z-20 hidden w-44 border border-blood/40 bg-ink/60 p-3 backdrop-blur-sm lg:block">
      <div className="font-mono text-[10px] tracking-[0.25em] text-paper-dim">DATA STREAM</div>
      <div className="mt-1 font-mono text-xs font-bold tracking-widest text-blood">{label}</div>
      <div className="mt-2 flex gap-1">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="h-2 flex-1 bg-blood"
            style={{
              opacity: 0.25 + ((i * 7) % 10) / 12,
              animation: `hero-flicker ${3 + (i % 4)}s linear ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export function Coordinates() {
  return (
    <div className="absolute bottom-8 left-6 z-20 hidden border border-blood/40 bg-ink/60 px-3 py-2 backdrop-blur-sm lg:block">
      <div className="mb-1 font-mono text-[10px] tracking-[0.25em] text-paper-dim">COORDINATES</div>
      <div className="space-y-0.5 font-mono text-[11px] text-blood">
        <div>X: 1287.33</div>
        <div>Y: 884.21</div>
        <div>Z: 0.00</div>
      </div>
    </div>
  )
}

export function Telemetry() {
  const [time, setTime] = useState<string>("--:--:--")

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      const pad = (n: number) => String(n).padStart(2, "0")
      setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const date = useMemo(() => {
    const d = new Date()
    const pad = (n: number) => String(n).padStart(2, "0")
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`
  }, [])

  return (
    <div className="absolute bottom-8 right-6 z-20 hidden border border-blood/40 bg-ink/60 px-3 py-2 backdrop-blur-sm lg:block">
      <div className="space-y-0.5 font-mono text-[11px] text-blood">
        <div>TIME: {time}</div>
        <div>DATE: {date}</div>
        <div>LOCATION: PH</div>
      </div>
    </div>
  )
}

export function ScaleMarkers() {
  return (
    <div aria-hidden className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-16 xl:flex">
      {["10", "20", "30", "40"].map((n) => (
        <div key={n} className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-paper-faint">{n}</span>
          <span className="h-px w-4 bg-blood/40" />
        </div>
      ))}
    </div>
  )
}

export function StatusBar({ encryption = false }: { encryption?: boolean }) {
  return (
    <div className="absolute inset-x-0 bottom-2 z-20 hidden items-center justify-center gap-8 lg:flex">
      <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest">
        <span className="text-paper-dim">SIGNAL:</span>
        <span className="text-blood">STABLE</span>
        <span className="ml-1 flex items-end gap-0.5">
          <span className="h-2 w-1 bg-blood" />
          <span className="h-3 w-1 bg-blood" />
          <span className="h-4 w-1 bg-blood" />
          <span className="h-2.5 w-1 bg-blood/40" />
        </span>
      </div>

      <span aria-hidden className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute h-6 w-6 rounded-full border border-blood/50" />
        <span className="absolute h-1 w-1 rounded-full bg-blood" />
        <span className="absolute h-6 w-px bg-blood/50" />
        <span className="absolute h-px w-6 bg-blood/50" />
      </span>

      <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest">
        <span aria-hidden className="text-paper-dim">
          &#128274;
        </span>
        <span className="text-paper-dim">SECURE CHANNEL:</span>
        <span className="text-blood">ACTIVE</span>
      </div>

      {encryption ? (
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest">
          <span className="text-paper-dim">ENCRYPTION:</span>
          <span className="text-blood">ON</span>
        </div>
      ) : null}
    </div>
  )
}

/* Full peripheral chrome set for a section. */
export function HudChrome({
  dataStreamLabel = "ACTIVE",
  encryption = false,
}: {
  dataStreamLabel?: string
  encryption?: boolean
}) {
  return (
    <>
      <SystemStatus />
      <DataStream label={dataStreamLabel} />
      <Coordinates />
      <Telemetry />
      <ScaleMarkers />
      <StatusBar encryption={encryption} />
    </>
  )
}
