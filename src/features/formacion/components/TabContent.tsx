import { ModuleTab } from '../model/types';
import { ModuleCard } from './ModuleCard';

interface TabContentProps {
  readonly tab: ModuleTab;
}

export function TabContent({ tab }: TabContentProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {tab.modules.map((module) => (
        <ModuleCard key={module.id} module={module} />
      ))}
    </div>
  );
}