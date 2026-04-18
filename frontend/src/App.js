import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import SMSScanner from "./pages/SMSScanner";
import URLScanner from "./pages/URLScanner";
import ScreenshotScanner from "./pages/ScreenshotScanner";
import LoanAnalyzer from "./pages/LoanAnalyzer";
import SecurityQuiz from "./pages/SecurityQuiz";
import Chatbot from "./pages/Chatbot";
import Reminder from "./pages/Reminder";

function App() {
  const [theme, setTheme] = useState("light");
  const [collapsed, setCollapsed] = useState(false);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  const sidebarWidth = collapsed ? 72 : 260;

  return (
    <Router>
      <div className="bg-grid" />
      <div className="bg-blob-1" />
      <div className="bg-blob-2" />
      <div className="bg-blob-3" />

      <div style={{ display: "flex", position: "relative", zIndex: 1 }}>
        <Sidebar
          theme={theme}
          onToggleTheme={toggleTheme}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(c => !c)}
        />

        <main
          style={{
            marginLeft: `${sidebarWidth}px`,
            padding: "48px 52px",
            width: "100%",
            minHeight: "100vh",
            transition: "margin-left 0.3s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <Routes>
            <Route path="/"         element={<Dashboard />} />
            <Route path="/sms"      element={<SMSScanner />} />
            <Route path="/url"      element={<URLScanner />} />
            <Route path="/image"    element={<ScreenshotScanner />} />
            <Route path="/loan"     element={<LoanAnalyzer />} />
            <Route path="/quiz"     element={<SecurityQuiz />} />
            <Route path="/chatbot"  element={<Chatbot />} />
            <Route path="/reminder" element={<Reminder />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;