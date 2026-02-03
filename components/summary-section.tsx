'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SummarySectionProps {
  metrics: {
    overallAccuracy: number;
    overallF1: number;
  };
}

export default function SummarySection({ metrics }: SummarySectionProps) {
  const comparisonData = [
    {
      model: 'ResNet50',
      accuracy: 92,
      f1: 91.5,
    },
    {
      model: 'ViT',
      accuracy: 94,
      f1: 93.5,
    },
    {
      model: 'Random Forest',
      accuracy: 88,
      f1: 88,
    },
    {
      model: 'Soft Voting',
      accuracy: 91.3,
      f1: 91,
    },
  ];

  return (
    <div className="space-y-8 rounded-xl border border-border bg-card p-8">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Final Evaluation Summary
        </h2>
        <p className="text-muted-foreground">
          System-level evaluation metrics after soft voting ensemble
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg bg-muted/50 p-6 border border-border">
          <p className="text-sm text-muted-foreground mb-3">Overall System Accuracy</p>
          <p className="text-4xl font-bold text-primary mb-4">
            {(metrics.overallAccuracy * 100).toFixed(1)}%
          </p>
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${metrics.overallAccuracy * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Combined performance across all models
          </p>
        </div>

        <div className="rounded-lg bg-muted/50 p-6 border border-border">
          <p className="text-sm text-muted-foreground mb-3">Overall F1-Score</p>
          <p className="text-4xl font-bold text-secondary mb-4">
            {(metrics.overallF1 * 100).toFixed(1)}%
          </p>
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary transition-all"
              style={{ width: `${metrics.overallF1 * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Balance between precision and recall
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Model Performance Comparison
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={comparisonData}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="model" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
              }}
              formatter={(value) => `${value}%`}
            />
            <Legend />
            <Bar dataKey="accuracy" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="f1" fill="var(--color-secondary)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="p-6 rounded-lg bg-muted/30 border border-border">
        <h3 className="font-semibold text-foreground mb-3">Key Insights</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="text-primary font-bold mt-0.5">•</span>
            <span>Soft voting ensemble achieves competitive accuracy by combining diverse model architectures.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-secondary font-bold mt-0.5">•</span>
            <span>Vision Transformer demonstrates highest individual accuracy, excelling at global image features.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-accent font-bold mt-0.5">•</span>
            <span>Ensemble approach improves classification stability and reduces individual model bias.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
