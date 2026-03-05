'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Calendario', href: '/calendar' },
  { label: 'Equipos', href: '/teams' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-20 w-full border-b"
      style={{
        backgroundColor: 'rgba(24,17,18,0.92)',
        borderColor: 'var(--color-border)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="mx-auto flex h-[52px] max-w-[1440px] items-center gap-8 px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span
            className="text-[15px] font-bold tracking-wide uppercase"
            style={{ color: 'var(--color-text)' }}
          >
            F1 HUB
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium transition-colors"
                style={{ color: active ? 'var(--color-text)' : 'var(--color-muted)' }}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
