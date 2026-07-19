import { Link } from "react-router-dom";
import { Zap, Github, Twitter, Linkedin } from "lucide-react";

const columns = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Roadmap", "Changelog"],
  },
  {
    title: "Resources",
    links: ["DSA Sheet", "Aptitude Bank", "Blog", "Community"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact", "Press Kit"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-bg-border bg-bg-card/30">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <Zap size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold text-text">PrepFlow</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-text-muted">
              The AI-powered placement prep platform that turns scattered revision into a clear daily plan.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-bg-border text-text-muted transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-text">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-text-muted transition-colors hover:text-text">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-bg-border pt-8 sm:flex-row">
          <p className="text-xs text-text-muted">© 2026 PrepFlow. Built for students who ship.</p>
          <p className="text-xs text-text-muted">Made with care, one revision streak at a time.</p>
        </div>
      </div>
    </footer>
  );
}
