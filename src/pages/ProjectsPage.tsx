import React, { useState } from 'react';
import { practiceProjects, type PracticeDifficulty, type PracticeProject } from '../data/projectsData';
import { Code, ExternalLink, Flame, Zap, ShieldAlert, X, ListChecks, ChevronRight } from 'lucide-react';
import './ProjectsPage.css';

const DiffIcon = ({ diff }: { diff: PracticeDifficulty }) => {
  if (diff === 'Beginner') return <Zap size={16} className="diff-icon diff-beginner" />;
  if (diff === 'Intermediate') return <Flame size={16} className="diff-icon diff-intermediate" />;
  return <ShieldAlert size={16} className="diff-icon diff-expert" />;
};

const ProjectStepsModal: React.FC<{ project: PracticeProject; onClose: () => void }> = ({ project, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className={`diff-badge diff-${project.difficulty.toLowerCase()}`}>
              <DiffIcon diff={project.difficulty} />
              {project.difficulty}
            </span>
            <h2>{project.title}</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <div className="modal-body scrollbar-custom">
          <div className="steps-header">
            <ListChecks size={20} className="text-secondary" />
            <h3>Implementation Steps</h3>
          </div>
          <ol className="steps-list">
            {project.steps?.map((step, idx) => (
              <li key={idx} className="step-item">
                <span className="step-number">{idx + 1}</span>
                <span className="step-text">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="modal-footer">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="github-link-btn">
            <Code size={18} />
            View Full Project on GitHub
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export const ProjectsPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<PracticeProject | null>(null);

  const beginners = practiceProjects.filter(p => p.difficulty === 'Beginner');
  const intermediates = practiceProjects.filter(p => p.difficulty === 'Intermediate');
  const experts = practiceProjects.filter(p => p.difficulty === 'Expert');

  const handleCardClick = (project: PracticeProject, e: React.MouseEvent) => {
    if (project.steps && project.steps.length > 0) {
      e.preventDefault();
      setSelectedProject(project);
    }
    // If no steps, the <a> tag will navigate to GitHub by default
  };

  const renderSection = (title: string, desc: string, projects: typeof practiceProjects, theme: string) => (
    <div className={`project-section theme-${theme}`}>
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <p className="section-desc">{desc}</p>
      </div>
      <div className="projects-grid">
        {projects.map(project => (
          <a
            key={project.id}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card glass-panel"
            onClick={(e) => handleCardClick(project, e)}
          >
            <div className="card-top">
              <span className={`diff-badge diff-${project.difficulty.toLowerCase()}`}>
                <DiffIcon diff={project.difficulty} />
                {project.difficulty}
              </span>
              <div className="card-top-right">
                {project.steps && project.steps.length > 0 && (
                  <span className="steps-indicator">
                    <ListChecks size={14} />
                    {project.steps.length} Steps
                  </span>
                )}
                <Code size={20} className="github-icon" />
              </div>
            </div>
            <h3 className="project-title">{project.title}</h3>
            <div className="card-footer">
              <span className="project-id">{project.id.replace('DevOps-', '')}</span>
              <div className="run-link">
                {project.steps ? (
                  <>View Steps <ChevronRight size={14} /></>
                ) : (
                  <>View Project <ExternalLink size={14} /></>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <div className="projects-page animate-fade-in">
      <div className="page-header">
        <h1 className="text-gradient">Real-World Practice Labs</h1>
        <p className="subtitle">
          Put your skills to the test with 40 industry-standard projects.
          Categorized by complexity, start simple and eventually build production-grade Mega Projects.
        </p>
      </div>

      <div className="labs-container">
        {renderSection('Beginner Labs', 'Start here to grasp foundational deployments locally and via basic CI pipelines.', beginners, 'blue')}
        {renderSection('Intermediate Labs', 'Tackle 3-tier architectures, cloud infra with Terraform, and foundational Kubernetes.', intermediates, 'orange')}
        {renderSection('Expert Mega Projects', 'Build production-grade GitOps workflows and complete DevSecOps enterprise CI/CD pipelines.', experts, 'purple')}
      </div>

      {selectedProject && (
        <ProjectStepsModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
};
