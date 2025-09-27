import type { AnalyzeConversationRiskOutput } from '@/ai/flows/analyze-conversation-risk';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ListTree,
  Quote,
  Sparkles,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Activity,
} from 'lucide-react';
import { Progress } from './ui/progress';

const getRiskDetails = (
  score: number,
  level: string
): {
  icon: React.ReactNode;
  progressColor: string;
  textColor: string;
} => {
  if (score <= 3) {
    return {
      icon: <ShieldCheck className="mr-2 h-6 w-6 text-green-500" />,
      progressColor: 'bg-green-500',
      textColor: 'text-green-700',
    };
  }
  if (score <= 6) {
    return {
      icon: <AlertTriangle className="mr-2 h-6 w-6 text-yellow-500" />,
      progressColor: 'bg-yellow-500',
      textColor: 'text-yellow-700',
    };
  }
  return {
    icon: <ShieldAlert className="mr-2 h-6 w-6 text-red-500" />,
    progressColor: 'bg-red-500',
    textColor: 'text-red-700',
  };
};

export function AnalysisResults({
  results,
}: {
  results: AnalyzeConversationRiskOutput;
}) {
  const riskDetails = getRiskDetails(
    results.riskAssessment.score,
    results.riskAssessment.level
  );

  return (
    <div className="mt-8 grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Activity className="mr-3 h-6 w-6" />
            Evaluación de Riesgo
          </CardTitle>
          <p className="text-muted-foreground pt-1">
            {results.riskAssessment.justification}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className={`flex items-center text-2xl font-bold ${riskDetails.textColor}`}
          >
            {riskDetails.icon}
            {results.riskAssessment.score} / 10 - {results.riskAssessment.level}
          </div>
          <Progress
            value={results.riskAssessment.score * 10}
            className={`h-3 [&>div]:${riskDetails.progressColor}`}
          />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-3 h-5 w-5 text-primary" />
              Factores de Riesgo Identificados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc space-y-2">
              {results.riskFactors.map((factor, index) => (
                <li key={index} className="text-muted-foreground">
                  {factor}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ListTree className="mr-3 h-5 w-5 text-primary" />
              Temas de Conversación
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {results.topicCategories.map((topic, index) => (
              <Badge key={index} variant="secondary">
                {topic}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Quote className="mr-3 h-5 w-5 text-primary" />
            Ejemplos Destacados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {results.examples.map((example, index) => (
            <blockquote
              key={index}
              className="border-l-4 border-accent bg-muted/50 p-3 italic text-muted-foreground"
            >
              "{example}"
            </blockquote>
          ))}
        </CardContent>
      </Card>

      <Card className="border-primary bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Sparkles className="mr-3 h-5 w-5 text-primary" />
            Recomendaciones de la IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap font-sans text-base text-foreground">
            {results.recommendations}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}