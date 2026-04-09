import React from 'react';
import { useParams } from 'react-router-dom';
import { toolsData } from '../data/toolsData';
import { ToolSidebarTree } from '../components/navigation/ToolSidebarTree';
import { InteractiveRoadmap } from '../components/navigation/InteractiveRoadmap';
import { ToolOverview } from '../components/learning/ToolOverview';
import './SpacePage.css';

interface SpacePageProps {
  spaceId: 'general' | 'cds-devsecops';
  spaceName: string;
}

export const SpacePage: React.FC<SpacePageProps> = ({ spaceId }) => {
  const { toolId } = useParams<{ toolId: string }>();

  const tool = toolId ? toolsData.find(t => t.id === toolId) : null;

  return (
    <div className={`space-page ${tool ? 'has-sidebar' : 'full-map'}`}>
      {tool ? (
        <>
          <ToolSidebarTree basePath={`/${spaceId}`} />
          <div className="space-content-split">
            <ToolOverview key={tool.id} tool={tool} />
          </div>
        </>
      ) : (
        <div className="space-content-full">
          <InteractiveRoadmap basePath={`/${spaceId}`} />
        </div>
      )}
    </div>
  );
};
