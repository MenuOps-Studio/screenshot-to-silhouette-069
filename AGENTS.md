<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Lead form submissions go through the `submitLead` server function (`src/lib/leads.functions.ts`), which validates with the shared zod schema and inserts with the server-side admin client; the `lead_submissions` table has RLS on with no visitor policies, so visitors can never read or edit leads.
- The lead form is reachable everywhere via `LeadDialogProvider` in `__root.tsx` (`useLeadDialog().openLead()`); pages also embed `LeadForm`/`LeadSection` inline — reuse these instead of creating new forms.
- The site is light-theme only; all colors, gradients and shadows are tokens in `src/styles.css` and button styles are cva variants in `button.tsx`.
