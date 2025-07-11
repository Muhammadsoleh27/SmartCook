// app/JotaiProviderWrapper.tsx
'use client'; // <-- CRUCIAL: Makes this a client component

import { Provider } from 'jotai';
import React from 'react';

export default function JotaiProviderWrapper({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}