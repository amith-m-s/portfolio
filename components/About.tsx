"use client";
import { useInView } from "./useInView";

const PRINCIPLES = [
  { n:"01", t:"Design for failure",  d:"Fault tolerance, retries, and graceful degradation are first-class requirements — not post-incident patches." },
  { n:"02", t:"Observability first", d:"Structured logs, distributed traces, and meaningful alerts before the first production deployment." },
  { n:"03", t:"Contracts before code",d:"API schema, database migrations, and message formats defined before implementation. Changes in flight break things." },
  { n:"04", t:"Scale by design",     d:"I think N×10 before optimizing prematurely. Horizontal scaling, queue decoupling, and caching layers shaped at the architecture stage." },
];

const TIMELINE = [
  { y:"2027", t:"B.Tech CSBS",                 o:"Rajagiri School of Engineering",   dot:"acc",  current:true },
  { y:"2025", t:"Deep Resume Analyzer",         o:"Production — Vercel Deployed",      dot:"acc2", current:false },
  { y:"2025", t:"Python Intern",                o:"Futura Labs, Calicut",              dot:"accw", current:false },
  { y:"2024", t:"JARVIS + LootBox Game",        o:"NLP & Blockchain Systems",          dot:"accv", current:false },
  { y:"2024", t:"Pro Finance Tracker",          o:"Open Source",                       dot:"acc",  current:false },
  { y:"2023", t:"Computer Science journey",     o:"Kerala, India",                     dot:"txt3", current:false },
];

const CERTS = [
  { l:"CGPA",              v:"7.90 / 10.0" },
  { l:"Microsoft C# (.NET)",v:"91.3%" },
  { l:"HackerRank SE",    v:"Certified" },
  { l:"Fortinet Cybersec", v:"Certified" },
  { l:"AWS ML Path",      v:"In Progress" },
];

export default function About() {
  const { ref, visible } = useInView();
  const s = (d=0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity .65s cubic-bezier(0.22,1,0.36,1) ${d}s, transform .65s cubic-bezier(0.22,1,0.36,1) ${d}s`,
  });

  return (
    <section id="about" ref={ref as React.RefObject<HTMLElement>}
      style={{padding:"128px 40px",maxWidth:1100,margin:"0 auto"}}>
      <div style={s(0)}>
        <div className="section-label" style={{marginBottom:14}}>// about</div>
        <h2 style={{fontFamily:"var(--fd)",fontSize:"clamp(28px,4vw,52px)",fontWeight:800,
          letterSpacing:"-.03em",color:"var(--txt)",lineHeight:1.04,marginBottom:56}}>
          Engineer who thinks in{" "}
          <span className="fs" style={{fontStyle:"italic",fontWeight:300,color:"var(--txt2)"}}>systems.</span>
        </h2>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:72}}>
        {/* Left */}
        <div>
          <div style={s(0.08)}>
            <p style={{fontSize:15.5,color:"var(--txt2)",lineHeight:1.82,marginBottom:20}}>
              I build systems that are meant to <em style={{color:"var(--txt)",fontStyle:"normal",fontWeight:500}}>survive production</em> — not just pass code review. My work spans backend API design, NLP-powered data pipelines, and blockchain smart contract architecture, with a consistent focus on performance, reliability, and architectural clarity.
            </p>
            <p style={{fontSize:15.5,color:"var(--txt2)",lineHeight:1.82,marginBottom:40}}>
              Currently a final-year B.Tech student at Rajagiri, I've shipped real production systems — from a Docker-orchestrated semantic resume platform on Vercel to on-chain NFT loot box engines written in Sui Move. I treat observability as a requirement and think about tradeoffs before technology.
            </p>
          </div>

          {/* Principle cards */}
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {PRINCIPLES.map((p,i) => (
              <div key={p.n} style={{
                padding:"17px 20px",
                background:"var(--sur)",border:"1px solid var(--bdr)",borderRadius:11,
                ...s(0.14 + i * 0.08),
              }}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:7}}>
                  <span style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--acc)",letterSpacing:".1em"}}>{p.n}</span>
                  <span style={{fontFamily:"var(--fd)",fontSize:13.5,fontWeight:600,color:"var(--txt)"}}>{p.t}</span>
                </div>
                <p style={{fontFamily:"var(--fd)",fontSize:13,color:"var(--txt2)",lineHeight:1.7}}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div>
          {/* Timeline */}
          <div style={{marginBottom:40,...s(0.1)}}>
            <div style={{fontFamily:"var(--fm)",fontSize:9.5,color:"var(--txt3)",letterSpacing:".12em",textTransform:"uppercase",marginBottom:24}}>Timeline</div>
            <div style={{position:"relative",paddingLeft:24}}>
              <div style={{position:"absolute",left:3,top:0,bottom:0,width:1,
                background:"linear-gradient(to bottom,var(--acc),transparent)",opacity:.25}}/>
              {TIMELINE.map((item,i) => (
                <div key={item.y} style={{
                  marginBottom:26,position:"relative",
                  ...s(0.15 + i * 0.07),
                }}>
                  <div style={{
                    position:"absolute",left:-21,top:5,
                    width:8,height:8,borderRadius:"50%",
                    background: item.current ? "var(--acc)" : "var(--bg-2)",
                    border:`1px solid var(--${item.dot})`,
                    boxShadow: item.current ? "0 0 10px rgba(91,156,246,0.5)" : "none",
                  }}/>
                  <div style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--txt3)",marginBottom:3}}>{item.y}</div>
                  <div style={{fontSize:14,fontWeight:600,color: item.current ? "var(--txt)" : "var(--txt2)",marginBottom:2}}>{item.t}</div>
                  <div style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--txt3)"}}>{item.o}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Certs */}
          <div style={s(0.5)}>
            <div style={{fontFamily:"var(--fm)",fontSize:9.5,color:"var(--txt3)",letterSpacing:".12em",textTransform:"uppercase",marginBottom:14}}>Credentials</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {CERTS.map(c => (
                <div key={c.l} style={{
                  display:"flex",justifyContent:"space-between",alignItems:"center",
                  padding:"10px 16px",
                  background:"var(--sur)",border:"1px solid var(--bdr)",borderRadius:8,
                }}>
                  <span style={{fontFamily:"var(--fm)",fontSize:11.5,color:"var(--txt2)"}}>{c.l}</span>
                  <span style={{fontFamily:"var(--fm)",fontSize:11.5,color:"var(--acc)"}}>{c.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
