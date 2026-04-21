import { useState } from "react";
import { detectSMS } from "../services/api";
import { PageHeader, ResultCard, PrimaryButton, LoadingSpinner } from "../components/UI";

const SAMPLE_SMS = [
  "URGENT: Your SBI account will be blocked. Update KYC now: bit.ly/sbi-kyc",
  "You've won ₹50,000! Click here to claim: win.prizes.com/abc123",
  "Dear customer, your EMI of ₹4,500 is due on 15th. Pay via net banking.",
];

function SMSScanner() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!message) return;
    setLoading(true);
    setResult(null);
    try {
      const response = await detectSMS(message);
      setResult(response);
      // Increment live counters
      const prev = parseInt(localStorage.getItem("sms_count") || "0");
      localStorage.setItem("sms_count", prev + 1);
      if (response.prediction === "spam") {
        const prevScam = parseInt(localStorage.getItem("scam_count") || "0");
        localStorage.setItem("scam_count", prevScam + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        icon="✉"
        title="SMS Scam Detector"
        subtitle="Paste any suspicious SMS to analyze it with our NLP fraud detection model."
        badge="AI POWERED · NLP" gradient="linear-gradient(135deg, #6366f1, #8b5cf6)"
      />

      <div className="card">
        <label className="field-label">Message Content</label>
        <textarea
          className="sms-textarea"
          placeholder="Paste the suspicious SMS message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
        />

        <div className="sample-section">
          <span className="sample-label">Try a sample:</span>
          <div className="sample-chips">
            {SAMPLE_SMS.map((s, i) => (
              <button key={i} className="sample-chip" onClick={() => setMessage(s)}>
                {s.length > 40 ? s.slice(0, 40) + "…" : s}
              </button>
            ))}
          </div>
        </div>

        <div className="card-footer">
          <span className="char-count">{message.length} characters</span>
          <PrimaryButton onClick={handleCheck} loading={loading} disabled={!message || loading}>
            Analyze Message
          </PrimaryButton>
        </div>
      </div>

      {loading && <LoadingSpinner text="Running fraud analysis..." />}

      {result && !loading && (
  <ResultCard
    prediction={result.prediction}
    confidence={result.confidence}
    scamKeyword="spam"
  >
    {result.suspicious_words && result.suspicious_words.length > 0 && (
      <div>
        <div className="reasons-title">⚠ Suspicious Words Detected</div>
        <div className="words-wrap">
          {result.suspicious_words.map((w, i) => (
            <span key={i} className="word-pill">{w}</span>
          ))}
        </div>
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
        .sms-textarea {
          width: 100%;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: 10px;
          color: var(--text-primary);
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          padding: 14px 16px;
          resize: vertical;
          outline: none;
          transition: all var(--transition);
          line-height: 1.6;
        }
        .sms-textarea::placeholder { color: var(--text-muted); }
        .sms-textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-dim); }

        .sample-section { margin-top: 16px; }
        .sample-label { font-size: 11px; color: var(--text-muted); font-weight: 600; letter-spacing: 0.05em; display: block; margin-bottom: 8px; }
        .sample-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .sample-chip {
          font-size: 12px;
          padding: 6px 12px;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: 20px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition);
          font-family: 'DM Sans', sans-serif;
          text-align: left;
        }
        .sample-chip:hover { border-color: var(--accent); color: var(--accent); }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }
        .char-count { font-size: 12px; color: var(--text-muted); }

        .reasons-title {
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: var(--text-secondary);
          margin-bottom: 12px;
          padding-top: 4px;
        }
        .reasons-list { display: flex; flex-direction: column; gap: 8px; }
        .reason-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .reason-dot { color: var(--danger); flex-shrink: 0; margin-top: 1px; }
        .words-wrap { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
.word-pill {
  font-size: 12px; font-weight: 700;
  padding: 4px 12px;
  background: var(--danger-dim);
  color: var(--danger);
  border: 1px solid rgba(239,68,68,0.25);
  border-radius: 20px;
}
      `}</style>
    </div>
  );
}

export default SMSScanner;