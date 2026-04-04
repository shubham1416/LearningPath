import React from 'react';
import { useParams } from 'react-router-dom';
import { toolsData } from '../data/toolsData';
import { ToolTabs } from '../components/navigation/ToolTabs';
import { ToolOverview } from '../components/learning/ToolOverview';
import { Compass } from 'lucide-react';
import './SpacePage.css';

interface SpacePageProps {
  spaceId: 'general' | 'cds-devsecops';
  spaceName: string;
}

export const SpacePage: React.FC<SpacePageProps> = ({ spaceId, spaceName }) => {
  const { toolId } = useParams<{ toolId: string }>();

  // If we are at the root space, we can either redirect to the first tool or show a welcome screen
  // We'll show a welcome screen if no toolId is provided
  const tool = toolId ? toolsData.find(t => t.id === toolId) : null;

  return (
    <div className="space-page">
      <ToolTabs basePath={`/${spaceId}`} />
      
      <div className="space-content">
        {tool ? (
          <ToolOverview key={tool.id} tool={tool} />
        ) : (
          <div className="welcome-screen">
            <Compass size={64} className="welcome-icon" />
            <h1 className="text-gradient">Welcome to the {spaceName} Space</h1>
            <p className="welcome-text">Select a tool from the top navigation to begin your mastery journey.</p>
          </div>
        )}
      </div>
    </div>
  );
};
