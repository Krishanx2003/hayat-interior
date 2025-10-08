"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact Us", href: "/contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors",
        scrolled ? "bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-background/95",
      )}
      aria-label="Primary navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
            <Image
              src="/hayat-logo.png"
              alt="Hayat Interiors"
              width={120}
              height={120}
              className="h-20 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main menu">
            {navigationItems.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-[color:var(--color-brand)]",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              className="rounded-md px-4 py-2 text-sm font-medium"
              style={{
                backgroundColor: "var(--color-brand)",
                color: "var(--brand-foreground, white)",
              }}
              aria-label="Get Free Quotation"
            >
              Get Free Quotation
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-md"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-controls="mobile-menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={cn(
          "md:hidden transition-[max-height] duration-300 overflow-hidden border-t",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <nav className="grid gap-2" aria-label="Mobile menu">
            {navigationItems.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-2 py-2 text-base font-medium transition-colors",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-[color:var(--color-brand)] hover:bg-muted/60",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div className="mt-3">
            <Button
              className="w-full rounded-md px-4 py-2 text-sm font-medium"
              style={{
                backgroundColor: "var(--color-brand)",
                color: "var(--brand-foreground, white)",
              }}
              aria-label="Get Free Quotation"
              onClick={() => setOpen(false)}
            >
              Get Free Quotation
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
