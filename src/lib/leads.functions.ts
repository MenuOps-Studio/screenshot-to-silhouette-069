import { createServerFn } from "@tanstack/react-start";

import { leadSchema } from "./lead-schema";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    // Bots fill the hidden honeypot; pretend success without storing.
    if (data.website && data.website.length > 0) {
      return { ok: true as const };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("lead_submissions").insert({
      name: data.name,
      phone: data.phone,
      email: data.email ? data.email : null,
      source_page: data.sourcePage ?? null,
    });

    if (error) {
      console.error("lead insert failed", error);
      throw new Error("Δεν ήταν δυνατή η αποστολή. Δοκιμάστε ξανά σε λίγο.");
    }

    return { ok: true as const };
  });
