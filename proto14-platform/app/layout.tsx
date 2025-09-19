import type { Metadata } from 'next'
import { Inter, Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/hooks/useLanguage'
import Header from '@/components/layout/Header'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
})

export const metadata: Metadata = {
  title: 'Proto 14 - ワンストップ調達プラットフォーム',
  description: '製造業向けワンストップ調達プラットフォーム',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className="font-sans bg-gray-50 text-gray-800">
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}