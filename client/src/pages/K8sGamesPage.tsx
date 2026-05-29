import React, { useState, useRef, useCallback } from 'react';
import {
  Gamepad2,
  PenTool,
  Keyboard,
  Maximize,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import './K8sGamesPage.css';

type GameMode = 'simulator' | 'draw';

const GAME_URLS: Record<GameMode, string> = {
  simulator: 'https://k8sgames.com',
  draw: 'https://k8sgames.com/draw',
};

export const K8sGamesPage: React.FC = () => {
  const [mode, setMode] = useState<GameMode>('simulator');
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleModeSwitch = useCallback((newMode: GameMode) => {
    if (newMode === mode) return;
    setLoading(true);
    setMode(newMode);
  }, [mode]);

  const handleIframeLoad = useCallback(() => {
    setLoading(false);
  }, []);

  const handleFullscreen = useCallback(() => {
    const container = iframeRef.current?.parentElement;
    if (container) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        container.requestFullscreen();
      }
    }
  }, []);

  const handleOpenExternal = useCallback(() => {
    window.open(GAME_URLS[mode], '_blank', 'noopener,noreferrer');
  }, [mode]);

  return (
    <div className="k8s-games-page animate-fade-in">
      {/* ---- Header ---- */}
      <div className="k8s-games-header">
        <div className="header-left">
          <div className="title-row">
            <Gamepad2 className="icon-main" />
            <h1 className="text-gradient">Kubernetes Games</h1>
          </div>
          <p className="subtitle">
            Learn Kubernetes by playing — deploy pods, fix incidents, and type real kubectl commands in a 3D browser simulation.
          </p>
        </div>
      </div>

      {/* ---- Mode Selector ---- */}
      <div className="game-mode-bar">
        <div
          className={`mode-card simulator glass-panel ${mode === 'simulator' ? 'active' : ''}`}
          onClick={() => handleModeSwitch('simulator')}
          role="button"
          tabIndex={0}
          id="mode-simulator"
        >
          <div className="mode-icon-wrapper">
            <Gamepad2 size={22} />
          </div>
          <div className="mode-info">
            <h3>🎮 K8s Simulator</h3>
            <p>Deploy pods, fix CrashLoopBackOff, manage incidents — 3D cluster management game</p>
          </div>
          {mode === 'simulator' && <div className="mode-active-dot" />}
        </div>

        <div
          className={`mode-card draw glass-panel ${mode === 'draw' ? 'active' : ''}`}
          onClick={() => handleModeSwitch('draw')}
          role="button"
          tabIndex={0}
          id="mode-draw"
        >
          <div className="mode-icon-wrapper">
            <PenTool size={22} />
          </div>
          <div className="mode-info">
            <h3>🏗️ K8s Draw</h3>
            <p>Drag & drop K8s resources onto a 3D canvas, draw connections, export YAML or PNG</p>
          </div>
          {mode === 'draw' && <div className="mode-active-dot" />}
        </div>
      </div>

      {/* ---- Main Content ---- */}
      <div className="k8s-games-main">
        {/* Iframe */}
        <div className="iframe-container glass-panel">
          <div className={`iframe-loading ${!loading ? 'hidden' : ''}`}>
            <div className="loading-spinner" />
            <p>Loading {mode === 'simulator' ? 'K8s Simulator' : 'K8s Draw'}…</p>
          </div>
          <iframe
            ref={iframeRef}
            key={mode}
            src={GAME_URLS[mode]}
            title={mode === 'simulator' ? 'K8s Simulator Game' : 'K8s Draw Tool'}
            allow="fullscreen"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            onLoad={handleIframeLoad}
          />
        </div>

        {/* Controls Sidebar */}
        <div className="controls-sidebar">
          <div className="ctrl-card glass-panel">
            <h4><Keyboard size={14} /> Controls</h4>
            <ul>
              <li><kbd>/</kbd> kubectl command bar</li>
              <li><kbd>?</kbd> Help overlay</li>
              <li><kbd>Space</kbd> Pause / Resume</li>
              <li><kbd>M</kbd> Toggle music</li>
              <li><kbd>Esc</kbd> Close panels</li>
              <li><kbd>1-9</kbd> Quick deploy</li>
            </ul>
          </div>

          <div className="ctrl-card glass-panel">
            <h4><Sparkles size={14} /> Features</h4>
            <ul className="feature-list">
              <li>25 K8s resource types</li>
              <li>29 real incident scenarios</li>
              <li>Real kubectl commands</li>
              <li>40 achievements & XP</li>
              <li>RBAC simulation</li>
              <li>Architecture Advisor</li>
            </ul>
          </div>

          <button
            className="fullscreen-btn"
            onClick={handleFullscreen}
            id="btn-fullscreen"
          >
            <Maximize size={16} />
            Fullscreen
          </button>

          <button
            className="open-external-btn"
            onClick={handleOpenExternal}
            id="btn-open-external"
          >
            <ExternalLink size={16} />
            Open in New Tab
          </button>
        </div>
      </div>
    </div>
  );
};
