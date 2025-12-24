import { useState } from 'react';

import { Outlet } from 'react-router-dom';

import { Header } from '@/layout/components/Header';
import { Sidebar } from '@/layout/components/Sidebar';
import { cn } from '@/lib/utils';

export const AppLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isHoverExpanded, setIsHoverExpanded] = useState(false);

  const handleToggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const handleToggleCollapse = () => {
    setIsHoverExpanded(false);
    setIsSidebarCollapsed((prev) => !prev);
  };

  const handleSidebarHoverStart = () => {
    if (isSidebarCollapsed) {
      setIsHoverExpanded(true);
      setIsSidebarCollapsed(false);
    }
  };

  const handleSidebarHoverEnd = () => {
    if (isHoverExpanded) {
      setIsHoverExpanded(false);
      setIsSidebarCollapsed(true);
    }
  };

  return (
    <div className="min-h-svh bg-muted/20 text-foreground">
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        isCollapsed={isSidebarCollapsed}
        onToggleMobileMenu={setIsMobileMenuOpen}
        onHoverStart={handleSidebarHoverStart}
        onHoverEnd={handleSidebarHoverEnd}
      />

      <div
        className={cn(
          'flex min-h-svh flex-col transition-[margin] duration-200',
          isSidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-64',
        )}
      >
        <Header
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleCollapse}
          onToggleMobileMenu={handleToggleMobileMenu}
        />

        <main className="flex-1 px-4 py-6 lg:p-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
