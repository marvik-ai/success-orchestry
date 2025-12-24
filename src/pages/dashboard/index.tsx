import { FC } from 'react';

export const DashboardPage: FC = () => (
  <div className="space-y-6">
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
      <p className="text-sm text-muted-foreground">Overview of key metrics will live here.</p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
      {['Users', 'Employees'].map((label) => (
        <div
          key={label}
          className="flex items-center justify-between rounded-xl border border-border/50 bg-card p-4 shadow-sm"
        >
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <p className="text-2xl font-semibold text-foreground">0</p>
          </div>
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <span className="text-xs font-semibold">+</span>
          </div>
        </div>
      ))}
    </div>

    <div className="rounded-xl border border-border/50 bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Latest activity</p>
          <p className="text-xs text-muted-foreground">Recent updates will appear here.</p>
        </div>
        <div className="h-8 w-44 rounded-lg border border-border/40 bg-muted/40" />
      </div>
      <div className="mt-4 h-36 rounded-lg border border-dashed border-border/40 bg-muted/20" />
    </div>
  </div>
);
