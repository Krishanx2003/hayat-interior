// app/admin/layout.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const links = [
    { href: "/admin/hero", label: "Hero" },
    { href: "/admin/projects", label: "Projects" },
    { href: "/admin/services", label: "Services" },
    { href: "/admin/contact", label: "Contact" },
  ]

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 text-white flex flex-col py-6">
        <h1 className="text-xl font-bold text-center mb-6">Admin Panel</h1>
        <nav className="flex flex-col gap-2 px-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded hover:bg-gray-700 transition ${
                pathname === link.href ? "bg-gray-700" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">{children}</main>
    </div>
  )
}
