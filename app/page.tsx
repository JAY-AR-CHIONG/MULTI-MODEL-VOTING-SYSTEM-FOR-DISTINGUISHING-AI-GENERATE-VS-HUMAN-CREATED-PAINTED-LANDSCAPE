'use client';

import { useState } from 'react';
import Navigation from '@/components/navigation';
import ImageUploadPanel from '@/components/image-upload-panel';
import ModelCards from '@/components/model-cards';
import EvaluationPanel from '@/components/evaluation-panel';
import EnsembleResult from '@/components/ensemble-result';
import SummarySection from '@/components/summary-section';
import Footer from '@/components/footer';
import TrainingSection from '@/components/training-section'; // Declared the TrainingSection component

type ModelType = 'resnet50' | 'vit' | 'random-forest';

interface ModelEvaluation {
  name: string;
  description: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  prediction: 'AI-Generated' | 'Human-Made';
  confidence: number;
  status: 'completed' | 'processing';
}

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelType | null>(null);
  const [modelEvaluations, setModelEvaluations] = useState<Record<ModelType, ModelEvaluation>>({
    resnet50: {
      name: 'ResNet50',
      description: 'CNN-based image feature extractor. Focus on spatial and texture patterns.',
      accuracy: 0.92,
      precision: 0.89,
      recall: 0.94,
      f1Score: 0.915,
      prediction: 'AI-Generated',
      confidence: 87,
      status: 'completed',
    },
    vit: {
      name: 'Vision Transformer (ViT)',
      description: 'Transformer-based global image understanding. Patch-based attention visualization.',
      accuracy: 0.94,
      precision: 0.91,
      recall: 0.96,
      f1Score: 0.935,
      prediction: 'AI-Generated',
      confidence: 91,
      status: 'completed',
    },
    'random-forest': {
      name: 'Random Forest',
      description: 'Classical ML classifier. Uses extracted image features.',
      accuracy: 0.88,
      precision: 0.85,
      recall: 0.91,
      f1Score: 0.88,
      prediction: 'Human-Made',
      confidence: 79,
      status: 'completed',
    },
  });

  const handleImageUpload = (imageData: string) => {
    setUploadedImage(imageData);
  };

  const handleAnalysis = async () => {
    setIsProcessing(true);
    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
  };

  const ensembleResult = {
    prediction: 'AI-Generated',
    confidence: 86,
    weights: {
      resnet50: 0.33,
      vit: 0.33,
      'random-forest': 0.34,
    },
  };

  const summaryMetrics = {
    overallAccuracy: 0.913,
    overallF1: 0.91,
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <ImageUploadPanel
          onImageUpload={handleImageUpload}
          uploadedImage={uploadedImage}
          isProcessing={isProcessing}
          onAnalysis={handleAnalysis}
        />

        {uploadedImage && (
          <>
            <div className="mt-16">
              <h2 className="text-3xl font-semibold text-foreground mb-8">Model Evaluations</h2>
              <ModelCards
                evaluations={modelEvaluations}
                selectedModel={selectedModel}
                onSelectModel={setSelectedModel}
              />
            </div>

            {selectedModel && (
              <div className="mt-12">
                <EvaluationPanel evaluation={modelEvaluations[selectedModel]} model={selectedModel} />
              </div>
            )}

            <div className="mt-16">
              <EnsembleResult ensemble={ensembleResult} />
            </div>

            <div className="mt-16">
              <SummarySection metrics={summaryMetrics} />
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
