'use client';

import { ReactNode } from 'react';
import { Home, QrCode, BarChart3, User, Heart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/scan', icon: QrCode, label: 'Scan' },
    { href: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { href: '/favorites', icon: Heart, label: 'Favorites' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <header className="glass-card rounded-none border-b border-white border-opacity-10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🌱</span>
            </div>
            <h1 className="text-xl font-bold text-fg">PlantPal</h1>
          </div>
          <div className="w-8 h-8 bg-surface rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-text-secondary" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="glass-card rounded-none border-t border-white border-opacity-10 px-6 py-3">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'nav-item',
                  isActive && 'active'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
