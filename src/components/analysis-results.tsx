import type { AnalyzeConversationRiskOutput } from '@/ai/flows/analyze-conversation-risk';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Shield,
  ListTree,
  Quote,
  Sparkles,
  AlertTriangle,
  Heart,
} from 'lucide-react';

type RiskLevel = 'Bajo' | 'Medio' | 'Alto' | 'Crítico';

const getRiskBadgeVariant = (
  riskAssessment: string
): {
  variant: 'default' | 'destructive' | 'outline' | 'secondary';
  icon: React.ReactNode;
} => {
  const assessment = riskAssessment.toLowerCase();
  if (assessment.includes('low') || assessment.includes('bajo')) {
    return { variant: 'secondary', icon: <Heart className="mr-2" /> };
  }
  if (assessment.includes('medium') || assessment.includes('medio')) {
    return { variant: 'outline', icon: <AlertTriangle className="mr-2" /> };
  }
  if (assessment.includes('high') || assessment.includes('alto') || assessment.includes('critical') || assessment.includes('crítico')) {
    return { variant: 'destructive', icon: <Shield className="mr-2" /> };
  }
  return { variant: 'default', icon: <Shield className="mr-2" /> };
};

export function AnalysisResults({
  results,
}: {
  results: AnalyzeConversationRiskOutput;
}) {
  const riskBadge = getRiskBadgeVariant(results.riskAssessment);

  return (
    <div className="mt-8 grid gap-6">
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Shield className="mr-3 h-6 w-6 text-primary" />
            Evaluación de Riesgo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Badge
            variant={riskBadge.variant}
            className="mb-4 flex w-fit items-center py-2 px-4 text-lg"
          >
            {riskBadge.icon} {results.riskAssessment}
          </Badge>
          <p className="text-muted-foreground">
            Esta evaluación es generada por IA y proporciona una visión general de los posibles riesgos en la conversación.
          </p>
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
