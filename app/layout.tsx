// The real root layout (with <html>) is app/[locale]/layout.tsx; this one only
// exists so app/not-found.tsx can render the site-wide 404 page.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
