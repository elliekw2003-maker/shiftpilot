const metrics = [
  { label: "Roster slots", value: "18" },
  { label: "Assignments", value: "42" },
  { label: "Understaffed", value: "5" },
  { label: "Overlaps", value: "0" },
];

type StaffingStatus = "Understaffed" | "Fully staffed" | "Overstaffed";

const rosterRows: {
  position: string;
  time: string;
  coverage: string;
  status: StaffingStatus;
}[] = [
  {
    position: "Barista",
    time: "Sat 9:00 AM - 1:00 PM",
    coverage: "2 / 2 staffed",
    status: "Fully staffed",
  },
  {
    position: "Cashier",
    time: "Sat 10:00 AM - 2:00 PM",
    coverage: "1 / 3 staffed",
    status: "Understaffed",
  },
  {
    position: "Supervisor",
    time: "Sat 12:00 PM - 4:00 PM",
    coverage: "2 / 1 staffed",
    status: "Overstaffed",
  },
];

const features = [
  {
    title: "Coverage tracking",
    description:
      "See every roster slot against its required headcount, so staffing gaps are visible before the week starts.",
  },
  {
    title: "Overlap prevention",
    description:
      "Keep assignments clean with a workflow built around preventing employees from being double-booked.",
  },
  {
    title: "Role-based roster slots",
    description:
      "Plan around positions first, then assign the right employees to each staffing requirement.",
  },
];

const statusStyles: Record<StaffingStatus, string> = {
  Understaffed: "border-amber-200 bg-amber-50 text-amber-700",
  "Fully staffed": "border-emerald-200 bg-emerald-50 text-emerald-700",
  Overstaffed: "border-blue-200 bg-blue-50 text-blue-700",
};

function StatusBadge({ status }: { status: StaffingStatus }) {
  const styles = statusStyles[status];

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="#" className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm shadow-blue-600/20">
              SP
            </span>
            <span className="text-lg font-semibold tracking-tight">
              ShiftPilot
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#features" className="transition hover:text-slate-950">
              Features
            </a>
            <a href="#demo" className="transition hover:text-slate-950">
              Demo
            </a>
            <a href="#" className="transition hover:text-slate-950">
              Sign in
            </a>
          </div>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-[0.95fr_1.05fr] md:py-24">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            Coverage-aware workforce scheduling
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl">
            Build weekly rosters without staffing gaps.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Create role-based roster slots, assign employees, and track staffing
            coverage in one clean dashboard.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#demo"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Get started
            </a>
            <a
              href="#demo"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:text-slate-950"
            >
              View demo
            </a>
          </div>
        </div>

        <section
          id="demo"
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/70"
          aria-label="ShiftPilot dashboard preview"
        >
          <div className="rounded-xl border border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  Weekly roster
                </p>
                <p className="text-xs text-slate-500">Cafe team · Jun 22-28</p>
              </div>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                0 overlaps
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-lg border border-slate-200 bg-white p-4"
                >
                  <p className="text-2xl font-semibold tracking-tight text-slate-950">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 px-4 pb-4">
              {rosterRows.map((row) => (
                <div
                  key={row.position}
                  className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-semibold text-slate-950">
                        {row.position}
                      </p>
                      <StatusBadge status={row.status} />
                    </div>
                    <p className="mt-2 text-sm text-slate-500">{row.time}</p>
                  </div>
                  <div className="rounded-lg bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
                    {row.coverage}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>

      <section id="features" className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 py-16 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60"
            >
              <div className="mb-5 h-1.5 w-12 rounded-full bg-blue-600" />
              <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                {feature.title}
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>ShiftPilot</p>
        <p>Built for simple, coverage-aware weekly rostering.</p>
      </footer>
    </main>
  );
}
