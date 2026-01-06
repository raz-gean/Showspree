"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export function LayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const hideChrome = pathname === "/showspree";

  return (
    <div className="flex min-h-screen flex-col bg-black text-zinc-50">
      {!hideChrome && <NavBar />}
      <div className="flex-1">{children}</div>
      {!hideChrome && <Footer />}
    </div>
  );
}
