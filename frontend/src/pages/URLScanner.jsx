import { useState } from "react";
import { detectURL } from "../services/api";
import { PageHeader, ResultCard, PrimaryButton, LoadingSpinner } from "../components/UI";

const SAMPLES = [
  "http://sbi-kyc-update.net/login",
  "https://www.google.com",
  "http://paytm-reward-claim.xyz/win",
];

function URLScanner() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    try {
      const response = await detectURL(url);
      setResult(response);
      // Increment live counters
      const prev = parseInt(localStorage.getItem("url_count") || "0");
      localStorage.setItem("url_count", prev + 1);
      if (response.prediction === "phishing") {
        const prevScam = parseInt(localStorage.getItem("scam_count") || "0");
        localStorage.setItem("scam_count", prevScam + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleCheck();
  };

  return (
    <div>
      <PageHeader
        icon="⬡"
        title="URL Phishing Detector"
        subtitle="Enter any suspicious URL to check for phishing patterns and malicious indicators."
        badge="AI POWERED" gradient="linear-gradient(135deg, #06b6d4, #0284c7)"
      />

      <div className="card">
        <label className="field-label">URL to Analyze</label>
        <div className="url-input-row">
          <div className="url-prefix">https://</div>
          <input
            className="url-input"
            type="text"
            placeholder="example.com/suspicious-path"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="samples-row">
          <span className="sample-label">Try these:</span>
          {SAMPLES.map((s, i) => (
            <button key={i} className="sample-tag" onClick={() => setUrl(s)}>
              {s.replace(/^https?:\/\//, "").slice(0, 30)}
            </button>
          ))}
        </div>

        <div className="card-footer">
          <span className="hint-text">Press Enter or click Analyze</span>
          <PrimaryButton onClick={handleCheck} loading={loading} disabled={!url || loading}>
            Analyze URL
          </PrimaryButton>
        </div>
      </div>

      {loading && <LoadingSpinner text="Scanning URL..." />}

      {result && !loading && (
        <ResultCard prediction={result.prediction} confidence={result.confidence} scamKeyword="phishing">
          {result.prediction?.toLowerCase() === "phishing" && (
            <div className="url-warning">
              <span>⚠</span>
              <span>Do not visit this URL. It may be designed to steal your banking credentials.</span>
            </div>
          )}
          {result.prediction?.toLowerCase() !== "phishing" && (
            <div className="url-safe-msg">
              <span>✓</span>
              <span>No phishing indicators detected. Always stay cautious with unknown links.</span>
            </div>
          )}
        </ResultCard>
      )}

      <style>{`
        .card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          animation: fadeUp 0.4s ease forwards;
        }
        .field-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          letter-spacing: 0.04em;
          margin-bottom: 10px;
          text-transform: uppercase;
        }
        .url-input-row {
          display: flex;
          align-items: center;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
          transition: all var(--transition);
        }
        .url-input-row:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-dim); }
        .url-prefix {
          padding: 13px 14px;
          font-size: 13px;
          color: var(--text-muted);
          border-right: 1px solid var(--border);
          white-space: nowrap;
          font-family: 'DM Mono', monospace;
        }
        .url-input {
          flex: 1;
          padding: 13px 16px;
          background: none;
          border: none;
          color: var(--text-primary);
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
        }
        .url-input::placeholder { color: var(--text-muted); }

        .samples-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 14px;
        }
        .sample-label { font-size: 11px; color: var(--text-muted); font-weight: 600; }
        .sample-tag {
          font-size: 12px;
          padding: 4px 10px;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition);
          font-family: 'DM Mono', monospace;
        }
        .sample-tag:hover { border-color: var(--accent); color: var(--accent); }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }
        .hint-text { font-size: 12px; color: var(--text-muted); }

        .url-warning, .url-safe-msg {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 8px;
          font-size: 13px;
          line-height: 1.5;
        }
        .url-warning { background: var(--danger-dim); color: var(--danger); }
        .url-safe-msg { background: var(--success-dim); color: var(--success); }
      `}</style>
    </div>
  );
}

export default URLScanner;