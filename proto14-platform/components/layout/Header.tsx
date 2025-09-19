'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/hooks/useLanguage';
import {
  ClipboardList,
  ShoppingCart,
  History,
  Users,
  Settings,
  Globe,
  ChevronDown
} from 'lucide-react';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { icon: ClipboardList, key: 'tooltip_arrangement_list' as const, href: '/procurement-list' },
    { icon: ShoppingCart, key: 'tooltip_cart' as const, href: '/cart' },
    { icon: History, key: 'tooltip_order_history' as const, href: '/order-history' },
    { icon: Users, key: 'tooltip_partners' as const, href: '/partners' },
    { icon: Settings, key: 'tooltip_settings' as const, href: '/settings' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            {t('siteTitle')}
          </Link>

          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-colors"
                  title={t(item.key)}
                >
                  <item.icon className="w-5 h-5" />
                </Link>
              ))}
            </nav>

            <div className="relative">
              <button
                onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}
                className="flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Globe className="w-4 h-4 mr-2" />
                <span>{language === 'ja' ? '日本語' : 'English'}</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}