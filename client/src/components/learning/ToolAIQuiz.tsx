import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, User, Send, BrainCircuit, X, ChevronDown } from 'lucide-react';
import './ToolAIQuiz.css';

type Difficulty = 'easy' | 'intermediate' | 'expert';
type Message = { role: 'user' | 'ai'; content: string };

interface ToolAIQuizProps {
  toolName: string;
}

export const ToolAIQuiz: React.FC<ToolAIQuizProps> = ({ toolName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  const sendMessage = async (userText: string, isSilent = false) => {
    setIsLoading(true);
    let newHistory = [...chatHistory];
    if (!isSilent && userText) {
      newHistory = [...chatHistory, { role: 'user', content: userText }];
      setChatHistory(newHistory);
      setInput('');
    }

    try {
      const payload = {
        message: userText || 'Generate the first question',
        toolName,
        mode: 'quiz',
        difficulty,
        history: isSilent ? [] : chatHistory,
      };
      const response = await fetch('/api/chat', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'AI request failed');
      setChatHistory([...newHistory, { role: 'ai', content: data.text }]);
    } catch (error: any) {
      setChatHistory([...newHistory, { role: 'ai', content: `**Error:** ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startQuiz = async () => {
    setHasStarted(true);
    setChatHistory([{ role: 'ai', content: `Let's test your **${toolName}** knowledge at the **${difficulty.toUpperCase()}** level! Here comes your first question...` }]);
    await sendMessage('', true);
  };

  const resetQuiz = () => {
    setHasStarted(false);
    setChatHistory([]);
    setInput('');
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
  };

  if (!isOpen) {
    return (
      <button className="quiz-launch-btn" onClick={() => setIsOpen(true)}>
        <BrainCircuit size={18} />
        <span>AI Knowledge Test</span>
        <ChevronDown size={16} />
      </button>
    );
  }

  return (
    <div className="tool-ai-quiz glass-panel">
      <div className="quiz-header">
        <div className="quiz-header-left">
          <BrainCircuit size={20} className="quiz-header-icon" />
          <h3>AI Knowledge Test — {toolName}</h3>
        </div>
        <button className="quiz-close-btn" onClick={() => { setIsOpen(false); resetQuiz(); }}>
          <X size={18} />
        </button>
      </div>

      {!hasStarted ? (
        <div className="quiz-setup">
          <p className="quiz-setup-desc">Select a difficulty level and the AI will quiz you on <strong>{toolName}</strong> concepts.</p>
          <div className="difficulty-selector">
            {(['easy', 'intermediate', 'expert'] as Difficulty[]).map(d => (
              <button
                key={d}
                className={`diff-btn ${difficulty === d ? 'active' : ''} diff-${d}`}
                onClick={() => setDifficulty(d)}
              >
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
          <button className="start-quiz-btn" onClick={startQuiz}>
            <BrainCircuit size={18} />
            Start Quiz
          </button>
        </div>
      ) : (
        <div className="quiz-chat">
          <div className="quiz-messages scrollbar-custom">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`quiz-msg ${msg.role}`}>
                <div className="quiz-msg-avatar">
                  {msg.role === 'ai' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className={`quiz-msg-bubble ${msg.role}`}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="quiz-msg ai">
                <div className="quiz-msg-avatar"><Bot size={16} /></div>
                <div className="quiz-msg-bubble ai typing-dots">
                  <span className="dot" /><span className="dot" /><span className="dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="quiz-input-area" onSubmit={handleSend}>
            <input
              type="text"
              placeholder={isLoading ? 'AI is thinking...' : 'Type your answer...'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" disabled={!input.trim() || isLoading}>
              <Send size={16} />
            </button>
          </form>

          <button className="quiz-end-btn" onClick={resetQuiz}>End Quiz</button>
        </div>
      )}
    </div>
  );
};
