"use client"

import { useEffect, useState } from "react"

/** Thin HUD progress rail pinned to the top of the viewport. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[2px] bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-blood via-blood-bright to-blood shadow-[0_0_12px_-2px_var(--blood-bright)]"
        style={{ transform: `scaleX(${progress})`, transition: "transform 90ms linear" }}
      />
    </div>
  )
}
