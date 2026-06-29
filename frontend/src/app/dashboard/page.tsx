import Link from "next/link";

type StaffingStatus = "Fully staffed" | "Understaffed" | "Overstaffed";

const navigationItems = [
  "Dashboard",
  "Roster",
  "Employees",
  "Positions",
  "My Shifts",
];

const metrics = [
  { label: "Roster slots", value: "18", detail: "Planned for this week" },
  { label: "Assignments", value: "42", detail: "Employees assigned" },
  { label: "Understaffed slots", value: "5", detail: "Need more coverage" },
  { label: "Overlaps prevented", value: "0", detail: "Clean assignments" },
];

const rosterRows: {
  position: string;
  time: string;
  staffed: string;
  status: StaffingStatus;
  note: string;
}[] = [
  {
    position: "Barista",
    time: "Sat 09:00 - 13:00",
    staffed: "2 / 2 staffed",
    status: "Fully staffed",
    note: "Mina and Alex assigned",
  },
  {
    position: "Cashier",
    time: "Sat 10:00 - 14:00",
    staffed: "1 / 3 staffed",
    status: "Understaffed",
    note: "Needs 2 more assignments",
  },
  {
    position: "Supervisor",
    time: "Sat 12:00 - 16:00",
    staffed: "2 / 1 staffed",
    status: "Overstaffed",
    note: "Review extra assignment",
  },
];

const statusStyles: Record<StaffingStatus, string> = {
  "Fully staffed": "border-emerald-200 bg-emerald-50 text-emerald-700",
  Understaffed: "border-amber-200 bg-amber-50 text-amber-700",
  Overstaffed: "border-blue-200 bg-blue-50 text-blue-700",
};

const understaffedRows = rosterRows.filter(
  (row) => row.status === "Understaffed",
);

function StatusBadge({ status }: { status: StaffingStatus }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="border-b border-slate-200 bg-white px-6 py-5 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
        <div className="flex items-center justify-between gap-5 lg:block">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm shadow-blue-600/20">
              SP
            </span>
            <span className="text-lg font-semibold tracking-tight">
              ShiftPilot
            </span>
          </Link>
          <p className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500 sm:block lg:mt-6 lg:inline-flex">
            Manager view
          </p>
        </div>

        <nav
          className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:mt-8 lg:flex-col lg:overflow-visible lg:pb-0"
          aria-label="Dashboard navigation"
        >
          {navigationItems.map((item) => {
            const isActive = item === "Dashboard";

            return (
              <a
                key={item}
                href="#"
                aria-current={isActive ? "page" : undefined}
                className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition lg:w-full ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                {item}
              </a>
            );
          })}
        </nav>
      </aside>

      <section className="min-w-0">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
                Dashboard
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Monitor this week&apos;s roster coverage and staffing gaps.
              </p>
            </div>
            <div className="inline-flex w-fit rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Week of Jun 22
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl space-y-6 px-6 py-8 lg:px-8">
          <section
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            aria-label="Dashboard metrics"
          >
            {metrics.map((metric) => (
              <article
                key={metric.label}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70"
              >
                <p className="text-sm font-medium text-slate-500">
                  {metric.label}
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm text-slate-500">{metric.detail}</p>
              </article>
            ))}
          </section>

          <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
            <section className="rounded-xl border border-slate-200 bg-white shadow-sm shadow-slate-200/70">
              <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
                <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                  Weekly roster preview
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Staffing status by role-based roster slot.
                </p>
              </div>

              <div className="divide-y divide-slate-200">
                {rosterRows.map((row) => (
                  <article
                    key={`${row.position}-${row.time}`}
                    className="grid gap-4 px-5 py-5 sm:grid-cols-[1fr_auto] sm:items-center sm:px-6"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-semibold text-slate-950">
                          {row.position}
                        </h3>
                        <StatusBadge status={row.status} />
                      </div>
                      <p className="mt-2 text-sm text-slate-500">{row.time}</p>
                      <p className="mt-1 text-sm text-slate-500">{row.note}</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                      {row.staffed}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                    Needs attention
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Understaffed roster slots to review.
                  </p>
                </div>
                <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  {understaffedRows.length} open
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {understaffedRows.map((row) => (
                  <article
                    key={`${row.position}-${row.time}-attention`}
                    className="rounded-lg border border-amber-200 bg-amber-50/70 p-4"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-semibold text-slate-950">
                        {row.position}
                      </p>
                      <StatusBadge status={row.status} />
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{row.time}</p>
                    <p className="mt-2 text-sm font-medium text-amber-800">
                      {row.note}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
