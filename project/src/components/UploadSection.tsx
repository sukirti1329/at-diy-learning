import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, Loader } from 'lucide-react';
import { analyzeImage } from '../lib/openai';
import { ErrorMessage } from './ErrorMessage';

export const UploadSection = ({ onResults }: { onResults: (data: string) => void }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setIsProcessing(true);
    setError(null);
    
    try {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      
      reader.onload = async () => {
        try {
          const base64Image = reader.result as string;
          const results = await analyzeImage(base64Image);
          onResults(results || '');
        } catch (error) {
          setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        } finally {
          setIsProcessing(false);
        }
      };

      reader.onerror = () => {
        setError('Failed to read the image file');
        setIsProcessing(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setIsProcessing(false);
    }
  }, [onResults]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    disabled: isProcessing,
    maxFiles: 1
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
          ${isDragActive ? 'border-purple-500 bg-purple-50' : 'border-purple-200 hover:border-purple-400'}
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
          bg-white/80 backdrop-blur-sm`}
      >
        <input {...getInputProps()} />
        {isProcessing ? (
          <Loader className="w-12 h-12 mx-auto text-purple-500 animate-spin" />
        ) : (
          <ImageIcon className="w-12 h-12 mx-auto text-purple-400" />
        )}
        <p className="mt-4 text-lg text-gray-700">
          {isProcessing
            ? 'Analyzing your image...'
            : isDragActive
            ? 'Drop your image here...'
            : 'Upload a picture of a DIY project you would like to learn'}
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Our AI will analyze your image and provide detailed instructions
        </p>
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  );
};