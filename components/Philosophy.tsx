"use client";
import { useState } from "react";
import { useInView } from "./useInView";

const FLOW = [
  { l:"Requirements",  s:"Problem scoped & bounded" },
  { l:"Architecture",  s:"System designed" },
  { l:"Contracts",     s:"APIs & schemas locked" },
  { l:"Build",         s:"Services implemented" },
  { l:"Observability", s:"Logs, metrics, traces" },
  { l:"Deploy",        s:"Production + monitoring" },
];

const PILLARS = [
  { n:"01", t:"API Design",        c:"var(--acc)",  d:"Contracts first. An API is a promise — backward compatibility, versioning, and semantic clarity are non-negotiable before the first handler is written." },
  { n:"02", t:"Observability",     c:"var(--accv)", d:"You can't fix what you can't see. Structured logging, distributed tracing, and meaningful metrics in every system I ship — not bolted on after the first incident." },
  { n:"03", t:"Scalability",       c:"var(--acc2)", d:"I design for the next order of magnitude before optimizing prematurely. Horizontal scaling, caching layers, and queue-based decoupling are architecture-stage decisions." },
  { n:"04", t:"Security Posture",  c:"var(--accw)", d:"Authentication, authorization, and input validation are never afterthoughts. Least-privilege and defense-in-depth are baked into design decisions, not bolted on." },
  { n:"05", t:"Containerization",  c:"var(--acc)",  d:"Docker-first development ensures environment parity from local to production. Infrastructure is code, and reproducibility is a hard requirement." },
  { n:"06", t:"Data Modeling",     c:"var(--accv)", d:"Schema design outlives code. I invest in normalization, indexing strategy, and migration safety before query optimization — changing a production schema is expensive." },
];

export default function Philosophy() {
  const { ref, visible } = useInView();
  const [hov, setHov] = useState<string|null>(null);
  const s = (d=0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity .65s cubic-bezier(0.22,1,0.36,1) ${d}s, transform .65s cubic-bezier(0.22,1,0.36,1) ${d}s`,
  });

  return (
    <section id="philosophy" ref={ref as React.RefObject<HTMLElement>}
      style={{padding:"128px 40px",maxWidth:1100,margin:"0 auto"}}>
      <div style={s(0)}>
        <div className="section-label" style={{marginBottom:14}}>{"// philosophy"}</div>
        <h2 style={{fontFamily:"var(--fd)",fontSize:"clamp(28px,4vw,52px)",fontWeight:800,
          letterSpacing:"-.03em",color:"var(--txt)",marginBottom:12}}>
          How I Build Systems
        </h2>
        <p style={{fontSize:15.5,color:"var(--txt2)",maxWidth:520,marginBottom:60}}>
          Engineering principles that guide every architecture decision — from prototype to production.
        </p>
      </div>

      {/* Dev flow */}
      <div style={{
        marginBottom:72,overflowX:"auto",paddingBottom:4,
        ...s(0.1),
      }}>
        <div style={{display:"flex",alignItems:"center",minWidth:"max-content"}}>
          {FLOW.map((step,i) => (
            <div key={step.l} style={{display:"flex",alignItems:"center"}}>
              <div style={{
                padding:"11px 18px",
                background: i===5 ? "rgba(91,156,246,0.1)" : "var(--sur)",
                border:`1px solid ${i===5 ? "rgba(91,156,246,0.3)" : "var(--bdr)"}`,
                borderRadius:8,textAlign:"center",
              }}>
                <div style={{
                  fontFamily:"var(--fm)",fontSize:11.5,fontWeight:600,
                  color: i===5 ? "var(--acc)" : "var(--txt)",
                  marginBottom:3,letterSpacing:".03em",
                }}>{step.l}</div>
                <div style={{fontFamily:"var(--fm)",fontSize:9.5,color:"var(--txt3)"}}>{step.s}</div>
              </div>
              {i < FLOW.length-1 && (
                <div style={{
                  display:"flex",alignItems:"center",gap:0,
                  width:36,height:1,
                  background:"linear-gradient(to right,var(--bdr2),var(--bdr))",
                  flexShrink:0,margin:"0 0",
                }}/>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pillars */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",
        gap:14,
      }}>
        {PILLARS.map((p,i) => (
          <div key={p.n}
            onMouseEnter={() => setHov(p.n)}
            onMouseLeave={() => setHov(null)}
            style={{
              padding:"26px 26px 22px",
              background: hov===p.n ? "rgba(255,255,255,0.04)" : "var(--sur)",
              border:`1px solid ${hov===p.n ? `${p.c}35` : "var(--bdr)"}`,
              borderRadius:13,cursor:"default",
              ...s(0.18 + i*0.07),
              transition: `opacity .65s cubic-bezier(0.22,1,0.36,1) ${0.18+i*.07}s, transform .65s cubic-bezier(0.22,1,0.36,1) ${0.18+i*.07}s, border-color .22s, background .22s`,
            }}
          >
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <span style={{fontFamily:"var(--fm)",fontSize:9.5,color:"var(--txt3)",letterSpacing:".1em"}}>{p.n}</span>
              <div style={{width:5,height:5,borderRadius:"50%",background:p.c,opacity:.8}}/>
            </div>
            <div style={{
              fontFamily:"var(--fd)",fontSize:17,fontWeight:700,
              color: hov===p.n ? "var(--txt)" : "var(--txt)",
              marginBottom:10,letterSpacing:"-.015em",
              transition:"color .22s",
            }}>{p.t}</div>
            <p style={{fontFamily:"var(--fd)",fontSize:13.5,color:"var(--txt2)",lineHeight:1.75}}>{p.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
