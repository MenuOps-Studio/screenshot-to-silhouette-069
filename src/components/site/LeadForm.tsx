import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, Phone, ShieldCheck, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { leadSchema } from "@/lib/lead-schema";
import { submitLead } from "@/lib/leads.functions";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<Record<"name" | "phone" | "email", string>>;

export function FreeBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-sun-soft px-3 py-1 text-xs font-semibold text-sun-foreground ring-1 ring-sun/40",
        className,
      )}
    >
      <ShieldCheck className="size-3.5" />
      100% Δωρεάν
    </span>
  );
}

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const submit = useServerFn(submitLead);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [values, setValues] = useState({ name: "", phone: "", email: "", website: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const update = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (key in errors) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError(null);
    const parsed = leadSchema.safeParse({ ...values, sourcePage: pathname });
    if (!parsed.success) {
      const fe: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FieldErrors;
        if (!fe[k]) fe[k] = issue.message;
      }
      setErrors(fe);
      return;
    }
    setStatus("sending");
    try {
      await submit({ data: parsed.data });
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error && err.message
          ? err.message
          : "Δεν ήταν δυνατή η αποστολή. Δοκιμάστε ξανά.",
      );
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "done" ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center gap-4 py-8 text-center"
        >
          <span className="flex size-14 items-center justify-center rounded-full bg-primary-soft text-primary">
            <CheckCircle2 className="size-7" />
          </span>
          <h3 className="text-2xl font-semibold">Ευχαριστούμε, {values.name.split(" ")[0]}!</h3>
          <p className="max-w-sm text-muted-foreground">
            Λάβαμε τα στοιχεία σας. Θα επικοινωνήσουμε μαζί σας σύντομα για τη δωρεάν ενημέρωσή σας.
          </p>
          <Button
            variant="outlineSoft"
            size="pill"
            onClick={() => {
              setValues({ name: "", phone: "", email: "", website: "" });
              setStatus("idle");
            }}
          >
            Νέα αίτηση
          </Button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -8 }}
          onSubmit={onSubmit}
          noValidate
          className={cn("flex flex-col", compact ? "gap-4" : "gap-5")}
        >
          <Field
            id="lead-name"
            label="Όνομα"
            required
            icon={<User className="size-4" />}
            error={errors.name}
          >
            <Input
              id="lead-name"
              name="name"
              autoComplete="name"
              placeholder="π.χ. Μαρία Παπαδοπούλου"
              value={values.name}
              onChange={update("name")}
              maxLength={100}
              aria-invalid={!!errors.name}
              className="h-12 rounded-xl bg-card pl-10 text-base"
            />
          </Field>

          <Field
            id="lead-phone"
            label="Τηλέφωνο"
            required
            icon={<Phone className="size-4" />}
            error={errors.phone}
          >
            <Input
              id="lead-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="69xx xxx xxx"
              value={values.phone}
              onChange={update("phone")}
              maxLength={30}
              aria-invalid={!!errors.phone}
              className="h-12 rounded-xl bg-card pl-10 text-base"
            />
          </Field>

          <Field
            id="lead-email"
            label="Email"
            hint="προαιρετικό"
            icon={<Mail className="size-4" />}
            error={errors.email}
          >
            <Input
              id="lead-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.gr"
              value={values.email}
              onChange={update("email")}
              maxLength={255}
              aria-invalid={!!errors.email}
              className="h-12 rounded-xl bg-card pl-10 text-base"
            />
          </Field>

          {/* Honeypot */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={update("website")}
              />
            </label>
          </div>

          {serverError && (
            <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {serverError}
            </p>
          )}

          <Button
            type="submit"
            variant="hero"
            size="xl"
            disabled={status === "sending"}
            className="mt-1 w-full"
          >
            {status === "sending" ? <Loader2 className="animate-spin" /> : null}
            Δωρεάν Ενημέρωση
          </Button>

          <p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-primary" />
            100% Δωρεάν · Χωρίς καμία δέσμευση
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({
  id,
  label,
  required,
  hint,
  icon,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-primary">*</span>}
        {hint && <span className="font-normal text-muted-foreground">({hint})</span>}
      </Label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        {children}
      </div>
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}
