import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toolsData } from '../../data/toolsData';
import type { ToolCategory } from '../../data/toolsData';
import './InteractiveRoadmap.css';
import { Network } from 'lucide-react';

interface InteractiveRoadmapProps {
  basePath: string;
}

export const InteractiveRoadmap: React.FC<InteractiveRoadmapProps> = ({ basePath }) => {
  const navigate = useNavigate();

  // Order categories to resemble learning roadmap (simplified grouping)
  const roadmapPhases: { title: string; desc: string; categories: ToolCategory[] }[] = [
    {
      title: 'Phase 1: Foundations',
      desc: 'Understand the operating system, network, and how to write terminal scripts.',
      categories: ['OS & Environment', 'Programming Languages', 'Scripting Languages']
    },
    {
      title: 'Phase 2: Version Control',
      desc: 'Manage code versions effectively and collaborate.',
      categories: ['Version Control']
    },
    {
      title: 'Phase 3: Continous Integrations & Deployments',
      desc: 'Automate build testing and deployment pipelines.',
      categories: ['CI/CD', 'Build Tools']
    },
    {
      title: 'Phase 4: Containerization & Orchestration',
      desc: 'Package applications natively and scale them across clustered workers.',
      categories: ['Containerization', 'Orchestration']
    },
    {
      title: 'Phase 5: Cloud & Infrastructure',
      desc: 'Deploy on scalable public clouds natively and strictly via code.',
      categories: ['Cloud Platforms', 'Infrastructure as Code', 'Configuration Management']
    },
    {
      title: 'Phase 6: Observability',
      desc: 'Instrument and monitor production workloads.',
      categories: ['Monitoring & Observability']
    }
  ];

  return (
    <div className="interactive-roadmap animate-fade-in">
      <div className="roadmap-header">
        <div className="roadmap-title-group">
          <Network className="roadmap-main-icon text-secondary" size={40} />
          <h1>DevOps Mastery Roadmap</h1>
        </div>
        <p>A step-by-step interactive map to mastering DevOps, based on industry standards.</p>
      </div>

      <div className="roadmap-container">
        {roadmapPhases.map((phase, index) => {
          // get all tools matching this phase's categories
          const phaseTools = toolsData.filter(t => phase.categories.includes(t.category));
          
          if (phaseTools.length === 0) return null;

          return (
            <div key={index} className="roadmap-phase row-fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="phase-indicator">
                <div className="phase-marker">{index + 1}</div>
                {index !== roadmapPhases.length - 1 && <div className="phase-line"></div>}
              </div>
              
              <div className="phase-content">
                <div className="phase-header">
                  <h2>{phase.title}</h2>
                  <p>{phase.desc}</p>
                </div>
                
                <div className="phase-tools-grid">
                  {phase.categories.map((category) => {
                    const categoryTools = phaseTools.filter(t => t.category === category);
                    if (categoryTools.length === 0) return null;

                    return (
                      <div key={category} className="tool-category-group">
                        <div className="category-label">{category}</div>
                        <div className="tool-cards">
                          {categoryTools.map(tool => {
                            const Icon = tool.icon;
                            return (
                              <div 
                                key={tool.id} 
                                className="tool-card glass-panel"
                                onClick={() => navigate(`${basePath}/${tool.id}`)}
                              >
                                <Icon size={24} className="tool-icon" />
                                <div className="tool-info">
                                  <h3>{tool.name}</h3>
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
            </div>
          );
        })}
      </div>
    </div>
  );
};
