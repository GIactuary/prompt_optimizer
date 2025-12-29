import { useState } from 'react';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { GoalInput } from '../inputs/GoalInput';
import { RoleInput } from '../inputs/RoleInput';
import { ModelSelector } from '../inputs/ModelSelector';
import { TemperatureInput } from '../inputs/TemperatureInput';
import { ApiKeyInput } from '../inputs/ApiKeyInput';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`
        border-r border-zinc-200 bg-zinc-50 transition-all duration-300
        ${isCollapsed ? 'w-12' : 'w-80'}
      `}
    >
      <div className="p-3 border-b border-zinc-200 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-zinc-500" />
            <span className="text-sm font-medium text-zinc-700">Configuration</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-zinc-200 rounded"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {!isCollapsed && (
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-8rem)]">
          <GoalInput />
          <RoleInput />
          <ModelSelector />
          <TemperatureInput />
          <ApiKeyInput />
        </div>
      )}
    </aside>
  );
}
