import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DevOpsHeroAnimation } from '../components/DevOpsHeroAnimation';
import {
  Rocket,
  Code2,
  GitBranch,
  Box,
  Cloud,
  Activity,
  ChevronRight,
  Sparkles,
  Target,
  Zap,
  Users,
  BookOpen,
  Terminal,
  ArrowDown,
} from 'lucide-react';
import './LandingPage.css';

/* ====== Phase data for the roadmap preview ====== */
const ROADMAP_PHASES = [
  { icon: Terminal,   title: 'Foundations',      desc: 'Linux, Scripting & Programming',   color: '#3b82f6' },
  { icon: GitBranch,  title: 'Version Control',  desc: 'Git, GitHub & Collaboration',      color: '#6366f1' },
  { icon: Code2,      title: 'CI/CD',            desc: 'Jenkins, Actions & Pipelines',     color: '#8b5cf6' },
  { icon: Box,        title: 'Containers',       desc: 'Docker, Kubernetes & Helm',        color: '#a78bfa' },
  { icon: Cloud,      title: 'Cloud & IaC',      desc: 'AWS, Terraform & Ansible',         color: '#c084fc' },
  { icon: Activity,   title: 'Observability',    desc: 'Prometheus, Grafana & Datadog',    color: '#e879f9' },
];

/* ====== Feature highlights ====== */
const FEATURES = [
  {
    icon: BookOpen,
    title: 'Curated Study Material',
    desc: 'Hand-picked resources for every tool — beginner to expert.',
    gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
  },
  {
    icon: Target,
    title: 'AI-Powered Quizzes',
    desc: 'Test your knowledge with adaptive, difficulty-based AI quizzes.',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  },
  {
    icon: Terminal,
    title: 'Live Playground',
    desc: 'Real containers in the browser — execute real DevOps commands.',
    gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
  },
  {
    icon: Zap,
    title: 'Practice Labs',
    desc: 'Step-by-step guided labs with hands-on infrastructure scenarios.',
    gradient: 'linear-gradient(135deg, #a78bfa, #c084fc)',
  },
];

/* ====== Stats ====== */
const STATS = [
  { value: '18+', label: 'DevOps Tools' },
  { value: '6',   label: 'Learning Phases' },
  { value: '54',  label: 'Study Modules' },
  { value: '∞',   label: 'Lab Sessions' },
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);



  /* Trigger entrance animations after mount */
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  /* Scroll-reveal observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('lp-visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRef = (index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el;
  };

  return (
    <div className={`landing-page ${isLoaded ? 'loaded' : ''}`}>
      {/* ===== Ambient Background ===== */}
      <div className="lp-bg" aria-hidden="true">
        <div className="lp-orb lp-orb-1" />
        <div className="lp-orb lp-orb-2" />
        <div className="lp-orb lp-orb-3" />
        <div className="lp-grid-overlay" />
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="lp-star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* ===== HERO SECTION ===== */}
      <section className="lp-hero">
        <div className="lp-hero-content">
          {/* Badge */}
          <div className="lp-badge lp-anim-up" style={{ animationDelay: '0.2s' }}>
            <Sparkles size={14} />
            <span>Interactive DevOps Learning Platform</span>
          </div>

          {/* Title */}
          <h1 className="lp-title lp-anim-up" style={{ animationDelay: '0.35s' }}>
            Master <span className="lp-title-gradient">DevOps</span>
            <br />
            From Zero to Hero
          </h1>

          {/* Subtitle */}
          <p className="lp-subtitle lp-anim-up" style={{ animationDelay: '0.5s' }}>
            A structured roadmap with hands-on labs, AI mentorship, curated
            resources, and real terminal playgrounds — everything you need to
            become a DevOps engineer.
          </p>

          {/* CTA Buttons */}
          <div className="lp-cta-row lp-anim-up" style={{ animationDelay: '0.65s' }}>
            <button className="lp-btn-primary" onClick={() => navigate('/general')}>
              <Rocket size={18} />
              Start Learning
              <ChevronRight size={16} />
            </button>
            <button className="lp-btn-secondary" onClick={() => navigate('/progress')}>
              <Users size={18} />
              My Progress
            </button>
          </div>

          {/* Stats Row */}
          <div className="lp-stats-row lp-anim-up" style={{ animationDelay: '0.8s' }}>
            {STATS.map((stat, i) => (
              <div key={i} className="lp-stat">
                <span className="lp-stat-value">{stat.value}</span>
                <span className="lp-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* DevOps Infinity Animation */}
        <div className="lp-hero-visual lp-anim-up" style={{ animationDelay: '0.5s' }}>
          <DevOpsHeroAnimation />
        </div>

        {/* Scroll indicator */}
        <div className="lp-scroll-hint lp-anim-up" style={{ animationDelay: '1.1s' }}>
          <ArrowDown size={18} className="lp-scroll-arrow" />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="lp-section lp-reveal" ref={setRef(0)}>
        <div className="lp-section-header">
          <span className="lp-section-tag">WHY THIS PLATFORM</span>
          <h2>Everything You Need to <span className="lp-title-gradient">Excel</span></h2>
          <p>A complete ecosystem for mastering DevOps — from theory to practice.</p>
        </div>

        <div className="lp-features-grid">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className="lp-feature-card"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="lp-feat-icon" style={{ background: feat.gradient }}>
                  <Icon size={22} color="#fff" />
                </div>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
                <div className="lp-feat-shine" />
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== ROADMAP PREVIEW SECTION ===== */}
      <section className="lp-section lp-reveal" ref={setRef(1)}>
        <div className="lp-section-header">
          <span className="lp-section-tag">THE JOURNEY</span>
          <h2>Your <span className="lp-title-gradient">Roadmap</span> to Mastery</h2>
          <p>Six carefully designed phases, from fundamentals to production observability.</p>
        </div>

        <div className="lp-roadmap-preview">
          {ROADMAP_PHASES.map((phase, i) => {
            const Icon = phase.icon;
            return (
              <div
                key={i}
                className="lp-road-card"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => navigate('/general')}
              >
                <div className="lp-road-number" style={{ color: phase.color }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="lp-road-icon" style={{ background: `${phase.color}18`, borderColor: `${phase.color}40` }}>
                  <Icon size={20} color={phase.color} />
                </div>
                <div className="lp-road-text">
                  <h4>{phase.title}</h4>
                  <span>{phase.desc}</span>
                </div>
                <ChevronRight size={16} className="lp-road-arrow" style={{ color: phase.color }} />
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="lp-section lp-reveal" ref={setRef(2)}>
        <div className="lp-cta-banner">
          <div className="lp-cta-banner-glow" />
          <h2>Ready to Begin Your DevOps Journey?</h2>
          <p>Jump in, follow the roadmap, and start building real-world skills today.</p>
          <button className="lp-btn-primary lp-btn-lg" onClick={() => navigate('/general')}>
            <Rocket size={20} />
            Launch Roadmap
            <ChevronRight size={18} />
          </button>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="lp-footer">
        <span>DevOps Mastery Platform</span>
        <span className="lp-footer-dot">·</span>
        <span>Built for learning</span>
      </footer>
    </div>
  );
};
