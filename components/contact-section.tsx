"use client"

import emailjs from "@emailjs/browser"
import { useEffect, useRef, useState } from "react"
import { User, Mail, MessageSquare, ChevronsRight, CheckCircle2 } from "lucide-react"
import { HeartbeatLine } from "@/components/hud-chrome"
import { ContactHud } from "@/components/contact-hud"

/* angular comm panel + field clips */
const panelClip =
  "polygon(0 34px, 34px 0, calc(100% - 34px) 0, 100% 34px, 100% calc(100% - 34px), calc(100% - 34px) 100%, 34px 100%, 0 calc(100% - 34px))"
const fieldClip =
  "polygon(0 12px, 12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)"
const btnClip =
  "polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))"

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // reveal immediately if already within the viewport on mount
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    // safety fallback so content can never stay hidden
    const t = setTimeout(() => setInView(true), 1200)
    return () => {
      observer.disconnect()
      clearTimeout(t)
    }
  }, [])

  return { ref, inView }
}

function HudField({
  icon,
  label,
  children,
  focused,
  invalid,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
  focused: boolean
  invalid: boolean
}) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className={`absolute inset-0 transition-colors duration-300 ${
          invalid ? "bg-blood" : focused ? "bg-blood" : "bg-blood/50"
        }`}
        style={{ clipPath: fieldClip }}
      />
      <div
        className="relative m-[1.5px] flex items-stretch gap-2 bg-ink p-2 sm:gap-4 sm:p-4"
        style={{ clipPath: fieldClip }}
      >
        <div
          className={`relative mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center self-start border text-blood transition-all duration-300 sm:mt-1 sm:h-11 sm:w-11 ${
            focused ? "border-blood shadow-[0_0_14px_-4px_var(--blood)]" : "border-blood/60"
          }`}
        >
          {icon}
          <span aria-hidden className="absolute left-0 top-0 h-1.5 w-1.5 border-l border-t border-blood/70" />
          <span aria-hidden className="absolute bottom-0 right-0 h-1.5 w-1.5 border-b border-r border-blood/70" />
        </div>
        <div className="flex-1">
          <div className="mb-0.5 flex items-center gap-1 font-mono text-[9px] font-bold tracking-[0.1em] text-blood sm:mb-1 sm:gap-2 sm:text-[11px] sm:tracking-[0.2em]">
            {label}
            <span className="h-1 w-1 rounded-full bg-blood" />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export function ContactSection() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<"name" | "email" | "message", boolean>>({
    name: false,
    email: false,
    message: false,
  })
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedMessage = message.trim()
    const nextErrors = {
      name: trimmedName === "",
      email: trimmedEmail === "" || !isValidEmail(trimmedEmail),
      message: trimmedMessage === "",
    }

    setFieldErrors(nextErrors)

    if (nextErrors.name || nextErrors.email || nextErrors.message) {
      setFormError("Please enter a valid name, email, and message.")
      return
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS configuration is missing")
      setFormError("Unable to send message right now. Please try again later.")
      return
    }

    setLoading(true)
    setFormError(null)

    const templateParams = {
      from_name: trimmedName,
      from_email: trimmedEmail,
      message: trimmedMessage,
    }

    emailjs.send(serviceId, templateId, templateParams, publicKey).then(
      () => {
        setLoading(false)
        setSent(true)
        setName("")
        setEmail("")
        setMessage("")
        setFieldErrors({ name: false, email: false, message: false })
      },
      (error) => {
        console.error("EmailJS send failed:", error)
        setLoading(false)
        setFormError("Failed to send message. Please try again.")
      },
    )
  }

  const inputClass =
    "w-full bg-transparent font-mono text-xs text-paper placeholder:text-paper-faint focus:outline-none sm:text-base"

  return (
    <section id="contact" className="relative w-full overflow-hidden pb-20 pt-24">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blood/10 blur-[140px]"
      />
      {/* watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 top-16 z-0 select-none font-mono text-[16vw] font-black leading-none tracking-tighter text-white/[0.02]"
      >
        SIGNAL
      </span>

      {/* peripheral HUD chrome — radar / uplink transmission theme */}
      <ContactHud />

      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-20">
        <div
          ref={ref}
          className="group relative"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* glowing comm-panel frame */}
          <div
            aria-hidden
            className="contact-panel-frame absolute inset-0 opacity-80 shadow-[0_0_60px_-16px_var(--blood)] transition-opacity duration-500 group-hover:opacity-100"
            style={{ clipPath: panelClip }}
          />
          <div
            className="relative m-[2px] bg-ink px-6 py-10 sm:px-12 sm:py-12"
            style={{ clipPath: panelClip }}
          >
            {/* internal top readouts */}
            <div className="pointer-events-none absolute left-8 top-8 hidden font-mono text-[11px] leading-relaxed sm:block">
              <div className="font-bold tracking-[0.15em] text-paper">
                COMM.LINK // <span className="text-blood">ONLINE</span>
              </div>
              <div className="tracking-[0.15em] text-paper-dim">CHANNEL: 04</div>
              <div className="tracking-[0.15em] text-paper-dim">SECURE TRANSMISSION</div>
              <div className="mt-2 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="h-1.5 w-3 bg-blood" style={{ opacity: 0.3 + i * 0.15 }} />
                ))}
              </div>
            </div>
            <div className="pointer-events-none absolute right-8 top-8 hidden w-36 text-right sm:block">
              <div className="font-mono text-[11px] tracking-[0.15em] text-paper">SYSTEM STATUS</div>
              <div className="mt-1 flex items-center justify-end gap-2">
                <span className="h-2 w-2 rounded-full bg-blood" style={{ animation: "hero-blink 1.4s steps(1) infinite" }} />
                <span className="font-mono text-[11px] font-bold tracking-widest text-blood">ONLINE</span>
              </div>
              <div className="mt-1">
                <HeartbeatLine />
              </div>
            </div>

            {/* heading */}
            <div className="mb-10 flex flex-col items-center pt-10 text-center sm:pt-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-10 bg-blood/60" />
                <span className="whitespace-nowrap font-mono text-[11px] tracking-[0.35em] text-blood">04 / TRANSMISSION</span>
                <span className="h-px w-10 bg-blood/60" />
              </div>
              <span className="font-mono text-xs tracking-[0.4em] text-paper-dim">COMMUNICATION SYSTEM</span>
              <h2 className="mt-2 whitespace-nowrap font-mono text-4xl font-black tracking-tight text-paper sm:text-7xl">
                CONTACT <span className="text-blood">ME</span>
              </h2>
            </div>

            {sent ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-blood" />
                <p className="font-mono text-lg font-bold text-paper">Transmission sent!</p>
                <p className="font-mono text-sm text-paper-dim">Thanks for reaching out — I&apos;ll get back to you soon.</p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-2 font-mono text-xs tracking-widest text-blood underline-offset-4 hover:underline"
                >
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <HudField
                  icon={<User className="h-4 w-4 sm:h-5 sm:w-5" />}
                  label="IDENTIFICATION"
                  focused={focusedField === "name"}
                  invalid={fieldErrors.name}
                >
                  <span id="contact-name-label" className="sr-only">
                    Your Name
                  </span>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Your Name"
                    aria-labelledby="contact-name-label"
                    aria-invalid={fieldErrors.name}
                    className={`${inputClass} relative -top-1 sm:-top-1.5`}
                  />
                </HudField>

                <HudField
                  icon={<Mail className="h-4 w-4 sm:h-5 sm:w-5" />}
                  label="COMMUNICATION CHANNEL"
                  focused={focusedField === "email"}
                  invalid={fieldErrors.email}
                >
                  <span id="contact-email-label" className="sr-only">
                    Your Email
                  </span>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Your Email"
                    aria-labelledby="contact-email-label"
                    aria-invalid={fieldErrors.email}
                    className={`${inputClass} relative -top-1 sm:-top-1.5`}
                  />
                </HudField>

                <HudField
                  icon={<MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />}
                  label="TRANSMISSION DATA"
                  focused={focusedField === "message"}
                  invalid={fieldErrors.message}
                >
                  <span id="contact-message-label" className="sr-only">
                    Your Message
                  </span>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Your Message"
                    aria-labelledby="contact-message-label"
                    aria-invalid={fieldErrors.message}
                    className={`${inputClass} resize-y`}
                  />
                </HudField>

                {formError ? <p className="font-mono text-sm text-blood">{formError}</p> : null}

                {/* transmit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mobile-cta-pulse mobile-cta-transmit group/btn relative isolate mt-2 overflow-hidden bg-gradient-to-r from-blood via-blood-bright to-blood p-[2px] text-paper drop-shadow-[0_0_18px_var(--blood)] transition-all duration-300 hover:-translate-y-0.5 hover:drop-shadow-[0_0_30px_var(--blood-bright)] disabled:cursor-not-allowed disabled:opacity-70"
                  style={{ clipPath: btnClip }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-[2px] bg-gradient-to-r from-blood via-blood-bright to-blood transition-all duration-300"
                    style={{ clipPath: btnClip }}
                  />
                  <span
                    className="mobile-cta-surface relative m-[2px] flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap bg-gradient-to-br from-white/[0.1] via-ink/95 to-ink/85 px-4 py-3 font-mono text-xs font-bold tracking-[0.15em] text-paper backdrop-blur-sm transition-colors duration-300 group-hover/btn:from-white/[0.16] group-hover/btn:via-ink/85 group-hover/btn:to-blood/15 sm:gap-3 sm:px-6 sm:py-4 sm:text-base"
                    style={{ clipPath: btnClip }}
                  >
                    <span
                      aria-hidden
                      className="mobile-cta-shine pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover/btn:translate-x-[100%]"
                    />
                    {loading ? "TRANSMITTING..." : "TRANSMIT MESSAGE"}
                    <ChevronsRight className="transmit-chevron h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
