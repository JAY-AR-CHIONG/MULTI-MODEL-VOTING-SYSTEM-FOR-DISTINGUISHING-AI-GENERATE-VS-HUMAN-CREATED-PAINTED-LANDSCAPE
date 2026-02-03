export default function Navigation() {
  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">
              AI vs Human Image Detection
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Multimodel Evaluation System
            </p>
            <p className="text-xs text-muted-foreground mt-2 flex flex-wrap gap-4">
              <span className="font-mono">ResNet50</span>
              <span className="font-mono">Vision Transformer (ViT)</span>
              <span className="font-mono">Random Forest</span>
              <span className="font-mono">Soft Voting</span>
            </p>
          </div>
          <nav className="flex gap-6 text-sm font-medium text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors">
              Home
            </a>
            <a href="/models" className="hover:text-primary transition-colors">
              Models
            </a>
            <a href="/" className="hover:text-primary transition-colors">
              Evaluation
            </a>
            <a href="/" className="hover:text-primary transition-colors">
              Results
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
