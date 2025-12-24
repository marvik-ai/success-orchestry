import { NavLink } from 'react-router-dom';

import { NavigationItem } from '@/layout/navigation';
import { cn } from '@/lib/utils';

type MenuItemProps = NavigationItem & {
  isCollapsed: boolean;
  onClick?: () => void;
};

export const MenuItem = ({ label, path, icon: Icon, isCollapsed, onClick }: MenuItemProps) => (
  <NavLink
    to={path}
    onClick={onClick}
    className={({ isActive }) =>
      cn(
        'group flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-foreground',
        isActive && 'bg-primary/10 text-foreground',
      )
    }
  >
    <Icon className="size-4 shrink-0 text-muted-foreground group-hover:text-foreground" />
    <span className={cn('truncate', isCollapsed ? 'lg:hidden' : 'lg:block')}>{label}</span>
  </NavLink>
);
