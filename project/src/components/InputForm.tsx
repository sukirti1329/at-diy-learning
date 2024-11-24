import React, { useState } from 'react';
import { Send, Loader } from 'lucide-react';
import { analyzeText } from '../lib/openai';
import { ErrorMessage } from './ErrorMessage';

export const InputForm = ({ onResults }: { onResults: (data: string) => void }) => {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const results = await analyzeText(description);
      onResults(results || '');
      setDescription('');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-purple-100">
        <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">
          What would you like to create today?
        </label>
        <textarea
          id="description"
          rows={4}
          className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          placeholder="E.g., I want to learn how to make a wooden birdhouse..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && <ErrorMessage message={error} />}
        <button
          type="submit"
          disabled={isLoading || !description.trim()}
          className="mt-4 inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <Loader className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Send className="w-5 h-5 mr-2" />
          )}
          Get AI Guidance
        </button>
      </div>
    </form>
  );
};