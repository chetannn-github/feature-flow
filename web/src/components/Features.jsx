import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Database, Shield, Code, ToggleLeft } from "lucide-react";

const features = [
  {
    icon: Database,
    title: "MongoDB Storage",
    description: "Built on MongoDB for scalable configuration storage with reliable data persistence and lightning-fast flag retrieval.",
  },
  {
    icon: Code,
    title: "React SDK",
    description: "Plug-and-play React SDK that fetches environment data using secure API keys. Get started in minutes, not hours.",
  },
  {
    icon: Shield,
    title: "Secure Backend",
    description: "Express.js backend with robust project, environment, and API key management. Security and performance built-in.",
  },
  {
    icon: ToggleLeft,
    title: "Real-time Dashboard",
    description: "React + Redux + Tailwind dashboard for instant flag toggling without code deployments or server restarts.",
  },
];

const Features = () => {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
            Everything You Need for Feature Management
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A complete self-hosted solution that gives you full control over your feature flags and deployment process.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 bg-none">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-8 w-8 text-red" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;