import { useState, useRef, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer]     = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [glitch, setGlitch]         = useState(false);
  const [asked, setAsked]           = useState(false);
  const [submittedQ, setSubmittedQ] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) { setError('Please enter a question'); return; }

    setLoading(true);
    setError('');
    setAnswer('');
    setAsked(true);
    setSubmittedQ(trimmedQuestion);
    setQuestion('');

    try {
      const response = await fetch(`${API_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmedQuestion }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to get response');
      setAnswer(data.response);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  return (
    <div className="shell">
      <div className="scanlines" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="panel">

        <header className="header">
          <div className="header-left">
            <h1 className={`logo ${glitch ? 'glitch' : ''}`}>
              <span data-text="Cognitia AI">Cognitia AI</span>
            </h1>
            <div className="header-badges">
              <span className="badge">v1.0</span>
              <span className="status-dot" />
              <span className="status-label">LIVE</span>
            </div>
          </div>
          <div className="signal-bars">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="bar" style={{ '--h': `${i*4+4}px`, animationDelay: `${i*0.12}s` }} />
            ))}
          </div>
        </header>

        <div className="body">
          {!asked && (
            <div className="hero">
              <p className="hero-label">// READY</p>
              <p className="hero-sub">Ask a question, get an instant answer</p>
            </div>
          )}

          {asked && (
            <div className="qa-area">
              {/* Question block */}
              <div className="qa-block">
                <div className="qa-meta">
                  <span className="qa-tag qa-tag--you">YOU</span>
                  <span className="qa-line" />
                </div>
                <div className="question-box">{submittedQ}</div>
              </div>

              {/* Answer block */}
              <div className={`qa-block ${error ? 'is-error' : ''}`}>
                <div className="qa-meta">
                  <span className="qa-tag qa-tag--ai">{error ? 'ERROR' : 'COGNITIA'}</span>
                  <span className="qa-line" />
                </div>

                {loading && (
                  <div className="thinking">
                    <span className="dot" /><span className="dot" /><span className="dot" />
                  </div>
                )}

                {error && !loading && (
                  <div className="error-box">
                    <span className="error-icon">⚠</span> {error}
                  </div>
                )}

                {answer && !loading && (
                  <div className="answer-box">{answer}</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="composer">
          <form onSubmit={handleSubmit}>
            <div className="composer-inner">
              <span className="prompt-sym">&gt;_</span>
              <input
                ref={inputRef}
                type="text"
                className="composer-input"
                placeholder="Ask me anything…"
                value={question}
                onChange={e => setQuestion(e.target.value)}
                disabled={loading}
                maxLength={1000}
              />
              <button
                type="submit"
                className="send-btn"
                disabled={loading || !question.trim()}
              >
                <span>{loading ? 'ASKING' : 'ASK'}</span>
                <span className="send-arrow">{loading ? '…' : '↑'}</span>
              </button>
            </div>
          </form>
          <p className="hint">ENTER to submit · max 1000 chars</p>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        :root {
          --void:#040407; --panel:#0d0d18; --surface:#12121f;
          --border:rgba(90,255,200,0.12); --accent:#5affc8;
          --accent-hot:#b8ff57; --accent-glow:rgba(90,255,200,0.35);
          --text:#e8e8f0; --muted:#5a5a78; --error:#ff6b6b;
          --mono:'Space Mono',monospace; --display:'Syne',sans-serif;
        }
        body {
          background:var(--void); color:var(--text); font-family:var(--mono);
          min-height:100vh; display:flex; align-items:center;
          justify-content:center; padding:20px; overflow-x:hidden;
        }
        .scanlines {
          position:fixed; inset:0; pointer-events:none; z-index:100;
          background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.07) 2px,rgba(0,0,0,0.07) 4px);
        }
        .orb { position:fixed; border-radius:50%; filter:blur(90px); pointer-events:none; z-index:0; }
        .orb-1 { width:500px; height:500px; top:-150px; right:-100px;
          background:radial-gradient(circle,rgba(90,255,200,0.07) 0%,transparent 70%);
          animation:drift1 18s ease-in-out infinite; }
        .orb-2 { width:400px; height:400px; bottom:-100px; left:-100px;
          background:radial-gradient(circle,rgba(184,255,87,0.06) 0%,transparent 70%);
          animation:drift2 22s ease-in-out infinite; }
        .orb-3 { width:300px; height:300px; top:50%; left:50%;
          background:radial-gradient(circle,rgba(120,80,255,0.04) 0%,transparent 70%);
          animation:drift3 16s ease-in-out infinite; }
        @keyframes drift1{0%,100%{transform:translate(0,0)}50%{transform:translate(-40px,60px)}}
        @keyframes drift2{0%,100%{transform:translate(0,0)}50%{transform:translate(60px,-40px)}}
        @keyframes drift3{0%,100%{transform:translate(-50%,-50%)}50%{transform:translate(-50%,-55%)}}
        .panel {
          position:relative; z-index:10; width:100%; max-width:640px;
          background:var(--panel); border:1px solid var(--border); border-radius:20px;
          overflow:hidden;
          box-shadow:0 0 0 1px rgba(90,255,200,0.04),0 40px 80px rgba(0,0,0,0.6),0 0 100px rgba(90,255,200,0.04),inset 0 1px 0 rgba(255,255,255,0.04);
          display:flex; flex-direction:column;
          animation:panelIn 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes panelIn{from{opacity:0;transform:translateY(28px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        .header {
          display:flex; align-items:center; justify-content:space-between;
          padding:18px 24px; border-bottom:1px solid var(--border); background:rgba(0,0,0,0.3);
        }
        .header-left { display:flex; align-items:center; gap:14px; }
        .logo {
          font-family:var(--display); font-size:1.45rem; font-weight:800;
          color:var(--accent); letter-spacing:0.08em;
          text-shadow:0 0 20px var(--accent-glow),0 0 40px rgba(90,255,200,0.15);
        }
        .logo.glitch span { animation:glitchA 0.15s steps(2) forwards; }
        @keyframes glitchA{
          0%{transform:translate(0);clip-path:inset(0 0 0 0);color:var(--accent)}
          25%{transform:translate(-2px,1px);clip-path:inset(20% 0 60% 0);color:#ff5af0}
          50%{transform:translate(2px,-1px);clip-path:inset(60% 0 10% 0);color:var(--accent-hot)}
          75%{transform:translate(-1px,0);color:var(--accent)}
          100%{transform:translate(0);clip-path:inset(0);color:var(--accent)}
        }
        .header-badges { display:flex; align-items:center; gap:8px; }
        .badge { font-size:0.6rem; color:var(--muted); border:1px solid var(--border); padding:2px 7px; border-radius:4px; letter-spacing:0.1em; }
        .status-dot { width:6px; height:6px; border-radius:50%; background:var(--accent-hot); box-shadow:0 0 8px var(--accent-hot); animation:blink 2s ease-in-out infinite; }
        .status-label { font-size:0.62rem; color:var(--accent-hot); font-weight:700; letter-spacing:0.14em; }
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.35}}
        .signal-bars { display:flex; align-items:flex-end; gap:3px; height:20px; }
        .bar { width:4px; height:var(--h); border-radius:2px; background:var(--accent); opacity:0.6; animation:barP 1.2s ease-in-out infinite; }
        @keyframes barP{0%,100%{opacity:0.25}50%{opacity:1}}
        .body { flex:1; padding:32px 24px; display:flex; flex-direction:column; justify-content:center; min-height:200px; overflow-y:auto; }
        .hero { text-align:center; animation:fadeUp 0.5s ease both; }
        .hero-label { font-size:0.7rem; color:var(--accent); letter-spacing:0.2em; margin-bottom:10px; opacity:0.7; }
        .hero-sub { font-size:0.9rem; color:var(--muted); line-height:1.6; }
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .qa-area { display:flex; flex-direction:column; gap:24px; animation:fadeUp 0.35s ease both; }
        .qa-block { display:flex; flex-direction:column; gap:10px; }
        .qa-meta { display:flex; align-items:center; gap:10px; }
        .qa-tag { font-size:0.62rem; font-weight:700; letter-spacing:0.18em; }
        .qa-tag--you { color:var(--accent-hot); }
        .qa-tag--ai  { color:var(--accent); }
        .is-error .qa-tag--ai { color:var(--error); }
        .qa-line { flex:1; height:1px; background:var(--border); }
        .question-box {
          background:rgba(184,255,87,0.05); border:1px solid rgba(184,255,87,0.14);
          border-left:2px solid var(--accent-hot); border-radius:12px;
          padding:16px 20px; font-size:0.88rem; line-height:1.75;
          color:var(--text); word-break:break-word;
        }
        .thinking { display:flex; gap:7px; padding:24px 0; justify-content:center; }
        .dot { width:8px; height:8px; border-radius:50%; background:var(--accent); opacity:0.4; animation:dotB 1.4s ease-in-out infinite; }
        .dot:nth-child(2){animation-delay:0.2s;background:var(--accent-hot)}
        .dot:nth-child(3){animation-delay:0.4s}
        @keyframes dotB{0%,80%,100%{transform:scale(0.55);opacity:0.3}40%{transform:scale(1);opacity:1}}
        .error-box {
          background:rgba(255,107,107,0.07); border:1px solid rgba(255,107,107,0.25);
          border-left:2px solid var(--error); border-radius:12px; padding:16px 20px;
          color:var(--error); font-size:0.85rem; display:flex; gap:10px; align-items:flex-start;
        }
        .answer-box {
          background:var(--surface); border:1px solid var(--border);
          border-left:2px solid var(--accent); border-radius:12px;
          padding:20px 22px; font-size:0.88rem; line-height:1.8;
          color:var(--text); white-space:pre-wrap; word-break:break-word;
        }
        .composer { padding:16px 20px 14px; border-top:1px solid var(--border); background:rgba(0,0,0,0.3); }
        .composer-inner {
          display:flex; align-items:center; gap:10px;
          background:var(--surface); border:1px solid var(--border);
          border-radius:14px; padding:10px 14px;
          transition:border-color 0.2s,box-shadow 0.2s;
        }
        .composer-inner:focus-within {
          border-color:rgba(90,255,200,0.4);
          box-shadow:0 0 0 3px rgba(90,255,200,0.06),0 0 30px rgba(90,255,200,0.05);
        }
        .prompt-sym { font-size:0.85rem; color:var(--accent); opacity:0.7; text-shadow:0 0 10px var(--accent-glow); flex-shrink:0; }
        .composer-input {
          flex:1; background:none; border:none; outline:none;
          color:var(--text); font-family:var(--mono); font-size:0.88rem; line-height:1.5;
        }
        .composer-input::placeholder { color:var(--muted); }
        .composer-input:disabled { opacity:0.5; cursor:not-allowed; }
        .send-btn {
          display:flex; align-items:center; gap:6px;
          padding:9px 20px; background:var(--accent); color:#040407;
          border:none; border-radius:10px; font-family:var(--mono);
          font-size:0.72rem; font-weight:700; letter-spacing:0.12em;
          cursor:pointer; flex-shrink:0;
          transition:background 0.2s,transform 0.15s,box-shadow 0.2s;
          box-shadow:0 0 22px rgba(90,255,200,0.45),0 4px 14px rgba(0,0,0,0.35);
        }
        .send-btn:hover:not(:disabled) {
          background:#7fffda; transform:translateY(-2px);
          box-shadow:0 0 34px rgba(90,255,200,0.65),0 8px 22px rgba(0,0,0,0.4);
        }
        .send-btn:active:not(:disabled) { transform:translateY(0); }
        .send-btn:disabled {
          background:var(--surface); color:var(--muted);
          box-shadow:none; cursor:not-allowed; border:1px solid var(--border);
        }
        .send-arrow { font-size:0.95rem; }
        .hint { font-size:0.6rem; color:var(--muted); text-align:center; margin-top:10px; letter-spacing:0.08em; }
        @media(max-width:480px){
          .panel{border-radius:14px}
          .header,.composer{padding-left:16px;padding-right:16px}
          .body{padding:24px 16px}
        }
      `}</style>
    </div>
  );
}

export default App;