'use client';

import { useState } from 'react';
import { MainLayout, Preloader } from '@/components/layout';
import { AnimationProvider } from '@/context';

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AnimationProvider>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <MainLayout />
    </AnimationProvider>
  );
}
