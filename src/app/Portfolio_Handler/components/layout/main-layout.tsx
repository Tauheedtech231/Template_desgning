'use client';
import { Sidebar } from './sidebar';
import { Navbar } from './navbar';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Sidebar />
      <div className="flex-1 flex flex-col transition-colors duration-500">
        <Navbar />
        <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
          {children}
        </main>
      </div>
    </div>
  );
}
