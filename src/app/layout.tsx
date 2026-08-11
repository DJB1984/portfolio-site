import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Starfield } from "@/components/starfield";
import { site } from "@/data/site";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brookslanding.com"),
  title: {
    default: `${site.profile.name} — ${site.profile.role}`,
    template: `%s — ${site.profile.name}`,
  },
  description: site.profile.shortBio,
  openGraph: {
    title: `${site.profile.name} — ${site.profile.role}`,
    description: site.profile.shortBio,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${schibsted.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
      // globals.css sets `scroll-behavior: smooth` for #anchor jumps. Without
      // this attribute Next 16 lets that smooth scroll apply to route changes
      // too, so navigating glides to the top instead of landing there.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        {/* Enable progressive-enhancement styles as early as possible */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <Starfield anchors={site.projects.filter((p) => p.featured).length} />
        <a
          href="#main"
          className="sr-only rounded-md bg-raised px-4 py-2 font-mono text-sm text-ink focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
