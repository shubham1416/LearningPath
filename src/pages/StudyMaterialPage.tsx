import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toolsData } from '../data/toolsData';
import { ArrowLeft, Terminal as TerminalIcon } from 'lucide-react';
import { InteractiveTerminal } from '../components/learning/InteractiveTerminal';
import './StudyMaterialPage.css';

export const StudyMaterialPage: React.FC = () => {
  const { toolId, levelId } = useParams();
  const navigate = useNavigate();

  const tool = toolsData.find(t => t.id === toolId);
  const levelData = tool?.levels[levelId as keyof typeof tool.levels];
  const studyContent = levelData?.studyContent;

  if (!tool || !levelData || !studyContent) {
    return (
      <div className="study-page-error">
        <h2>Content not found</h2>
        <button onClick={() => navigate(-1)} className="back-btn">Go Back</button>
      </div>
    );
  }

  const Icon = tool.icon;

  return (
    <div className="study-material-page animate-fade-in">
      <div className="study-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <ArrowLeft size={18} /> Back to Overview
        </button>
        <div className="study-title-area">
          <Icon size={32} className="tool-icon" />
          <h1 className="text-gradient">{tool.name} - {levelData.title} Deep Dive</h1>
        </div>
      </div>

      <div className="study-content-layout">
        <div className="study-reading-pane">
          <div className="concept-section glass-panel">
            <h2><span className="emoji">🤔</span> What is it?</h2>
            <p>{studyContent.whatIsIt}</p>
          </div>
          
          <div className="concept-section glass-panel">
            <h2><span className="emoji">💡</span> Why use it?</h2>
            <p>{studyContent.whyUseIt}</p>
          </div>

          <div className="concept-section glass-panel">
            <h2><span className="emoji">🛠️</span> How to use it?</h2>
            <p>{studyContent.howToUseIt}</p>
            
            <div className="commands-list">
              {studyContent.commands.map((cmd, idx) => (
                <div key={idx} className="command-item">
                  <div className="command-code">
                    <TerminalIcon size={14} className="cmd-icon" />
                    <code>{cmd.cmd}</code>
                  </div>
                  <div className="command-desc">{cmd.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="study-practice-pane">
          <InteractiveTerminal 
            toolName={tool.name} 
            level={levelId as string}
            commands={studyContent.commands} 
          />
        </div>
      </div>
    </div>
  );
};
