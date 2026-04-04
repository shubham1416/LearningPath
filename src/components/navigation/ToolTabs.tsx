import React from 'react';
import { NavLink } from 'react-router-dom';
import { toolsData } from '../../data/toolsData';
import './ToolTabs.css';

interface ToolTabsProps {
  basePath: string;
}

export const ToolTabs: React.FC<ToolTabsProps> = ({ basePath }) => {
  return (
    <div className="tool-tabs-container">
      <div className="tool-tabs-scroll">
        {toolsData.map(tool => {
          const Icon = tool.icon;
          return (
            <NavLink
              key={tool.id}
              to={`${basePath}/${tool.id}`}
              className={({ isActive }) => `tool-tab ${isActive ? 'active' : ''}`}
            >
              <Icon size={16} />
              <span>{tool.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
