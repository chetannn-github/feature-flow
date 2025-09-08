import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { REACT_SDK_USAGE_CODE, SAMPLE_API_RESPONSE} from "../utils/constant";
import { useState } from "react";
import { Check, Clipboard } from 'lucide-react';

const CodeExample = () => {
  let [isCoping, setIsCoping] = useState({
    one : false,
    two : false
  });
  const handleCopy = (text, key) => {
    console.log(isCoping)
    console.log("phele hii return hogyyaa")
    if(isCoping[key]) return;
    
    console.log(key)
    setIsCoping({...isCoping, [key] : true});
    navigator.clipboard.writeText(text);
    setTimeout(()=>{
      setIsCoping({...isCoping, [key] : false})
    },2000);
  }

  
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            Developer Experience
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
            Simple Integration, Powerful Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get your feature flags up and running in minutes with our intuitive React SDK and clean API design.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          <Card className="border-0 shadow-medium overflow-hidden">
            <CardHeader className="bg-muted/50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                </div>
                React Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 relative">
              <button 
                onClick={() => handleCopy(REACT_SDK_USAGE_CODE,"two")}
                className="absolute top-4 right-4 p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors text-xs"
              >
                {isCoping["two"] ? <Check /> : <Clipboard/>}
              </button>
              <pre className="p-6 bg-code-bg text-code-foreground text-sm overflow-x-auto">
                <code>{REACT_SDK_USAGE_CODE}</code>
              </pre>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-medium overflow-hidden">
            <CardHeader className="bg-muted/50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                </div>
                API Response
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 relative">
              <button 
                onClick={() => handleCopy(SAMPLE_API_RESPONSE,"one")}
                className="absolute top-4 right-4 p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors text-xs"
              >
                {isCoping["one"] ? <Check /> : <Clipboard/>}
              </button>
              <pre className="p-6 bg-code-bg text-code-foreground text-sm overflow-x-auto">
                <code>{SAMPLE_API_RESPONSE}</code>
              </pre>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Ready to implement feature flags in your React application?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="px-4 py-2">MongoDB</Badge>
            <Badge variant="outline" className="px-4 py-2">Express.js</Badge>
            <Badge variant="outline" className="px-4 py-2">React</Badge>
            <Badge variant="outline" className="px-4 py-2">Redux</Badge>
            <Badge variant="outline" className="px-4 py-2">Tailwind CSS</Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeExample;


