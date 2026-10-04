"use client";
import { useState, useEffect, useRef } from "react";

const ROLES = [
  "Backend Engineer",
  "Platform Engineer",
  "AI Systems Engineer",
];

const METRICS = [
  { v:"4", l:"Core systems" },
  { v:"Async", l:"Queues & workers" },
  { v:"NLP", l:"Semantic matching" },
  { v:"Sui", l:"On-chain contracts" },
];

const STACK = ["Python","Node.js","FastAPI","Docker","React","NLP","Sui Move","PostgreSQL"];

export default function Hero() {
  const [ready, setReady] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing"|"pause"|"erasing">("typing");
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Entrance
  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t); }, []);

  // Typewriter for rotating roles
  useEffect(() => {
    const role = ROLES[roleIdx];
    if (phase === "typing") {
      if (typed.length < role.length) {
        const t = setTimeout(() => setTyped(role.slice(0, typed.length + 1)), 50);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("pause"), 2000);
        return () => clearTimeout(t);
      }
    } else if (phase === "pause") {
      const t = setTimeout(() => setPhase("erasing"), 300);
      return () => clearTimeout(t);
    } else {
      if (typed.length > 0) {
        const t = setTimeout(() => setTyped(typed.slice(0, -1)), 30);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setRoleIdx((i) => (i + 1) % ROLES.length);
          setPhase("typing");
        }, 0);
        return () => clearTimeout(t);
      }
    }
  }, [typed, phase, roleIdx]);

  // Cursor glow
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const r = heroRef.current.getBoundingClientRect();
      setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const tr = (delay = 0, extra = "") =>
    `opacity ${ready ? 0.001 : 0.6}s ease ${delay}s, transform ${ready ? 0.001 : 0.6}s cubic-bezier(0.22,1,0.36,1) ${delay}s${extra ? ", " + extra : ""}`;

  return (
    <section ref={heroRef} id="hero" style={{
      minHeight:"100vh",position:"relative",
      display:"flex",flexDirection:"column",
      justifyContent:"center",padding:"0 40px",overflow:"hidden",
    }}>
      {/* Grid */}
      <div className="grid-bg" style={{position:"absolute",inset:0,opacity:.55}}/>

      {/* Cursor reactive radial */}
      <div style={{
        position:"absolute",inset:0,pointerEvents:"none",
        background:`radial-gradient(700px circle at ${mouse.x}% ${mouse.y}%, rgba(91,156,246,0.055), transparent 55%)`,
        transition:"background .12s ease",
      }}/>

      {/* Static ambient blobs */}
      <div style={{position:"absolute",top:"15%",right:"22%",width:480,height:480,borderRadius:"50%",
        background:"radial-gradient(circle,rgba(163,113,247,0.048) 0%,transparent 70%)",pointerEvents:"none",
        animation:"drift 18s ease-in-out infinite",
      }}/>
      <div style={{position:"absolute",bottom:"18%",left:"8%",width:360,height:360,borderRadius:"50%",
        background:"radial-gradient(circle,rgba(91,156,246,0.055) 0%,transparent 70%)",pointerEvents:"none",
        animation:"drift 22s ease-in-out infinite reverse",
      }}/>

      {/* Noise */}
      <div className="noise" style={{position:"absolute",inset:0}}/>

      <div style={{maxWidth:880,position:"relative",zIndex:1}}>
        {/* Status pill */}
        <div style={{
          display:"inline-flex",alignItems:"center",gap:8,
          padding:"5px 14px",borderRadius:20,marginBottom:36,
          background:"rgba(57,211,83,0.07)",border:"1px solid rgba(57,211,83,0.2)",
          opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(10px)",
          transition: tr(0.05),
        }}>
          <span style={{
            width:6,height:6,borderRadius:"50%",
            background:"var(--acc2)",display:"inline-block",
            boxShadow:"0 0 0 0 rgba(57,211,83,.4)",
            animation:"pulse 2s ease-in-out infinite",
          }}/>
          <span style={{fontFamily:"var(--fm)",fontSize:10.5,color:"var(--acc2)",letterSpacing:".08em"}}>
            Open to backend / software engineering opportunities · Kerala, India
          </span>
        </div>

        {/* Headline */}
        <div style={{marginBottom:12}}>
          <div style={{
            fontFamily:"var(--fs)",fontSize:"clamp(14px,1.4vw,17px)",
            fontStyle:"italic",color:"var(--txt2)",letterSpacing:".01em",marginBottom:10,
            opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(14px)",
            transition: tr(0.12),
          }}>
            Designing systems for the long run —
          </div>
          <h1 style={{
            fontFamily:"var(--fd)",fontWeight:800,lineHeight:1.02,
            fontSize:"clamp(40px,7vw,86px)",
            letterSpacing:"-.035em",color:"var(--txt)",
            opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(18px)",
            transition: tr(0.18),
          }}>
            <span style={{display:"block"}}>Backend Engineer</span>
            <span style={{
              display:"block",
              background:"linear-gradient(135deg,var(--acc) 0%,var(--accv) 70%)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
              backgroundClip:"text",minHeight:"1.02em",
            }}>
              {typed}<span style={{
                fontStyle:"normal",WebkitTextFillColor:"var(--acc)",
                animation:"blink 1s step-end infinite",
              }}>|</span>
            </span>
          </h1>
        </div>

        {/* Sub */}
        <p style={{
          fontFamily:"var(--fd)",fontSize:"clamp(15px,1.7vw,18px)",
          color:"var(--txt2)",lineHeight:1.72,maxWidth:560,marginBottom:44,fontWeight:400,
          opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(16px)",
          transition: tr(0.28),
        }}>
          Designing backend APIs, NLP pipelines, and platform systems with a focus on reliability, observability, and clear architectural tradeoffs.
        </p>

        {/* CTAs */}
        <div style={{
          display:"flex",flexWrap:"wrap",gap:10,marginBottom:64,
          opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(14px)",
          transition: tr(0.38),
        }}>
          <a href="#projects" className="btn-primary">View Projects →</a>
          <a href="https://github.com/amith-m-s" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.01 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/></svg>
            GitHub
          </a>
          <a href="mailto:amith6567@gmail.com" className="btn-ghost">Contact</a>
        </div>

        {/* Metrics row */}
        <div style={{
          display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,
          maxWidth:640,marginBottom:40,
          opacity: ready ? 1 : 0,
          transition: tr(0.5),
          border:"1px solid var(--bdr)",borderRadius:12,overflow:"hidden",
        }}>
          {METRICS.map((m,i) => (
            <div key={m.l} style={{
              padding:"16px 18px",
              background: i%2===0 ? "var(--sur)" : "rgba(255,255,255,0.02)",
              borderRight: i<3 ? "1px solid var(--bdr)" : "none",
            }}>
              <div style={{fontFamily:"var(--fm)",fontSize:15,fontWeight:600,color:"var(--acc)",marginBottom:4}}>{m.v}</div>
              <div style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--txt3)",letterSpacing:".06em"}}>{m.l}</div>
            </div>
          ))}
        </div>

        {/* Stack badges */}
        <div style={{
          display:"flex",flexWrap:"wrap",gap:6,alignItems:"center",
          opacity: ready ? 1 : 0, transition: tr(0.6),
        }}>
          <span style={{fontFamily:"var(--fm)",fontSize:9.5,color:"var(--txt3)",letterSpacing:".1em",textTransform:"uppercase",marginRight:6}}>Core Stack</span>
          {STACK.map(s => <span key={s} className="tag">{s}</span>)}
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",
        display:"flex",flexDirection:"column",alignItems:"center",gap:6,
        opacity: ready ? 0.35 : 0, transition: tr(1.2),
      }}>
        <span style={{fontFamily:"var(--fm)",fontSize:9,color:"var(--txt3)",letterSpacing:".12em",textTransform:"uppercase"}}>scroll</span>
        <div style={{width:1,height:40,background:"linear-gradient(to bottom,var(--txt3),transparent)"}}/>
      </div>
    </section>
  );
}
