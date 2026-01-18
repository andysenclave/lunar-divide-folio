'use client';

import { MainLayout } from '@/components/layout';
import { AnimationProvider } from '@/context';

export default function Page() {
  return (
    <AnimationProvider>
      <MainLayout />
    </AnimationProvider>
  );
}
