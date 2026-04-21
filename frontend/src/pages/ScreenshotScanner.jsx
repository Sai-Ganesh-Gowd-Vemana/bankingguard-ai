import { useState, useRef } from "react";
import { detectImage } from "../services/api";
import { PageHeader, ResultCard, PrimaryButton, LoadingSpinner } from "../components/UI";

function ScreenshotScanner() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();

  const handleFile = (f) => {
    setFile(f);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const response = await detectImage(file);
      setResult(response);
      // Increment live counters
      const prev = parseInt(localStorage.getItem("img_count") || "0");
      localStorage.setItem("img_count", prev + 1);
      if (response.prediction === "scam") {
        const prevScam = parseInt(localStorage.getItem("scam_count") || "0");
        localStorage.setItem("scam_count", prevScam + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith("image/")) handleFile(f);
  };

  return (
    <div>
      <PageHeader
        icon="◫"
        title="Image Scam Detector"
        subtitle="Upload a screenshot/Image of a suspicious message or website to analyze it with Vision AI + OCR."
        badge="VISION AI · OCR" gradient="linear-gradient(135deg, #10b981, #059669)"
      />

      <div className="card">
        <div
          className={`dropzone ${dragging ? "dropzone--drag" : ""} ${file ? "dropzone--filled" : ""}`}
          onClick={() => fileRef.current.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFile(e.target.files[0])}
          />

          {preview ? (
            <div className="preview-wrap">
              <img src={preview} alt="preview" className="preview-img" />
              <div className="preview-overlay">
                <span>Click to change image</span>
              </div>
            </div>
          ) : (
            <div className="dropzone-content">
              <div className="dropzone-icon">◫</div>
              <div className="dropzone-title">Drop screenshot here</div>
              <div className="dropzone-sub">or click to browse · PNG, JPG, WEBP</div>
            </div>
          )}
        </div>

        {file && (
          <div className="file-info">
            <span className="file-name">📎 {file.name}</span>
            <span className="file-size">{(file.size / 1024).toFixed(1)} KB</span>
          </div>
        )}

        <div className="card-footer">
          <span />
          <PrimaryButton onClick={handleUpload} loading={loading} disabled={!file || loading}>
            Analyze Screenshot
          </PrimaryButton>
        </div>
      </div>

      {loading && <LoadingSpinner text="Running OCR + fraud analysis..." />}

      {result && !loading && (
  <ResultCard prediction={result.prediction} confidence={result.confidence} scamKeyword="scam">
    {result.suspicious_words && result.suspicious_words.length > 0 && (
      <div>
        <div className="extracted-label">⚠ Suspicious Words Found</div>
        <div className="words-wrap">
          {result.suspicious_words.map((w, i) => (
            <span key={i} className="word-pill">{w}</span>
          ))}
        </div>
      </div>
    )}
    {result.text && (
      <div style={{marginTop:"12px"}}>
        <div className="extracted-label">Extracted Text (OCR)</div>
        <pre className="extracted-text">{result.text}</pre>
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
        .dropzone {
          border: 2px dashed var(--border);
          border-radius: 12px;
          cursor: pointer;
          transition: all var(--transition);
          min-height: 200px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          position: relative;
        }
        .dropzone:hover, .dropzone--drag { border-color: var(--accent); background: var(--accent-dim); }
        .dropzone--filled { border-style: solid; border-color: var(--border-accent); }
        .dropzone-content { text-align: center; padding: 40px; }
        .dropzone-icon { font-size: 40px; color: var(--text-muted); margin-bottom: 12px; }
        .dropzone-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: var(--text-secondary); margin-bottom: 6px; }
        .dropzone-sub { font-size: 13px; color: var(--text-muted); }

        .preview-wrap { position: relative; width: 100%; }
        .preview-img { width: 100%; max-height: 280px; object-fit: contain; display: block; border-radius: 10px; }
        .preview-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transition: opacity var(--transition);
          border-radius: 10px;
          font-size: 14px;
          color: white;
          font-weight: 600;
        }
        .preview-wrap:hover .preview-overlay { opacity: 1; }

        .file-info {
          display: flex;
          justify-content: space-between;
          padding: 10px 4px 0;
          font-size: 12px;
        }
        .file-name { color: var(--text-secondary); }
        .file-size { color: var(--text-muted); }

        .card-footer {
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }

        .extracted-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 8px;
          padding-top: 4px;
        }
        .extracted-text {
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 14px;
          font-family: 'DM Mono', 'Courier New', monospace;
          font-size: 12px;
          color: var(--text-secondary);
          white-space: pre-wrap;
          word-break: break-all;
          line-height: 1.6;
          max-height: 160px;
          overflow-y: auto;
          
        }
          .words-wrap { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
.word-pill { font-size: 12px; font-weight: 700; padding: 4px 12px; background: var(--danger-dim); color: var(--danger); border: 1px solid rgba(239,68,68,0.25); border-radius: 20px; }
      `}</style>
    </div>
  );
}

export default ScreenshotScanner;