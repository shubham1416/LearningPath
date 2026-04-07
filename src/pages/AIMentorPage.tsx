import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { toolsData } from '../data/toolsData';
import { Bot, User, Send, Compass, HelpCircle, BrainCircuit } from 'lucide-react';
import './AIMentorPage.css';

type Mode = 'quiz' | 'help' | null;
type Message = { role: 'user' | 'ai'; content: string };

export const AIMentorPage: React.FC = () => {
  const [selectedToolId, setSelectedToolId] = useState<string>('');
  const [mode, setMode] = useState<Mode>(null);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedTool = toolsData.find(t => t.id === selectedToolId);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  const handleStartInteraction = async (selectedMode: Mode) => {
    if (!selectedTool) return;
    setMode(selectedMode);
    
    // Clear history
    setChatHistory([]);
    
    // Auto-fire first message from AI based on mode
    let initialGreeting = '';
    if (selectedMode === 'quiz') {
      initialGreeting = `Awesome! Let's test your knowledge on **${selectedTool.name}**. I will ask you a challenging question. Ready?`;
    } else {
      initialGreeting = `Hi! I'm here to help you understand **${selectedTool.name}**. Where are you getting stuck?`;
    }
    
    setChatHistory([{ role: 'ai', content: initialGreeting }]);
    
    // If it's a quiz, silently ask the backend to generate the first question
    if (selectedMode === 'quiz') {
      await sendMessageToBackend('', selectedMode, selectedTool.name, true);
    }
  };

  const sendMessageToBackend = async (userText: string, currentMode: Mode, toolName: string, isSilentInitialize = false) => {
    setIsLoading(true);
    let newHistory = [...chatHistory];
    
    if (!isSilentInitialize && userText) {
      newHistory = [...chatHistory, { role: 'user', content: userText }];
      setChatHistory(newHistory);
      setInput('');
    }

    try {
      const payload = {
        message: userText || "Generate the first question",
        toolName: toolName,
        mode: currentMode,
        history: isSilentInitialize ? [] : chatHistory // pass old history to keep context
      };

      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to communicate with AI');
      }

      setChatHistory([...newHistory, { role: 'ai', content: data.text }]);
    } catch (error: any) {
      setChatHistory([...newHistory, { role: 'ai', content: `**Error:** ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || !mode || !selectedTool) return;
    sendMessageToBackend(input, mode, selectedTool.name);
  };

  const resetSession = () => {
    setMode(null);
    setChatHistory([]);
  };

  return (
    <div className="ai-mentor-page">
      <div className="mentor-sidebar glass-panel">
        <h2 className="mentor-sidebar-title">
          <Bot size={24} className="text-secondary" />
          AI Mentor Settings
        </h2>
        
        <div className="settings-group">
          <label>Select Tool</label>
          <select 
            value={selectedToolId} 
            onChange={(e) => setSelectedToolId(e.target.value)}
            className="tool-select"
          >
            <option value="" disabled>-- Choose a DevOps Tool --</option>
            {toolsData.map(tool => (
              <option key={tool.id} value={tool.id}>{tool.name}</option>
            ))}
          </select>
        </div>

        {selectedToolId && !mode && (
          <div className="mode-selection">
            <button className="mode-btn quiz" onClick={() => handleStartInteraction('quiz')}>
              <BrainCircuit size={20} />
              <div className="btn-text">
                <strong>Test Your Knowledge</strong>
                <span>Interactive Interview</span>
              </div>
            </button>

            <button className="mode-btn help" onClick={() => handleStartInteraction('help')}>
              <HelpCircle size={20} />
              <div className="btn-text">
                <strong>I'm Stuck (Help Me)</strong>
                <span>Get Step-by-Step Help</span>
              </div>
            </button>
          </div>
        )}

        {mode && (
          <button className="reset-btn" onClick={resetSession}>
            End Conversation
          </button>
        )}
      </div>

      <div className="mentor-chat-area glass-panel">
        {!mode ? (
          <div className="empty-state">
            <Compass size={64} className="empty-icon text-secondary" />
            <h2>Welcome to your AI DevOps Mentor</h2>
            <p>Select a tool from the left panel and choose a mode to begin.</p>
          </div>
        ) : (
          <div className="chat-interface">
            <div className="chat-history scrollbar-custom">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`chat-bubble-wrapper ${msg.role}`}>
                  <div className="chat-avatar">
                    {msg.role === 'ai' ? <Bot size={20} /> : <User size={20} />}
                  </div>
                  <div className={`chat-bubble ${msg.role}`}>
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="chat-bubble-wrapper ai">
                  <div className="chat-avatar"><Bot size={20} /></div>
                  <div className="chat-bubble ai typing">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-area" onSubmit={handleSend}>
              <input
                type="text"
                placeholder={isLoading ? "AI is thinking..." : "Type your message..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <button type="submit" disabled={!input.trim() || isLoading}>
                <Send size={18} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
