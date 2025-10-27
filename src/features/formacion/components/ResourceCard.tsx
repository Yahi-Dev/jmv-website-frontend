import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Resource } from "../model/types";

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: Readonly<ResourceCardProps>) {
  const Icon = resource.icon;
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">{resource.title}</CardTitle>
            <CardDescription>{resource.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Button size="sm" variant={resource.actions.primary.variant} className="flex-1 bg-transparent">
            <resource.actions.primary.icon className="w-4 h-4 mr-2" />
            {resource.actions.primary.label}
          </Button>
          <Button size="sm" variant={resource.actions.secondary.variant}>
            <resource.actions.secondary.icon className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}