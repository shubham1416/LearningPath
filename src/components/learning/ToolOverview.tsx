import React from 'react';
import type { ToolData } from '../../data/toolsData';
import { LevelSection } from './LevelSection';
import { ToolAIQuiz } from './ToolAIQuiz';
import './ToolOverview.css';

interface ToolOverviewProps {
  tool: ToolData;
}

export const ToolOverview: React.FC<ToolOverviewProps> = ({ tool }) => {
  const Icon = tool.icon;

  return (
    <div className="tool-overview animate-fade-in">
      <div className="tool-header glass-panel">
        <div className="tool-header-left">
          <div className="tool-icon-wrapper">
            <Icon size={32} className="tool-header-icon" />
          </div>
          <div>
            <h1 className="tool-title text-gradient">{tool.name}</h1>
            <span className="tool-category">{tool.category}</span>
          </div>
        </div>
        <div className="tool-header-right">
          <p className="tool-short-desc">{tool.shortDesc}</p>
        </div>
      </div>

      <div className="tool-concepts glass-panel">
        <h2>Core Concepts</h2>
        <p className="concept-text">{tool.concept}</p>
        
        <h3 className="advanced-title">Advanced Horizons</h3>
        <p className="concept-text">{tool.advancedConcept}</p>
      </div>

      <ToolAIQuiz toolName={tool.name} />

      <div className="levels-container">
        <LevelSection 
          level="Beginner" 
          data={tool.levels.beginner} 
          theme="blue"
        />
        <LevelSection 
          level="Intermediate" 
          data={tool.levels.intermediate} 
          theme="purple"
        />
        <LevelSection 
          level="Expert" 
          data={tool.levels.expert} 
          theme="orange"
        />
      </div>
    </div>
  );
};
