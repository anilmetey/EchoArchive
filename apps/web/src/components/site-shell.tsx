import Link from "next/link";
import { Archive, Clock3, KeyRound, LayoutDashboard, Plus, UserRound } from "lucide-react";
import { AccountChip } from "@/components/account-chip";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/capsules/new", label: "New", icon: Plus },
  { href: "/archive", label: "Archive", icon: Archive },
  { href: "/profile", label: "Profile", icon: UserRound },
  { href: "/auth", label: "Account", icon: KeyRound }
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-chroma min-h-screen text-ink">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-white/50 bg-white/55 px-4 py-5 shadow-[12px_0_50px_rgba(14,165,233,0.08)] backdrop-blur-2xl lg:block">
        <Link href="/dashboard" className="flex items-center gap-3 px-2">
          <span className="pulse-icon flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-cyan via-violet to-clay text-white">
            <Clock3 className="h-5 w-5" />
          </span>
          <span>
            <span className="gradient-text block text-sm font-semibold">EchoArchive</span>
            <span className="block text-xs text-black/50">Memory vault</span>
          </span>
        </Link>
        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-black/65 transition hover:bg-white/70 hover:text-violet hover:shadow-[0_10px_26px_rgba(124,58,237,0.12)]"
            >
              <item.icon className="h-4 w-4 transition group-hover:scale-110 group-hover:text-tide" />
              {item.label}
            </Link>
          ))}
        </nav>
        <AccountChip />
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-white/60 bg-white/60 px-4 py-3 backdrop-blur-2xl lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2 text-sm font-semibold">
              <Clock3 className="h-5 w-5" />
              EchoArchive
            </Link>
            <Link href="/capsules/new" className="rounded-md bg-gradient-to-r from-tide to-plum px-3 py-2 text-xs font-medium text-white">
              New
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
