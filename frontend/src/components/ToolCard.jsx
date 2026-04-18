import { useNavigate } from "react-router-dom";

function ToolCard({ icon, title, description, route, gradient, lightBg, stats }) {
  const navigate = useNavigate();

  return (
    <div className="tool-card" onClick={() => navigate(route)}>
      <div className="tool-card__glow" />
      <div className="tool-card__header">
        <div
          className="tool-card__icon"
          style={{ background: gradient || "var(--grad-accent)" }}
        >
          <span>{icon}</span>
        </div>
        <div className="tool-card__arrow">→</div>
      </div>
      <h3 className="tool-card__title">{title}</h3>
      <p className="tool-card__desc">{description}</p>
      {stats && (
        <div className="tool-card__stats">
          <span className="stat-pill">{stats}</span>
        </div>
      )}
      <div className="tool-card__scan">
        <div className="scan-line" />
      </div>

      <style>{`
        .tool-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 24px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          box-shadow: var(--shadow-card);
        }
        .tool-card:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-accent);
          transform: translateY(-4px);
          box-shadow: var(--shadow-card-hover);
        }
        .tool-card:hover .scan-line { animation: scanline 1.4s ease-in-out; }
        .tool-card:hover .tool-card__arrow { transform: translate(4px,-4px); opacity: 1; }
        .tool-card:hover .tool-card__glow { opacity: 1; }

        .tool-card__glow {
          position: absolute;
          top: 0; right: 0;
          width: 120px; height: 120px;
          background: radial-gradient(circle at top right, var(--accent-dim), transparent 70%);
          opacity: 0;
          transition: opacity 0.35s;
          pointer-events: none;
          border-radius: 0 18px 0 0;
        }
        .tool-card__header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .tool-card__icon {
          width: 52px; height: 52px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.15);
          transition: transform 0.3s;
        }
        .tool-card:hover .tool-card__icon { transform: scale(1.08); }
        .tool-card__arrow {
          color: var(--text-muted);
          font-size: 18px;
          opacity: 0;
          transition: all 0.3s;
        }
        .tool-card__title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 7px;
        }
        .tool-card__desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.55;
        }
        .tool-card__stats { margin-top: 16px; }
        .stat-pill {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 11px;
          background: var(--accent-dim);
          color: var(--accent);
          border-radius: 20px;
          border: 1px solid var(--border-accent);
          letter-spacing: 0.03em;
        }
        .tool-card__scan {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          border-radius: 18px;
        }
        .scan-line {
          position: absolute;
          left: 0; right: 0;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: 0.5;
          top: -10%;
        }
      `}</style>
    </div>
  );
}

export default ToolCard;
