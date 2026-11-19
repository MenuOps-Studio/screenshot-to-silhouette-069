import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Menu, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useLeadDialog } from "./LeadDialog";

export const NAV_LINKS = [
  { to: "/", label: "Αρχική" },
  { to: "/advantages", label: "Πλεονεκτήματα" },
  { to: "/about", label: "Σχετικά" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft transition-transform group-hover:rotate-6">
        <Zap className="size-4.5" strokeWidth={2.4} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight">
          <span className="text-primary">Energy</span>
          <span className="text-sun">Xpert</span>
        </span>
        <span className="mt-0.5 text-[11px] tracking-wide text-muted-foreground">
          Σύμβουλος Ενέργειας
        </span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const { openLead } = useLeadDialog();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/80 shadow-soft backdrop-blur-xl"
          : "border-b border-transparent bg-background/40 backdrop-blur-sm",
      )}
    >
      <nav className="container-page flex h-18 items-center justify-between gap-6">
        <Logo />

        <ul className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/70 p-1 shadow-soft md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.to;
            return (
              <li key={link.to} className="relative">
                <Link
                  to={link.to}
                  className={cn(
                    "relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active ? "text-primary-deep" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary-soft"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Button variant="hero" size="pill" onClick={openLead} className="hidden sm:inline-flex">
            Επικοινωνία
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outlineSoft" size="icon" className="md:hidden" aria-label="Μενού">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm bg-background p-6">
              <SheetTitle className="sr-only">Μενού</SheetTitle>
              <div className="mt-2">
                <Logo />
              </div>
              <ul className="mt-10 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded-xl px-4 py-3 font-display text-xl",
                        pathname === link.to
                          ? "bg-primary-soft text-primary-deep"
                          : "text-foreground hover:bg-muted",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Button
                variant="hero"
                size="xl"
                className="mt-8 w-full"
                onClick={() => {
                  setMobileOpen(false);
                  openLead();
                }}
              >
                Επικοινωνία
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
