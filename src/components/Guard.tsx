'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthed } from '@/lib/auth';

export default function Guard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!isAuthed() && pathname !== '/login') {
      router.replace('/login');
    }
  }, [router, pathname]);
  return <>{children}</>;
}