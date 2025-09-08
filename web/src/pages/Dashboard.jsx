import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProjects } from '../store/projectsSlice'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Plus } from 'lucide-react'

export default function Dashboard() {
  const dispatch = useDispatch()
  const projects = useSelector(s => s.projects)

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  function formatDate(dateStr) {
    const d = new Date(dateStr)
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Your Projects</h1>
          <Link to="/projects">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </Link>
        </div>

        {/* Loading */}
        {projects.loading && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        )}

        {/* Error */}
        {projects.error && (
          <p className="text-destructive bg-destructive/10 p-4 rounded-lg">{projects.error}</p>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.list.map(p => (
            <Card
              key={p._id}
              className="flex flex-col justify-between h-48 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] border-border bg-card"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-card-foreground">{p.name}</CardTitle>
                {p.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                )}
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                {/* Created/Updated Info */}
                <div className="text-xs text-muted-foreground mb-3">
                  <p>Created: {formatDate(p.createdAt)}</p>
                </div>

                <Link to={`/projects/${p._id}/environments`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    Open
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}

          {/* Empty State */}
          {projects.list.length === 0 && !projects.loading && (
            <Card className="col-span-full text-center py-16 bg-card border-dashed border-2 border-border">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Plus className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">No projects yet</h3>
                  <p className="text-muted-foreground mb-4">Create your first project to start managing feature flags!</p>
                  <Link to="/projects">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Project
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
