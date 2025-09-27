import { BrainCircuit } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2" aria-label="Alumbra logo">
      <BrainCircuit className="h-7 w-7 text-primary" />
      <span className="text-xl font-bold text-foreground">Alumbra</span>
    </div>
  );
}
