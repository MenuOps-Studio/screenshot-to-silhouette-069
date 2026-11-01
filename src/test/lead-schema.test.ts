import { describe, expect, it } from "vitest";

import { leadSchema } from "@/lib/lead-schema";

describe("lead form rules", () => {
  it("requires a name", () => {
    expect(leadSchema.safeParse({ name: "", phone: "6912345678" }).success).toBe(false);
  });

  it("requires a phone", () => {
    expect(leadSchema.safeParse({ name: "Μαρία", phone: "" }).success).toBe(false);
  });

  it("accepts name + phone without email (email is optional)", () => {
    expect(leadSchema.safeParse({ name: "Μαρία", phone: "691 234 5678" }).success).toBe(true);
    expect(leadSchema.safeParse({ name: "Μαρία", phone: "6912345678", email: "" }).success).toBe(
      true,
    );
  });

  it("rejects an invalid email when one is given", () => {
    expect(
      leadSchema.safeParse({ name: "Μαρία", phone: "6912345678", email: "not-an-email" }).success,
    ).toBe(false);
  });

  it("rejects phones with too few digits", () => {
    expect(leadSchema.safeParse({ name: "Μαρία", phone: "12345" }).success).toBe(false);
  });
});
