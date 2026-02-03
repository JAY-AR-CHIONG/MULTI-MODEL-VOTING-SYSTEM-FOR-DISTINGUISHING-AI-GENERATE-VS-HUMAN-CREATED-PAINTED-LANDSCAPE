'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';

interface TrainingConfig {
  model: string;
  epochs: number;
  batchSize: number;
  learningRate: number;
  optimizer: string;
  lossFunction: string;
  dataAugmentation: boolean;
  currentEpoch?: number;
  isTraining?: boolean;
}

interface TrainingMetrics {
  trainingLoss: number;
  validationLoss: number;
  trainingAccuracy: number;
  validationAccuracy: number;
}

interface ModelTraining {
  config: TrainingConfig;
  metrics: TrainingMetrics;
}

export default function TrainingSection() {
  const [trainingStates, setTrainingStates] = useState<Record<string, boolean>>({
    resnet50: false,
    vit: false,
    'random-forest': false,
  });

  const [trainingSessions, setTrainingSessions] = useState<Record<string, ModelTraining>>({
    resnet50: {
      config: {
        model: 'ResNet50',
        epochs: 50,
        batchSize: 32,
        learningRate: 0.001,
        optimizer: 'Adam',
        lossFunction: 'CrossEntropyLoss',
        dataAugmentation: true,
        currentEpoch: 42,
        isTraining: false,
      },
      metrics: {
        trainingLoss: 0.156,
        validationLoss: 0.189,
        trainingAccuracy: 0.94,
        validationAccuracy: 0.92,
      },
    },
    vit: {
      config: {
        model: 'Vision Transformer (ViT)',
        epochs: 40,
        batchSize: 16,
        learningRate: 0.0005,
        optimizer: 'AdamW',
        lossFunction: 'CrossEntropyLoss',
        dataAugmentation: true,
        currentEpoch: 40,
        isTraining: false,
      },
      metrics: {
        trainingLoss: 0.128,
        validationLoss: 0.156,
        trainingAccuracy: 0.96,
        validationAccuracy: 0.94,
      },
    },
    'random-forest': {
      config: {
        model: 'Random Forest',
        epochs: 1,
        batchSize: 100,
        learningRate: 0,
        optimizer: 'N/A',
        lossFunction: 'Gini',
        dataAugmentation: false,
        currentEpoch: 1,
        isTraining: false,
      },
      metrics: {
        trainingLoss: 0.213,
        validationLoss: 0.267,
        trainingAccuracy: 0.91,
        validationAccuracy: 0.88,
      },
    },
  });

  const toggleTraining = (modelKey: string) => {
    setTrainingStates((prev) => ({
      ...prev,
      [modelKey]: !prev[modelKey],
    }));

    setTrainingSessions((prev) => ({
      ...prev,
      [modelKey]: {
        ...prev[modelKey],
        config: {
          ...prev[modelKey].config,
          isTraining: !prev[modelKey].config.isTraining,
        },
      },
    }));
  };

  const models = ['resnet50', 'vit', 'random-forest'];

  return (
    <section className="mt-16 mb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-foreground mb-2">Model Training</h2>
        <p className="text-muted-foreground">
          Configure and monitor training parameters for each model
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {models.map((modelKey) => {
          const session = trainingSessions[modelKey];
          const config = session.config;
          const metrics = session.metrics;
          const isTraining = trainingStates[modelKey];

          return (
            <Card key={modelKey} className="bg-card border-border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{config.model}</h3>
                  {isTraining && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 rounded-full text-sm text-accent">
                      <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                      Training in progress
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                {isTraining && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">
                        Epoch {config.currentEpoch}/{config.epochs}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {Math.round(((config.currentEpoch || 0) / config.epochs) * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                        style={{
                          width: `${((config.currentEpoch || 0) / config.epochs) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Configuration Grid */}
                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Hyperparameters</span>
                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Epochs:</span>
                        <span className="font-medium text-foreground">{config.epochs}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Batch Size:</span>
                        <span className="font-medium text-foreground">{config.batchSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Learning Rate:</span>
                        <span className="font-medium text-foreground">{config.learningRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Optimizer:</span>
                        <span className="font-medium text-foreground">{config.optimizer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Loss Function:</span>
                        <span className="font-medium text-foreground">{config.lossFunction}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Data Augmentation:</span>
                        <span className="font-medium text-foreground">{config.dataAugmentation ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Training Metrics */}
                <div className="space-y-4 mb-6">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider block">Current Metrics</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="text-xs text-muted-foreground mb-1">Train Loss</div>
                      <div className="text-lg font-semibold text-foreground">{metrics.trainingLoss.toFixed(3)}</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="text-xs text-muted-foreground mb-1">Val Loss</div>
                      <div className="text-lg font-semibold text-foreground">{metrics.validationLoss.toFixed(3)}</div>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-3">
                      <div className="text-xs text-muted-foreground mb-1">Train Acc</div>
                      <div className="text-lg font-semibold text-primary">{(metrics.trainingAccuracy * 100).toFixed(1)}%</div>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-3">
                      <div className="text-xs text-muted-foreground mb-1">Val Acc</div>
                      <div className="text-lg font-semibold text-primary">{(metrics.validationAccuracy * 100).toFixed(1)}%</div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  onClick={() => toggleTraining(modelKey)}
                  variant={isTraining ? 'destructive' : 'default'}
                  className="w-full"
                  size="sm"
                >
                  {isTraining ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause Training
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Training
                    </>
                  )}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
