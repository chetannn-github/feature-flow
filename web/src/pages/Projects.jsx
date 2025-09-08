import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import api from "../utils/api";
import { useToast } from "../utils/use-toast";

export default function Projects() {
  const token = useSelector((s) => s.auth.token);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  async function create(e) {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Project name is required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/api/projects", { name: name.trim() }, token);
      setCreated(res);

      toast({
        title: "Success",
        description: `Project "${res.name}" created successfully!`,
      });

      setTimeout(() => {
        navigate(`/projects/${res._id}/environments`);
      }, 1500);
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Failed to create project",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-12 px-4">
      <div className="max-w-md mx-auto">
        <Card className="shadow-lg border-border/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create New Project</CardTitle>
            <CardDescription className="text-center">
              Start building your feature flags project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={create} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your project name"
                  disabled={loading}
                  className="w-full"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading || !name.trim()}>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    Creating Project...
                  </div>
                ) : (
                  "Create Project"
                )}
              </Button>
            </form>

            {created && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <p className="text-sm font-medium">
                    Project "{created.name}" created successfully!
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Redirecting to environments...
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
