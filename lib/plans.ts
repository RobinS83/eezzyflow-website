// Which features belong to which plan, in the order the app shows them
// (app repo: app/[locale]/(public)/abonnement/page.tsx). Feature texts come from
// messages → pricing.features. Amounts are not shown: Robin decides when.

export type PlanId = "free" | "plus" | "family";

export const plans: { id: PlanId; audience: "perParent" | "perFamily" | null; features: string[] }[] = [
  { id: "free", audience: null, features: ["calendar", "oneChild", "messages", "basicCosts"] },
  {
    id: "plus",
    audience: "perParent",
    features: [
      "everythingFree", "unlimitedChildren", "fullCosts", "documents", "calendarSync",
      "photoImport", "receipts", "lists", "reportPdf", "ownChildPhoto", "viewers",
      "reminders", "aiRewrite", "judgmentImport", "yearOverview",
    ],
  },
  {
    id: "family",
    audience: "perFamily",
    features: ["plusForBoth", "viewers", "multiplePartners", "childAccounts", "prioritySupport"],
  },
];
