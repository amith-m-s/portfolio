"use client";
import { useState } from "react";
import { useInView } from "./useInView";

const P = [
  {
    id: "relayforge",
    title: "RelayForge",
    year: "May-Jun 2026",
    status: "Reference implementation",
    statusC: "g",
    tagline: "Multi-tenant webhook delivery with retries, DLQ handling, HMAC signing, and database-backed idempotency.",
    stack: ["FastAPI", "PostgreSQL", "Redis", "Celery", "Alembic", "Docker"],
    links: { gh: "https://github.com/amith-m-s/RelayForge" },
    metrics: [
      { v: "Multi-tenant", l: "Organization model" },
      { v: "Async", l: "Celery delivery" },
      { v: "DLQ", l: "Replay workflows" },
      { v: "HMAC", l: "Payload signing" },
    ],
    color: "var(--acc)",
    problem: "Reliable webhook delivery needs more than an HTTP POST. The system must handle duplicates, retries, endpoint failures, replay, audit history, and tenant isolation.",
    arch: "FastAPI receives authenticated events, PostgreSQL persists the event and delivery records, Celery workers perform outbound delivery, Redis supports rate limiting and supporting infrastructure, and the UI exposes delivery history and replay operations.",
    decisions: [
      "PostgreSQL uniqueness for organization-scoped idempotency instead of relying on a read-then-write cache check.",
      "Celery workers decouple outbound network calls from request handling.",
      "Dead-letter records preserve failure context and support controlled replay.",
      "HMAC-SHA256 signing gives downstream consumers a way to verify payload integrity.",
    ],
    challenge: "The important boundary is the event transaction: event creation and delivery creation need to succeed together before asynchronous delivery starts. The current design makes that transaction explicit.",
    future: "Add measured load tests, stronger idempotency-response caching, queue backpressure metrics, and delivery SLO dashboards before calling the system operationally production-ready.",
  },
  {
    id: "rekshakan",
    title: "Rekshakan",
    year: "Sep 2026",
    status: "Hackathon platform",
    statusC: "v",
    tagline: "Geospatial disaster-response coordination with live wildfire data, responder matching, RBAC, and audit trails.",
    stack: ["Next.js", "TypeScript", "Express.js", "SQLite", "Leaflet", "Supabase", "OSRM"],
    links: { gh: "https://github.com/amith-m-s/Rekshakan" },
    metrics: [
      { v: "Live feeds", l: "California wildfire data" },
      { v: "RBAC", l: "Role-based access" },
      { v: "Matching", l: "Responder ranking" },
      { v: "Audit", l: "Operational history" },
    ],
    color: "var(--accv)",
    problem: "Emergency coordination needs a shared operational picture: where incidents are, which requests are urgent, which responders are suitable, and how assignments change over time.",
    arch: "A Next.js intelligence dashboard consumes California evacuation data, NASA FIRMS hotspots, Open-Meteo wind, geocoding, and OSRM routes. A separate Express rescue service handles authentication, incidents, requests, responders, assignments, audit events, and simulator flows.",
    decisions: [
      "Explicit assignment-state transitions prevent invalid operational state changes.",
      "Responder matching combines capability, verification, distance, transport capacity, and reliability.",
      "Threat and severity calculations are deterministic and explainable rather than opaque.",
      "Provider adapters and simulator paths allow the system to be demonstrated without inventing unavailable live inputs.",
    ],
    challenge: "Connecting external geospatial intelligence to operational workflows while keeping the demo deterministic enough for testing and judging.",
    future: "Add stronger spatial indexing, richer offline support, dedicated message queues, and field-device authentication for a more operational deployment model.",
  },
  {
    id: "dra",
    title: "Deep Resume Analyzer",
    year: "Mar-Apr 2026",
    status: "Live demo",
    statusC: "g",
    tagline: "Resume-to-job-description matching with sentence embeddings, skill extraction, role prediction, and hybrid scoring.",
    stack: ["Python", "SentenceTransformers", "Node.js", "Express.js", "React", "Docker"],
    links: { live: "https://deep-resume-analyzer.vercel.app/", gh: "https://github.com/amith-m-s/Deep-Resume-Analyzer" },
    metrics: [
      { v: "MiniLM", l: "Sentence embeddings" },
      { v: "Hybrid", l: "Semantic + keyword" },
      { v: "PDF", l: "Resume extraction" },
      { v: "Live", l: "Demo available" },
    ],
    color: "var(--acc2)",
    problem: "Keyword-only resume matching can miss semantic similarity, while semantic similarity alone can over-credit broadly related text. The project combines both signals with deterministic skill rules.",
    arch: "React client -> Express gateway -> Python inference worker. The gateway handles PDF extraction, rule-based skill matching and request validation; the Python worker loads SentenceTransformer, computes cosine similarity, ranks matched lines, and predicts likely roles.",
    decisions: [
      "MiniLM embeddings provide a lightweight semantic representation suitable for a student-scale demo.",
      "A weighted hybrid score keeps exact keyword evidence visible instead of hiding everything behind embeddings.",
      "The inference worker is separated from the Node gateway so model code can evolve independently.",
      "The scoring weights are documented as design choices, not presented as statistically validated hiring accuracy.",
    ],
    challenge: "Keeping the scoring pipeline modular while combining semantic similarity with deterministic skill and role rules.",
    future: "Add labeled benchmark datasets, automated regression tests, batch processing, persistence, and calibrated score evaluation before using the system for real screening.",
  },
  {
    id: "cloudgod",
    title: "Cloud God Platform",
    year: "Jun 2026",
    status: "AWS reference",
    statusC: "y",
    tagline: "Terraform-oriented AWS architecture for document ingestion, async processing, and RAG workflows.",
    stack: ["FastAPI", "PostgreSQL", "Redis", "SQS", "S3", "Terraform", "Docker"],
    links: { gh: "https://github.com/amith-m-s/cloud-god-platform" },
    metrics: [
      { v: "IaC", l: "Terraform" },
      { v: "SQS", l: "Async pipeline" },
      { v: "S3", l: "Document storage" },
      { v: "RAG", l: "LLM + context" },
    ],
    color: "var(--accw)",
    problem: "Document intelligence becomes an infrastructure problem when uploads, processing, storage, retrieval, authentication, and observability must remain independent and reproducible.",
    arch: "FastAPI provides the API surface, PostgreSQL stores users/documents/chunks, Redis supports cache and rate-limiting concerns, SQS decouples processing, S3 stores raw documents, and Terraform describes the AWS network and service topology.",
    decisions: [
      "Queue-based document processing keeps heavy work out of the request path.",
      "Terraform makes the proposed AWS infrastructure reproducible and reviewable.",
      "Health/readiness endpoints and structured logging are treated as first-class operational surfaces.",
      "The current retrieval implementation is intentionally lightweight and clearly documented as a reference stage.",
    ],
    challenge: "Designing a production-shaped cloud topology without pretending that a local reference implementation is already a live AWS service.",
    future: "Replace the lightweight local retrieval implementation with a real embedding/vector-search path and validate the Terraform deployment in AWS with measured load and cost data.",
  },
  {
    id: "engineeros",
    title: "EngineerOS",
    year: "Jun 2026",
    status: "Simulation platform",
    statusC: "v",
    tagline: "Engineering-training cockpit for incident response, architecture reasoning, and technical decision practice.",
    stack: ["Next.js", "FastAPI", "SQLAlchemy", "WebSockets", "SQLite", "pytest"],
    links: { gh: "https://github.com/amith-m-s/EngineerOS" },
    metrics: [
      { v: "WebSocket", l: "Live simulations" },
      { v: "Events", l: "Domain event bus" },
      { v: "Tests", l: "Backend + frontend" },
      { v: "CI", l: "Verification workflow" },
    ],
    color: "var(--acc)",
    problem: "Engineers improve faster when incident scenarios, decisions, and feedback are structured instead of being treated as ad-hoc interview questions.",
    arch: "Next.js client -> FastAPI backend -> domain/services/repositories -> SQLite in development. WebSockets stream simulation updates, while domain events and test layers keep the backend modular.",
    decisions: [
      "DDD-style boundaries keep domain concepts independent from HTTP and persistence concerns.",
      "An async event bus isolates side effects from the main request path.",
      "Simulation scoring is rule-based and explainable rather than pretending to be autonomous AI.",
      "CI covers tests, type checking, linting, security checks, and build stages.",
    ],
    challenge: "Building a believable engineering-training environment while keeping the underlying evaluation logic deterministic and inspectable.",
    future: "Introduce configurable scenario packs, persistent simulation analytics, richer evaluation models, and stronger authorization around simulation data.",
  },
  {
    id: "lootbox",
    title: "LootBox Game",
    year: "Feb-Mar 2026",
    status: "Sui testnet",
    statusC: "y",
    tagline: "On-chain NFT loot-box mechanics with native randomness, capability-based admin control, and pity tracking.",
    stack: ["Sui Move", "Smart Contracts", "On-chain Randomness", "NFTs", "Sui CLI"],
    links: { gh: "https://github.com/amith-m-s/lootbox-game" },
    metrics: [
      { v: "4-tier", l: "Rarity distribution" },
      { v: "30 opens", l: "Pity threshold" },
      { v: "On-chain", l: "State + events" },
      { v: "Tests", l: "Edge cases" },
    ],
    color: "var(--accv)",
    problem: "Loot-box mechanics need deterministic ownership rules, auditable rewards, controlled randomness, and explicit authorization for treasury operations.",
    arch: "A Sui Move module manages shared game state, AdminCap authorization, Coin<SUI> payment validation, native randomness, NFT creation/transfer/burn, events, and per-address pity tracking.",
    decisions: [
      "Sui Move's object model maps directly to NFT ownership and capability-based authorization.",
      "Randomness is consumed inside the entry function to avoid exposing an externally composable RNG path.",
      "Events make opens and NFT lifecycle changes observable from chain history.",
      "The pity counter is stored on-chain to avoid divergence between off-chain state and contract state.",
    ],
    challenge: "Working within Move's ownership and randomness constraints while preserving fair state transitions.",
    future: "Complete the wallet/UI layer and expand to multiple item pools and upgradeable production deployment patterns.",
  },
];

function statusTag(status: string, c: string) {
  const cls = c === "g" ? "tag-g" : c === "v" ? "tag-v" : c === "y" ? "tag-y" : "";
  return <span className={"tag " + cls}>{status}</span>;
}

function Card({ p, idx, visible }: { p: typeof P[number]; idx: number; visible: boolean }) {
  const [open, setOpen] = useState(false);
  const s = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(36px)",
    transition: "opacity .65s cubic-bezier(0.22,1,0.36,1) " + (idx * 0.08) + "s, transform .65s cubic-bezier(0.22,1,0.36,1) " + (idx * 0.08) + "s",
  };

  return (
    <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--bdr)", background: "var(--sur)", ...s }}>
      <div style={{ height: 2, background: "linear-gradient(90deg," + p.color + ",transparent)" }} />
      <div style={{ padding: "30px 32px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "var(--fm)", fontSize: 10, color: "var(--txt3)", letterSpacing: ".08em" }}>{p.year}</span>
            {statusTag(p.status, p.statusC)}
          </div>
          <div style={{ display: "flex", gap: 7 }}>
            {"live" in p.links && (
              <a href={p.links.live} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--fm)", fontSize: 10.5, color: p.color, textDecoration: "none", padding: "4px 10px", border: "1px solid " + p.color + "35", borderRadius: 5 }}>↗ Live</a>
            )}
            <a href={p.links.gh} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--fm)", fontSize: 10.5, color: "var(--txt2)", textDecoration: "none", padding: "4px 10px", border: "1px solid var(--bdr)", borderRadius: 5 }}>GitHub</a>
          </div>
        </div>

        <h3 style={{ fontFamily: "var(--fd)", fontSize: "clamp(18px,2.4vw,26px)", fontWeight: 800, letterSpacing: "-.025em", color: "var(--txt)", marginBottom: 7 }}>{p.title}</h3>
        <p style={{ fontSize: 14, color: "var(--txt2)", lineHeight: 1.65, marginBottom: 18 }}>{p.tagline}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 22 }}>
          {p.stack.map((t) => <span key={t} className="tag" style={{ fontSize: 10 }}>{t}</span>)}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(" + p.metrics.length + ",1fr)", gap: 1, border: "1px solid var(--bdr)", borderRadius: 10, overflow: "hidden" }}>
          {p.metrics.map((m, i) => (
            <div key={m.l} style={{ padding: "13px 14px", background: i % 2 === 0 ? "rgba(255,255,255,0.018)" : "rgba(255,255,255,0.028)", borderRight: i < p.metrics.length - 1 ? "1px solid var(--bdr)" : "none" }}>
              <div style={{ fontFamily: "var(--fm)", fontSize: 13.5, fontWeight: 600, color: p.color, marginBottom: 3 }}>{m.v}</div>
              <div style={{ fontFamily: "var(--fm)", fontSize: 9.5, color: "var(--txt3)", lineHeight: 1.3 }}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "13px 32px", background: "none", border: "none", borderTop: "1px solid var(--bdr)", color: "var(--txt2)", cursor: "pointer", fontFamily: "var(--fm)", fontSize: 11, letterSpacing: ".07em", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span>{open ? "Collapse technical deep-dive" : "Expand technical deep-dive"}</span>
        <span style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform .28s var(--ease)" }}>▼</span>
      </button>

      {open && (
        <div style={{ padding: "0 32px 32px" }}>
          <div style={{ height: 1, background: "var(--bdr)", marginBottom: 28 }} />
          {[
            { k: "problem_statement", t: "Problem Statement", c: p.problem },
            { k: "architecture", t: "System Architecture", c: p.arch },
            { k: "challenge_solved", t: "Challenge Solved", c: p.challenge },
            { k: "future_roadmap", t: "Future Roadmap", c: p.future },
          ].map((sec) => (
            <div key={sec.k} style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "var(--fm)", fontSize: 10, color: p.color, marginBottom: 8, letterSpacing: ".08em" }}>{"// " + sec.k}</div>
              <p style={{ fontSize: 13.5, color: "var(--txt2)", lineHeight: 1.78 }}>{sec.c}</p>
            </div>
          ))}
          <div>
            <div style={{ fontFamily: "var(--fm)", fontSize: 10, color: p.color, marginBottom: 12, letterSpacing: ".08em" }}>{"// engineering_decisions"}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {p.decisions.map((d, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "10px 14px", background: p.color + "07", border: "1px solid " + p.color + "18", borderRadius: 8 }}>
                  <span style={{ fontFamily: "var(--fm)", fontSize: 10, color: p.color, opacity: .5, flexShrink: 0, marginTop: 1 }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ fontSize: 13, color: "var(--txt2)", lineHeight: 1.68 }}>{d}</span>
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
    <section id="projects" ref={ref as React.RefObject<HTMLElement>} style={{ padding: "128px 40px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "all .6s cubic-bezier(0.22,1,0.36,1)", marginBottom: 60 }}>
        <div className="section-label" style={{ marginBottom: 14 }}>{"// projects"}</div>
        <h2 style={{ fontFamily: "var(--fd)", fontSize: "clamp(28px,4vw,52px)", fontWeight: 800, letterSpacing: "-.03em", color: "var(--txt)", marginBottom: 12 }}>Systems I can explain end-to-end.</h2>
        <p style={{ fontSize: 15.5, color: "var(--txt2)", maxWidth: 560 }}>
          Each project is labeled by what it actually is: a live demo, a reference implementation, a hackathon platform, or a simulation. The deep-dive sections focus on architecture, tradeoffs, and known limits.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {P.map((p, i) => <Card key={p.id} p={p} idx={i} visible={visible} />)}
      </div>
    </section>
  );
}
