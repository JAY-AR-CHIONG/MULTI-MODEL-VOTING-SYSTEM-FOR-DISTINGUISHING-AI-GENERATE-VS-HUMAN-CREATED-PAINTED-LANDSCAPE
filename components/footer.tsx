export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 mt-20 py-12">
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              AI vs Human Image Detection
            </h3>
            <p className="text-sm text-muted-foreground">
              Multimodel Machine Learning Evaluation System
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-8 border-y border-border">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Architecture</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>ResNet50 - CNN</li>
                <li>Vision Transformer - ViT</li>
                <li>Random Forest - Ensemble</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Evaluation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Accuracy</li>
                <li>Precision & Recall</li>
                <li>F1-Score</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Method</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Soft Voting</li>
                <li>Ensemble Learning</li>
                <li>Weighted Average</li>
              </ul>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Thesis System. All rights reserved.</p>
            <p className="mt-2">Research-grade evaluation system for AI-generated image detection.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
