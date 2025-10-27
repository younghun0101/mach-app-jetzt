import { CheckSquare } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
            <CheckSquare className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Pro-Check</h1>
            <p className="text-sm text-muted-foreground">
              Ihre professionelle Aufgabenverwaltung
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
