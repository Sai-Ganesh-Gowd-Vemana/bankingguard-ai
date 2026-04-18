import { useState, useRef, useEffect } from "react";
import { chatbot } from "../services/api";
import { PageHeader } from "../components/UI";

const QUICK = [
  "What is OTP fraud?",
  "How to identify phishing links?",
  "What if I shared my OTP?",
  "How to report banking fraud?",
  "Is investment WhatsApp group safe?",
  "What is KYC scam?",
];

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello! I'm your AI fraud awareness assistant. Ask me anything about banking security, scams, or fraud prevention.",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (msg) => {
    const text = msg || input;
    if (!text.trim()) return;
    setInput("");
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages(m => [...m, { role: "user", text, time }]);
    setLoading(true);
    try {
      const response = await chatbot(text);
      setMessages(m => [...m, { role: "bot", text: response.reply, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        icon="⬟"
        title="AI Fraud Awareness Chatbot"
        subtitle="Powered by Claude AI — ask anything about banking security and fraud prevention."
        badge="CLAUDE AI" gradient="linear-gradient(135deg, #8b5cf6, #7c3aed)"
      />

      <div className="chat-shell">
        {/* Messages */}
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`msg-row msg-row--${m.role}`} style={{ animationDelay: `${i * 0.05}s` }}>
              {m.role === "bot" && (
                <div className="msg-avatar">⬟</div>
              )}
              <div className={`msg-bubble msg-bubble--${m.role}`}>
                <p>{m.text}</p>
                <span className="msg-time">{m.time}</span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="msg-row msg-row--bot">
              <div className="msg-avatar">⬟</div>
              <div className="msg-bubble msg-bubble--bot msg-bubble--typing">
                <div className="typing-dots">
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick questions */}
        <div className="quick-section">
          <div className="quick-label">Quick Questions</div>
          <div className="quick-chips">
            {QUICK.map((q, i) => (
              <button key={i} className="quick-chip" onClick={() => send(q)} disabled={loading}>
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <input
            className="chat-input"
            placeholder="Ask about banking fraud, scams, OTP safety..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            disabled={loading}
          />
          <button className="send-btn" onClick={() => send()} disabled={!input.trim() || loading}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 9h14M9 2l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        .chat-shell {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          height: calc(100vh - 260px);
          min-height: 480px;
          overflow: hidden;
          animation: fadeUp 0.4s ease forwards;
        }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .msg-row {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          animation: fadeUp 0.3s ease forwards;
        }
        .msg-row--user { flex-direction: row-reverse; }
        .msg-avatar {
          width: 34px; height: 34px;
          background: var(--accent-dim);
          border: 1px solid var(--border-accent);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
          color: var(--accent);
          flex-shrink: 0;
        }
        .msg-bubble {
          max-width: 72%;
          padding: 12px 16px;
          border-radius: 14px;
          position: relative;
        }
        .msg-bubble p { margin: 0; font-size: 14px; line-height: 1.6; }
        .msg-bubble--bot {
          background: var(--bg-input);
          border: 1px solid var(--border);
          color: var(--text-primary);
          border-bottom-left-radius: 4px;
        }
        .msg-bubble--user {
          background: linear-gradient(135deg, var(--accent), #0088cc);
          color: #050b18;
          border-bottom-right-radius: 4px;
        }
        .msg-bubble--user p { color: #050b18; }
        .msg-time {
          display: block;
          font-size: 10px;
          opacity: 0.5;
          margin-top: 5px;
          text-align: right;
        }
        .msg-bubble--typing { padding: 14px 18px; }
        .typing-dots { display: flex; gap: 5px; align-items: center; }
        .typing-dots span {
          width: 6px; height: 6px;
          background: var(--text-muted);
          border-radius: 50%;
          animation: bounce 1.2s ease infinite;
        }
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .quick-section {
          padding: 12px 20px;
          border-top: 1px solid var(--border);
        }
        .quick-label { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px; }
        .quick-chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .quick-chip {
          font-size: 12px;
          padding: 5px 12px;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: 20px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition);
          font-family: 'DM Sans', sans-serif;
        }
        .quick-chip:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); }
        .quick-chip:disabled { opacity: 0.5; cursor: not-allowed; }

        .chat-input-area {
          padding: 16px 20px;
          border-top: 1px solid var(--border);
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .chat-input {
          flex: 1;
          padding: 12px 16px;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: 10px;
          color: var(--text-primary);
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: all var(--transition);
        }
        .chat-input::placeholder { color: var(--text-muted); }
        .chat-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-dim); }
        .chat-input:disabled { opacity: 0.6; }

        .send-btn {
          width: 44px; height: 44px;
          background: linear-gradient(135deg, var(--accent), #0088cc);
          border: none;
          border-radius: 10px;
          color: #050b18;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all var(--transition);
        }
        .send-btn:hover:not(:disabled) { transform: scale(1.05); box-shadow: 0 4px 14px var(--accent-glow); }
        .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>
    </div>
  );
}

export default Chatbot;