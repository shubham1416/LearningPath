import React from 'react';
import { practiceProjects, type PracticeDifficulty } from '../data/projectsData';
import { Code, ExternalLink, Flame, Zap, ShieldAlert } from 'lucide-react';
import './ProjectsPage.css';

const DiffIcon = ({ diff }: { diff: PracticeDifficulty }) => {
  if (diff === 'Beginner') return <Zap size={16} className="diff-icon diff-beginner" />;
  if (diff === 'Intermediate') return <Flame size={16} className="diff-icon diff-intermediate" />;
  return <ShieldAlert size={16} className="diff-icon diff-expert" />;
};

export const ProjectsPage: React.FC = () => {
  const beginners = practiceProjects.filter(p => p.difficulty === 'Beginner');
  const intermediates = practiceProjects.filter(p => p.difficulty === 'Intermediate');
  const experts = practiceProjects.filter(p => p.difficulty === 'Expert');

  const renderSection = (title: string, desc: string, projects: typeof practiceProjects, theme: string) => (
    <div className={`project-section theme-${theme}`}>
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <p className="section-desc">{desc}</p>
      </div>
      <div className="projects-grid">
        {projects.map(project => (
          <a key={project.id} href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-card glass-panel">
            <div className="card-top">
              <span className={`diff-badge diff-${project.difficulty.toLowerCase()}`}>
                <DiffIcon diff={project.difficulty} />
                {project.difficulty}
              </span>
              <Code size={20} className="github-icon" />
            </div>
            <h3 className="project-title">{project.title}</h3>
            <div className="card-footer">
              <span className="project-id">{project.id.replace('DevOps-', '')}</span>
              <div className="run-link">
                View Project <ExternalLink size={14} />
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
    </div>
  );
};
