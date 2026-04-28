import { useState, useEffect } from "react";

const C = {
  rose: "#F2A0B0", roseDark: "#D96B84", roseLight: "#FDEEF2",
  lilac: "#C9A8D6", lilacDark: "#8B5BA5", peach: "#F7C5A0",
  cream: "#FDF8F4", sand: "#F0E8DC", terracotta: "#C4704A",
  text: "#3A2535", textLight: "#7A6070", white: "#FFFFFF",
  green: "#7AB98F", greenLight: "#E8F5EC", red: "#E05C5C",
};

const DAYS_PT   = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
const MONTHS_PT = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

const getDaysInMonth  = (y, m) => new Date(y, m + 1, 0).getDate();
const getFirstDay     = (y, m) => new Date(y, m, 1).getDay();
const addDays         = (date, n) => { const d = new Date(date); d.setDate(d.getDate() + n); return d; };
const sameDay         = (a, b) => a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
const fmtDate         = d => `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`;

const MOTIVATIONAL = [
  "O teu corpo é sabedoria. Cuida dele com amor. 🌸",
  "Conheceres o teu ciclo é o primeiro passo para o teu bem-estar. 💜",
  "Cada dia é uma nova oportunidade de cuidares de ti. 🌺",
  "Estás a fazer bem! Continua a acompanhar a tua saúde. ✨",
  "A tua saúde importa. Nunca te esqueças disso. 🌷",
];

const EDU = [
  { icon:"🩸", tag:"Básico",      title:"O que é o ciclo menstrual?",    body:"O ciclo menstrual é o período entre o primeiro dia de uma menstruação e o primeiro dia da próxima. Em média dura 28 dias, mas pode variar entre 21 e 35 dias — e isso é totalmente normal! O ciclo é controlado por hormonas e pode ser influenciado por stress, alimentação e outros factores." },
  { icon:"🥚", tag:"Fertilidade", title:"Dias férteis explicados",        body:"Os dias férteis são aqueles em que podes engravidar se tiveres relações sem protecção. A ovulação acontece geralmente 14 dias antes da próxima menstruação. Nesse período és mais fértil. O esperma pode sobreviver até 5 dias, por isso os dias antes da ovulação também contam." },
  { icon:"🛡️", tag:"Prevenção",   title:"Métodos contraceptivos",         body:"Existem vários métodos para prevenir uma gravidez indesejada: preservativo (protege também de ISTs), pílula anticoncepcional, injecção trimestral, implante e DIU. Cada método tem vantagens e desvantagens. Fala sempre com um médico ou enfermeiro para escolheres o melhor para ti." },
  { icon:"💧", tag:"Bem-estar",   title:"Cuidados durante a menstruação", body:"Bebe bastante água, descansa quando precisares, come alimentos ricos em ferro (feijão, espinafres, carne vermelha). Usa pensos ou absorventes internos de forma adequada e troca-os a cada 4-6 horas. Exercício leve como caminhar pode ajudar a reduzir as cólicas." },
  { icon:"⚠️", tag:"Saúde",      title:"Quando consultar um médico?",    body:"Procura um profissional de saúde se: a menstruação durar mais de 7 dias, sentires dores muito intensas que não melhoram com analgésicos, tiveres ciclos muito irregulares por vários meses, ou se a menstruação atrasar mais de 10 dias sem causa aparente." },
];

const btnBase = { background:C.roseDark, color:"#fff", border:"none", borderRadius:16, padding:"14px 24px", fontSize:15, fontWeight:600, cursor:"pointer", width:"100%", fontFamily:"inherit" };
const inputBase = { width:"100%", border:`1px solid ${C.sand}`, borderRadius:12, padding:"12px 16px", fontSize:15, color:C.text, background:C.cream, outline:"none", fontFamily:"inherit" };
const gradHeader = { background:`linear-gradient(135deg,${C.roseDark} 0%,${C.lilacDark} 100%)`, borderRadius:"0 0 32px 32px" };

function MobileFrame({ children }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"linear-gradient(135deg,#E8D5DB 0%,#D5D0E8 100%)", padding:20, fontFamily:"'Helvetica Neue',Arial,sans-serif" }}>
      <div style={{ width:390, height:780, borderRadius:48, overflow:"hidden", position:"relative", boxShadow:"0 30px 80px rgba(0,0,0,0.25),0 0 0 10px #1a1a2e,inset 0 0 0 2px rgba(255,255,255,0.1)", background:C.cream }}>
        <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:120, height:28, background:"#1a1a2e", borderRadius:"0 0 18px 18px", zIndex:100 }}/>
        <div style={{ height:"100%", overflow:"hidden" }}>{children}</div>
      </div>
    </div>
  );
}

function StatBox({ label, value, icon }) {
  return (
    <div style={{ background:C.cream, borderRadius:14, padding:"12px 14px" }}>
      <div style={{ fontSize:16 }}>{icon}</div>
      <div style={{ fontSize:16, fontWeight:700, color:C.text, fontFamily:"Georgia,serif", marginTop:4 }}>{value}</div>
      <div style={{ fontSize:11, color:C.textLight, marginTop:2 }}>{label}</div>
    </div>
  );
}

function QuickCard({ icon, label, color, onClick }) {
  return (
    <button onClick={onClick} style={{ background:color, border:"none", borderRadius:16, padding:"16px 14px", cursor:"pointer", textAlign:"left" }}>
      <div style={{ fontSize:28, marginBottom:8 }}>{icon}</div>
      <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{label}</div>
    </button>
  );
}

function StepBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{ width:44, height:44, borderRadius:"50%", background:C.roseLight, border:`2px solid ${C.rose}`, fontSize:24, fontWeight:700, color:C.roseDark, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>{children}</button>
  );
}

function FieldLabel({ children }) {
  return <div style={{ fontSize:12, fontWeight:600, color:C.textLight, letterSpacing:0.5, marginBottom:6, marginTop:14 }}>{children}</div>;
}

function SplashScreen() {
  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:`linear-gradient(160deg,${C.roseLight} 0%,${C.lilac}33 50%,${C.peach}44 100%)` }}>
      <div style={{ fontSize:72, marginBottom:16 }}>🌸</div>
      <div style={{ fontFamily:"Georgia,serif", fontSize:38, fontWeight:700, color:C.roseDark, letterSpacing:-1 }}>Flora</div>
      <div style={{ fontSize:14, color:C.textLight, marginTop:6, letterSpacing:2 }}>O TEU CICLO. A TUA SAÚDE.</div>
      <div style={{ marginTop:40, display:"flex", gap:8 }}>
        {[0,1,2].map(i => <div key={i} style={{ width:8, height:8, borderRadius:"50%", background:i===0?C.roseDark:C.rose }}/>)}
      </div>
    </div>
  );
}

function OnboardingScreen({ step, profile, setProfile, lastPeriodStart, setLastPeriodStart, onNext, onSkipPin, onGoPin }) {
  const steps = [
    { emoji:"👋", title:"Bem-vinda ao Flora!", sub:"O teu companheiro de saúde feminina, pensado para a mulher angolana.", content:null, action:"Começar" },
    { emoji:"🌸", title:"Como te chamas?", sub:"Queremos personalizar a tua experiência.", action:"Continuar", content:<input placeholder="O teu nome" value={profile.name} onChange={e=>setProfile(p=>({...p,name:e.target.value}))} style={inputBase}/> },
    { emoji:"📅", title:"Quando foi a última menstruação?", sub:"Isto ajuda-nos a calcular o teu próximo ciclo.", action:"Continuar", content:<input type="date" value={lastPeriodStart||""} max={new Date().toISOString().split("T")[0]} onChange={e=>setLastPeriodStart(e.target.value)} style={inputBase}/> },
    { emoji:"⏱️", title:"Quanto dura o teu ciclo?", sub:"A maioria dos ciclos dura entre 21 e 35 dias.", action:"Continuar",
      content:(
        <div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:20, marginTop:8 }}>
            <StepBtn onClick={()=>setProfile(p=>({...p,cycleLength:Math.max(21,p.cycleLength-1)}))}>−</StepBtn>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:44, fontWeight:700, color:C.roseDark, fontFamily:"Georgia,serif" }}>{profile.cycleLength}</div>
              <div style={{ fontSize:13, color:C.textLight }}>dias</div>
            </div>
            <StepBtn onClick={()=>setProfile(p=>({...p,cycleLength:Math.min(35,p.cycleLength+1)}))}>+</StepBtn>
          </div>
          <div style={{ fontSize:12, color:C.textLight, textAlign:"center", marginTop:12 }}>Não tens a certeza? Deixa os 28 dias (padrão)</div>
        </div>
      )
    },
    { emoji:"🔒", title:"Protege a tua privacidade", sub:"Queres adicionar um PIN para proteger os teus dados?", action:null,
      content:(
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginTop:8 }}>
          <button onClick={onGoPin} style={{...btnBase}}>Sim, quero adicionar PIN</button>
          <button onClick={onSkipPin} style={{...btnBase,background:"transparent",color:C.textLight,border:`1px solid ${C.sand}`}}>Não, pular esta etapa</button>
        </div>
      )
    },
  ];
  const s = steps[step];
  const canNext = step===0?true:step===1?profile.name.trim().length>0:step===2?!!lastPeriodStart:true;
  return (
    <div style={{ height:"100%", background:C.cream, display:"flex", flexDirection:"column" }}>
      <div style={{ display:"flex", gap:6, padding:"20px 24px 0" }}>
        {steps.map((_,i)=><div key={i} style={{ flex:1, height:4, borderRadius:2, background:i<=step?C.roseDark:C.sand }}/>)}
      </div>
      <div style={{ flex:1, padding:"32px 28px", display:"flex", flexDirection:"column" }}>
        <div style={{ fontSize:60, textAlign:"center", marginBottom:20 }}>{s.emoji}</div>
        <div style={{ fontFamily:"Georgia,serif", fontSize:24, fontWeight:700, color:C.text, textAlign:"center", marginBottom:8 }}>{s.title}</div>
        <div style={{ fontSize:14, color:C.textLight, textAlign:"center", marginBottom:28, lineHeight:1.6 }}>{s.sub}</div>
        {s.content}
        {s.action && <button onClick={()=>canNext&&onNext()} style={{...btnBase,marginTop:"auto",background:canNext?C.roseDark:C.sand,color:canNext?"#fff":C.textLight}}>{s.action}</button>}
      </div>
    </div>
  );
}

function PinScreen({ mode, storedPin, onSuccess, onSkip }) {
  const [pinStep, setPinStep] = useState(mode==="enter"?"enter":"set");
  const [first, setFirst]   = useState("");
  const [second, setSecond] = useState("");
  const [input, setInput]   = useState("");
  const [newPin, setNewPin] = useState("");
  const [error, setError]   = useState(false);
  const dots = pinStep==="set"?first:pinStep==="confirm"?second:input;

  function handleKey(k) {
    if (k==="del") {
      setError(false);
      if (pinStep==="set") setFirst(p=>p.slice(0,-1));
      if (pinStep==="confirm") setSecond(p=>p.slice(0,-1));
      if (pinStep==="enter") setInput(p=>p.slice(0,-1));
      return;
    }
    const next = dots + k;
    if (next.length > 4) return;
    if (pinStep==="set") {
      setFirst(next);
      if (next.length===4) { setNewPin(next); setPinStep("confirm"); }
    } else if (pinStep==="confirm") {
      setSecond(next);
      if (next.length===4) {
        if (next===newPin) { onSuccess(newPin); }
        else { setError(true); setSecond(""); setFirst(""); setNewPin(""); setPinStep("set"); }
      }
    } else {
      setInput(next);
      if (next.length===4) {
        if (next===storedPin) onSuccess(storedPin);
        else { setError(true); setInput(""); }
      }
    }
  }

  const title = pinStep==="enter"?"Digite o seu PIN":pinStep==="set"?"Crie o seu PIN":"Confirme o PIN";
  return (
    <div style={{ height:"100%", background:`linear-gradient(160deg,${C.roseLight} 0%,${C.cream} 100%)`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:28 }}>
      <div style={{ fontSize:48, marginBottom:12 }}>🔒</div>
      <div style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.text, marginBottom:6 }}>{title}</div>
      {error && <div style={{ color:C.red, fontSize:13, marginBottom:8 }}>PIN incorrecto. Tenta novamente.</div>}
      <div style={{ display:"flex", gap:16, margin:"24px 0" }}>
        {[0,1,2,3].map(i=><div key={i} style={{ width:18, height:18, borderRadius:"50%", background:dots.length>i?C.roseDark:C.sand, border:`2px solid ${C.roseDark}` }}/>)}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, width:240 }}>
        {["1","2","3","4","5","6","7","8","9","","0","del"].map((k,i)=>(
          <button key={i} onClick={()=>k&&handleKey(k)} style={{ height:62, borderRadius:16, background:k==="del"?C.sand:k===""?"transparent":C.white, border:k==="del"||k===""?"none":`1px solid ${C.sand}`, fontSize:k==="del"?20:22, fontWeight:600, color:C.text, cursor:k?"pointer":"default" }}>
            {k==="del"?"⌫":k}
          </button>
        ))}
      </div>
      {mode!=="enter" && onSkip && <button onClick={onSkip} style={{ marginTop:24, fontSize:13, color:C.textLight, background:"none", border:"none", cursor:"pointer" }}>Pular esta etapa</button>}
    </div>
  );
}

function HomeScreen({ profile, cycle, status, todayQuote, setTab, setLastPeriodStart, premium, setPremium }) {
  const today = new Date();
  return (
    <div style={{ paddingBottom:80 }}>
      <div style={{ ...gradHeader, padding:"48px 24px 32px" }}>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.75)", letterSpacing:1, marginBottom:4 }}>{today.getDate()} DE {MONTHS_PT[today.getMonth()].toUpperCase()}</div>
        <div style={{ fontFamily:"Georgia,serif", fontSize:22, color:"#fff", fontWeight:700 }}>Olá{profile.name?`, ${profile.name}`:""}! 👋</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.8)", marginTop:4, lineHeight:1.5 }}>{todayQuote}</div>
      </div>
      <div style={{ padding:"0 18px" }}>
        <div style={{ background:"#fff", borderRadius:20, padding:"20px 22px", marginTop:20, boxShadow:"0 4px 20px rgba(0,0,0,0.07)" }}>
          <div style={{ fontSize:12, color:C.textLight, letterSpacing:1, marginBottom:8 }}>ESTADO ACTUAL</div>
          <div style={{ display:"inline-block", background:status.bg, color:status.color, borderRadius:12, padding:"6px 14px", fontSize:13, fontWeight:600, marginBottom:16 }}>{status.label}</div>
          {cycle ? (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <StatBox label="Próxima mens."  value={`${Math.max(0,cycle.daysUntilNext)} dias`} icon="📅"/>
              <StatBox label="Dia do ciclo"   value={`${Math.max(1,cycle.dayOfCycle)}º`}        icon="🔄"/>
              <StatBox label="Ovulação em"    value={cycle.dayOfCycle<profile.cycleLength-14?`${profile.cycleLength-14-cycle.dayOfCycle+1} dias`:"Passou"} icon="🥚"/>
              <StatBox label="Duração ciclo"  value={`${profile.cycleLength} dias`}             icon="📊"/>
            </div>
          ) : (
            <div style={{ textAlign:"center", padding:"16px 0", color:C.textLight, fontSize:14 }}>
              <div style={{ fontSize:32, marginBottom:8 }}>📋</div>
              Configura o teu perfil para ver informações do ciclo
              <button onClick={()=>setTab("profile")} style={{ display:"block", margin:"12px auto 0", ...btnBase, padding:"10px 24px", fontSize:13, width:"auto" }}>Configurar agora</button>
            </div>
          )}
        </div>
        {cycle?.isFertile && (
          <div style={{ background:"#FFF4EC", borderRadius:16, padding:"16px 18px", marginTop:14, border:`1px solid ${C.peach}` }}>
            <div style={{ fontSize:18, marginBottom:4 }}>⚠️</div>
            <div style={{ fontWeight:600, color:C.terracotta, fontSize:14 }}>Período Fértil Activo</div>
            <div style={{ fontSize:13, color:C.textLight, marginTop:4, lineHeight:1.5 }}>Estás nos teus dias mais férteis. Se não queres engravidar, usa método contraceptivo.</div>
          </div>
        )}
        <div style={{ marginTop:20 }}>
          <div style={{ fontSize:14, fontWeight:600, color:C.text, marginBottom:12 }}>Acções Rápidas</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <QuickCard icon="📅" label="Ver Calendário"   color={C.roseLight}  onClick={()=>setTab("calendar")}/>
            <QuickCard icon="📚" label="Aprender"         color="#F0EAF9"      onClick={()=>setTab("education")}/>
            <QuickCard icon="✏️" label="Registar Período" color={C.greenLight} onClick={()=>setLastPeriodStart(new Date().toISOString().split("T")[0])}/>
            <QuickCard icon="💎" label={premium?"Premium ✓":"Activar Premium"} color="#FFF8E8" onClick={()=>setPremium(true)}/>
          </div>
        </div>
        {!premium && (
          <div style={{ marginTop:20, borderRadius:18, background:`linear-gradient(135deg,${C.lilacDark},${C.roseDark})`, padding:"18px 20px", color:"#fff" }}>
            <div style={{ fontSize:18, marginBottom:6 }}>💎 Flora Premium</div>
            <div style={{ fontSize:13, opacity:0.9, marginBottom:14, lineHeight:1.5 }}>Previsões mais precisas, conteúdos exclusivos e alertas avançados.</div>
            <button onClick={()=>setPremium(true)} style={{ background:"#fff", color:C.lilacDark, border:"none", borderRadius:10, padding:"8px 18px", fontSize:13, fontWeight:600, cursor:"pointer" }}>Experimentar Grátis 7 dias</button>
          </div>
        )}
      </div>
    </div>
  );
}

function CalendarScreen({ cycle, profile, getDayType }) {
  const [calMonth, setCalMonth] = useState(new Date());
  const year = calMonth.getFullYear(), month = calMonth.getMonth();
  const today = new Date();
  const cells = [];
  for (let i=0;i<getFirstDay(year,month);i++) cells.push(null);
  for (let d=1;d<=getDaysInMonth(year,month);d++) cells.push(new Date(year,month,d));
  const TS = { period:{bg:C.rose,color:"#fff"}, fertile:{bg:"#FFC8A8",color:C.terracotta}, ovulation:{bg:C.terracotta,color:"#fff"}, normal:{bg:"transparent",color:C.text} };
  return (
    <div style={{ paddingBottom:80 }}>
      <div style={{ ...gradHeader, padding:"48px 24px 24px" }}>
        <div style={{ fontFamily:"Georgia,serif", fontSize:22, color:"#fff", fontWeight:700, marginBottom:12 }}>Calendário</div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <button onClick={()=>setCalMonth(new Date(year,month-1,1))} style={{ background:"rgba(255,255,255,0.2)", border:"none", color:"#fff", borderRadius:10, width:36, height:36, fontSize:18, cursor:"pointer" }}>‹</button>
          <div style={{ fontSize:16, color:"#fff", fontWeight:600 }}>{MONTHS_PT[month]} {year}</div>
          <button onClick={()=>setCalMonth(new Date(year,month+1,1))} style={{ background:"rgba(255,255,255,0.2)", border:"none", color:"#fff", borderRadius:10, width:36, height:36, fontSize:18, cursor:"pointer" }}>›</button>
        </div>
      </div>
      <div style={{ padding:"16px 18px" }}>
        <div style={{ display:"flex", gap:14, marginBottom:16, flexWrap:"wrap" }}>
          {[{color:C.rose,label:"Menstruação"},{color:"#FFC8A8",label:"Fértil"},{color:C.terracotta,label:"Ovulação"}].map(l=>(
            <div key={l.label} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:C.textLight }}>
              <div style={{ width:12, height:12, borderRadius:"50%", background:l.color }}/>{l.label}
            </div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", marginBottom:8 }}>
          {DAYS_PT.map(d=><div key={d} style={{ textAlign:"center", fontSize:11, color:C.textLight, padding:"4px 0", fontWeight:600 }}>{d}</div>)}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:4 }}>
          {cells.map((date,i)=>{
            if (!date) return <div key={`e-${i}`}/>;
            const ts=TS[getDayType(date)], isTd=sameDay(date,today);
            return <div key={`d-${i}`} style={{ aspectRatio:"1", borderRadius:"50%", background:ts.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:isTd?700:400, color:ts.color, border:isTd?`2px solid ${C.roseDark}`
