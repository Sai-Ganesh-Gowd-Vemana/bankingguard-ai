import { useState } from "react";
import { checkLoan } from "../services/api";
import { PageHeader, PrimaryButton, LoadingSpinner, InputField } from "../components/UI";

function LoanAnalyzer() {
  const [income, setIncome] = useState("");
  const [credit, setCredit] = useState("");
  const [loans, setLoans] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!income || !credit || !loans) return;
    setLoading(true);
    setResult(null);
    try {
      const response = await checkLoan({
        income: Number(income),
        credit_score: Number(credit),
        existing_loans: Number(loans),
      });
      setResult(response);
    } finally {
      setLoading(false);
    }
  };

  const loanResultLower = result?.loan_result?.toLowerCase() ?? "";
  const isEligible = (loanResultLower.includes("eligible") && !loanResultLower.includes("not eligible")) ||
                     loanResultLower.includes("approved");

  const creditScore = Number(credit);
  const creditColor = creditScore >= 750 ? "var(--success)" : creditScore >= 600 ? "var(--warning)" : "var(--danger)";
  const creditLabel = creditScore >= 750 ? "Excellent" : creditScore >= 600 ? "Fair" : "Poor";

  return (
    <div>
      <PageHeader
        icon="◎"
        title="Loan Eligibility Analyzer"
        subtitle="Evaluate your loan eligibility based on income, credit score, and existing debt."
        badge="FINANCIAL RISK" gradient="linear-gradient(135deg, #f59e0b, #d97706)"
      />

      <div className="two-col">
        {/* Form */}
        <div className="card">
          <div className="form-stack">
            <InputField
              label="Monthly Income (₹)"
              type="number"
              placeholder="e.g. 75000"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
            <InputField
              label="Credit Score (300–900)"
              type="number"
              placeholder="e.g. 720"
              value={credit}
              onChange={(e) => setCredit(e.target.value)}
            />
            <InputField
              label="Existing Loans (₹ monthly EMI)"
              type="number"
              placeholder="e.g. 12000"
              value={loans}
              onChange={(e) => setLoans(e.target.value)}
            />
          </div>

          <div className="card-footer">
            <PrimaryButton onClick={handleCheck} loading={loading} disabled={!income || !credit || !loans || loading}>
              Analyze Eligibility
            </PrimaryButton>
          </div>
        </div>

        {/* Credit preview panel */}
        <div className="card">
          <div className="credit-panel">
            <div className="credit-label-top">Credit Score Preview</div>
            {creditScore > 0 ? (
              <>
                <div className="credit-score-val" style={{ color: creditColor }}>{creditScore}</div>
                <div className="credit-grade" style={{ color: creditColor }}>{creditLabel}</div>
                <div className="credit-bar-track">
                  <div className="credit-bar-fill" style={{
                    width: `${Math.min(((creditScore - 300) / 600) * 100, 100)}%`,
                    background: `linear-gradient(90deg, var(--danger), var(--warning), var(--success))`
                  }} />
                </div>
                <div className="credit-range-labels">
                  <span>300</span><span>600</span><span>900</span>
                </div>
              </>
            ) : (
              <div className="credit-placeholder">Enter your credit score to see a preview</div>
            )}
          </div>

          {income && loans && (
            <div className="dti-section">
              <div className="dti-label">Debt-to-Income Ratio</div>
              <div className="dti-value">
                {((Number(loans) / Number(income)) * 100).toFixed(1)}%
              </div>
              <div className="dti-hint">
                {(Number(loans) / Number(income)) < 0.35 ? "✓ Healthy ratio" : "⚠ High ratio"}
              </div>
            </div>
          )}
        </div>
      </div>

      {loading && <LoadingSpinner text="Calculating eligibility..." />}

      {result && !loading && (
        <div className={`result-banner ${isEligible ? "result-banner--ok" : "result-banner--bad"}`}>
          <div className="result-banner__icon">{isEligible ? "✓" : "✕"}</div>
          <div>
            <div className="result-banner__label">{isEligible ? "ELIGIBLE" : "NOT ELIGIBLE"}</div>
            <div className="result-banner__text">{result.loan_result}</div>
          </div>
        </div>
      )}

      <style>{`
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          animation: fadeUp 0.4s ease forwards;
        }
        .form-stack { display: flex; flex-direction: column; gap: 16px; }
        .card-footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; }

        .credit-panel { text-align: center; padding: 8px 0 16px; }
        .credit-label-top { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: var(--text-muted); text-transform: uppercase; margin-bottom: 16px; }
        .credit-score-val { font-family: 'Syne', sans-serif; font-size: 56px; font-weight: 800; line-height: 1; }
        .credit-grade { font-size: 14px; font-weight: 600; margin: 4px 0 20px; }
        .credit-bar-track { height: 6px; background: var(--bg-input); border-radius: 10px; overflow: hidden; margin: 0 8px; }
        .credit-bar-fill { height: 100%; border-radius: 10px; transition: width 1s cubic-bezier(0.4,0,0.2,1); }
        .credit-range-labels { display: flex; justify-content: space-between; padding: 6px 8px 0; font-size: 11px; color: var(--text-muted); }
        .credit-placeholder { font-size: 13px; color: var(--text-muted); padding: 30px 0; }

        .dti-section {
          border-top: 1px solid var(--border);
          padding-top: 16px;
          text-align: center;
        }
        .dti-label { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px; }
        .dti-value { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; color: var(--text-primary); }
        .dti-hint { font-size: 12px; color: var(--text-secondary); margin-top: 4px; }

        .result-banner {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 24px;
          border-radius: 14px;
          border: 1px solid;
          margin-top: 20px;
          animation: fadeUp 0.4s ease forwards;
        }
        .result-banner--ok { background: var(--success-dim); border-color: rgba(0,229,160,0.3); }
        .result-banner--bad { background: var(--danger-dim); border-color: rgba(255,77,109,0.3); }
        .result-banner__icon {
          width: 48px; height: 48px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .result-banner--ok .result-banner__icon { background: rgba(0,229,160,0.2); color: var(--success); }
        .result-banner--bad .result-banner__icon { background: rgba(255,77,109,0.2); color: var(--danger); }
        .result-banner__label {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin-bottom: 4px;
        }
        .result-banner--ok .result-banner__label { color: var(--success); }
        .result-banner--bad .result-banner__label { color: var(--danger); }
        .result-banner__text { font-size: 15px; font-weight: 600; color: var(--text-primary); }

        @media (max-width: 800px) { .two-col { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}

export default LoanAnalyzer;