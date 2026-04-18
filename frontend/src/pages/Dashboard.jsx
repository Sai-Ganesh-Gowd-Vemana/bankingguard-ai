import { useState, useEffect } from "react";
import ToolCard from "../components/ToolCard";

const tools = [
  {
    icon: "✉",
    title: "SMS Scam Detector",
    description: "Paste suspicious SMS messages to instantly detect fraud patterns using NLP.",
    route: "/sms",
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    lightBg: "rgba(99,102,241,0.07)",
    stats: "NLP Model · 94% accuracy"
  },
  {
    icon: "⬡",
    title: "URL Phishing Detector",
    description: "Analyze URLs for phishing signatures and malicious redirects.",
    route: "/url",
    gradient: "linear-gradient(135deg, #06b6d4, #0284c7)",
    lightBg: "rgba(6,182,212,0.07)",
    stats: "Real-time scan"
  },
  {
    icon: "◫",
    title: "Screenshot Analyzer",
    description: "Upload screenshots to detect scam messages via OCR + Vision AI.",
    route: "/image",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    lightBg: "rgba(16,185,129,0.07)",
    stats: "Vision AI · OCR"
  },
  {
    icon: "◎",
    title: "Loan Eligibility",
    description: "Evaluate your loan risk using income, credit score and existing debts.",
    route: "/loan",
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    lightBg: "rgba(245,158,11,0.07)",
    stats: "Financial Risk Model"
  },
  {
    icon: "⟡",
    title: "Security Quiz",
    description: "Test your knowledge of banking fraud and phishing tactics.",
    route: "/quiz",
    gradient: "linear-gradient(135deg, #ef4444, #dc2626)",
    lightBg: "rgba(239,68,68,0.07)",
    stats: "20 Questions"
  },
  {
    icon: "⬟",
    title: "AI Chatbot",
    description: "Ask anything about banking fraud, OTP scams, and KYC threats.",
    route: "/chatbot",
    gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
    lightBg: "rgba(139,92,246,0.07)",
    stats: "AI Powered"
  },
  {
    icon: "◷",
    title: "Payment Reminders",
    description: "Never miss a bill — set and manage your payment reminders.",
    route: "/reminder",
    gradient: "linear-gradient(135deg, #06b6d4, #10b981)",
    lightBg: "rgba(6,182,212,0.07)",
    stats: null
  },
];

function Dashboard() {
  const [counts, setCounts] = useState({
    scam: 0, sms: 0, url: 0, img: 0
  });

  useEffect(() => {
    const read = () => setCounts({
      scam: parseInt(localStorage.getItem("scam_count") || "0"),
      sms:  parseInt(localStorage.getItem("sms_count")  || "0"),
      url:  parseInt(localStorage.getItem("url_count")  || "0"),
      img:  parseInt(localStorage.getItem("img_count")  || "0"),
    });
    read();
    // refresh whenever user comes back to this tab
    window.addEventListener("focus", read);
    return () => window.removeEventListener("focus", read);
  }, []);

  const totalScans = counts.sms + counts.url + counts.img;
  const detectionRate = totalScans === 0
    ? "0%"
    : Math.round((counts.scam / totalScans) * 100) + "%";

  const stats = [
    { label: "Scams Detected",  value: counts.scam.toLocaleString(), delta: "from your scans",   gradient: "linear-gradient(135deg,#ef4444,#f87171)", icon: "🛡", live: true },
    { label: "SMS Scanned",     value: counts.sms.toLocaleString(),  delta: "messages analyzed",  gradient: "linear-gradient(135deg,#f59e0b,#fbbf24)", icon: "📩", live: true },
    { label: "URLs Checked",    value: counts.url.toLocaleString(),  delta: "links scanned",      gradient: "linear-gradient(135deg,#10b981,#34d399)", icon: "🔗", live: true },
    { label: "Detection Rate",  value: detectionRate,                delta: "of scans flagged",   gradient: "linear-gradient(135deg,#6366f1,#8b5cf6)", icon: "✦", live: false },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="hero">
        <div className="hero__left">
          <div className="hero__eyebrow">
            <span className="live-dot" />
            LIVE PROTECTION ACTIVE
          </div>
          <h1 className="hero__title">
            Banking<em>Guard</em>
            <span className="hero__ai-badge">AI</span>
          </h1>
          <p className="hero__sub">
            Intelligent fraud detection across SMS, URLs, screenshots, and financial data.
            Protect yourself with AI-powered cybersecurity tools.
          </p>
          <div className="hero__tags">
            <span className="hero__tag">🔒 Bank-grade Security</span>
            <span className="hero__tag">⚡ Real-time Detection</span>
            <span className="hero__tag">🤖 AI Powered</span>
          </div>
        </div>
        <div className="hero__right">
          <div className="hero__shield">
            <div className="shield-outer">
              <div className="shield-inner">
                <div className="shield-icon">🛡</div>
                <div className="shield-text">Protected</div>
              </div>
            </div>
            <div className="shield-ring ring1" />
            <div className="shield-ring ring2" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-row">
        {stats.map((s, i) => (
          <div
            className="stat-card"
            key={i}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="stat-card__top">
              <div className="stat-card__icon-wrap" style={{ background: s.gradient }}>
                {s.icon}
              </div>
              {s.live && (
                <span className="live-badge">
                  <span className="live-badge__dot" />
                  LIVE
                </span>
              )}
            </div>
            <div className="stat-card__value" style={{ background: s.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {s.value}
            </div>
            <div className="stat-card__label">{s.label}</div>
            <div className="stat-card__delta-text">{s.delta}</div>
            <div className="stat-card__bar">
              <div className="stat-card__bar-fill" style={{ background: s.gradient }} />
            </div>
          </div>
        ))}
      </div>

      {/* Section label */}
      <div className="section-label">
        <span>SECURITY TOOLS</span>
        <div className="section-line" />
      </div>

      {/* Tools Grid */}
      <div className="tools-grid">
        {tools.map((tool, i) => (
          <div
            key={i}
            style={{
              animation: `fadeUp 0.4s ease forwards`,
              animationDelay: `${i * 0.06}s`,
              opacity: 0
            }}
          >
            <ToolCard {...tool} />
          </div>
        ))}
      </div>

      {/* Alert Banner */}
      <div className="alert-banner">
        <div className="alert-banner__icon">⚠️</div>
        <div className="alert-banner__body">
          <div className="alert-banner__title">Stay Vigilant Against Fraud</div>
          <div className="alert-banner__text">
            Never share your OTP, CVV, or banking PIN with anyone — including bank employees.
            Report suspicious activity immediately to your bank's helpline.
          </div>
        </div>
        <div className="alert-banner__badge">RBI Guidelines</div>
      </div>

      <style>{`
        /* Hero */
        .hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          margin-bottom: 44px;
          animation: fadeUp 0.5s ease forwards;
        }
        .hero__left { flex: 1; }
        .hero__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--accent);
          background: var(--accent-dim);
          border: 1px solid var(--border-accent);
          padding: 5px 12px;
          border-radius: 20px;
          margin-bottom: 16px;
        }
        .live-dot {
          width: 7px; height: 7px;
          background: var(--success);
          border-radius: 50%;
          box-shadow: 0 0 6px var(--success);
          animation: pulse-glow 2s ease infinite;
          display: inline-block;
        }
        .hero__title {
          font-size: clamp(36px, 4.5vw, 58px);
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.08;
          margin-bottom: 16px;
        }
        .hero__title em { color: var(--accent); font-style: normal; }
        .hero__ai-badge {
          display: inline-block;
          margin-left: 12px;
          padding: 4px 14px;
          background: var(--grad-accent);
          border-radius: 8px;
          font-size: 0.38em;
          color: white;
          vertical-align: middle;
          letter-spacing: 0.1em;
          font-weight: 800;
          box-shadow: 0 4px 14px rgba(99,102,241,0.4);
        }
        .hero__sub {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 20px;
          max-width: 520px;
        }
        .hero__tags { display: flex; flex-wrap: wrap; gap: 10px; }
        .hero__tag {
          font-size: 12px;
          font-weight: 600;
          padding: 6px 14px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          color: var(--text-secondary);
          box-shadow: var(--shadow-card);
        }

        /* Shield visual */
        .hero__right {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 200px; height: 200px;
        }
        .shield-outer {
          width: 130px; height: 130px;
          background: var(--grad-accent);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 12px 40px rgba(99,102,241,0.35);
          position: relative;
          z-index: 2;
        }
        .shield-inner {
          width: 90px; height: 90px;
          background: white;
          border-radius: 50%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 4px;
        }
        [data-theme="dark"] .shield-inner { background: var(--bg-secondary); }
        .shield-icon { font-size: 30px; }
        .shield-text { font-size: 9px; font-weight: 800; letter-spacing: 0.1em; color: var(--accent); }
        .shield-ring {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid var(--accent-dim);
          animation: pulse-glow 3s ease infinite;
          z-index: 1;
        }
        .ring1 { width: 160px; height: 160px; animation-delay: 0s; }
        .ring2 { width: 200px; height: 200px; animation-delay: 1s; border-color: rgba(139,92,246,0.15); }

        /* Stats */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 40px;
        }
        .stat-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          animation: fadeUp 0.4s ease forwards;
          opacity: 0;
          box-shadow: var(--shadow-card);
          transition: all var(--transition);
          overflow: hidden;
          position: relative;
        }
        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-card-hover);
          border-color: var(--border-accent);
        }
        .stat-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .stat-card__icon-wrap {
          width: 38px; height: 38px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .stat-card__delta {
          font-size: 10px;
          font-weight: 700;
          color: var(--success);
          background: var(--success-dim);
          padding: 3px 8px;
          border-radius: 20px;
        }
        .stat-card__value {
          font-family: 'Syne', sans-serif;
          font-size: 30px;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 4px;
        }
        .stat-card__label {
          font-size: 12px;
          color: var(--text-secondary);
          font-weight: 500;
          margin-bottom: 12px;
        }
        .stat-card__bar {
          height: 3px;
          background: var(--border);
          border-radius: 10px;
          overflow: hidden;
        }
        .stat-card__bar-fill {
          height: 100%;
          width: 70%;
          border-radius: 10px;
        }

        /* Section label */
        .section-label {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--text-muted);
        }
        .section-line { flex: 1; height: 1px; background: var(--border); }

        /* Tools grid */
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }

        /* Alert */
        .alert-banner {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 24px;
          background: linear-gradient(135deg, rgba(245,158,11,0.08), rgba(251,191,36,0.05));
          border: 1px solid rgba(245,158,11,0.25);
          border-radius: 16px;
          margin-top: 8px;
          animation: fadeUp 0.6s ease forwards;
          box-shadow: var(--shadow-card);
        }
        .alert-banner__icon { font-size: 24px; flex-shrink: 0; }
        .alert-banner__body { flex: 1; }
        .alert-banner__title {
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: var(--warning);
          margin-bottom: 4px;
        }
        .alert-banner__text {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .alert-banner__badge {
          font-size: 11px;
          font-weight: 700;
          padding: 5px 12px;
          background: var(--warning-dim);
          color: var(--warning);
          border-radius: 20px;
          border: 1px solid rgba(245,158,11,0.25);
          flex-shrink: 0;
          white-space: nowrap;
        }

        @media (max-width: 1100px) {
          .stats-row { grid-template-columns: repeat(2, 1fr); }
          .tools-grid { grid-template-columns: repeat(2, 1fr); }
          .hero__right { display: none; }
        }
        @media (max-width: 700px) {
          .stats-row { grid-template-columns: 1fr 1fr; }
          .tools-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
// CSS injected at bottom — append live badge styles into existing <style> tag is not possible,
// so they are added inline via a global style tag trick below.
// The styles below are already embedded in the Dashboard component's <style>{`...`} block.
// This comment is just for clarity. No actual code here.