import React from 'react';
import type { LevelData } from '../../data/toolsData';
import { ExternalLink, BookOpenCheck, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import './LevelSection.css';

interface LevelSectionProps {
  level: string;
  data: LevelData;
  theme: 'blue' | 'purple' | 'orange';
}

export const LevelSection: React.FC<LevelSectionProps> = ({ level, data, theme }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (material: any, e: React.MouseEvent) => {
    if (material.isInternal) {
      e.preventDefault();
      const currentPath = location.pathname.endsWith('/') ? location.pathname.slice(0, -1) : location.pathname;
      navigate(`${currentPath}/study/${material.internalRouteKey}`);
    }
  };

  return (
    <div className={`level-card glass-panel theme-${theme}`}>
      <div className="level-header">
        <span className="level-badge">{level}</span>
        <h3 className="level-title">{data.title}</h3>
      </div>
      
      <div className="level-body">
        {Array.isArray(data.description)
          ? data.description.map((p, i) => <p key={i} className="level-desc" style={{marginBottom: '10px'}}>{p}</p>)
          : <p className="level-desc">{data.description}</p>
        }
        
        <div className="study-materials">
          <h4 className="materials-title">
            <BookOpenCheck size={16} />
            Study Materials
          </h4>
          <ul className="materials-list">
            {data.studyMaterials.map((material, idx) => (
              <li key={idx}>
                {material.isInternal ? (
                  <button onClick={(e) => handleLinkClick(material, e)} className="material-link internal-btn">
                    {material.name}
                    <ChevronRight size={14} className="external-icon" />
                  </button>
                ) : (
                  <a href={material.link} className="material-link">
                    {material.name}
                    <ExternalLink size={14} className="external-icon" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
