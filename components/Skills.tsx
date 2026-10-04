"use client";
import { useState } from "react";
import { useInView } from "./useInView";

const CLUSTERS = [
  { cat:"Backend Systems", color:"#5b9cf6", skills:["FastAPI","Node.js","Express.js","REST APIs","JWT Auth","Async Processing","Rate Limiting","Celery"] },
  { cat:"AI / NLP", color:"#a371f7", skills:["Sentence Embeddings","Cosine Similarity","NLP Pipelines","Skill Extraction","Role Prediction","RAG","LLM Integration"] },
  { cat:"Infrastructure", color:"#39d353", skills:["Docker","Docker Compose","Linux","GitHub Actions","Terraform","AWS Architecture","Vercel"] },
  { cat:"Languages", color:"#e3a743", skills:["Python","JavaScript (ES6+)","TypeScript","C#","C","C++","SQL","Sui Move"] },
  { cat:"Databases", color:"#f0883e", skills:["PostgreSQL","MySQL","SQLite","Schema Design","Indexing","Query Optimization","Migrations"] },
  { cat:"Blockchain", color:"#5b9cf6", skills:["Sui Move","Smart Contracts","On-chain Randomness","NFT Lifecycle","Capability Objects","Events"] },
  { cat:"Frontend", color:"#79c0ff", skills:["React.js","Next.js","Tailwind CSS","Chart.js","HTML5","CSS3","Responsive Design"] },
  { cat:"CS Fundamentals", color:"#7d8694", skills:["Data Structures","Algorithms","OOP","DBMS","Operating Systems","Computer Networks","System Design"] },
];

export default function Skills() {
  const { ref, visible } = useInView();
  const [hov, setHov] = useState<string|null>(null);

  return (
    <section id="skills" ref={ref as React.RefObject<HTMLElement>}
      style={{padding:"128px 40px",maxWidth:1100,margin:"0 auto"}}>
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition:"all .6s cubic-bezier(0.22,1,0.36,1)",
        marginBottom:60,
      }}>
        <div className="section-label" style={{marginBottom:14}}>// skills</div>
        <h2 style={{fontFamily:"var(--fd)",fontSize:"clamp(28px,4vw,52px)",fontWeight:800,
          letterSpacing:"-.03em",color:"var(--txt)",marginBottom:12}}>
          Technical Ecosystem
        </h2>
        <p style={{fontSize:15.5,color:"var(--txt2)",maxWidth:480}}>
          Organised by capability cluster. Focused on tools and concepts represented in the public projects and resume.
        </p>
      </div>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",
        gap:14,
      }}>
        {CLUSTERS.map((c,i) => (
          <div key={c.cat}
            onMouseEnter={() => setHov(c.cat)}
            onMouseLeave={() => setHov(null)}
            style={{
              padding:"22px 22px 18px",
              background: hov===c.cat ? "rgba(255,255,255,0.048)" : "var(--sur)",
              border:`1px solid ${hov===c.cat ? c.color+"45" : "var(--bdr)"}`,
              borderRadius:13,cursor:"default",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition:`all .5s cubic-bezier(0.22,1,0.36,1) ${i*0.055}s`,
            }}
          >
            <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:14}}>
              <div style={{
                width:7,height:7,borderRadius:"50%",
                background: c.color,
                boxShadow: hov===c.cat ? `0 0 14px ${c.color}80` : "none",
                transition:"box-shadow .28s",
                flexShrink:0,
              }}/>
              <span style={{
                fontFamily:"var(--fm)",fontSize:10.5,
                color: hov===c.cat ? c.color : "var(--txt2)",
                letterSpacing:".07em",textTransform:"uppercase",
                transition:"color .28s",
              }}>{c.cat}</span>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
              {c.skills.map(s => (
                <span key={s} style={{
                  padding:"2px 9px",borderRadius:4,
                  fontFamily:"var(--fm)",fontSize:10.5,
                  color: hov===c.cat ? c.color : "var(--txt3)",
                  background: hov===c.cat ? `${c.color}10` : "rgba(255,255,255,0.025)",
                  border:`1px solid ${hov===c.cat ? c.color+"28" : "var(--bdr)"}`,
                  transition:"all .22s",
                }}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
