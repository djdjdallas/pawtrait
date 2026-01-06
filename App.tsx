import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { UploadStage } from './components/UploadStage';
import { StyleStage } from './components/StyleStage';
import { ProcessingStage } from './components/ProcessingStage';
import { ResultStage } from './components/ResultStage';
import { AppStage, PetImage, PortraitStyle, GeneratedResult } from './types';
import { generatePetPortrait, generatePetTraits } from './services/geminiService';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>('upload');
  const [petImage, setPetImage] = useState<PetImage | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<PortraitStyle | null>(null);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = (base64: string, file: File) => {
    setPetImage({
      base64,
      file,
      originalUrl: URL.createObjectURL(file)
    });
    setStage('style');
  };

  const handleStyleSelect = (style: PortraitStyle) => {
    setSelectedStyle(style);
  };

  const handleBackToUpload = () => {
    setPetImage(null);
    setStage('upload');
  };

  const handleGenerate = async () => {
    if (!petImage || !selectedStyle) return;

    setStage('processing');
    setError(null);

    try {
      // Parallel execution for image generation and trait analysis
      const [imageUrl, traits] = await Promise.all([
        generatePetPortrait(petImage.base64, selectedStyle),
        generatePetTraits(petImage.base64)
      ]);

      setResult({
        imageUrl,
        traits
      });
      setStage('result');
    } catch (err) {
      console.error(err);
      setError("We encountered an artistic block. Please verify your API Key or try a different image.");
      setStage('style');
    }
  };

  const handleReset = () => {
    setStage('upload');
    setPetImage(null);
    setSelectedStyle(null);
    setResult(null);
    setError(null);
  };

  return (
    <Layout>
      {error && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-red-50 text-red-900 border border-red-200 px-6 py-4 shadow-lg animate-in slide-in-from-top-4">
          <p className="font-serif italic">{error}</p>
          <button onClick={() => setError(null)} className="text-xs uppercase mt-2 underline">Dismiss</button>
        </div>
      )}

      {stage === 'upload' && (
        <UploadStage onImageSelected={handleImageSelected} />
      )}

      {stage === 'style' && petImage && (
        <StyleStage 
          selectedStyle={selectedStyle}
          onSelectStyle={handleStyleSelect}
          onNext={handleGenerate}
          onBack={handleBackToUpload}
          previewImage={petImage.base64}
        />
      )}

      {stage === 'processing' && (
        <ProcessingStage />
      )}

      {stage === 'result' && result && selectedStyle && (
        <ResultStage 
          result={result}
          style={selectedStyle}
          onReset={handleReset}
        />
      )}
    </Layout>
  );
};

export default App;
