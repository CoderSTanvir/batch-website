import { FadeInUp } from "@/components/AnimatedSection";

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-sm px-6 py-16">
      <FadeInUp>
        <div className="rounded-2xl border border-navy-light/40 bg-navy-accent/60 backdrop-blur-sm p-6">
          <h1 className="mb-2 text-2xl font-bold text-foreground">Admin Portal</h1>
          <p className="mb-6 text-sm text-text-secondary">
            Not yet functional — coming in a later phase.
          </p>
          <div className="space-y-3">
            <input
              disabled
              placeholder="Email"
              className="w-full rounded-lg border border-navy-light/40 bg-navy-accent/40 px-3 py-2 text-sm text-text-tertiary placeholder:text-text-tertiary/50 cursor-not-allowed"
            />
            <input
              disabled
              placeholder="Password"
              className="w-full rounded-lg border border-navy-light/40 bg-navy-accent/40 px-3 py-2 text-sm text-text-tertiary placeholder:text-text-tertiary/50 cursor-not-allowed"
            />
            <button
              disabled
              className="w-full rounded-lg bg-gradient-to-r from-gold-accent/20 to-gold-accent/10 px-3 py-2 text-sm text-text-tertiary border border-gold-accent/20 cursor-not-allowed"
            >
              Sign in
            </button>
          </div>
        </div>
      </FadeInUp>
    </div>
  );
}
