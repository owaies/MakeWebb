import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { company } from "@/lib/site-data";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex w-full max-w-3xl items-center gap-1 rounded-full border border-transparent bg-transparent py-2 pr-2 pl-4 shadow-none backdrop-blur-none"
      >
        <Link to="/" className="mr-auto flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rotate-45 rounded-[2px] bg-primary" />
          <span className="font-display text-sm font-semibold tracking-tight">{company.name}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.slice(1, 4).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link
          to="/contact"
          className="hidden rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.03] md:inline-block"
        >
          Get started
        </Link>

        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="rounded-full border border-border p-2 md:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-auto fixed inset-0 z-50 aurora bg-ink px-6 pt-24"
          >
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute top-7 right-6 rounded-full border border-border p-2"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="text-big block border-b border-border py-3"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
