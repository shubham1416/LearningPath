import React, { useState, useRef, useEffect } from 'react';
import type { CommandDetail } from '../../data/toolsData';
import './InteractiveTerminal.css';

interface InteractiveTerminalProps {
  toolName: string;
  level: string;
  commands: CommandDetail[];
}

interface TermLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ toolName, level, commands }) => {
  const [history, setHistory] = useState<TermLine[]>([
    { type: 'output', content: `Welcome to the ${toolName} Interactive Playground (${level})` },
    { type: 'output', content: `Type any of the commands you just learned to see a simulated execution!` }
  ]);
  const [inputVal, setInputVal] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const val = inputVal.trim();
      if (!val) return;

      const newHistory = [...history, { type: 'input' as const, content: val }];
      
      if (val === 'clear') {
        setHistory([]);
      } else {
        // Find if command exists in our learned list
        const foundCmd = commands.find(c => c.cmd.startsWith(val) || val.startsWith(c.cmd.split(' ')[0]));
        
        if (foundCmd) {
          newHistory.push({ 
            type: 'output', 
            content: `[Simulated Execution] ${foundCmd.desc}... Done.` 
          });
          newHistory.push({ 
            type: 'output', 
            content: `Mock Output: Process completed successfully.` 
          });
        } else {
          newHistory.push({ type: 'error', content: `bash: ${val}: command not found or not in current study scope` });
        }
        setHistory(newHistory);
      }
      setInputVal('');
    }
  };

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <div className="term-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <div className="term-title">student@devops-playground: ~</div>
      </div>
      
      <div className="terminal-body">
        {history.map((line, idx) => (
          <div key={idx} className={`term-line line-${line.type}`}>
            {line.type === 'input' && <span className="prompt">$ </span>}
            {line.content}
          </div>
        ))}
        
        <div className="term-input-line">
          <span className="prompt">$ </span>
          <input
            type="text"
            className="term-input"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck="false"
          />
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
};
