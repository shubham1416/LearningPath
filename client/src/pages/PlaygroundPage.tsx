import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { Terminal as TerminalIcon, Info, Wifi, WifiOff } from 'lucide-react';
import '@xterm/xterm/css/xterm.css';
import './PlaygroundPage.css';

export const PlaygroundPage: React.FC = () => {
    const termRef = useRef<HTMLDivElement>(null);
    const xtermRef = useRef<XTerm | null>(null);
    const wsRef = useRef<WebSocket | null>(null);
    const [status, setStatus] = React.useState<'connecting' | 'connected' | 'disconnected'>('connecting');

    useEffect(() => {
        if (!termRef.current) return;

        // 1. Initialize xterm.js
        const term = new XTerm({
            cursorBlink: true,
            theme: {
                background: '#1e1e1e',
                foreground: '#f8f8f2',
                cursor: '#f8f8f2',
                selectionBackground: '#44475a',
            },
            fontFamily: '"Fira Code", monospace',
            fontSize: 14,
            allowProposedApi: true,
        });

        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        term.open(termRef.current);
        fitAddon.fit();
        xtermRef.current = term;

        // 2. Copy-Paste support
        // Ctrl+Shift+C → copy selection | Ctrl+Shift+V → paste from clipboard
        term.attachCustomKeyEventHandler((e: KeyboardEvent) => {
            if (e.type !== 'keydown') return true;

            if (e.ctrlKey && e.shiftKey && e.code === 'KeyC') {
                const selection = term.getSelection();
                if (selection) {
                    navigator.clipboard.writeText(selection).catch(() => {});
                }
                return false; // prevent default xterm handling
            }
            if (e.ctrlKey && e.shiftKey && e.code === 'KeyV') {
                navigator.clipboard.readText().then((text) => {
                    if (text && wsRef.current?.readyState === WebSocket.OPEN) {
                        wsRef.current.send(text);
                    }
                }).catch(() => {});
                return false;
            }
            return true;
        });

        // Right-click → paste from clipboard
        const currentTermRef = termRef.current;
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            navigator.clipboard.readText().then((text) => {
                if (text && wsRef.current?.readyState === WebSocket.OPEN) {
                    wsRef.current.send(text);
                }
            }).catch(() => {});
        };
        currentTermRef.addEventListener('contextmenu', handleContextMenu);

        // 3. Connect to Playground Backend
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const socketUrl = import.meta.env.DEV ? 'ws://localhost:8080' : `${protocol}//${window.location.host}`;

        const socket = new WebSocket(socketUrl);
        wsRef.current = socket;

        socket.onopen = () => {
            setStatus('connected');
            term.reset();
            term.writeln('\x1b[32m[Connected]\x1b[0m Welcome to the Real DevOps Playground!');
            term.writeln('Spawning isolated container...\r\n');
        };

        socket.onmessage = (event: MessageEvent) => {
            if (event.data instanceof Blob) {
                const reader = new FileReader();
                reader.onload = () => {
                    term.write(new Uint8Array(reader.result as ArrayBuffer));
                };
                reader.readAsArrayBuffer(event.data);
            } else {
                term.write(event.data);
            }
        };

        socket.onclose = () => {
            setStatus('disconnected');
            term.writeln('\r\n\x1b[31m[Disconnected]\x1b[0m Session closed. Refresh to restart.');
        };

        // 4. User Input -> Backend -> Container
        term.onData((data) => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(data);
            }
        });

        const handleResize = () => fitAddon.fit();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            currentTermRef.removeEventListener('contextmenu', handleContextMenu);
            socket.close();
            term.dispose();
        };
    }, []);

    return (
        <div className="playground-page animate-fade-in">
            <div className="playground-header">
                <div className="header-left">
                    <div className="title-group">
                        <TerminalIcon className="icon-main" />
                        <h1 className="text-gradient">Console Playground</h1>
                    </div>
                    <p className="subtitle">Real-time isolated Linux environment for practicing DevOps operations.</p>
                </div>
                <div className={`status-badge ${status}`}>
                    {status === 'connected' ? <Wifi size={14} /> : <WifiOff size={14} />}
                    {status.toUpperCase()}
                </div>
            </div>

            <div className="playground-main">
                <div ref={termRef} className="xterm-wrapper glass-panel" />

                <div className="playground-sidebar">
                    <div className="side-card glass-panel">
                        <h3><Info size={16} /> Playground Rules</h3>
                        <ul>
                            <li>Session automatically wipes on close.</li>
                            <li>Resource limits: 0.5 CPU / 512MB RAM.</li>
                            <li>Root access granted inside container.</li>
                            <li>Practice <code>apt install</code>, <code>git</code>, <code>ansible</code>.</li>
                        </ul>
                    </div>

                    <div className="side-card glass-panel">
                        <h3>⌨️ Keyboard Shortcuts</h3>
                        <ul className="shortcuts-list">
                            <li><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> &nbsp;Copy</li>
                            <li><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd> &nbsp;Paste</li>
                            <li><kbd>Right-click</kbd> &nbsp;Paste from clipboard</li>
                        </ul>
                    </div>

                    <div className="side-card glass-panel prompt-hint">
                        <h3>Quick start</h3>
                        <code>apt update &amp;&amp; apt install -y git htop</code>
                    </div>
                </div>
            </div>
        </div>
    );
};
