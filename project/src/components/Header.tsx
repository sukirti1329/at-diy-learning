import React from 'react';
import { Palette, Lightbulb } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Palette className="h-8 w-8" />
            <h1 className="text-2xl font-bold">DIY Learning Kit</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Lightbulb className="h-6 w-6" />
            <span className="font-medium">Creative Learning Hub</span>
          </div>
        </div>
      </div>
    </header>
  );
}