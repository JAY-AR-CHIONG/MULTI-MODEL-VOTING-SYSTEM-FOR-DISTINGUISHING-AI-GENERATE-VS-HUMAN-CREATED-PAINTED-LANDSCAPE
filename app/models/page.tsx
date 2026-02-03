'use client';

import Navigation from '@/components/navigation';
import TrainingSection from '@/components/training-section';
import Footer from '@/components/footer';

export default function ModelsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Model Management</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Configure, train, and manage the AI vs Human image detection models. Each model has its own training pipeline and hyperparameter settings.
          </p>
        </div>

        <TrainingSection />
      </div>
      <Footer />
    </main>
  );
}
