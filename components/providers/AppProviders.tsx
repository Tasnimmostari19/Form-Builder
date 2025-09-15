"use client";

import { QueryProvider } from "./QueryProvider";
import { DndProvider } from "./DndProvider";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <DndProvider>{children}</DndProvider>
    </QueryProvider>
  );
}
