'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from '@/lib/theme-context';
import { useAuth } from '@/lib/auth';
import { 
  Home, Users, X, Settings, LogOut, ChevronLeft, ChevronRight,
  MessageSquare, Shield, Layers, TrendingUp, Folder, Award,
  FileCheck, ChevronUp, ChevronDown, User as UserIcon, Globe, Sparkles,
  Building2, Radio, Newspaper, Sliders, Quote, Package
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Article, FormatQuote, Work } from '@mui/icons-material';

interface MenuItem {
  name: string;
  href: string;
  tabKey?: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const menuItems: MenuItem[] = [
  { name: 'Dashboard Overview', href: '/admin', icon: Home },
  { name: 'Solutions Pillars', href: '/admin?tab=solutions', tabKey: 'solutions', icon: Radio },
  { name: 'Products Catalog', href: '/admin?tab=products', tabKey: 'products', icon: Package },
  { name: 'Projects Portfolio', href: '/admin?tab=projects', tabKey: 'projects', icon: Folder },
  { name: 'Partners Ecosystem', href: '/admin?tab=partners', tabKey: 'partners', icon: Building2 },
  { name: 'Licenses & Accreditations', href: '/admin?tab=licenses', tabKey: 'licenses', icon: Award },
  { name: 'News & Press Releases', href: '/admin?tab=news', tabKey: 'news', icon: Newspaper },
  { name: 'Client Testimonials', href: '/admin?tab=testimonials', tabKey: 'testimonials', icon: Quote },
  { name: 'Corporate Settings', href: '/admin?tab=settings', tabKey: 'settings', icon: Sliders },
  { name: 'Inquiries & Requests', href: '/admin/feedback', icon: MessageSquare },
  { name: 'Live Website', href: '/', icon: Globe },
];

export default function AdminSidebar({ 
  isOpen = false, 
  onClose = () => {}, 
  isCollapsed = false,
  onToggleCollapse = () => {} 
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  
  const [mounted, setMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const currentTab = searchParams.get('tab') || '';

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const isItemActive = (item: MenuItem) => {
    if (item.tabKey) {
      if (item.tabKey === 'licenses') {
        return pathname === '/admin' && (currentTab === 'licenses' || currentTab === 'certifications');
      }
      if (item.tabKey === 'news') {
        return pathname === '/admin' && (currentTab === 'news' || currentTab === 'blog');
      }
      return pathname === '/admin' && currentTab === item.tabKey;
    }
    if (item.href === '/admin') {
      return pathname === '/admin' && !currentTab;
    }
    return pathname === item.href;
  };

  if (!mounted) return null;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-xs" 
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div className={cn(
        "h-full flex flex-col justify-between py-4 px-3 border-r transition-all duration-300 relative",
        theme === 'dark' 
          ? 'bg-[#0a192f] border-slate-800 text-gray-200' 
          : 'bg-white border-gray-200 text-gray-800',
        isCollapsed ? 'w-20' : 'w-64'
      )}>
        {/* Top: Logo & Title */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2 pb-3 border-b border-gray-200 dark:border-slate-800">
            <Link href="/admin" className="flex items-center gap-2.5 overflow-hidden">
              <div className="relative w-8 h-8 flex-shrink-0 bg-white rounded-lg p-0.5 border border-blue-500/20">
                <Image
                  src="/logo.png"
                  alt="LUCYCOM Logo"
                  fill
                  className="object-contain"
                  sizes="32px"
                />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="font-extrabold text-sm text-blue-600 dark:text-white tracking-wider">
                    LUCYCOM
                  </span>
                  <span className="text-[9px] font-bold text-sky-500 uppercase tracking-widest -mt-0.5">
                    ADMIN PORTAL
                  </span>
                </div>
              )}
            </Link>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="p-1 rounded-lg lg:hidden hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {menuItems.map((item, idx) => {
              const active = isItemActive(item);
              const Icon = item.icon;

              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => {
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200",
                    active
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 font-bold"
                      : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400",
                    isCollapsed && "justify-center px-2"
                  )}
                  title={item.name}
                >
                  <Icon className={cn("w-4 h-4 flex-shrink-0", active ? "text-white" : "")} />
                  {!isCollapsed && <span className="truncate">{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Area */}
        <div className="pt-3 border-t border-gray-200 dark:border-slate-800 space-y-2">
          {!isCollapsed && (
            <div className="px-2 py-1.5 rounded-xl bg-gray-50 dark:bg-slate-800/60 text-xs">
              <p className="font-bold text-gray-900 dark:text-white truncate">{user?.name || 'Administrator'}</p>
              <p className="text-[10px] text-blue-600 dark:text-sky-400 font-mono truncate">{user?.email || 'admin@lucycom.com'}</p>
            </div>
          )}

          <button
            onClick={handleLogout}
            className={cn(
              "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer",
              isCollapsed && "justify-center"
            )}
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>

        {/* Collapse toggle button */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex absolute -right-3 top-16 items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-all z-50 cursor-pointer"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>
    </>
  );
}
