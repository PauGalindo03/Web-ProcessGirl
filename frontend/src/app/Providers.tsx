// src/app/Providers.tsx
'use client';

import { AlertaProvider } from '@/context/AlertaContext';
import { AuthProvider } from '@/context/AuthContext';
import { CarritoProvider } from '@/context/CarritoContext';
import { CurrencyProvider } from '@/context/CurrenciesContext';
import { UIProvider } from '@/context/UIContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AlertaProvider>
      <UIProvider>
        <AuthProvider>
          <CarritoProvider>
            <CurrencyProvider>{children}</CurrencyProvider>
          </CarritoProvider>
        </AuthProvider>
      </UIProvider>
    </AlertaProvider>
  );
}
