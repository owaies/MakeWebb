import { Link } from "@tanstack/react-router";
import { company, founders } from "@/lib/site-data";
import { HeroModel } from "@/components/site/HeroModel";

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-border bg-ink px-5 py-16 md:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <HeroModel />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span className="inline-block h-3 w-3 rotate-45 rounded-[3px] bg-primary" />
            <h2 className="text-big mt-5">{company.name}</h2>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Websites, apps, AI integration and automation — designed and shipped by two engineers.
            </p>
            <a href={`mailto:${company.email}`} className="mt-5 inline-block text-sm underline-offset-4 hover:underline">{company.email}</a>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Studio</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-primary">Services</Link></li>
              <li><Link to="/work" className="hover:text-primary">Work</Link></li>
              <li><Link to="/team" className="hover:text-primary">Team</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Elsewhere</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href={company.github} target="_blank" rel="noreferrer" className="hover:text-primary">GitHub</a></li>
              <li><a href={company.website} target="_blank" rel="noreferrer" className="hover:text-primary">makewebb.vercel.app</a></li>
              {founders.map((f) => <li key={f.name}><a href={f.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary">{f.name.split(" ").slice(-1)} · LinkedIn</a></li>)}
            </ul>
          </div>
        </div>
        <p className="mt-14 text-xs text-muted-foreground">© {new Date().getFullYear()} {company.name}. Built in India.</p>
      </div>
    </footer>
  );
}
