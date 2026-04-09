import React from 'react';
import { GitBranch, Box, Globe2, CloudCog, Settings, Terminal } from 'lucide-react';
import './DevOpsHeroAnimation.css';

const FLOATING_ICONS = [
  { Icon: GitBranch, label: 'Git',    color: '#f97316', angle: 0 },
  { Icon: Box,       label: 'Docker', color: '#3b82f6', angle: 60 },
  { Icon: Globe2,    label: 'K8s',    color: '#6366f1', angle: 120 },
  { Icon: CloudCog,  label: 'Cloud',  color: '#10b981', angle: 180 },
  { Icon: Settings,  label: 'CI/CD',  color: '#a78bfa', angle: 240 },
  { Icon: Terminal,  label: 'Linux',  color: '#14b8a6', angle: 300 },
];

export const DevOpsHeroAnimation: React.FC = () => {
  /* An infinity-style figure-8 path centered at the origin */
  const infinityPath =
    'M 0,0 C 35,-62 92,-62 92,0 C 92,62 35,62 0,0 C -35,-62 -92,-62 -92,0 C -92,62 -35,62 0,0';

  /* Convert angle → x,y on an ellipse to position floating icons */
  const radius = 155;
  const iconPositions = FLOATING_ICONS.map((item) => {
    const rad = (item.angle * Math.PI) / 180;
    return {
      ...item,
      x: Math.cos(rad) * radius,
      y: Math.sin(rad) * radius * 0.65,
    };
  });

  return (
    <div className="devops-hero-anim">
      {/* Background radial glow */}
      <div className="dha-backdrop-glow" />

      {/* Floating DevOps tool icons */}
      {iconPositions.map((item, i) => {
        const Icon = item.Icon;
        return (
          <div
            key={i}
            className="dha-float-icon"
            style={{
              left: `calc(50% + ${item.x}px)`,
              top: `calc(50% + ${item.y}px)`,
              animationDelay: `${i * 0.6}s`,
            }}
            title={item.label}
          >
            <div
              className="dha-icon-bubble"
              style={{
                borderColor: `${item.color}30`,
                background: `${item.color}0d`,
              }}
            >
              <Icon size={17} color={item.color} strokeWidth={2.2} />
            </div>
            <span className="dha-icon-label" style={{ color: item.color }}>
              {item.label}
            </span>
          </div>
        );
      })}

      {/* Main SVG Infinity Loop */}
      <svg viewBox="-125 -85 250 170" className="dha-svg" aria-label="DevOps infinity loop">
        <defs>
          {/* Left-to-right gradient: blue → purple → green */}
          <linearGradient id="dha-grad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%"   stopColor="#3b82f6" />
            <stop offset="40%"  stopColor="#6366f1" />
            <stop offset="60%"  stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="dha-glow">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft outer spread */}
          <filter id="dha-spread">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Outer soft glow layer */}
        <path
          d={infinityPath}
          fill="none"
          stroke="url(#dha-grad)"
          strokeWidth="30"
          opacity="0.07"
          filter="url(#dha-spread)"
        />

        {/* Main infinity stroke */}
        <path
          d={infinityPath}
          fill="none"
          stroke="url(#dha-grad)"
          strokeWidth="13"
          strokeLinecap="round"
          className="dha-main-path"
          filter="url(#dha-glow)"
        />

        {/* Animated flowing data particles (forward) */}
        <path
          d={infinityPath}
          fill="none"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="dha-flow dha-flow-1"
        />

        {/* Animated flowing data particles (reverse) */}
        <path
          d={infinityPath}
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="2"
          strokeLinecap="round"
          className="dha-flow dha-flow-2"
        />

        {/* Orbiting energy dots */}
        <circle r="5" fill="#60a5fa" filter="url(#dha-glow)" opacity="0.9">
          <animateMotion dur="5s" repeatCount="indefinite" path={infinityPath} />
        </circle>
        <circle r="4" fill="#34d399" filter="url(#dha-glow)" opacity="0.85">
          <animateMotion dur="5s" repeatCount="indefinite" path={infinityPath} begin="-1.67s" />
        </circle>
        <circle r="4" fill="#c084fc" filter="url(#dha-glow)" opacity="0.8">
          <animateMotion dur="5s" repeatCount="indefinite" path={infinityPath} begin="-3.33s" />
        </circle>

        {/* "Dev" label in left loop */}
        <text x="-52" y="7" textAnchor="middle" className="dha-label dha-dev">
          Dev
        </text>

        {/* "Ops" label in right loop */}
        <text x="52" y="7" textAnchor="middle" className="dha-label dha-ops">
          Ops
        </text>
      </svg>
    </div>
  );
};
