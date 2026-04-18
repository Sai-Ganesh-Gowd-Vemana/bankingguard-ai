import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/",         icon: "◈",  label: "Dashboard",       badge: null  },
  { path: "/sms",      icon: "✉",  label: "SMS Detector",    badge: "AI"  },
  { path: "/url",      icon: "⬡",  label: "URL Scanner",     badge: "AI"  },
  { path: "/image",    icon: "◫",  label: "Screenshot Scan", badge: "AI"  },
  { path: "/loan",     icon: "◎",  label: "Loan Analyzer",   badge: null  },
  { path: "/quiz",     icon: "⟡",  label: "Security Quiz",   badge: null  },
  { path: "/chatbot",  icon: "⬟",  label: "AI Chatbot",      badge: "AI"  },
  { path: "/reminder", icon: "◷",  label: "Reminders",       badge: null  },
];

function Sidebar({ theme, onToggleTheme, collapsed, onToggleCollapse }) {
  const location = useLocation();

  return (
    <aside className="sidebar" style={{ width: collapsed ? "72px" : "260px" }}>
      <div className="sidebar-glow" />

      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
            <path d="M14 2L3 7.5V14c0 6.075 4.71 11.76 11 13 6.29-1.24 11-6.925 11-13V7.5L14 2z"
              fill="none" stroke="#818cf8" strokeWidth="1.8" strokeLinejoin="round"/>
            <path d="M9 14l3 3 7-7" stroke="#818cf8" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {!collapsed && (
          <div className="logo-text">
            <span className="logo-name">Banking<em>Guard</em></span>
            <span className="logo-sub">AI Security Platform</span>
          </div>
        )}
      </div>

      {/* Collapse toggle — always visible, positioned absolutely when collapsed */}
      <button
        className="collapse-btn"
        onClick={onToggleCollapse}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        style={collapsed ? {
          position: "relative",
          margin: "0 auto 8px auto",
          display: "flex",
        } : {}}
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <path
            d={collapsed ? "M4 7h6M7 4l3 3-3 3" : "M10 7H4M7 4L4 7l3 3"}
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="sidebar-divider" />
      {!collapsed && <span className="nav-section-label">NAVIGATION</span>}

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${active ? "nav-item--active" : ""}`}
              title={collapsed ? item.label : ""}
            >
              <span className="nav-icon">{item.icon}</span>
              {!collapsed && <span className="nav-label">{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="nav-badge">{item.badge}</span>
              )}
              {active && <div className="nav-active-bar" />}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-divider" />
        <button className="theme-toggle" onClick={onToggleTheme}>
          <span style={{fontSize:"15px"}}>{theme === "light" ? "🌙" : "☀️"}</span>
          {!collapsed && (
            <span style={{ marginLeft: "10px", fontSize: "13px" }}>
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </span>
          )}
        </button>
        {!collapsed && (
          <div className="sidebar-status">
            <div className="status-dot" />
            <span>Systems Operational</span>
          </div>
        )}
      </div>

      <style>{`
        .sidebar {
          height: 100vh;
          background: #1a1f3c;
          border-right: 1px solid rgba(255,255,255,0.06);
          position: fixed;
          top: 0; left: 0;
          display: flex;
          flex-direction: column;
          z-index: 100;
          transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
          overflow: hidden;
        }
        .sidebar-glow {
          position: absolute;
          top: -80px; left: -60px;
          width: 220px; height: 220px;
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 22px 18px 10px;
          position: relative;
        }
        .logo-icon {
          width: 40px; height: 40px;
          background: rgba(129,140,248,0.15);
          border: 1px solid rgba(129,140,248,0.3);
          border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .logo-text { flex: 1; min-width: 0; }
        .logo-name {
          display: block;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: #ffffff;
          white-space: nowrap;
        }
        .logo-name em { color: #818cf8; font-style: normal; }
        .logo-sub {
          display: block;
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.07em;
          margin-top: 2px;
        }
        .collapse-btn {
          width: 30px; height: 30px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all var(--transition);
          margin: 0 18px 10px auto;
        }
        .collapse-btn:hover {
          background: rgba(129,140,248,0.2);
          color: #818cf8;
          border-color: rgba(129,140,248,0.4);
        }

        .sidebar-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 4px 18px; }

        .nav-section-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.25);
          padding: 12px 22px 6px;
          display: block;
        }
        .sidebar-nav {
          flex: 1;
          padding: 4px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow-y: auto;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          text-decoration: none;
          color: rgba(255,255,255,0.5);
          font-size: 13.5px;
          font-weight: 500;
          position: relative;
          transition: all var(--transition);
          white-space: nowrap;
        }
        .nav-item:hover { background: rgba(255,255,255,0.06); color: #ffffff; }
        .nav-item--active {
          background: rgba(129,140,248,0.15) !important;
          color: #818cf8 !important;
          border: 1px solid rgba(129,140,248,0.25);
        }
        .nav-icon { font-size: 16px; width: 20px; text-align: center; flex-shrink: 0; }
        .nav-label { flex: 1; }
        .nav-badge {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 2px 6px;
          background: rgba(129,140,248,0.2);
          color: #818cf8;
          border-radius: 4px;
          border: 1px solid rgba(129,140,248,0.3);
        }
        .nav-active-bar {
          position: absolute;
          right: -12px; top: 50%;
          transform: translateY(-50%);
          width: 3px; height: 18px;
          background: #818cf8;
          border-radius: 2px 0 0 2px;
        }
        .sidebar-footer { padding: 0 0 16px; }
        .theme-toggle {
          display: flex;
          align-items: center;
          width: calc(100% - 24px);
          margin: 8px 12px 4px;
          padding: 10px 12px;
          background: none;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all var(--transition);
        }
        .theme-toggle:hover { border-color: #818cf8; color: #818cf8; background: rgba(129,140,248,0.08); }
        .sidebar-status {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 22px;
          font-size: 11px;
          color: rgba(255,255,255,0.25);
        }
        .status-dot {
          width: 7px; height: 7px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 6px #10b981;
          animation: pulse-glow 2.5s ease infinite;
        }
      `}</style>
    </aside>
  );
}

export default Sidebar;