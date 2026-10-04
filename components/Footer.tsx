"use client";

export default function Footer() {
  return (
    <footer id="contact" style={{
      borderTop:"1px solid var(--bdr)",
      padding:"80px 40px 48px",
      maxWidth:1100,margin:"0 auto",
    }}>
      {/* Ambient glow */}
      <div style={{
        position:"relative",
        marginBottom:64,
        padding:"56px 48px",
        borderRadius:20,
        background:"var(--sur)",
        border:"1px solid var(--bdr)",
        overflow:"hidden",
      }}>
        {/* Glow blob */}
        <div style={{
          position:"absolute",top:-60,right:80,
          width:300,height:300,borderRadius:"50%",
          background:"radial-gradient(circle,rgba(91,156,246,0.07) 0%,transparent 70%)",
          pointerEvents:"none",
        }}/>

        <div className="footer-grid" style={{position:"relative",display:"grid",gridTemplateColumns:"1fr 1fr",gap:56}}>
          {/* Left */}
          <div>
            <div className="section-label" style={{marginBottom:16}}>// contact</div>
            <h2 style={{
              fontFamily:"var(--fd)",fontSize:"clamp(22px,3vw,38px)",fontWeight:800,
              letterSpacing:"-.03em",color:"var(--txt)",marginBottom:14,lineHeight:1.08,
            }}>
              Let's build something<br/>
              <span className="fs" style={{fontStyle:"italic",fontWeight:300,color:"var(--txt2)"}}>serious.</span>
            </h2>
            <p style={{fontSize:14.5,color:"var(--txt2)",lineHeight:1.72,maxWidth:360,marginBottom:28}}>
              Open to backend engineering roles, AI infrastructure projects, and technical collaborations. Final-year student · Kerala, India.
            </p>
            <a href="mailto:amith6567@gmail.com" className="btn-primary" style={{display:"inline-flex"}}>
              amith6567@gmail.com →
            </a>
          </div>

          {/* Right */}
          <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-end",gap:8}}>
            {[
              {l:"GitHub",                 href:"https://github.com/amith-m-s",                    n:"amith-m-s"},
              {l:"LinkedIn",               href:"https://linkedin.com/in/amith-m-s",               n:"amith-m-s"},
              {l:"Deep Resume Analyzer",   href:"https://deep-resume-analyzer.vercel.app/",        n:"Live →"},
              {l:"Email",                  href:"mailto:amith6567@gmail.com",                      n:"amith6567@gmail.com"},
            ].map(link => (
              <a key={link.l} href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{
                  display:"flex",justifyContent:"space-between",alignItems:"center",
                  padding:"12px 16px",
                  background:"rgba(255,255,255,0.025)",
                  border:"1px solid var(--bdr)",
                  borderRadius:9,textDecoration:"none",
                  transition:"all .18s",
                }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor="var(--bdr2)";(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.04)"}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="var(--bdr)";(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.025)"}}
              >
                <span style={{fontFamily:"var(--fd)",fontSize:13.5,fontWeight:500,color:"var(--txt)"}}>{link.l}</span>
                <span style={{fontFamily:"var(--fm)",fontSize:11,color:"var(--txt3)"}}>{link.n}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{
        display:"flex",justifyContent:"space-between",alignItems:"center",
        paddingTop:0,
        flexWrap:"wrap",gap:10,
      }}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{
            width:22,height:22,borderRadius:5,
            background:"linear-gradient(135deg,var(--acc) 0%,var(--accv) 100%)",
            display:"flex",alignItems:"center",justifyContent:"center",
            fontFamily:"var(--fm)",fontSize:10,fontWeight:700,color:"#fff",
          }}>A</div>
          <span style={{fontFamily:"var(--fm)",fontSize:10.5,color:"var(--txt3)"}}>
            © {new Date().getFullYear()} Amith M S
          </span>
        </div>
        <span style={{fontFamily:"var(--fm)",fontSize:10.5,color:"var(--txt3)",letterSpacing:".04em"}}>
          Built with Next.js · Deployed on Vercel
        </span>
      </div>
    </footer>
  );
}
