import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { toolsData } from '../../data/toolsData';
import type { ToolCategory } from '../../data/toolsData';
import { ChevronRight } from 'lucide-react';
import './ToolSidebarTree.css';

interface ToolSidebarTreeProps {
  basePath: string;
}

export const ToolSidebarTree: React.FC<ToolSidebarTreeProps> = ({ basePath }) => {
  // Group tools by category
  const groupedTools = useMemo(() => {
    const groups: Partial<Record<ToolCategory, typeof toolsData>> = {};
    toolsData.forEach(tool => {
      if (!groups[tool.category]) {
        groups[tool.category] = [];
      }
      groups[tool.category]!.push(tool);
    });
    return groups;
  }, []);

  return (
    <nav className="tool-sidebar">
      <div className="sidebar-header">
        <NavLink to={basePath} end className="back-to-roadmap">
          ← Back to Roadmap
        </NavLink>
      </div>
      
      <div className="sidebar-content scrollbar-custom">
        {Object.entries(groupedTools).map(([category, tools]) => (
          <div key={category} className="sidebar-group">
            <div className="group-title">
              {category}
            </div>
            <div className="group-items">
              {tools.map(tool => {
                const Icon = tool.icon;
                return (
                  <NavLink
                    key={tool.id}
                    to={`${basePath}/${tool.id}`}
                    className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={14} className="sidebar-link-icon" />
                    <span>{tool.name}</span>
                    <ChevronRight size={14} className="sidebar-link-arrow" />
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};
