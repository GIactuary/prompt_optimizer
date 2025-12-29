import { useState } from 'react';
import { ChevronLeft, ChevronRight, Settings, Cpu } from 'lucide-react';
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
        border-r border-zinc-200 bg-gradient-to-b from-zinc-50 to-white
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-14' : 'w-80'}
      `}
    >
      <div className="p-3 border-b border-zinc-200/60 flex items-center justify-between bg-white/50">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-zinc-100">
              <Settings className="h-4 w-4 text-zinc-600" />
            </div>
            <span className="text-sm font-semibold text-zinc-800">Configuration</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 hover:bg-zinc-100 rounded-lg transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-zinc-500" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-zinc-500" />
          )}
        </button>
      </div>

      {!isCollapsed && (
        <div className="p-4 space-y-5 overflow-y-auto h-[calc(100vh-8rem)]">
          {/* Goal & Role Section */}
          <div className="space-y-4">
            <GoalInput />
            <RoleInput />
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200/60" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-b from-zinc-50 to-white px-2">
                <div className="flex items-center gap-1.5">
                  <Cpu className="h-3 w-3 text-zinc-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    LLM Settings
                  </span>
                </div>
              </span>
            </div>
          </div>

          {/* LLM Settings Section */}
          <div className="space-y-4">
            <ModelSelector />
            <TemperatureInput />
            <ApiKeyInput />
          </div>
        </div>
      )}
    </aside>
  );
}
