import type { Metadata } from 'next';
import Navbar from './components/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'F1 Hub',
  description: 'Dashboard de datos en vivo de Fórmula 1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
