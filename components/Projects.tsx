"use client";
import { useState } from "react";
import { useInView } from "./useInView";

const P = [
  {
    id:"dra", title:"Deep Resume Analyzer",
    year:"2025", status:"Production", statusC:"g",
    tagline:"Semantic AI resume screening — 3-service Docker architecture on Vercel.",
    stack:["Node.js","React","Express.js","FastAPI","Docker","NLP Embeddings","REST API"],
    links:{ live:"https://deep-resume-analyzer.vercel.app/", gh:"https://github.com/amith-m-s/deep-resume-analyzer" },
    metrics:[
      {v:"~2.5s", l:"Per PDF processed"},
      {v:"3-tier", l:"Docker services"},
      {v:"Semantic", l:"Similarity engine"},
      {v:"Vercel", l:"Production host"},
    ],
    color:"var(--acc)",
    problem:"Manual resume screening is inconsistent and keyword-driven. The goal was semantically-aware candidate scoring that measures meaning, not token frequency.",
    arch:"React frontend → Express.js API gateway → FastAPI NLP microservice. Each service is an isolated Docker container coordinated via Compose. The NLP service handles PDF parsing, embedding generation, and cosine similarity scoring independently of the gateway.",
    decisions:[
      "FastAPI over Flask — async inference and native type validation via Pydantic",
      "Docker Compose — environment parity from local to production without orchestration overhead",
      "Semantic embeddings over TF-IDF — meaning-preserving scoring, not keyword matching",
      "Vercel for the frontend — zero-config CDN with SSR and edge functions",
    ],
    challenge:"Coordinating async PDF parsing with synchronous embedding requests. Built a queue-like request pipeline in the Express layer with retry logic and timeout handling to avoid stale lock states.",
    future:"Persistent vector database (Qdrant) for candidate search across sessions, batch processing API for high-volume hiring pipelines, LLM-generated structured feedback explanations per candidate.",
  },
  {
    id:"lb", title:"LootBox Game",
    year:"2024", status:"Contract Deployed", statusC:"v",
    tagline:"On-chain NFT loot boxes with provably fair randomness in Sui Move.",
    stack:["Sui Move","Smart Contracts","On-chain Randomness","NFT Lifecycle","Sui CLI"],
    links:{ gh:"https://github.com/amith-m-s/lootbox-game" },
    metrics:[
      {v:"Sui",      l:"Move VM"},
      {v:"On-chain", l:"Verifiable random"},
      {v:"Full",     l:"NFT lifecycle"},
      {v:"Edge-case",l:"Test coverage"},
    ],
    color:"var(--accv)",
    problem:"Traditional loot boxes have opaque reward distributions. A blockchain-native system needs tamper-proof rarity mechanics and provably fair randomness with full auditability.",
    arch:"Single Move module managing loot pool state, rarity tables, and NFT object lifecycle. On-chain randomness derived from Sui's native randomness beacon. Dynamic object fields track rarity pool depletion to prevent double-draws.",
    decisions:[
      "Sui Move over Solidity — object-centric ownership model maps cleanly to NFT semantics",
      "On-chain randomness beacon over external VRF — sufficient at MVP scale with a documented upgrade path",
      "Event-driven state transitions — every state change emits a typed event for off-chain indexing",
    ],
    challenge:"Move's strict ownership model required rethinking loot pool consumption. Modeled the rarity pool as a vector with deterministic depletion indices — prevents double-draws without global locks.",
    future:"Multi-asset loot pools, cross-contract composability for NFT marketplaces, VRF upgrade for production-scale environments.",
  },
  {
    id:"jv", title:"JARVIS",
    year:"2024", status:"Open Source", statusC:"y",
    tagline:"Modular NLP voice assistant with plugin-based command routing.",
    stack:["Python","Speech Recognition","NLP","System Automation","Plugin Architecture"],
    links:{ gh:"https://github.com/amith-m-s/JARVIS" },
    metrics:[
      {v:"Plugin",   l:"Extensible arch"},
      {v:"Local",    l:"Offline STT"},
      {v:"Intent",   l:"NLP classifier"},
      {v:"Zero-dep", l:"Core additions"},
    ],
    color:"var(--accw)",
    problem:"Existing voice assistants are cloud-locked with opaque intent models. Goal: a local, extensible system where new capabilities integrate without modifying the core routing pipeline.",
    arch:"Speech input → local STT pipeline → NLP intent parser → plugin command router → executor. Each plugin implements a standard interface and self-registers. The router dispatches to handlers via intent classification, not regex matching.",
    decisions:[
      "Local STT — offline capability and data privacy, no cloud dependency",
      "Plugin registry pattern over monolithic command list — add capabilities without touching core",
      "Intent classification over regex — robust to natural language variation and phrasing differences",
    ],
    challenge:"Domain-specific commands degraded NLP intent accuracy. Built a custom intent corpus with hard-negative sampling and trained a lightweight boundary classifier on top.",
    future:"Hot-reload plugin system, local LLM integration for freeform queries, and multi-modal text+voice input fusion.",
  },
  {
    id:"ft", title:"Pro Finance Tracker",
    year:"2024", status:"Open Source", statusC:"",
    tagline:"Client-side financial dashboard with real-time analytics and budget alerts.",
    stack:["HTML5","CSS3","Vanilla JS","Chart.js","LocalStorage API"],
    links:{ gh:"https://github.com/amith-m-s/Pro-Finance-Tracker" },
    metrics:[
      {v:"10+",    l:"Expense categories"},
      {v:"Local",  l:"Zero backend"},
      {v:"Live",   l:"Chart.js renders"},
      {v:"Alerts", l:"Budget thresholds"},
    ],
    color:"var(--acc2)",
    problem:"Personal finance tools either require backend accounts or are too simple for meaningful tracking. Goal: a fully local, zero-infrastructure solution with real analytics on structured data.",
    arch:"Pure client-side SPA. LocalStorage as the persistence layer with a structured JSON transaction schema. Chart.js renders on every state mutation. Budget thresholds stored separately and compared against computed category aggregates at render time.",
    decisions:[
      "LocalStorage over IndexedDB — sync API sufficient at transaction volumes; simpler mental model",
      "Chart.js over D3 — faster implementation without sacrificing chart quality for this use case",
      "Vanilla JS, no framework — zero dependency footprint, educational clarity, instant load",
    ],
    challenge:"Chart re-renders on large transaction histories became sluggish. Fixed by debouncing render triggers and caching computed category aggregates between mutations.",
    future:"CSV export for accountants, multi-account support, optional Supabase sync for cross-device without breaking offline-first.",
  },
];

function statusTag(status: string, c: string) {
  const cls = c === "g" ? "tag-g" : c === "v" ? "tag-v" : c === "y" ? "tag-y" : "";
  return <span className={`tag ${cls}`}>{status}</span>;
}

function Card({ p, idx, visible }: { p: typeof P[0]; idx: number; visible: boolean }) {
  const [open, setOpen] = useState(false);
  const s = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(36px)",
    transition: `opacity .65s cubic-bezier(0.22,1,0.36,1) ${idx * 0.1}s, transform .65s cubic-bezier(0.22,1,0.36,1) ${idx * 0.1}s`,
  };

  return (
    <div style={{
      borderRadius:16,overflow:"hidden",
      border:"1px solid var(--bdr)",
      background:"var(--sur)",
      ...s,
    }}>
      {/* Accent bar */}
      <div style={{height:2,background:`linear-gradient(90deg,${p.color},transparent)`}}/>

      <div style={{padding:"30px 32px 24px"}}>
        {/* Header row */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,flexWrap:"wrap",gap:10}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--txt3)",letterSpacing:".08em"}}>{p.year}</span>
            {statusTag(p.status, p.statusC)}
          </div>
          <div style={{display:"flex",gap:7}}>
            {p.links.live && (
              <a href={p.links.live} target="_blank" rel="noopener noreferrer"
                style={{fontFamily:"var(--fm)",fontSize:10.5,color:p.color,textDecoration:"none",
                  padding:"4px 10px",border:`1px solid ${p.color}35`,borderRadius:5,
                  transition:"all .18s"}}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background=`${p.color}12`}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="transparent"}}
              >↗ Live</a>
            )}
            <a href={p.links.gh} target="_blank" rel="noopener noreferrer"
              style={{fontFamily:"var(--fm)",fontSize:10.5,color:"var(--txt2)",textDecoration:"none",
                padding:"4px 10px",border:"1px solid var(--bdr)",borderRadius:5,
                transition:"all .18s"}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color="var(--txt)";(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.04)"}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color="var(--txt2)";(e.currentTarget as HTMLElement).style.background="transparent"}}
            >GitHub</a>
          </div>
        </div>

        <h3 style={{fontFamily:"var(--fd)",fontSize:"clamp(18px,2.4vw,26px)",fontWeight:800,
          letterSpacing:"-.025em",color:"var(--txt)",marginBottom:7}}>{p.title}</h3>
        <p style={{fontSize:14,color:"var(--txt2)",lineHeight:1.65,marginBottom:18}}>{p.tagline}</p>

        {/* Stack */}
        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:22}}>
          {p.stack.map(t => <span key={t} className="tag" style={{fontSize:10}}>{t}</span>)}
        </div>

        {/* Metrics */}
        <div style={{display:"grid",gridTemplateColumns:`repeat(${p.metrics.length},1fr)`,gap:1,
          border:"1px solid var(--bdr)",borderRadius:10,overflow:"hidden"}}>
          {p.metrics.map((m,i) => (
            <div key={m.l} style={{
              padding:"13px 14px",
              background: i%2===0 ? "rgba(255,255,255,0.018)" : "rgba(255,255,255,0.028)",
              borderRight: i<p.metrics.length-1 ? "1px solid var(--bdr)" : "none",
            }}>
              <div style={{fontFamily:"var(--fm)",fontSize:13.5,fontWeight:600,color:p.color,marginBottom:3}}>{m.v}</div>
              <div style={{fontFamily:"var(--fm)",fontSize:9.5,color:"var(--txt3)",lineHeight:1.3}}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Expand */}
      <button onClick={() => setOpen(!open)}
        style={{
          width:"100%",padding:"13px 32px",
          background:"none",border:"none",
          borderTop:"1px solid var(--bdr)",
          color:"var(--txt2)",cursor:"pointer",
          fontFamily:"var(--fm)",fontSize:11,letterSpacing:".07em",
          display:"flex",alignItems:"center",justifyContent:"space-between",
          transition:"all .18s",
        }}
        onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.025)";(e.currentTarget as HTMLElement).style.color="var(--txt)"}}
        onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background="none";(e.currentTarget as HTMLElement).style.color="var(--txt2)"}}
      >
        <span>{open ? "Collapse technical deep-dive" : "Expand technical deep-dive"}</span>
        <span style={{transform: open ? "rotate(180deg)" : "rotate(0)",transition:"transform .28s var(--ease)"}}>▼</span>
      </button>

      {open && (
        <div style={{padding:"0 32px 32px"}}>
          <div style={{height:1,background:"var(--bdr)",marginBottom:28}}/>
          {[
            {k:"problem_statement",   t:"Problem Statement",   c:p.problem},
            {k:"architecture",        t:"System Architecture", c:p.arch},
            {k:"challenge_solved",    t:"Challenge Solved",    c:p.challenge},
            {k:"future_roadmap_v2",   t:"Future Roadmap (v2)", c:p.future},
          ].map(sec => (
            <div key={sec.k} style={{marginBottom:24}}>
              <div style={{fontFamily:"var(--fm)",fontSize:10,color:p.color,marginBottom:8,letterSpacing:".08em"}}>
                // {sec.k}
              </div>
              <p style={{fontSize:13.5,color:"var(--txt2)",lineHeight:1.78}}>{sec.c}</p>
            </div>
          ))}

          {/* Decisions */}
          <div>
            <div style={{fontFamily:"var(--fm)",fontSize:10,color:p.color,marginBottom:12,letterSpacing:".08em"}}>
              // engineering_decisions
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {p.decisions.map((d,i) => (
                <div key={i} style={{
                  display:"flex",gap:12,
                  padding:"10px 14px",
                  background:`${p.color}07`,
                  border:`1px solid ${p.color}18`,
                  borderRadius:8,
                }}>
                  <span style={{fontFamily:"var(--fm)",fontSize:10,color:p.color,opacity:.5,flexShrink:0,marginTop:1}}>
                    {String(i+1).padStart(2,"0")}
                  </span>
                  <span style={{fontSize:13,color:"var(--txt2)",lineHeight:1.68}}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const { ref, visible } = useInView();
  return (
    <section id="projects" ref={ref as React.RefObject<HTMLElement>}
      style={{padding:"128px 40px",maxWidth:1100,margin:"0 auto"}}>
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition:"all .6s cubic-bezier(0.22,1,0.36,1)",
        marginBottom:60,
      }}>
        <div className="section-label" style={{marginBottom:14}}>// projects</div>
        <h2 style={{fontFamily:"var(--fd)",fontSize:"clamp(28px,4vw,52px)",fontWeight:800,
          letterSpacing:"-.03em",color:"var(--txt)",marginBottom:12}}>
          Systems I've Built
        </h2>
        <p style={{fontSize:15.5,color:"var(--txt2)",maxWidth:500}}>
          Technical case studies — architecture, decisions, tradeoffs, and production reality.
        </p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:18}}>
        {P.map((p,i) => <Card key={p.id} p={p} idx={i} visible={visible}/>)}
      </div>
    </section>
  );
}
