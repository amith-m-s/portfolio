"use client";
import { useState } from "react";
import { useInView } from "./useInView";

type Layer = {
  id: string;
  label: string;
  color: string;
  nodes: string[];
  desc: string;
};

const LAYERS: Layer[] = [
  { id:"client", label:"Client Layer", color:"#5b9cf6", nodes:["React Frontend","PDF Upload","Results UI"], desc:"The client provides resume and job-description input, displays the match result, and links to the live demo." },
  { id:"gateway", label:"API Gateway", color:"#a371f7", nodes:["Express.js","PDF Parsing","Rate Limiting"], desc:"The Node gateway extracts PDF text, applies rule-based skill matching and handles the HTTP boundary." },
  { id:"worker", label:"NLP Worker", color:"#39d353", nodes:["Python Worker","MiniLM","Cosine Similarity"], desc:"The Python process loads SentenceTransformer, computes semantic similarity, ranks matched lines, and predicts roles." },
  { id:"scoring", label:"Scoring Layer", color:"#e3a743", nodes:["Semantic Score","Keyword Score","Domain Rules"], desc:"Semantic similarity is combined with exact skill evidence and deterministic role/skill rules to produce the final match output." },
  { id:"infra", label:"Infrastructure", color:"#f0883e", nodes:["Docker","Node + Python","Vercel Demo"], desc:"The repository currently packages the Node gateway and Python inference worker in the backend image; the React client remains a separate application." },
];

export default function ArchDiagram() {
  const { ref, visible } = useInView();
  const [active, setActive] = useState<string|null>(null);
  const activeLayer = LAYERS.find(l => l.id === active);

  return (
    <section ref={ref as React.RefObject<HTMLElement>}
      style={{padding:"80px 40px 128px",maxWidth:1100,margin:"0 auto"}}>
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition:"all .6s cubic-bezier(0.22,1,0.36,1)",
        marginBottom:48,
      }}>
        <div className="section-label" style={{marginBottom:14}}>// architecture</div>
        <h2 style={{fontFamily:"var(--fd)",fontSize:"clamp(24px,3.5vw,44px)",fontWeight:800,
          letterSpacing:"-.03em",color:"var(--txt)",marginBottom:10}}>
          Deep Resume Analyzer — Current System Architecture
        </h2>
        <p style={{fontSize:14.5,color:"var(--txt2)",maxWidth:480}}>
          Click any layer to inspect its responsibilities. The diagram mirrors the current repository implementation rather than a future microservice plan.
        </p>
      </div>

      <div style={{
        display:"grid",gridTemplateColumns:"1fr 320px",gap:24,
        opacity: visible ? 1 : 0,
        transition:"opacity .8s cubic-bezier(0.22,1,0.36,1) .15s",
      }}>
        {/* Architecture stack */}
        <div style={{
          border:"1px solid var(--bdr)",borderRadius:16,overflow:"hidden",
          background:"var(--sur)",
        }}>
          {/* Arrow flow overlay hint */}
          <div style={{
            padding:"12px 20px",
            background:"rgba(255,255,255,0.02)",
            borderBottom:"1px solid var(--bdr)",
            fontFamily:"var(--fm)",fontSize:10,color:"var(--txt3)",letterSpacing:".08em",
            display:"flex",alignItems:"center",gap:8,
          }}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"var(--acc2)",display:"inline-block"}}/>
            Click a layer to inspect · Request flows top → bottom
          </div>

          {LAYERS.map((layer, i) => (
            <div key={layer.id}>
              {/* Layer row */}
              <button
                onClick={() => setActive(active === layer.id ? null : layer.id)}
                style={{
                  width:"100%",padding:"0",border:"none",cursor:"pointer",background:"none",textAlign:"left",
                }}
              >
                <div style={{
                  padding:"20px 24px",
                  background: active===layer.id ? `${layer.color}0d` : "transparent",
                  borderLeft: active===layer.id ? `3px solid ${layer.color}` : "3px solid transparent",
                  display:"flex",alignItems:"center",gap:18,
                  transition:"all .22s",
                }}>
                  {/* Layer label */}
                  <div style={{width:140,flexShrink:0}}>
                    <div style={{
                      fontFamily:"var(--fm)",fontSize:10,
                      color: active===layer.id ? layer.color : "var(--txt3)",
                      letterSpacing:".07em",textTransform:"uppercase",marginBottom:4,
                      transition:"color .22s",
                    }}>{String(i+1).padStart(2,"0")}</div>
                    <div style={{
                      fontFamily:"var(--fd)",fontSize:13,fontWeight:600,
                      color: active===layer.id ? "var(--txt)" : "var(--txt2)",
                      transition:"color .22s",
                    }}>{layer.label}</div>
                  </div>

                  {/* Nodes */}
                  <div style={{display:"flex",flexWrap:"wrap",gap:6,flex:1}}>
                    {layer.nodes.map(n => (
                      <span key={n} style={{
                        padding:"3px 10px",borderRadius:5,
                        fontFamily:"var(--fm)",fontSize:10.5,
                        color: active===layer.id ? layer.color : "var(--txt3)",
                        background: active===layer.id ? `${layer.color}12` : "rgba(255,255,255,0.03)",
                        border:`1px solid ${active===layer.id ? layer.color+"30" : "var(--bdr)"}`,
                        transition:"all .22s",
                      }}>{n}</span>
                    ))}
                  </div>

                  {/* Toggle icon */}
                  <div style={{
                    width:18,height:18,borderRadius:"50%",
                    border:`1px solid ${active===layer.id ? layer.color : "var(--bdr)"}`,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    flexShrink:0,
                    fontSize:8,color: active===layer.id ? layer.color : "var(--txt3)",
                    transition:"all .22s",
                    transform: active===layer.id ? "rotate(180deg)" : "rotate(0)",
                  }}>▼</div>
                </div>
              </button>

              {/* Connector arrow */}
              {i < LAYERS.length-1 && (
                <div style={{
                  padding:"0 24px",display:"flex",alignItems:"center",
                  height:28,borderTop:"none",
                }}>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:1,marginLeft:13}}>
                    <div style={{width:1,height:10,background:"var(--bdr2)"}}/>
                    <div style={{
                      width:0,height:0,
                      borderLeft:"4px solid transparent",
                      borderRight:"4px solid transparent",
                      borderTop:`6px solid var(--bdr2)`,
                    }}/>
                  </div>
                  <span style={{fontFamily:"var(--fm)",fontSize:9,color:"var(--txt3)",marginLeft:10,letterSpacing:".05em"}}>
                    {i===0?"HTTP":i===1?"local process":i===2?"score composition":"build / deploy"}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Detail panel */}
        <div style={{
          border:"1px solid var(--bdr)",borderRadius:16,
          background:"var(--sur)",overflow:"hidden",
          position:"sticky",top:80,alignSelf:"start",
          minHeight:280,
        }}>
          {activeLayer ? (
            <div style={{padding:"24px"}}>
              <div style={{
                display:"flex",alignItems:"center",gap:8,marginBottom:20,
                paddingBottom:16,borderBottom:"1px solid var(--bdr)",
              }}>
                <div style={{width:8,height:8,borderRadius:"50%",background:activeLayer.color}}/>
                <span style={{fontFamily:"var(--fm)",fontSize:10.5,color:activeLayer.color,letterSpacing:".06em"}}>
                  {activeLayer.label.toUpperCase()}
                </span>
              </div>
              <p style={{fontSize:13.5,color:"var(--txt2)",lineHeight:1.78,marginBottom:20}}>
                {activeLayer.desc}
              </p>
              <div style={{fontFamily:"var(--fm)",fontSize:10,color:"var(--txt3)",marginBottom:10,letterSpacing:".08em"}}>
                // services
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {activeLayer.nodes.map(n => (
                  <div key={n} style={{
                    padding:"8px 12px",
                    background:`${activeLayer.color}08`,
                    border:`1px solid ${activeLayer.color}20`,
                    borderRadius:7,
                    fontFamily:"var(--fm)",fontSize:11,
                    color:activeLayer.color,
                  }}>{n}</div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{
              height:"100%",display:"flex",flexDirection:"column",
              alignItems:"center",justifyContent:"center",gap:10,
              padding:24,minHeight:280,
            }}>
              <div style={{
                width:36,height:36,borderRadius:"50%",
                border:"1px solid var(--bdr)",
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:18,color:"var(--txt3)",
              }}>↑</div>
              <span style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--txt3)",letterSpacing:".06em",textAlign:"center"}}>
                Select a layer to<br/>inspect its components
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
