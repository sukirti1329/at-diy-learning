import React, { useState } from 'react';
import { Header } from './components/Header';
import { UploadSection } from './components/UploadSection';
import { InputForm } from './components/InputForm';
import { ResultsSection } from './components/ResultsSection';

function App() {
  const [results, setResults] = useState<string | null>(null);

  const handleResults = (data: string) => {
    setResults(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div 
        className="fixed inset-0 -z-10 opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-4">
            Turn Art & Craft Ideas Into Action – Learn DIY Your Way!
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover amazing DIY projects, get personalized guidance, and bring your creative ideas to life
            with AI-powered learning assistance.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <UploadSection onResults={handleResults} />
          <div className="text-center text-gray-500 text-lg font-medium">- OR -</div>
          <InputForm onResults={handleResults} />
          <ResultsSection results={results} />
        </div>
      </main>

      <footer className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 DIY Learning Kit. Empowering creativity through guided learning.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;