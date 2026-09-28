import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { ENVIRONMENTS } from "@luma/config";
import { EnvironmentPreview } from "@/components/marketing/EnvironmentPreview";
import { Reveal } from "@/components/marketing/Reveal";

const FEATURES = [
  {
    title: "One next action",
    body: "Not a 40-item list — the one thing worth starting with, and why it's first.",
    icon: NextActionIcon,
  },
  {
    title: "Goals that connect",
    body: "Long-term goals break into milestones, habits, and tasks automatically. Progress rolls up on its own.",
    icon: GoalIcon,
  },
  {
    title: "A calm daily surface",
    body: "Tasks, habits, notes, and your calendar in one place — no app-switching required.",
    icon: LayersIcon,
  },
  {
    title: "A focus timer that survives real life",
    body: "Close the tab, lock your phone, come back later — it picks up exactly where it left off.",
    icon: TimerIcon,
  },
  {
    title: "Reset, don't restart",
    body: "Falling behind happens. Reset Day clears the slate in one tap, without the guilt.",
    icon: ResetIcon,
  },
  {
    title: "An environment that's actually yours",
    body: "Five living scenes that shift with your real time of day — Beach, Space, Rainforest, City, Fields.",
    icon: EnvironmentIcon,
  },
];

const PREVIEW_TASKS = [
  { label: "Draft the Q1 outline", done: true },
  { label: "30-minute walk", done: true },
  { label: "Review portfolio site", done: false },
];

const ENV_PREVIEW_TIME = {
  beach: "evening",
  space: "night",
  rainforest: "afternoon",
  city: "night",
  fields: "afternoon",
} as const;

export default function MarketingHome({ searchParams }: { searchParams: { auth?: string } }) {
  const authRequired = searchParams.auth === "required";

  return (
    <div className="min-h-screen bg-paper">
      {authRequired && (
        <div className="border-b border-accent/30 bg-accent/10 px-6 py-3 text-center text-sm text-ink">
          You&apos;re signed out. This app isn&apos;t open to the public yet — ask for a new sign-in link.
        </div>
      )}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-display text-xl text-ink">Luma</span>
        <nav className="flex items-center gap-4">
          <Link href="/home" className="focus-ring text-sm text-ink-soft hover:text-ink">
            Open app
          </Link>
        </nav>
      </header>

      {/* Hero — a real, live environment scene as the backdrop, not a stock photo */}
      <section className="relative mx-6 overflow-hidden rounded-xl3 sm:mx-8">
        <EnvironmentPreview scene="fields" timeOfDay="afternoon" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/10 to-paper/40" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
          <h1 className="font-display text-4xl leading-tight text-ink drop-shadow-sm sm:text-5xl">
            One calm place for everything you&apos;re trying to improve.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">Plan less. Do more.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/home">
              <Button size="lg">Open app</Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="secondary">
                See how it works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <h2 className="text-center font-display text-2xl text-ink">Goals become daily actions, automatically</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-ink-soft">
            {["Goals", "Milestones", "Habits", "Tasks", "Daily actions", "Progress"].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-3">
                <span className="glass-surface rounded-full px-4 py-2 text-ink">{step}</span>
                {i < arr.length - 1 && <span aria-hidden>→</span>}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Product preview — the actual Home components, not a description of them */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <Reveal>
          <div className="glass-surface mx-auto max-w-lg rounded-xl3 p-6 shadow-soft sm:p-8">
            <p className="font-display text-lg text-ink">Good evening, Uthrah ♥</p>
            <p className="mt-1 text-sm italic text-ink-faint">&ldquo;The future starts today, not tomorrow.&rdquo;</p>
            <div className="mt-6 flex items-center gap-5">
              <ProgressRing percent={67} label="today" />
              <div>
                <p className="font-display text-base text-ink">Today&apos;s progress</p>
                <p className="text-sm text-ink-soft">2 of 3 complete</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {PREVIEW_TASKS.map((t) => (
                <div key={t.label} className="flex items-center gap-3">
                  <span
                    className={
                      t.done
                        ? "flex h-5 w-5 items-center justify-center rounded-full bg-accent text-paper"
                        : "h-5 w-5 rounded-full border border-border"
                    }
                  >
                    {t.done && (
                      <svg viewBox="0 0 16 16" className="h-3 w-3 fill-none stroke-current" strokeWidth={2}>
                        <path d="M3 8.5L6.2 11.5L13 4.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className={t.done ? "text-sm text-ink-faint line-through" : "text-sm text-ink"}>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="glass-surface h-full rounded-xl3 p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl2 bg-accent-soft text-accent">
                  <f.icon />
                </div>
                <h3 className="mt-4 font-display text-lg text-ink">{f.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <h2 className="text-center font-display text-2xl text-ink">Choose the environment that feels like you</h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-ink-soft">
            Living scenes, not stock backgrounds — they shift with the real time of day.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {ENVIRONMENTS.map((env, i) => (
            <Reveal key={env.scene} delay={i * 0.05}>
              <div className="group overflow-hidden rounded-xl2 border border-border">
                <div className="relative h-24 w-full overflow-hidden">
                  <EnvironmentPreview
                    scene={env.scene}
                    timeOfDay={ENV_PREVIEW_TIME[env.scene]}
                    className="h-full w-full"
                    reducedMotion
                  />
                </div>
                <div className="bg-paper-raised p-3 text-center">
                  <p className="font-display text-sm text-ink">{env.label}</p>
                  <p className="mt-0.5 text-[11px] text-ink-faint">{env.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <Reveal>
          <h2 className="font-display text-2xl text-ink">Still early</h2>
          <p className="mt-2 text-sm text-ink-soft">Luma is in private development right now — not yet open to the public.</p>
          <Link href="/home" className="mt-6 inline-block">
            <Button size="lg" variant="secondary">
              Open app
            </Button>
          </Link>
        </Reveal>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-ink-faint sm:flex-row">
        <span>© {new Date().getFullYear()} Luma</span>
        <div className="flex gap-4">
          <Link href="/privacy" className="focus-ring hover:text-ink-soft">
            Privacy
          </Link>
          <Link href="/terms" className="focus-ring hover:text-ink-soft">
            Terms
          </Link>
        </div>
      </footer>
    </div>
  );
}

function NextActionIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth={1.8}>
      <path d="M5 12h11M12 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function GoalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth={1.8}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  );
}
function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth={1.8}>
      <path d="M12 4l8 4.5-8 4.5-8-4.5z" strokeLinejoin="round" />
      <path d="M4 13.5l8 4.5 8-4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function TimerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth={1.8}>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l3 2M9 2h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ResetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth={1.8}>
      <path d="M4 12a8 8 0 1 1 2.6 5.9" strokeLinecap="round" />
      <path d="M4 17v-5h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function EnvironmentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth={1.8}>
      <circle cx="8" cy="8" r="2.5" />
      <path d="M3 19l6-7 4 4.5L18 10l3 9z" strokeLinejoin="round" />
    </svg>
  );
}
