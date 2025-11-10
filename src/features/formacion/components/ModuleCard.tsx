import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Download } from "lucide-react";
import { Module } from "../model/types";

interface ModuleCardProps {
  readonly module: Module;
}

export function ModuleCard({ module }: ModuleCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">{module.level}</Badge>
          <Badge variant="outline">{module.duration}</Badge>
          <Badge variant="default" className="text-blue-800 bg-blue-100">
            {module.modulo}
          </Badge>
        </div>
        <CardTitle>{module.title}</CardTitle>
        <CardDescription>{module.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
          {module.items.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
        <Button variant="outline" className="w-full bg-transparent">
          <Download className="w-4 h-4 mr-2" />
          Descargar material
        </Button>
      </CardContent>
    </Card>
  );
}