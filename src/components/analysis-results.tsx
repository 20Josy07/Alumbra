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
  score: number
): {
  icon: React.ReactNode;
  progressColor: string;
  textColor: string;
  level: string;
} => {
  if (score <= 3) {
    return {
      icon: <ShieldCheck className="mr-2 h-6 w-6 text-green-500" />,
      progressColor: 'bg-green-500',
      textColor: 'text-green-700 dark:text-green-400',
      level: 'Bajo',
    };
  }
  if (score <= 6) {
    return {
      icon: <AlertTriangle className="mr-2 h-6 w-6 text-yellow-500" />,
      progressColor: 'bg-yellow-500',
      textColor: 'text-yellow-700 dark:text-yellow-400',
      level: 'Medio',
    };
  }
  return {
    icon: <ShieldAlert className="mr-2 h-6 w-6 text-red-500" />,
    progressColor: 'bg-red-500',
    textColor: 'text-red-700 dark:text-red-400',
    level: 'Alto',
  };
};

export function AnalysisResults({
  results,
}: {
  results: AnalyzeConversationRiskOutput;
}) {
  const riskDetails = getRiskDetails(
    results.riskAssessment.score
  );

  const formatRecommendations = (recommendations: string) => {
    const parts = recommendations.split(/\d+\.\s/);
    const introduction = parts[0].trim();
    const listItems = recommendations.match(/\d+\.\s\*\*.*?(?=\d+\.\s\*\*|$)/gs) || [];

    return {
      introduction,
      listItems: listItems.map(item => {
        const titleMatch = item.match(/\d+\.\s\*\*(.*?)\*\*/);
        const title = titleMatch ? titleMatch[1] : '';
        const description = item.replace(/\d+\.\s\*\*(.*?)\*\*/, '').trim();
        return { title, description };
      })
    };
  };

  const formattedRecommendations = formatRecommendations(results.recommendations);


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
            {results.riskAssessment.score} / 10 - {riskDetails.level}
          </div>
          <Progress
            value={results.riskAssessment.score * 10}
            indicatorClassName={riskDetails.progressColor}
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
            Recomendaciones
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-foreground dark:prose-invert">
          <p>{formattedRecommendations.introduction}</p>
          {formattedRecommendations.listItems.length > 0 && (
            <ol className="mt-4 space-y-3 pl-5">
              {formattedRecommendations.listItems.map((item, index) => (
                <li key={index}>
                  <strong className="font-semibold">{item.title}:</strong>{' '}
                  {item.description}
                </li>
              ))}
            </ol>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
