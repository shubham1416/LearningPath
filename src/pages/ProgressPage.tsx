import React, { useState, useEffect } from 'react';
import { toolsData } from '../data/toolsData';
import { Award, CheckCircle, Circle, TrendingUp } from 'lucide-react';
import './ProgressPage.css';

type Progress = Record<string, { easy: boolean; intermediate: boolean; expert: boolean }>;

export const ProgressPage: React.FC = () => {
  const [progress, setProgress] = useState<Progress>(() => {
    const saved = localStorage.getItem('devops_tool_progress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('devops_tool_progress');
      if (saved) setProgress(JSON.parse(saved));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Compute stats
  const totalModules = toolsData.length * 3;
  const completedModules = Object.values(progress).reduce((sum, p) => {
    return sum + (p.easy ? 1 : 0) + (p.intermediate ? 1 : 0) + (p.expert ? 1 : 0);
  }, 0);
  const overallPercent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  const getToolCompletion = (toolId: string) => {
    const p = progress[toolId];
    if (!p) return 0;
    return (p.easy ? 1 : 0) + (p.intermediate ? 1 : 0) + (p.expert ? 1 : 0);
  };

  // Group tools by category
  const categories = [...new Set(toolsData.map(t => t.category))];

  return (
    <div className="progress-page animate-fade-in">
      <div className="page-header">
        <h1 className="text-gradient">My Progress</h1>
        <p className="subtitle">
          Track your knowledge across all DevOps tools. Complete AI quizzes at each difficulty level to fill your progress.
        </p>
      </div>

      {/* Overall Stats */}
      <div className="overall-stats glass-panel">
        <div className="stat-ring">
          <svg viewBox="0 0 120 120" className="ring-svg">
            <circle cx="60" cy="60" r="52" className="ring-bg" />
            <circle
              cx="60" cy="60" r="52"
              className="ring-fill"
              strokeDasharray={`${overallPercent * 3.267} 326.7`}
              strokeDashoffset="0"
            />
          </svg>
          <div className="ring-text">
            <span className="ring-percent">{overallPercent}%</span>
            <span className="ring-label">Complete</span>
          </div>
        </div>
        <div className="stat-details">
          <div className="stat-item">
            <TrendingUp size={18} className="stat-icon" />
            <div>
              <span className="stat-value">{completedModules}</span>
              <span className="stat-label">/ {totalModules} Modules Passed</span>
            </div>
          </div>
          <div className="stat-item">
            <Award size={18} className="stat-icon gold" />
            <div>
              <span className="stat-value">{Object.values(progress).filter(p => p.easy && p.intermediate && p.expert).length}</span>
              <span className="stat-label">/ {toolsData.length} Tools Mastered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Per-category breakdown */}
      <div className="progress-categories">
        {categories.map(cat => {
          const tools = toolsData.filter(t => t.category === cat);
          return (
            <div key={cat} className="category-section">
              <h2 className="category-title">{cat}</h2>
              <div className="tools-progress-grid">
                {tools.map(tool => {
                  const completed = getToolCompletion(tool.id);
                  const p = progress[tool.id] || { easy: false, intermediate: false, expert: false };
                  const Icon = tool.icon;
                  return (
                    <div key={tool.id} className={`tool-progress-card glass-panel ${completed === 3 ? 'mastered' : ''}`}>
                      <div className="tpc-header">
                        <div className="tpc-icon-wrap">
                          <Icon size={20} />
                        </div>
                        <div className="tpc-info">
                          <h4 className="tpc-name">{tool.name}</h4>
                          <span className="tpc-completion">{completed}/3 modules</span>
                        </div>
                        {completed === 3 && (
                          <div className="mastered-badge">
                            <Award size={14} />
                            Mastered
                          </div>
                        )}
                      </div>
                      <div className="tpc-bar-track">
                        <div className="tpc-bar-fill" style={{ width: `${(completed / 3) * 100}%` }} />
                      </div>
                      <div className="tpc-levels">
                        <div className={`tpc-level ${p.easy ? 'done' : ''}`}>
                          {p.easy ? <CheckCircle size={14} /> : <Circle size={14} />}
                          <span>Easy</span>
                        </div>
                        <div className={`tpc-level ${p.intermediate ? 'done' : ''}`}>
                          {p.intermediate ? <CheckCircle size={14} /> : <Circle size={14} />}
                          <span>Intermediate</span>
                        </div>
                        <div className={`tpc-level ${p.expert ? 'done' : ''}`}>
                          {p.expert ? <CheckCircle size={14} /> : <Circle size={14} />}
                          <span>Expert</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
