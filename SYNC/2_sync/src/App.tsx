import React from 'react';
import { usePathname } from 'next/navigation';
import { Award } from 'lucide-react';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './screens/HomeScreen';
import { RewardsScreen } from './screens/RewardsScreen';
import { ChoresScreen } from './screens/ChoresScreen';
import { ChildProvider } from './contexts/ChildContext';

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Award className="w-8 h-8 text-indigo-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">KidsReward</h1>
        </div>
      </div>
    </header>
  );
}

function AppContent() {
  const pathname = usePathname();
  
  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {pathname === '/home' && <HomeScreen />}
        {pathname === '/rewards' && <RewardsScreen />}
        {pathname === '/tasks' && <ChoresScreen />}
      </main>
      <BottomNav currentPath={pathname} />
    </div>
  );
}

function App() {
  return (
    <ChildProvider>
      <AppContent />
    </ChildProvider>
  );
}

export default App;