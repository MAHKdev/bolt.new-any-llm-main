import { ChoresScreen } from '@/components/screens/ChoresScreen';
import { Suspense } from 'react';

export default function TasksPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChoresScreen />
    </Suspense>
  );
}