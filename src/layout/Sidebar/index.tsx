import { FC } from 'react';

import { navigationItems } from '@/layout/navigation';
import { MenuItem } from '@/layout/Sidebar/components/MenuItem';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  isCollapsed: boolean;
  onToggleMobileMenu: (isOpen: boolean) => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export const Sidebar: FC<SidebarProps> = ({
  isMobileMenuOpen,
  isCollapsed,
  onToggleMobileMenu,
  onHoverStart,
  onHoverEnd,
}) => {
  const handleCloseMobile = () => onToggleMobileMenu(false);

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden',
          isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={handleCloseMobile}
        aria-hidden={!isMobileMenuOpen}
      />
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border/40 bg-card/95 shadow-sm transition-transform duration-200 lg:translate-x-0',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
          isCollapsed && 'lg:w-[72px]',
        )}
        aria-label="Sidebar"
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
      >
        <div className="flex h-16 items-center gap-3 border-b border-border/40 px-4">
          <div className="size-9 rounded-xl bg-primary/90 shadow-sm" />
          <span
            className={cn(
              'text-sm font-semibold text-foreground',
              isCollapsed ? 'lg:hidden' : 'lg:block',
            )}
          >
            Backoffice
          </span>
        </div>

        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigationItems.map((item) => (
            <MenuItem
              key={item.path}
              {...item}
              isCollapsed={isCollapsed}
              onClick={handleCloseMobile}
            />
          ))}
        </nav>
        <div className="px-4 pb-5">
          <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
        </div>
      </aside>
    </>
  );
};
