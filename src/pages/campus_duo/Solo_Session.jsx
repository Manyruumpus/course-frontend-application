// src/pages/Solo_Session.jsx
import React, { useEffect, useState, useCallback, useRef } from "react";

const QUOTES = [
  "Deep work creates deep rewards.",
  "Focus is the new IQ.", 
  "Progress, not perfection.",
  "One breath, one task, one moment.",
  "Excellence is a habit, not an act."
];

const getId = (url = "") => 
  (/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/.exec(url) || [])[1];

const mmss = s => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

export default function Solo_Session() {
  const [quote] = useState(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  const [vid, setVid] = useState("5qap5aO4i9A");
  const [url, setUrl] = useState("");
  
  const [focusLen, setFocusLen] = useState(() => 
    localStorage.getItem('focusLen') ? +localStorage.getItem('focusLen') : 25 * 60
  );
  const [breakLen, setBreakLen] = useState(() => 
    localStorage.getItem('breakLen') ? +localStorage.getItem('breakLen') : 5 * 60
  );
  
  const [secs, setSecs] = useState(focusLen);
  const [mode, setMode] = useState("Focus");
  const [run, setRun] = useState(false);
  const [sessions, setSessions] = useState(0);
  
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  
  const [todo, setTodo] = useState("");
  const [tasks, setTasks] = useState(() => 
    JSON.parse(localStorage.getItem('tasks') || '[]')
  );
  
  const inputRef = useRef(null);
  
  useEffect(() => {
    localStorage.setItem('focusLen', focusLen.toString());
    localStorage.setItem('breakLen', breakLen.toString());
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [focusLen, breakLen, tasks]);
  
  useEffect(() => {
    if (!run) return;
    const id = setInterval(() => {
      setSecs(prev => {
        if (prev === 1) {
          const nextMode = mode === "Focus" ? "Break" : "Focus";
          setMode(nextMode);
          if (nextMode === "Focus") setSessions(s => s + 1);
          return nextMode === "Focus" ? focusLen : breakLen;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [run, mode, focusLen, breakLen]);
  
  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.tagName === 'INPUT') return;
      
      switch(e.code) {
        case 'Space':
          e.preventDefault();
          toggleTimer();
          break;
        case 'KeyR':
          e.preventDefault();
          resetTimer();
          break;
        case 'KeyM':
          e.preventDefault();
          setMuted(!muted);
          break;
        case 'KeyF':
          e.preventDefault();
          setFullscreen(!fullscreen);
          break;
        case 'KeyT':
          e.preventDefault();
          inputRef.current?.focus();
          break;
        case 'Escape':
          setShowShortcuts(false);
          break;
      }
    };
    
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [run, muted, fullscreen]);
  
  const toggleTimer = useCallback(() => {
    setRun(!run);
  }, [run]);
  
  const resetTimer = useCallback(() => {
    setRun(false);
    setMode("Focus");
    setSecs(focusLen);
    setSessions(0);
  }, [focusLen]);
  
  const loadVideo = useCallback((e) => {
    e.preventDefault();
    const id = getId(url);
    if (id) {
      setVid(id);
      setUrl("");
    }
  }, [url]);
  
  const addTask = useCallback((e) => {
    e.preventDefault();
    if (!todo.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), text: todo.trim(), done: false }]);
    setTodo("");
  }, [todo]);
  
  const toggleTask = useCallback((id) => {
    setTasks(prev => prev.map(t => t.id === id ? {...t, done: !t.done} : t));
  }, []);
  
  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);
  
  const progress = (secs / (mode === "Focus" ? focusLen : breakLen)) * 100;
  const accent = mode === "Focus" ? "teal" : "amber";
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (progress * circumference / 100);
  
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white relative ${fullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Floating Controls */}
      <div className="fixed top-5 right-5 flex gap-2 z-50">
        <button 
          onClick={() => setMuted(!muted)}
          className={`w-10 h-10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all hover:scale-105 ${
            muted ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white'
          }`}
          title="Toggle Sound (M)"
        >
        </button>
        <button 
          onClick={() => setFullscreen(!fullscreen)}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all hover:scale-105"
          title="Toggle Fullscreen (F)"
        >
        </button>
        <button 
          onClick={() => setShowShortcuts(!showShortcuts)}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all hover:scale-105"
          title="Keyboard Shortcuts"
        >
        </button>
      </div>
      
      {/* Shortcuts Modal */}
      {showShortcuts && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowShortcuts(false)}>
          <div className="bg-slate-800/95 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-semibold text-teal-400 mb-4">Keyboard Shortcuts</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Start/Pause Timer</span>
                <kbd className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs font-mono">Space</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span>Reset Timer</span>
                <kbd className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs font-mono">R</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span>Toggle Sound</span>
                <kbd className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs font-mono">M</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span>Toggle Fullscreen</span>
                <kbd className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs font-mono">F</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span>Focus Todo Input</span>
                <kbd className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs font-mono">T</kbd>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid lg:grid-cols-[1fr_360px] gap-6 p-6 max-w-7xl mx-auto">
        {/* Left Column */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-lg italic text-teal-400">{quote}</p>
            {sessions > 0 && (
              <div className="text-sm text-slate-400">
                🍅 {sessions} session{sessions !== 1 ? 's' : ''} completed
              </div>
            )}
          </div>
          
          <div className="relative w-full pb-[56.25%] rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src={`https://www.youtube.com/embed/${vid}?autoplay=1&controls=0&modestbranding=1&rel=0`}
              title="Study Stream"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media"
            />
          </div>
          
          <form onSubmit={loadVideo} className="flex gap-3">
            <input
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="Paste YouTube link for focus music..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            />
            <button 
              type="submit" 
              className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 transition-colors font-medium"
            >
              Load
            </button>
          </form>
        </section>
        
        {/* Right Column */}
        <aside className="space-y-6">
          {/* Pomodoro Timer */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
            <div className="relative flex items-center justify-center mb-6">
              <svg className="w-32 h-32 -rotate-90">
                <circle
                  cx="64" cy="64" r="54"
                  fill="transparent"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                />
                <circle
                  cx="64" cy="64" r="54"
                  fill="transparent"
                  stroke={mode === "Focus" ? "#10b981" : "#f59e0b"}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              
              <div className="absolute text-center">
                <div className={`text-sm font-medium mb-1 ${mode === "Focus" ? "text-teal-400" : "text-amber-400"}`}>
                  {mode} Session
                </div>
                <div className="text-3xl font-mono font-semibold">{mmss(secs)}</div>
                <div className="flex gap-3 mt-4">
                  <button 
                    onClick={toggleTimer}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-105 ${
                      mode === "Focus" ? "bg-teal-600 hover:bg-teal-500" : "bg-amber-600 hover:bg-amber-500"
                    }`}
                  >
                  </button>
                  <button 
                    onClick={resetTimer} 
                    className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center transition-all hover:scale-105"
                  >
                  </button>
                </div>
              </div>
            </div>
            
            {/* Timer Settings */}
            <div className="flex gap-3 items-end">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-400">Focus (min)</label>
                <input
                  type="number"
                  min="1" max="60"
                  value={Math.round(focusLen / 60)}
                  onChange={e => setFocusLen(Math.max(1, +e.target.value) * 60)}
                  className="w-16 px-2 py-1 rounded-lg bg-slate-800 border border-slate-600 text-center text-white focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-400">Break (min)</label>
                <input
                  type="number"
                  min="1" max="30"
                  value={Math.round(breakLen / 60)}
                  onChange={e => setBreakLen(Math.max(1, +e.target.value) * 60)}
                  className="w-16 px-2 py-1 rounded-lg bg-slate-800 border border-slate-600 text-center text-white focus:outline-none focus:border-teal-500"
                />
              </div>
              <button
                onClick={() => setSecs(mode === "Focus" ? focusLen : breakLen)}
                className="px-4 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 transition-colors text-sm font-medium"
              >
                Apply
              </button>
            </div>
          </div>
          
          {/* Todo List */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Focus Tasks</h3>
              <span className="text-sm text-slate-400">
                ({tasks.filter(t => !t.done).length})
              </span>
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
              {tasks.map(task => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg transition-all hover:bg-slate-800/70">
                  <span
                    onClick={() => toggleTask(task.id)}
                    className={`flex-1 cursor-pointer transition-all ${
                      task.done ? 'line-through text-slate-500' : 'text-white'
                    }`}
                  >
                    {task.text}
                  </span>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="text-red-400 hover:text-red-300 p-1 transition-colors"
                  >
                  </button>
                </div>
              ))}
              {tasks.length === 0 && (
                <div className="text-center text-slate-400 py-8">
                  Add your first focus task below 👇
                </div>
              )}
            </div>
            
            <form onSubmit={addTask} className="flex gap-2">
              <input
                ref={inputRef}
                value={todo}
                onChange={e => setTodo(e.target.value)}
                placeholder="What will you focus on?"
                className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-teal-500"
              />
              <button 
                type="submit" 
                className="w-10 h-10 rounded-lg bg-teal-600 hover:bg-teal-500 flex items-center justify-center transition-colors"
              >
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}
