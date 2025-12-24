import * as React from 'react';

import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-border bg-[#9ca3af] shadow-sm ring-1 ring-border/50 transition-colors data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:ring-secondary/30',
      className,
    )}
    ref={ref}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none block h-4 w-4 translate-x-0.5 rounded-full border border-border/70 bg-white shadow transition-transform data-[state=checked]:translate-x-4',
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
