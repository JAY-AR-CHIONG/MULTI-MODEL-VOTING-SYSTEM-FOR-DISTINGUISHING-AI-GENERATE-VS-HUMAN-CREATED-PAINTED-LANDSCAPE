'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

interface EvaluationPanelProps {
  evaluation: ModelEvaluation;
  model: string;
}

export default function EvaluationPanel({ evaluation, model }: EvaluationPanelProps) {
  const metricsData = [
    { name: 'Accuracy', value: Math.round(evaluation.accuracy * 100) },
    { name: 'Precision', value: Math.round(evaluation.precision * 100) },
    { name: 'Recall', value: Math.round(evaluation.recall * 100) },
    { name: 'F1-Score', value: Math.round(evaluation.f1Score * 100) },
  ];

  const confusionMatrix = [
    { label: 'True Positive', value: '1247', color: 'bg-primary' },
    { label: 'False Positive', value: '156', color: 'bg-accent' },
    { label: 'False Negative', value: '89', color: 'bg-secondary' },
    { label: 'True Negative', value: '1308', color: 'bg-muted' },
  ];

  return (
    <div className="space-y-8 rounded-xl border border-border bg-card p-8">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          {evaluation.name} - Evaluation Metrics
        </h2>
        <p className="text-muted-foreground">{evaluation.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Accuracy', value: evaluation.accuracy },
          { label: 'Precision', value: evaluation.precision },
          { label: 'Recall', value: evaluation.recall },
          { label: 'F1-Score', value: evaluation.f1Score },
        ].map((metric) => (
          <div key={metric.label} className="rounded-lg bg-muted/50 p-4 border border-border">
            <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
            <p className="text-3xl font-bold text-primary">
              {(metric.value * 100).toFixed(1)}%
            </p>
            <div className="mt-3 h-1 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${metric.value * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Performance Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={metricsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
              }}
              formatter={(value) => `${value}%`}
            />
            <Bar dataKey="value" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-border">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Confusion Matrix</h3>
          <div className="grid grid-cols-2 gap-3">
            {confusionMatrix.map((item) => (
              <div key={item.label} className="rounded-lg border border-border p-4">
                <p className="text-xs text-muted-foreground mb-2">{item.label}</p>
                <p className="text-2xl font-bold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-4 p-6 rounded-lg bg-muted/30 border border-border">
          <h3 className="text-lg font-semibold text-foreground">Model Prediction</h3>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Prediction Result</p>
            <p
              className={`text-3xl font-bold ${
                evaluation.prediction === 'AI-Generated' ? 'text-accent' : 'text-primary'
              }`}
            >
              {evaluation.prediction}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Confidence Score</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-primary">{evaluation.confidence}%</p>
            </div>
            <div className="mt-3 h-2 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${evaluation.confidence}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
