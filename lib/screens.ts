import manifest from "./screens.generated.json";

export type Device = "phone" | "desktop";

/** Screenshots for this language and device, falling back to Dutch. */
export function screensFor(locale: string, device: Device): string[] {
  const m = manifest as Record<string, Record<Device, string[]>>;
  const own = m[locale]?.[device] ?? [];
  return own.length > 0 ? own : (m.nl?.[device] ?? []);
}
