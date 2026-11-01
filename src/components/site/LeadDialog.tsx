import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { Zap } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FreeBadge, LeadForm } from "./LeadForm";

type Ctx = { openLead: () => void };
const LeadDialogContext = createContext<Ctx | null>(null);

export function useLeadDialog() {
  const ctx = useContext(LeadDialogContext);
  if (!ctx) throw new Error("useLeadDialog must be used inside LeadDialogProvider");
  return ctx;
}

export function LeadDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openLead = useCallback(() => setOpen(true), []);
  const value = useMemo(() => ({ openLead }), [openLead]);

  return (
    <LeadDialogContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl border-border bg-background p-7 shadow-card sm:max-w-md">
          <DialogHeader className="items-start gap-3 text-left">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary-soft text-primary">
                <Zap className="size-4" />
              </span>
              <FreeBadge />
            </div>
            <DialogTitle className="font-display text-2xl leading-tight">
              Πριν αλλάξεις πάροχο, μάθε τι πραγματικά σε συμφέρει.
            </DialogTitle>
            <DialogDescription>
              Αφήστε τα στοιχεία σας και θα σας καλέσουμε για δωρεάν σύγκριση προγραμμάτων.
            </DialogDescription>
          </DialogHeader>
          <LeadForm compact />
        </DialogContent>
      </Dialog>
    </LeadDialogContext.Provider>
  );
}
