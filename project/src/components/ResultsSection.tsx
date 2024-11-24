import React from 'react';
import { Wrench, Video, ClipboardList, Star } from 'lucide-react';

interface ResultsSectionProps {
  results: string | null;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ results }) => {
  if (!results) return null;

  const sections = results.split(/(?:MATERIALS:|STEPS:|TIPS:)/).filter(Boolean);
  const [materials = '', steps = '', tips = ''] = sections.map(s => s.trim());

  const materialsList = materials.split('\n').filter(Boolean);
  const stepsList = steps.split('\n').filter(Boolean);
  const tipsList = tips.split('\n').filter(Boolean);

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-purple-100 hover:transform hover:scale-105 transition-all">
          <div className="flex items-center mb-4">
            <Wrench className="w-6 h-6 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold">Required Materials</h3>
          </div>
          <ul className="space-y-3 text-gray-700">
            {materialsList.map((material, index) => (
              <li key={index} className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                <span>{material}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-purple-100 hover:transform hover:scale-105 transition-all">
          <div className="flex items-center mb-4">
            <ClipboardList className="w-6 h-6 text-pink-600 mr-2" />
            <h3 className="text-lg font-semibold">Learning Steps</h3>
          </div>
          <ol className="space-y-3 text-gray-700">
            {stepsList.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="font-medium mr-2">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-purple-100 hover:transform hover:scale-105 transition-all">
          <div className="flex items-center mb-4">
            <Video className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold">Tips & Techniques</h3>
          </div>
          <div className="space-y-3 text-gray-700">
            {tipsList.map((tip, index) => (
              <p key={index} className="text-sm">{tip}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}