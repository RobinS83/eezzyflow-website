// The plans as Robin set them (same amounts as the app's pricing page:
// app repo, app/[locale]/(public)/abonnement/page.tsx). Feature texts come
// from messages → pricing.features. Each feature is listed once: a plan shows
// only what it adds to the plan before it. Plus and Family unlock exactly the
// same; the only difference is who pays (docs/abonnementen.md).

export type PlanId = "free" | "plus" | "family";

export type Plan = {
  id: PlanId;
  /** Monthly price in euro cents. */
  monthlyCents: number;
  audience: "perParent" | "perFamily" | null;
  features: string[];
  /** The plan we steer towards: best value for two parents. */
  featured?: boolean;
};

export const plans: Plan[] = [
  { id: "free", monthlyCents: 0, audience: null, features: ["calendar", "oneChild", "messages", "basicCosts"] },
  {
    id: "plus",
    monthlyCents: 499,
    audience: "perParent",
    features: [
      "everythingFree", "unlimitedChildren", "fullCosts", "documents", "calendarSync",
      "photoImport", "receipts", "lists", "reportPdf", "ownChildPhoto", "viewers",
      "reminders", "aiRewrite", "judgmentImport", "yearOverview", "history",
      "multiplePartners", "childAccounts",
    ],
  },
  {
    id: "family",
    monthlyCents: 799,
    audience: "perFamily",
    features: ["plusForBoth", "onePays", "cheaperThanTwice", "splitCost"],
    featured: true,
  },
];

export const planById = (id: PlanId) => plans.find((p) => p.id === id)!;

export function formatEuro(cents: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}
