import Link from "next/link";
import { BellDot, Shield } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/queue", label: "Queue" },
  { href: "/cases/CASE-ATO-001", label: "Primary Case" },
  { href: "/controls", label: "Controls" },
];

export function AppShell({
  currentPath,
  children,
}: {
  currentPath: string;
  children: React.ReactNode;
}) {
  return (
    <div className="app-shell">
      <div className="panel mb-3 px-3 py-2 md:px-4">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-[12px] bg-[var(--surface-dark)] p-2 text-white">
              <Shield size={15} />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">TNG RiskOps Agent</p>
              <p className="text-xs text-[var(--muted)]">
                ATO operations workspace
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <nav className="flex flex-wrap gap-1">
              {navItems.map((item) => {
                const isActive = currentPath.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-[10px] px-3 py-1.5 text-sm font-semibold transition-colors",
                      isActive
                        ? "bg-[var(--surface-dark)] text-white shadow-sm"
                        : "bg-white text-[var(--muted)]",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 lg:ml-3">
              <span className="pill">
                <BellDot size={12} />
                21 active
              </span>
              <span className="pill">Seeded</span>
            </div>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
