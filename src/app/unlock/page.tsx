import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/section-label";
import { UnlockForm } from "@/app/unlock/unlock-form";

export const metadata: Metadata = {
  title: "Unlock",
  // Keep this private page out of search engines.
  robots: { index: false, follow: false },
};

export default function UnlockPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-6 py-24 sm:px-8">
      <SectionLabel>Private</SectionLabel>
      <h1 className="mt-5 text-4xl font-bold tracking-[-0.02em] text-ink">
        Edit mode
      </h1>
      <p className="mt-4 text-muted">
        Enter your password to edit this site in the browser. Editing only works
        while running locally, and normal visitors never see any of it.
      </p>

      <UnlockForm />
    </div>
  );
}
