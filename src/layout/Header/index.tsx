import {
  AlignLeft,
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Search,
  Settings,
  User,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

import { useTheme } from '@/components/ThemeProvider/useTheme';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { navigationItems } from '@/layout/navigation';
import { cn } from '@/lib/utils';

type HeaderProps = {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onToggleMobileMenu: () => void;
};

export const Header = ({ isCollapsed, onToggleCollapse, onToggleMobileMenu }: HeaderProps) => {
  const location = useLocation();
  const activeItem = navigationItems.find((item) => item.path === location.pathname);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/40 bg-background/95 px-4 backdrop-blur lg:px-8">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onToggleMobileMenu}
          aria-label="Toggle menu"
        >
          <AlignLeft className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:inline-flex"
          onClick={onToggleCollapse}
          onMouseEnter={() => {
            if (!isCollapsed) {
              onToggleCollapse();
            }
          }}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </Button>
        <div className={cn('flex flex-col gap-0.5', isCollapsed && 'lg:ml-2')}>
          <div className="text-sm font-semibold text-foreground">{activeItem?.label ?? ''}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
          <Search className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
          <Bell className="size-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="User menu">
              <Avatar className="size-8">
                <AvatarFallback>NS</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center justify-between gap-3">
              <span className="text-sm">Dark mode</span>
              <Switch
                aria-label="Dark mode"
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 size-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 size-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 size-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
