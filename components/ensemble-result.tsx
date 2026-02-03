'use client';

interface EnsembleResultProps {
  ensemble: {
    prediction: 'AI-Generated' | 'Human-Made';
    confidence: number;
    weights: {
      resnet50: number;
      vit: number;
      'random-forest': number;
    };
  };
}

export default function EnsembleResult({ ensemble }: EnsembleResultProps) {
  const modelProbabilities = [
    { name: 'ResNet50', aiProb: 87, humanProb: 13 },
    { name: 'Vision Transformer (ViT)', aiProb: 91, humanProb: 9 },
    { name: 'Random Forest', aiProb: 79, humanProb: 21 },
  ];

  return (
    <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5 p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Soft Voting Ensemble Result
        </h2>
        <p className="text-muted-foreground">
          Predictions from ResNet50, ViT, and Random Forest are combined using soft voting to
          produce the final classification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Individual Model Probabilities</h3>
          {modelProbabilities.map((model) => (
            <div key={model.name} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-foreground font-medium">{model.name}</span>
                <span className="text-xs text-muted-foreground">
                  AI: {model.aiProb}% | Human: {model.humanProb}%
                </span>
              </div>
              <div className="flex h-3 rounded-full overflow-hidden bg-border">
                <div
                  className="bg-accent transition-all"
                  style={{ width: `${model.aiProb}%` }}
                  title="AI-Generated probability"
                />
                <div
                  className="bg-primary"
                  style={{ width: `${model.humanProb}%` }}
                  title="Human-Made probability"
                />
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-primary/20">
            <h4 className="text-sm font-semibold text-foreground mb-3">Ensemble Weights</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ResNet50</span>
                <span className="font-mono font-semibold text-foreground">
                  {(ensemble.weights.resnet50 * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ViT</span>
                <span className="font-mono font-semibold text-foreground">
                  {(ensemble.weights.vit * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Random Forest</span>
                <span className="font-mono font-semibold text-foreground">
                  {(ensemble.weights['random-forest'] * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-6 rounded-lg border border-primary/20 bg-card p-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Final Ensemble Decision</p>
            <p
              className={`text-4xl font-bold ${
                ensemble.prediction === 'AI-Generated' ? 'text-accent' : 'text-primary'
              }`}
            >
              {ensemble.prediction}
            </p>
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">Overall Confidence Score</p>
            <div className="flex items-baseline gap-3">
              <p className="text-3xl font-bold text-primary">{ensemble.confidence}%</p>
            </div>
            <div className="mt-4 h-3 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                style={{ width: `${ensemble.confidence}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-2 italic">
            Soft voting improves classification stability and reduces individual model bias.
          </p>
        </div>
      </div>
    </div>
  );
}
