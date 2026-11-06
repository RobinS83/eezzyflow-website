// Which features belong to which plan. Feature texts come from the app
// (messages → pricing.features). Robin sets the prices; none are shown here.

export type PlanId = "free" | "plus" | "family";

export type FeatureKey =
  | "calendar" | "oneChild" | "basicCosts" | "messages"
  | "everythingFree" | "unlimitedChildren" | "fullCosts" | "documents"
  | "calendarSync" | "reminders" | "photoImport" | "receipts" | "reportPdf"
  | "yearOverview" | "judgmentImport" | "aiRewrite" | "lists" | "ownChildPhoto"
  | "viewers" | "plusForBoth" | "multiplePartners" | "childAccounts" | "prioritySupport";

export const plans: { id: PlanId; audience: "perParent" | "perFamily" | null; features: FeatureKey[] }[] = [
  {
    id: "free",
    audience: null,
    features: ["calendar", "oneChild", "basicCosts", "messages"],
  },
  {
    id: "plus",
    audience: "perParent",
    features: [
      "everythingFree", "unlimitedChildren", "fullCosts", "documents",
      "calendarSync", "reminders", "photoImport", "receipts", "reportPdf",
      "yearOverview", "judgmentImport", "aiRewrite", "lists", "ownChildPhoto", "viewers",
    ],
  },
  {
    id: "family",
    audience: "perFamily",
    features: ["plusForBoth", "multiplePartners", "childAccounts", "prioritySupport"],
  },
];
