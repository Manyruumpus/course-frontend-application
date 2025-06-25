// src/pages/chat.jsx
import React, { useState, useRef, useEffect } from "react";

const contacts = [
  { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/40?img=5" },
  { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/40?img=6" },
  { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/40?img=7" },
];

const initialChats = {
  1: [
    { id: 1, sender: "them", text: "Hey there! How are you?", time: "09:00 AM" },
    { id: 2, sender: "me", text: "Hi Alice! I’m good, thanks. What about you?", time: "09:01 AM" },
  ],
  2: [
    { id: 1, sender: "them", text: "Ready for the meeting?", time: "Yesterday" },
    { id: 2, sender: "me", text: "Almost, just wrapping things up.", time: "Yesterday" },
  ],
  3: [
    { id: 1, sender: "them", text: "Long time no see!", time: "2 days ago" },
  ],
};

export default function Chat() {
  const [currentContact, setCurrentContact] = useState(contacts[0].id);
  const [messages, setMessages] = useState(initialChats);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentContact]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "me",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages(prev => ({
      ...prev,
      [currentContact]: [...(prev[currentContact] || []), newMsg],
    }));
    setInput("");
  };

  const handleKeyDown = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] select-none bg-gradient-to-b from-indigo-100 to-purple-200 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-lg flex flex-col">
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold tracking-wide text-lg">
          Chats
          <button
            title="New Chat"
            className="p-1 rounded-full hover:bg-indigo-700 transition-colors"
            aria-label="Start new chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto flex-grow">
          {contacts.map(contact => (
            <button
              key={contact.id}
              onClick={() => setCurrentContact(contact.id)}
              className={`flex items-center gap-3 w-full px-5 py-4 cursor-pointer hover:bg-indigo-50 transition-colors ${
                currentContact === contact.id ? "bg-indigo-100" : ""
              }`}
              aria-current={currentContact === contact.id ? "true" : undefined}
            >
              <img
                src={contact.avatar}
                alt={`${contact.name} avatar`}
                className="rounded-full w-11 h-11 object-cover drop-shadow-sm"
              />
              <div className="flex flex-col items-start">
                <span className="font-semibold text-indigo-800">{contact.name}</span>
                <span className="text-xs text-indigo-400 truncate max-w-[12rem]">
                  {messages[contact.id]?.slice(-1)[0]?.text || "No messages yet"}
                </span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Chat Window */}
      <main className="flex flex-col flex-grow max-h-full justify-between bg-indigo-50 shadow-inner">
        {/* Header */}
        <header className="flex items-center px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 border-b border-indigo-700 text-white shadow-md">
          <img
            src={contacts.find(c => c.id === currentContact)?.avatar}
            alt="Selected contact avatar"
            className="w-12 h-12 rounded-full mr-4 border-2 border-white shadow-lg"
          />
          <h2 className="text-xl font-semibold tracking-wide">
            {contacts.find(c => c.id === currentContact)?.name}
          </h2>
          <div className="ml-auto flex gap-3">
            <button aria-label="Video Call" className="hover:bg-indigo-700 p-2 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M23 7l-7 5 7 5V7z" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            </button>
            <button aria-label="Call" className="hover:bg-indigo-700 p-2 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.86 19.86 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13 1.21.45 2.39.93 3.5a2 2 0 01-.45 2.11L9 10.91a16 16 0 006 6l1.58-1.58a2 2 0 012.11-.45c1.11.48 2.29.8 3.5.93a2 2 0 012 2z" />
              </svg>
            </button>
            <button aria-label="More options" className="hover:bg-indigo-700 p-2 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>
          </div>
        </header>

        {/* Message List */}
        <section className="flex-grow overflow-y-auto px-6 py-4 space-y-6 bg-white">
          {(messages[currentContact] || []).map(({ id, sender, text, time }) => (
            <div
              key={id}
              className={`flex flex-col max-w-[75%] ${
                sender === "me" ? "ml-auto items-end" : "mr-auto items-start"
              }`}
            >
              <div
                className={`relative px-5 py-3 rounded-xl shadow-md break-words whitespace-pre-wrap select-text transition-all duration-300 ${
                  sender === "me"
                    ? "bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-br-none animate-fadeInRight"
                    : "bg-indigo-100 text-indigo-900 rounded-bl-none animate-fadeInLeft"
                }`}
                style={{ wordBreak: "break-word" }}
              >
                {text}
              </div>
              <span className="mt-1 text-xs text-indigo-400 font-mono select-none">
                {time}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </section>

        {/* Input Area */}
        <footer className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-t border-indigo-300 flex items-center gap-3">
          <button aria-label="Add attachment" className="text-indigo-500 hover:text-indigo-700 p-2 rounded-full transition-colors" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a4 4 0 00-5.656-5.656L9.586 8.172" />
            </svg>
          </button>
          <textarea
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-grow resize-none bg-white shadow-sm rounded-full px-5 py-3 text-indigo-700 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 transition-all max-h-24 overflow-auto scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-100"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            title="Send Message"
            className="p-3 rounded-full bg-indigo-600 flex items-center justify-center transition-colors hover:bg-indigo-700 shadow-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
            type="button"
          >
            <svg className="w-6 h-6 rotate-45" stroke="currentColor" fill="none" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </footer>
      </main>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeInRight {
          0% { opacity: 0; transform: translateX(12px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInLeft {
          0% { opacity: 0; transform: translateX(-12px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInRight { animation: fadeInRight 0.3s ease forwards; }
        .animate-fadeInLeft { animation: fadeInLeft 0.3s ease forwards; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #e0e7ff; border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: #6366f1; border-radius: 10px; }
      `}</style>
    </div>
  );
}
