import { Briefcase, LayoutDashboard, LucideIcon, Users } from 'lucide-react';

import ROUTES from '@/router/routes';

export type NavigationItem = {
  label: string;
  path: string;
  icon: LucideIcon;
};

export const navigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    label: 'Users',
    path: ROUTES.USERS,
    icon: Users,
  },
  {
    label: 'Employees',
    path: ROUTES.EMPLOYEES,
    icon: Briefcase,
  },
];
