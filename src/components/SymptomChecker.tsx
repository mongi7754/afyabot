import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Stethoscope, AlertTriangle, CheckCircle, Brain } from 'lucide-react';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState('');
  const [language, setLanguage] = useState('english');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setResults({
        conditions: [
          { name: 'Common Cold', probability: 75, severity: 'low' },
          { name: 'Flu (Influenza)', probability: 45, severity: 'medium' },
          { name: 'Malaria', probability: 25, severity: 'high' }
        ],
        recommendations: [
          'Get plenty of rest and stay hydrated',
          'Take over-the-counter pain relievers if needed',
          'Consult a healthcare professional if symptoms worsen',
          'Consider getting tested for malaria if fever persists'
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-secondary';
      case 'medium': return 'bg-warning';
      case 'high': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  return (
    <section id="symptom-checker" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-medical-title mb-4">AI Symptom Checker</h2>
          <p className="text-medical-subtitle max-w-2xl mx-auto">
            Describe your symptoms in your preferred language and get instant medical guidance
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="card-medical">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="icon-medical mr-2" />
                  Describe Your Symptoms
                </CardTitle>
                <CardDescription>
                  Tell us what you're experiencing in English, Kiswahili, or Sheng
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Language</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="input-medical">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="kiswahili">Kiswahili</SelectItem>
                      <SelectItem value="sheng">Sheng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Symptoms</label>
                  <Textarea
                    placeholder={
                      language === 'kiswahili' 
                        ? "Eleza dalili zako hapa..." 
                        : language === 'sheng'
                        ? "Niambie vile unaskia..."
                        : "Describe your symptoms here..."
                    }
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="input-medical min-h-[120px]"
                  />
                </div>

                <Button 
                  onClick={handleAnalyze}
                  disabled={!symptoms.trim() || isAnalyzing}
                  className="w-full btn-medical-primary"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Stethoscope className="h-4 w-4 mr-2" />
                      Analyze Symptoms
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="card-medical">
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>
                  AI-powered assessment based on your symptoms
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!results ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Stethoscope className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Enter your symptoms to get an AI analysis</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-secondary" />
                        Possible Conditions
                      </h4>
                      <div className="space-y-2">
                        {results.conditions.map((condition: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                            <div>
                              <p className="font-medium">{condition.name}</p>
                              <p className="text-sm text-muted-foreground">{condition.probability}% match</p>
                            </div>
                            <Badge className={getSeverityColor(condition.severity)}>
                              {condition.severity}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Recommendations</h4>
                      <ul className="space-y-2">
                        {results.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Important:</strong> This is not a doctor's diagnosis. Please consult a healthcare professional for proper medical advice.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SymptomChecker;