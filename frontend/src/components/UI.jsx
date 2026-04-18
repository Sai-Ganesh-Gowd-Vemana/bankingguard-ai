/* ── ResultCard ───────────────────────────────────── */
export function ResultCard({ prediction, confidence, children, scamKeyword = "scam" }) {
  const THREAT_KEYWORDS = ["scam", "spam", "phishing", "fraud", "malicious", "dangerous", "not eligible", "ineligible"];
  const predLower = prediction?.toLowerCase() ?? "";
  const isScam = THREAT_KEYWORDS.some(kw => predLower.includes(kw)) || predLower === scamKeyword;

  const color     = isScam ? "var(--danger)"   : "var(--success)";
  const dimColor  = isScam ? "var(--danger-dim)": "var(--success-dim)";
  const gradient  = isScam ? "var(--grad-danger)": "var(--grad-success)";
  const label     = isScam ? "⚠ THREAT DETECTED" : "✓ LOOKS SAFE";
  const borderCol = isScam ? "rgba(239,68,68,0.25)" : "rgba(16,185,129,0.25)";

  return (
    <div className="result-card" style={{ borderColor: borderCol }}>
      {/* Header strip */}
      <div className="result-card__header" style={{ background: gradient }}>
        <div className="result-header-left">
          <span className="result-icon">{isScam ? "🚨" : "✅"}</span>
          <div>
            <div className="result-label">{label}</div>
            <div className="result-prediction">{prediction?.toUpperCase()}</div>
          </div>
        </div>
        {confidence != null && (
          <div className="result-confidence-badge">{confidence}%</div>
        )}
      </div>

      {/* Confidence bar */}
      {confidence != null && (
        <div className="confidence-section">
          <div className="confidence-label">
            <span>AI Confidence Score</span>
            <span style={{ color, fontWeight: 700 }}>{confidence}%</span>
          </div>
          <div className="confidence-track">
            <div
              className="confidence-fill"
              style={{
                width: `${confidence}%`,
                background: gradient,
                boxShadow: `0 0 10px ${isScam ? "rgba(239,68,68,0.4)" : "rgba(16,185,129,0.4)"}`
              }}
            />
          </div>
          <div className="confidence-hints">
            <span>Low risk</span><span>High risk</span>
          </div>
        </div>
      )}

      {children && <div className="result-body">{children}</div>}

      <style>{`
        .result-card {
          border: 1px solid;
          border-radius: 16px;
          overflow: hidden;
          margin-top: 24px;
          animation: fadeUp 0.4s ease forwards;
          box-shadow: var(--shadow-card);
        }
        .result-card__header {
          padding: 18px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .result-header-left { display: flex; align-items: center; gap: 14px; }
        .result-icon { font-size: 28px; }
        .result-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.85);
          margin-bottom: 2px;
        }
        .result-prediction {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #ffffff;
        }
        .result-confidence-badge {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: rgba(255,255,255,0.9);
          background: rgba(255,255,255,0.15);
          border-radius: 12px;
          padding: 6px 16px;
        }
        .confidence-section { padding: 18px 22px 12px; background: var(--bg-card); }
        .confidence-label {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 10px;
          color: var(--text-secondary);
        }
        .confidence-track {
          height: 8px;
          background: var(--bg-input);
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 6px;
        }
        .confidence-fill {
          height: 100%;
          border-radius: 10px;
          transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
        }
        .confidence-hints {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: var(--text-muted);
        }
        .result-body { padding: 0 22px 22px; background: var(--bg-card); }
      `}</style>
    </div>
  );
}

/* ── LoadingSpinner ───────────────────────────────── */
export function LoadingSpinner({ text = "Analyzing..." }) {
  return (
    <div className="spinner-wrap">
      <div className="spinner-visual">
        <div className="spinner-ring outer" />
        <div className="spinner-ring inner" />
        <span className="spinner-dot">⬟</span>
      </div>
      <span className="spinner-text">{text}</span>
      <span className="spinner-sub">AI model processing your request</span>
      <style>{`
        .spinner-wrap {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 48px; gap: 12px;
        }
        .spinner-visual {
          position: relative;
          width: 60px; height: 60px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 6px;
        }
        .spinner-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid transparent;
          animation: spin linear infinite;
        }
        .spinner-ring.outer {
          width: 60px; height: 60px;
          border-top-color: var(--accent);
          animation-duration: 1s;
        }
        .spinner-ring.inner {
          width: 42px; height: 42px;
          border-top-color: var(--accent-2);
          animation-duration: 0.7s;
          animation-direction: reverse;
        }
        .spinner-dot {
          font-size: 18px;
          color: var(--accent);
        }
        .spinner-text {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .spinner-sub { font-size: 12px; color: var(--text-muted); }
      `}</style>
    </div>
  );
}

/* ── PageHeader ───────────────────────────────────── */
export function PageHeader({ icon, title, subtitle, badge, gradient }) {
  return (
    <div className="page-header">
      <div
        className="page-header__icon"
        style={{ background: gradient || "var(--grad-accent)" }}
      >
        <span>{icon}</span>
      </div>
      <div>
        {badge && <span className="page-badge">{badge}</span>}
        <h2 className="page-title">{title}</h2>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      <style>{`
        .page-header {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 28px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border);
          animation: fadeUp 0.4s ease forwards;
        }
        .page-header__icon {
          width: 56px; height: 56px;
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          font-size: 26px;
          flex-shrink: 0;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }
        .page-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--accent);
          background: var(--accent-dim);
          border: 1px solid var(--border-accent);
          border-radius: 4px;
          padding: 2px 8px;
          margin-bottom: 5px;
        }
        .page-title {
          font-size: 26px;
          font-weight: 800;
          color: var(--text-primary);
        }
        .page-subtitle {
          font-size: 13px;
          color: var(--text-secondary);
          margin-top: 3px;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}

/* ── InputField ───────────────────────────────────── */
export function InputField({ label, ...props }) {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <input className="input-field" {...props} />
      <style>{`
        .input-group { display: flex; flex-direction: column; gap: 6px; width: 100%; }
        .input-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .input-field {
          width: 100%;
          padding: 12px 16px;
          background: var(--bg-input);
          border: 1.5px solid var(--border);
          border-radius: 10px;
          color: var(--text-primary);
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: all var(--transition);
        }
        .input-field::placeholder { color: var(--text-muted); }
        .input-field:focus {
          border-color: var(--accent);
          background: var(--bg-card);
          box-shadow: 0 0 0 3px var(--accent-dim);
        }
      `}</style>
    </div>
  );
}

/* ── PrimaryButton ────────────────────────────────── */
export function PrimaryButton({ children, loading, ...props }) {
  return (
    <button className="primary-btn" disabled={loading} {...props}>
      {loading ? (
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="btn-spinner" /> Analyzing...
        </span>
      ) : children}
      <style>{`
        .primary-btn {
          padding: 12px 28px;
          background: var(--grad-accent);
          border: none;
          border-radius: 10px;
          color: #ffffff;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: all var(--transition);
          box-shadow: 0 4px 14px rgba(99,102,241,0.35);
        }
        .primary-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(99,102,241,0.45);
        }
        .primary-btn:active:not(:disabled) { transform: translateY(0); }
        .primary-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .btn-spinner {
          display: inline-block;
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
      `}</style>
    </button>
  );
}