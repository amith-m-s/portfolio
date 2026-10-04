"use client";
import { useState, useEffect, useRef } from "react";

const COMMANDS = [
  { label:"View Projects",       action:()=>document.getElementById("projects")?.scrollIntoView({behavior:"smooth"}), key:"P" },
  { label:"About Me",            action:()=>document.getElementById("about")?.scrollIntoView({behavior:"smooth"}),    key:"A" },
  { label:"Skills",              action:()=>document.getElementById("skills")?.scrollIntoView({behavior:"smooth"}),   key:"S" },
  { label:"Philosophy",          action:()=>document.getElementById("philosophy")?.scrollIntoView({behavior:"smooth"}),key:"H" },
  { label:"GitHub Profile",      action:()=>window.open("https://github.com/amith-m-s","_blank"),                      key:"G" },
  { label:"Deep Resume Analyzer",action:()=>window.open("https://deep-resume-analyzer.vercel.app/","_blank"),         key:"D" },
  { label:"Send Email",          action:()=>window.location.href="mailto:amith6567@gmail.com",                        key:"E" },
  { label:"Scroll to Top",       action:()=>window.scrollTo({top:0,behavior:"smooth"}),                               key:"T" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = COMMANDS.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setOpen(o => !o); setQuery(""); setIdx(0); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50); }, [open]);

  const run = (cmd: typeof COMMANDS[0]) => { cmd.action(); setOpen(false); setQuery(""); };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIdx(i => Math.min(i+1, filtered.length-1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setIdx(i => Math.max(i-1, 0)); }
    if (e.key === "Enter" && filtered[idx]) run(filtered[idx]);
  };

  if (!open) return (
    <button
      onClick={() => setOpen(true)}
      style={{
        position:"fixed",bottom:24,right:24,zIndex:200,
        display:"flex",alignItems:"center",gap:8,
        padding:"9px 16px",
        background:"rgba(7,9,11,0.88)",
        border:"1px solid var(--bdr2)",
        borderRadius:9,
        fontFamily:"var(--fm)",fontSize:11,color:"var(--txt2)",
        cursor:"pointer",
        backdropFilter:"blur(20px)",
        transition:"all .18s",
        letterSpacing:".04em",
      }}
      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.22)";(e.currentTarget as HTMLElement).style.color="var(--txt)"}}
      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="var(--bdr2)";(e.currentTarget as HTMLElement).style.color="var(--txt2)"}}
    >
      <span style={{fontSize:10,opacity:.6}}>⌘</span>K — Command Palette
    </button>
  );

  return (
    <>
      {/* Backdrop */}
      <div onClick={()=>setOpen(false)} style={{
        position:"fixed",inset:0,zIndex:300,
        background:"rgba(7,9,11,0.7)",
        backdropFilter:"blur(8px)",
      }}/>

      {/* Palette */}
      <div style={{
        position:"fixed",top:"28%",left:"50%",zIndex:400,
        transform:"translateX(-50%)",
        width:"min(560px,90vw)",
        background:"#0d1117",
        border:"1px solid var(--bdr2)",
        borderRadius:14,
        overflow:"hidden",
        boxShadow:"0 24px 80px rgba(0,0,0,0.6)",
        animation:"fadeUp .18s ease",
      }}>
        {/* Search */}
        <div style={{
          display:"flex",alignItems:"center",gap:10,
          padding:"14px 18px",
          borderBottom:"1px solid var(--bdr)",
        }}>
          <span style={{fontFamily:"var(--fm)",fontSize:13,color:"var(--txt3)"}}>⌘</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setIdx(0); }}
            onKeyDown={onKeyDown}
            placeholder="Type a command or search..."
            style={{
              flex:1,background:"none",border:"none",outline:"none",
              fontFamily:"var(--fm)",fontSize:13,color:"var(--txt)",
              letterSpacing:".02em",
            }}
          />
          <kbd style={{
            fontFamily:"var(--fm)",fontSize:10,color:"var(--txt3)",
            padding:"2px 5px",border:"1px solid var(--bdr)",borderRadius:4,
          }}>ESC</kbd>
        </div>

        {/* Results */}
        <div style={{maxHeight:320,overflowY:"auto",padding:"6px 0"}}>
          {filtered.length === 0 ? (
            <div style={{padding:"20px",fontFamily:"var(--fm)",fontSize:12,color:"var(--txt3)",textAlign:"center"}}>
              No commands found
            </div>
          ) : filtered.map((cmd,i) => (
            <button key={cmd.label}
              onClick={() => run(cmd)}
              onMouseEnter={() => setIdx(i)}
              style={{
                width:"100%",padding:"10px 18px",
                display:"flex",alignItems:"center",justifyContent:"space-between",
                background: i===idx ? "rgba(91,156,246,0.1)" : "transparent",
                border:"none",cursor:"pointer",textAlign:"left",
                transition:"background .12s",
              }}
            >
              <span style={{fontFamily:"var(--fm)",fontSize:12.5,color: i===idx ? "var(--txt)" : "var(--txt2)"}}>
                {cmd.label}
              </span>
              <kbd style={{
                fontFamily:"var(--fm)",fontSize:9.5,
                color: i===idx ? "var(--acc)" : "var(--txt3)",
                padding:"2px 6px",border:`1px solid ${i===idx ? "rgba(91,156,246,0.3)" : "var(--bdr)"}`,
                borderRadius:4,
                transition:"all .12s",
              }}>{cmd.key}</kbd>
            </button>
          ))}
        </div>

        <div style={{
          padding:"9px 18px",borderTop:"1px solid var(--bdr)",
          display:"flex",alignItems:"center",gap:16,
          fontFamily:"var(--fm)",fontSize:9.5,color:"var(--txt3)",
        }}>
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>ESC close</span>
        </div>
      </div>
    </>
  );
}
