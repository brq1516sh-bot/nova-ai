"use client";
import { useRef, useState } from "react";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [fps, setFps] = useState("120");
  const [quality, setQuality] = useState("4K UHD");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  function chooseFile(f?: File) {
    if (!f) return;
    if (!f.type.startsWith("video/")) {
      setNotice("اختر ملف فيديو صالحًا.");
      return;
    }
    if (preview) URL.revokeObjectURL(preview);
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setNotice("");
  }

  async function start() {
    if (!file) {
      setNotice("ارفع فيديو أولًا.");
      return;
    }
    setBusy(true);
    setNotice("واجهة الموقع جاهزة، لكن محرك معالجة الذكاء الاصطناعي غير مربوط بعد. راجع README لإكمال الربط.");
    setBusy(false);
  }

  return (
    <main className="shell">
      <nav className="nav">
        <a className="brand" href="#">
          <span className="logo">✦</span> NOVA <span className="muted">AI</span>
        </a>
        <span className="navtag">VIDEO ENHANCER</span>
      </nav>

      <section className="hero">
        <div className="eyebrow"><span className="dot" /> AI VIDEO ENHANCEMENT</div>
        <h1>خلّ فيديوهاتك<br /><span className="gradient">بوضوح 4K مذهل</span></h1>
        <p className="sub">
          ارفع الفيديو، حسّن التفاصيل بالذكاء الاصطناعي، واستهدف حركة فائقة السلاسة تصل إلى 120 إطارًا في الثانية.
        </p>
      </section>

      <section className="workspace">
        <div className="upload"
          onClick={() => inputRef.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => {
            e.preventDefault();
            chooseFile(e.dataTransfer.files?.[0]);
          }}>
          <input ref={inputRef} type="file" accept="video/*" hidden
            onChange={e => chooseFile(e.target.files?.[0])} />
          {preview ? (
            <video className="preview" src={preview} controls playsInline />
          ) : (
            <div className="upload-inner">
              <div className="upload-icon">↑</div>
              <h3>ارفع الفيديو هنا</h3>
              <p>اضغط لاختيار فيديو من جهازك أو اسحبه إلى هنا</p>
              <span className="filetypes">MP4 · MOV · WEBM</span>
            </div>
          )}
        </div>

        {file && (
          <div className="fileline">
            <span>▣ {file.name}</span>
            <span>{(file.size / 1024 / 1024).toFixed(1)} MB</span>
          </div>
        )}

        <div className="settings">
          <div className="section-title">إعدادات التحسين <span>⚙</span></div>
          <div className="setting-row">
            <div><b>الدقة النهائية</b><small>تحسين التفاصيل ورفع الدقة</small></div>
            <select value={quality} onChange={e => setQuality(e.target.value)}>
              <option>4K UHD</option>
              <option>1440p</option>
              <option>1080p</option>
            </select>
          </div>
          <div className="setting-row">
            <div><b>معدل الإطارات</b><small>توليد إطارات وسيطة للحركة</small></div>
            <select value={fps} onChange={e => setFps(e.target.value)}>
              <option value="120">120 FPS</option>
              <option value="60">60 FPS</option>
              <option value="30">30 FPS</option>
            </select>
          </div>
          <div className="setting-row">
            <div><b>جودة التصدير</b><small>أعلى جودة ممكنة، مع حجم ملف أكبر</small></div>
            <span className="pill">MAX</span>
          </div>
        </div>

        <button className="cta" onClick={start} disabled={busy}>
          {busy ? "جارٍ التجهيز…" : "✦ تحسين الفيديو بالذكاء الاصطناعي"}
        </button>

        {notice && <div className="notice">{notice}</div>}
        <div className="privacy">🔒 ملفاتك لا تُرفع إلى أي سيرفر في هذه النسخة التجريبية.</div>
      </section>

      <section className="features">
        <div><span>✧</span><b>AI Upscaling</b><p>تحسين التفاصيل ورفع الدقة</p></div>
        <div><span>◌</span><b>Frame Interpolation</b><p>حركة أكثر سلاسة</p></div>
        <div><span>⇩</span><b>High Quality Export</b><p>تصدير بجودة عالية</p></div>
      </section>

      <footer>NOVA AI · مشروع تجريبي قابل للتطوير</footer>
    </main>
  );
}
