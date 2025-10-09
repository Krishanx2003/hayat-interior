"use client"

import { useState } from "react"

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle")

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24 px-4 sm:px-8 md:px-28">
      <div className="max-w-[900px] mx-auto">
        <h2
          id="contact-heading"
          className="font-serif text-[32px] sm:text-[38px] md:text-[42px] font-semibold text-[var(--neutral-900)] text-center text-balance"
        >
          Let’s Design Your Space
        </h2>
        <p className="mt-3 text-center text-[var(--neutral-700)]">
          Share your vision and we’ll get back to you within 24 hours.
        </p>

        <form
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={(e) => {
            e.preventDefault()
            setStatus("sent")
            setTimeout(() => setStatus("idle"), 3000)
          }}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm text-[var(--neutral-700)] font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="rounded-md border border-[var(--border)] bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
              placeholder="Jane Doe"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-[var(--neutral-700)] font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="rounded-md border border-[var(--border)] bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
              placeholder="jane@example.com"
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-2">
            <label htmlFor="message" className="text-sm text-[var(--neutral-700)] font-medium">
              Tell us about your project
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="rounded-md border border-[var(--border)] bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
              placeholder="Scope, timeline, style, budget..."
            />
          </div>

          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-600)] px-6 py-3 text-white text-sm font-semibold transition"
              aria-live="polite"
            >
              {status === "sent" ? "Sent ✓" : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
