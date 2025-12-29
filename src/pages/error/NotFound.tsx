import { FC } from 'react';

import { Link } from 'react-router-dom';

import ROUTES from '@/router/routes';

export const NotFoundPage: FC = () => (
  <div className="mx-auto flex min-h-[60vh] w-full max-w-xl flex-col items-center justify-center gap-3 rounded-xl border border-border/40 bg-card p-8 text-center shadow-sm">
    <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">404</p>
    <h1 className="text-2xl font-semibold text-foreground">Page not found</h1>
    <p className="text-sm text-muted-foreground">
      The page you are looking for doesn&apos;t exist or has been moved.
    </p>
    <Link
      to={ROUTES.DASHBOARD}
      className="mt-2 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
    >
      Back to dashboard
    </Link>
  </div>
);
