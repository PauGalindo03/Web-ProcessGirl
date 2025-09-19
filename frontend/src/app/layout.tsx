// src/app/layout.tsx
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';
import type { ReactNode } from 'react';

import { Providers } from './Providers';

import { Header, Footer } from '@/components';

export const metadata = {
  title: 'Process Girl',
  description: 'Tu tienda digital',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head />
      <body className="layout-body">
        <Providers>
          <div id="app-root">
            <div className="layout-wrapper">
              <Header />
              <main className="layout-main">{children}</main>
              <Footer />
            </div>
          </div>
          <div id="modal-root" />
        </Providers>
      </body>
    </html>
  );
}
