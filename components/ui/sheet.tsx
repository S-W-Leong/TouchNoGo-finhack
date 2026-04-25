"use client";

import { X } from "lucide-react";
import { clsx } from "clsx";

export function Sheet({
  open,
  title,
  subtitle,
  onClose,
  variant = "side",
  children,
  wide,
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  variant?: "side" | "modal";
  children: React.ReactNode;
  wide?: boolean;
}) {
  if (!open) {
    return null;
  }

  return (
    <>
      <button
        aria-label="Close panel"
        className="sheet-backdrop"
        onClick={onClose}
        type="button"
      />
      <div
        className={clsx(
          variant === "modal" ? "sheet-modal-panel" : "sheet-panel",
          variant === "side" && wide && "sheet-panel-wide",
        )}
      >
        <div className={clsx("sheet-card p-5 md:p-6", variant === "modal" && "sheet-card-modal")}>
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow mb-1">Detail panel</p>
              <h3 className="text-xl font-semibold">{title}</h3>
              {subtitle ? <p className="muted mt-1 text-sm">{subtitle}</p> : null}
            </div>

            <button
              type="button"
              className="rounded-[8px] border border-[var(--line)] bg-[var(--surface-subtle)] p-2"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>

          {children}
        </div>
      </div>
    </>
  );
}
