import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Sparkles } from "lucide-react";

const LiveDemo = () => {
  const [greetingFlag, setGreetingFlag] = useState(true);
  const [themeFlag, setThemeFlag] = useState(false);

  return (
    <section id= "features" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4 mr-2" />
            Live Demo
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
            See Feature Flags in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Toggle features instantly without redeploy or rebuild. Watch the magic happen!
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          {/* Control Panel */}
          <Card className="border-0 shadow-medium">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardTitle className="flex items-center gap-2">
                FeatureFlow Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="font-medium">GREETING_MESSAGE</h4>
                  <p className="text-sm text-muted-foreground">
                    {greetingFlag ? "Happy Diwali" : "Happy Navratri"}
                  </p>
                </div>
                <Switch 
                  checked={greetingFlag}
                  onCheckedChange={setGreetingFlag}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="font-medium">FESTIVE_THEME</h4>
                  <p className="text-sm text-muted-foreground">
                    {themeFlag ? "Gold Theme" : "Purple Theme"}
                  </p>
                </div>
                <Switch 
                  checked={themeFlag}
                  onCheckedChange={setThemeFlag}
                />
              </div>
            </CardContent>
          </Card>

          {/* Live Preview */}
          <Card className="border-0 shadow-medium overflow-hidden">
            <CardHeader className="bg-muted/50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                </div>
                Your App Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent className={`p-8 text-center transition-all duration-500 ${
              themeFlag 
                ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20' 
                : 'bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20'
            }`}>
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 transition-all duration-500 ${
                themeFlag 
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
                  : 'bg-gradient-to-br from-purple-500 to-blue-600'
              }`}>
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              
              <h3 className={`text-2xl font-bold mb-4 transition-all duration-500 ${
                themeFlag ? 'text-orange-800 dark:text-orange-200' : 'text-purple-800 dark:text-purple-200'
              }`}>
                {greetingFlag ? "🪔 Happy Diwali! 🪔" : "🏺 Happy Navratri! 🏺"}
              </h3>
              
              <p className="text-muted-foreground mb-6">
                {greetingFlag 
                  ? "May this festival of lights bring joy and prosperity to your home!"
                  : "Celebrate the divine feminine energy during these nine sacred nights!"
                }
              </p>
              
              <Button className={`transition-all duration-500 ${
                themeFlag 
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700' 
                  : 'bg-gradient-to-r from-purple-600 to-blue-700 hover:from-purple-700 hover:to-blue-800'
              } text-white border-0`}>
                {greetingFlag ? "Light a Diya" : "Join Garba"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            🚀 Changes happen instantly - no redeploy, no rebuild, no downtime!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="px-4 py-2">Real-time Updates</Badge>
            <Badge variant="outline" className="px-4 py-2">Zero Downtime</Badge>
            <Badge variant="outline" className="px-4 py-2">Instant Rollback</Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;