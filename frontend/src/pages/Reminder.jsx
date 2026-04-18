import { useState, useEffect } from "react";
import { PageHeader, InputField, PrimaryButton } from "../components/UI";

function Reminder() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadReminders = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/reminders");
      const data = await res.json();
      setReminders(data.reminders);
    } catch {}
  };

  useEffect(() => { loadReminders(); }, []);

  const addReminder = async () => {
    if (!title || !date) return;
    setLoading(true);
    try {
      await fetch("http://127.0.0.1:8000/add-reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, date }),
      });
      setTitle("");
      setDate("");
      await loadReminders();
    } finally {
      setLoading(false);
    }
  };

  const deleteReminder = async (index) => {
    await fetch(`http://127.0.0.1:8000/delete-reminder/${index}`, { method: "DELETE" });
    loadReminders();
  };

  const today = new Date().toISOString().split("T")[0];
  const upcoming = reminders.filter(r => r.date >= today);
  const past = reminders.filter(r => r.date < today);

  const getDaysUntil = (dateStr) => {
    const diff = Math.ceil((new Date(dateStr) - new Date(today)) / 86400000);
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    if (diff < 0) return `${Math.abs(diff)} days ago`;
    return `In ${diff} days`;
  };

  return (
    <div>
      <PageHeader
        icon="◷"
        title="Payment Reminders"
        subtitle="Stay on top of your bills and payment deadlines."
        badge="FINANCE TOOLS" gradient="linear-gradient(135deg, #06b6d4, #10b981)"
      />

      <div className="two-col">
        {/* Add form */}
        <div className="card">
          <div className="card-title">Add New Reminder</div>
          <div className="form-stack">
            <InputField
              label="Reminder Title"
              placeholder="e.g. Credit Card EMI, Insurance Premium"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <InputField
              label="Due Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="card-footer">
            <PrimaryButton onClick={addReminder} loading={loading} disabled={!title || !date || loading}>
              + Add Reminder
            </PrimaryButton>
          </div>
        </div>

        {/* Stats panel */}
        <div className="card stats-mini">
          <div className="mini-stat">
            <div className="mini-stat__val" style={{ color: "var(--accent)" }}>{reminders.length}</div>
            <div className="mini-stat__label">Total</div>
          </div>
          <div className="mini-divider" />
          <div className="mini-stat">
            <div className="mini-stat__val" style={{ color: "var(--success)" }}>{upcoming.length}</div>
            <div className="mini-stat__label">Upcoming</div>
          </div>
          <div className="mini-divider" />
          <div className="mini-stat">
            <div className="mini-stat__val" style={{ color: "var(--danger)" }}>
              {reminders.filter(r => r.date === today).length}
            </div>
            <div className="mini-stat__label">Due Today</div>
          </div>
        </div>
      </div>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div className="reminder-section">
          <div className="section-head">
            <span className="section-dot" style={{ background: "var(--success)" }} />
            Upcoming
          </div>
          <div className="reminder-list">
            {upcoming.map((r, i) => {
              const days = getDaysUntil(r.date);
              const isToday = r.date === today;
              return (
                <div key={i} className={`reminder-item ${isToday ? "reminder-item--today" : ""}`}>
                  <div className="reminder-icon" style={{ color: isToday ? "var(--warning)" : "var(--accent)" }}>
                    {isToday ? "⚡" : "◷"}
                  </div>
                  <div className="reminder-info">
                    <div className="reminder-title">{r.title}</div>
                    <div className="reminder-date">{r.date}</div>
                  </div>
                  <div className="reminder-days" style={{ color: isToday ? "var(--warning)" : "var(--success)" }}>
                    {days}
                  </div>
                  <button className="delete-btn" onClick={() => deleteReminder(reminders.indexOf(r))}>✕</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Past */}
      {past.length > 0 && (
        <div className="reminder-section">
          <div className="section-head">
            <span className="section-dot" style={{ background: "var(--text-muted)" }} />
            Past
          </div>
          <div className="reminder-list">
            {past.map((r, i) => (
              <div key={i} className="reminder-item reminder-item--past">
                <div className="reminder-icon" style={{ color: "var(--text-muted)" }}>✓</div>
                <div className="reminder-info">
                  <div className="reminder-title" style={{ opacity: 0.5 }}>{r.title}</div>
                  <div className="reminder-date">{r.date}</div>
                </div>
                <div className="reminder-days" style={{ color: "var(--text-muted)" }}>{getDaysUntil(r.date)}</div>
                <button className="delete-btn" onClick={() => deleteReminder(reminders.indexOf(r))}>✕</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {reminders.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">◷</div>
          <div className="empty-title">No reminders yet</div>
          <div className="empty-sub">Add your first payment reminder above.</div>
        </div>
      )}

      <style>{`
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 28px; }
        .card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          animation: fadeUp 0.4s ease forwards;
        }
        .card-title { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 20px; }
        .form-stack { display: flex; flex-direction: column; gap: 14px; }
        .card-footer { margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; }

        .stats-mini { display: flex; align-items: center; justify-content: center; gap: 0; }
        .mini-stat { flex: 1; text-align: center; }
        .mini-stat__val { font-family: 'Syne', sans-serif; font-size: 36px; font-weight: 800; }
        .mini-stat__label { font-size: 12px; color: var(--text-secondary); margin-top: 4px; }
        .mini-divider { width: 1px; height: 50px; background: var(--border); }

        .reminder-section { margin-bottom: 20px; animation: fadeUp 0.4s ease forwards; }
        .section-head {
          display: flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          color: var(--text-muted); text-transform: uppercase;
          margin-bottom: 12px;
        }
        .section-dot { width: 8px; height: 8px; border-radius: 50%; }

        .reminder-list { display: flex; flex-direction: column; gap: 8px; }
        .reminder-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          transition: all var(--transition);
        }
        .reminder-item:hover { border-color: var(--border-accent); }
        .reminder-item--today { border-color: rgba(255,209,102,0.3); background: var(--warning-dim); }
        .reminder-item--past { opacity: 0.6; }

        .reminder-icon { font-size: 18px; flex-shrink: 0; }
        .reminder-info { flex: 1; min-width: 0; }
        .reminder-title { font-weight: 600; font-size: 14px; color: var(--text-primary); }
        .reminder-date { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
        .reminder-days { font-size: 12px; font-weight: 700; flex-shrink: 0; }
        .delete-btn {
          width: 28px; height: 28px;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text-muted);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px;
          transition: all var(--transition);
          flex-shrink: 0;
        }
        .delete-btn:hover { background: var(--danger-dim); border-color: var(--danger); color: var(--danger); }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-muted);
        }
        .empty-icon { font-size: 40px; margin-bottom: 16px; }
        .empty-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; color: var(--text-secondary); margin-bottom: 6px; }
        .empty-sub { font-size: 13px; }

        @media (max-width: 800px) { .two-col { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}

export default Reminder;