import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

import { Logo, NAV_LINKS } from "./Navbar";
import { useLeadDialog } from "./LeadDialog";

export function Footer() {
  const { openLead } = useLeadDialog();
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-5 font-display text-lg leading-snug text-foreground">
            Η σωστή επιλογή ξεκινάει από την σωστή ενημέρωση.
          </p>
          <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" />
            Συνεργασία με όλους τους παρόχους ενέργειας στην Ελλάδα
          </p>
        </div>

        <div>
          <h4 className="eyebrow">Σελίδες</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground transition-colors hover:text-primary-deep">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow">Δωρεάν Ενημέρωση</h4>
          <p className="mt-4 text-sm text-muted-foreground">
            Κάνε την έξυπνη επιλογή χωρίς να σου κοστίσει.
          </p>
          <button
            onClick={openLead}
            className="mt-4 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Ζητήστε κλήση →
          </button>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="container-page py-5 text-xs text-muted-foreground">
          © {new Date().getFullYear()} EnergyXpert · Σύμβουλος Ενέργειας. 100% Δωρεάν ενημέρωση.
        </p>
      </div>
    </footer>
  );
}
