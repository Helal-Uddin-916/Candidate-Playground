import React from 'react';
import Profile from './components/Profile';
import Projects from './components/Projects';
import Search from './components/Search';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <Profile />
        <Projects />
        <Search />
      </div>
    </div>
  );
}
