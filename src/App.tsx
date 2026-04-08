import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { SpacePage } from './pages/SpacePage';
import { StudyMaterialPage } from './pages/StudyMaterialPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { AIMentorPage } from './pages/AIMentorPage';
import { ProgressPage } from './pages/ProgressPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* Redirect root to general devops space */}
        <Route index element={<Navigate to="/general" replace />} />
        
        {/* General DevOps Routes */}
        <Route 
          path="general" 
          element={<SpacePage spaceId="general" spaceName="DevOps Roadmap" />} 
        />
        <Route 
          path="general/:toolId" 
          element={<SpacePage spaceId="general" spaceName="DevOps Roadmap" />} 
        />
        <Route 
          path="general/:toolId/study/:levelId" 
          element={<StudyMaterialPage />} 
        />
        
        {/* My Progress */}
        <Route 
          path="progress" 
          element={<ProgressPage />} 
        />
        
        {/* Practice Labs */}
        <Route 
          path="practice-labs" 
          element={<ProjectsPage />} 
        />
        
        {/* Real-time Playground */}
        <Route 
          path="playground" 
          element={<PlaygroundPage />} 
        />
        
        {/* AI Mentor */}
        <Route 
          path="ai-mentor" 
          element={<AIMentorPage />} 
        />
      </Route>
      
      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
