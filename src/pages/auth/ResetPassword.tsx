import { FC } from 'react';

export const ResetPasswordPage: FC = () => (
  <div className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col justify-center gap-4 rounded-xl border border-border/40 bg-card p-6 shadow-sm">
    <div className="space-y-1">
      <h1 className="text-xl font-semibold text-foreground">Reset password</h1>
      <p className="text-sm text-muted-foreground">
        Placeholder screen. Password reset flow will be wired later.
      </p>
    </div>
    <div className="h-10 rounded-lg border border-dashed border-border/50 bg-muted/20" />
    <div className="h-10 rounded-lg border border-dashed border-border/50 bg-muted/20" />
    <div className="h-10 rounded-lg border border-dashed border-border/50 bg-muted/20" />
  </div>
);
