'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

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

interface ModelCardsProps {
  evaluations: Record<string, ModelEvaluation>;
  selectedModel: string | null;
  onSelectModel: (model: string) => void;
}

export default function ModelCards({
  evaluations,
  selectedModel,
  onSelectModel,
}: ModelCardsProps) {
  const models = Object.entries(evaluations);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {models.map(([key, evaluation]) => (
        <div
          key={key}
          onClick={() => onSelectModel(key)}
          className={`group rounded-xl border transition-all cursor-pointer p-6 ${
            selectedModel === key
              ? 'border-primary bg-primary/5 shadow-lg'
              : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
          }`}
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-2">{evaluation.name}</h3>
            <Badge
              variant={evaluation.status === 'completed' ? 'default' : 'secondary'}
              className="mb-3"
            >
              {evaluation.status === 'completed' ? 'Completed' : 'Processing'}
            </Badge>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {evaluation.description}
            </p>
          </div>

          <div className="space-y-3 mb-6 pt-4 border-t border-border">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Accuracy</span>
              <span className="font-semibold text-foreground">{(evaluation.accuracy * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">F1-Score</span>
              <span className="font-semibold text-foreground">{(evaluation.f1Score * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Prediction</span>
              <span className={`font-semibold ${
                evaluation.prediction === 'AI-Generated' ? 'text-accent' : 'text-primary'
              }`}>
                {evaluation.prediction}
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full group-hover:border-primary bg-transparent"
            onClick={() => onSelectModel(key)}
          >
            View Model Evaluation
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      ))}
    </div>
  );
}
