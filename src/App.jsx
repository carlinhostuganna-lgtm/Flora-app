import { useState, useEffect } from "react";

const C = {
  rose:"#F2A0B0", roseDark:"#D96B84", roseLight:"#FDEEF2",
  lilac:"#C9A8D6", lilacDark:"#8B5BA5", peach:"#F7C5A0",
  cream:"#FDF8F4", sand:"#F0E8DC", terracotta:"#C4704A",
  text:"#3A2535", textLight:"#7A6070", white:"#FFFFFF",
  green:"#7AB98F", greenLight:"#E8F5EC", red:"#E05C5C",
};

const DAYS_PT   = ["Dom","Seg","Ter","Qua","Qui","Sex","Sab"];
const MONTHS_PT = ["Janeiro","Fevereiro","Marco","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

function getDaysInMonth(y,m){ return new Date(y,m+1,0).getDate(); }
function getFirstDay(y,m){ return new Date(y,m,1).getDay(); }
function addDays(date,n){ var d=new Date(date); d.setDate(d.getDate()+n); return d; }
function sameDay(a,b){ return a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate(); }
function fmtDate(d){ return String(d.getDate()).padStart(2,"0")+"/"+String(d.getMonth()+1).padStart(2,"0")+"/"+d.getFullYear(); }

var MOTIVATIONAL = [
  "O teu corpo e sabedoria. Cuida dele com amor.",
  "Conheceres o teu ciclo e o primeiro passo para o teu bem-estar.",
  "Cada dia e uma nova oportunidade de cuidares de ti.",
  "Estas a fazer bem! Continua a acompanhar a tua saude.",
  "A tua saude importa. Nunca te esquecas disso.",
];

var EDU = [
  { icon:"🩸", tag:"Basico",      title:"O que e o ciclo menstrual?",    body:"O ciclo menstrual e o periodo entre o primeiro dia de uma menstruacao e o primeiro dia da proxima. Em media dura 28 dias, mas pode variar entre 21 e 35 dias. O ciclo e controlado por hormonas e pode ser influenciado por stress, alimentacao e outros factores." },
  { icon:"🥚", tag:"Fertilidade", title:"Dias ferteis explicados",        body:"Os dias ferteis sao aqueles em que podes engravidar. A ovulacao acontece geralmente 14 dias antes da proxima menstruacao. O esperma pode sobreviver ate 5 dias, por isso os dias antes da ovulacao tambem contam." },
  { icon:"💊", tag:"Prevencao",   title:"Metodos contraceptivos",         body:"Existem varios metodos para prevenir uma gravidez: preservativo, pilula anticoncepcional, injecao trimestral, implante e DIU. Fala sempre com um medico para escolheres o melhor para ti." },
  { icon:"💧", tag:"Bem-estar",   title:"Cuidados durante a menstruacao", body:"Bebe bastante agua, descansa quando precisares, come alimentos ricos em ferro. Usa pensos ou absorventes internos adequados e troca-os a cada 4-6 horas. Exercicio leve pode ajudar a reduzir as colicas." },
  { icon:"❗", tag:"Saude",       title:"Quando consultar um medico?",    body:"Procura um profissional de saude se: a menstruacao durar mais de 7 dias, sentires dores muito intensas, tiveres ciclos muito irregulares por varios meses, ou se a menstruacao atrasar mais de 10 dias sem causa aparente." },
];

var btnBase = { background:C.roseDark, color:"#fff", border:"none", borderRadius:16, padding:"14px 24px", fontSize:15, fontWeight:600, cursor:"pointer", width:"100%", fontFamily:"inherit" };
var inputBase = { width:"100%", border:"1px solid "+C.sand, borderRadius:12, padding:"12px 16px", fontSize:15, color:C.text, background:C.cream, outline:"none", fontFamily:"inherit" };
var gradHeader = { background:"linear-gradient(135deg,"+C.roseDark+" 0%,"+C.lilacDark+" 100%)", borderRadius:"0 0 32px 32px" };

function MobileFrame(props) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"linear-gradient(135deg,#E8D5DB 0%,#D5D0E8 100%)", padding:20, fontFamily:"Arial,sans-serif" }}>
      <div style={{ width:390, height:780, borderRadius:48, overflow:"hidden", position:"relative", boxShadow:"0 30px 80px rgba(0,0,0,0.25)", background:C.cream }}>
        <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:120, height:28, background:"#1a1a2e", borderRadius:"0 0 18px 18px", zIndex:100 }}/>
        <div style={{ height:"100%", overflow:"hidden" }}>{props.children}</div>
      </div>
    </div>
  );
}

function StatBox(props) {
  return (
    <div style={{ background:C.cream, borderRadius:14, padding:"12px 14px" }}>
      <div style={{ fontSize:16 }}>{props.icon}</div>
      <div style={{ fontSize:16, fontWeight:700, color:C.text, marginTop:4 }}>{props.value}</div>
      <div style={{ fontSize:11, color:C.textLight, marginTop:2 }}>{props.label}</div>
    </div>
  );
}

function QuickCard(props) {
  return (
    <button onClick={props.onClick} style={{ background:props.color, border:"none", borderRadius:16, padding:"16px 14px", cursor:"pointer", textAlign:"left", width:"100%" }}>
      <div style={{ fontSize:28, marginBottom:8 }}>{props.icon}</div>
      <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{props.label}</div>
    </button>
  );
}

function StepBtn(props) {
  return (
    <button onClick={props.onClick} style={{ width:44, height:44, borderRadius:"50%", background:C.roseLight, border:"2px solid "+C.rose, fontSize:24, fontWeight:700, color:C.roseDark, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
      {props.children}
    </button>
  );
}

function SplashScreen() {
  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"linear-gradient(160deg,"+C.roseLight+" 0%,"+C.cream+" 100%)" }}>
      <div style={{ fontSize:72, marginBottom:16 }}>🌸</div>
      <div style={{ fontFamily:"Georgia,serif", fontSize:38, fontWeight:700, color:C.roseDark }}>Flora</div>
      <div style={{ fontSize:14, color:C.textLight, marginTop:6, letterSpacing:2 }}>O TEU CICLO. A TUA SAUDE.</div>
      <div style={{ marginTop:40, display:"flex", gap:8 }}>
        <div style={{ width:8, height:8, borderRadius:"50%", background:C.roseDark }}/>
        <div style={{ width:8, height:8, borderRadius:"50%", background:C.rose }}/>
        <div style={{ width:8, height:8, borderRadius:"50%", background:C.rose }}/>
      </div>
    </div>
  );
}

function OnboardingScreen(props) {
  var step = props.step;
  var profile = props.profile;
  var setProfile = props.setProfile;
  var lastPeriodStart = props.lastPeriodStart;
  var setLastPeriodStart = props.setLastPeriodStart;

  var contents = [null, null, null, null, null];

  contents[1] = (
    <input placeholder="O teu nome" value={profile.name} onChange={function(e){ setProfile(function(p){ return Object.assign({},p,{name:e.target.value}); }); }} style={inputBase}/>
  );
  contents[2] = (
    <input type="date" value={lastPeriodStart||""} max={new Date().toISOString().split("T")[0]} onChange={function(e){ setLastPeriodStart(e.target.value); }} style={inputBase}/>
  );
  contents[3] = (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:20, marginTop:8 }}>
        <StepBtn onClick={function(){ setProfile(function(p){ return Object.assign({},p,{cycleLength:Math.max(21,p.cycleLength-1)}); }); }}>-</StepBtn>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:44, fontWeight:700, color:C.roseDark, fontFamily:"Georgia,serif" }}>{profile.cycleLength}</div>
          <div style={{ fontSize:13, color:C.textLight }}>dias</div>
        </div>
        <StepBtn onClick={function(){ setProfile(function(p){ return Object.assign({},p,{cycleLength:Math.min(35,p.cycleLength+1)}); }); }}>+</StepBtn>
      </div>
      <div style={{ fontSize:12, color:C.textLight, textAlign:"center", marginTop:12 }}>Nao tens a certeza? Deixa os 28 dias</div>
    </div>
  );
  contents[4] = (
    <div style={{ display:"flex", flexDirection:"column", gap:12, marginTop:8 }}>
      <button onClick={props.onGoPin} style={btnBase}>Sim, quero adicionar PIN</button>
      <button onClick={props.onSkipPin} style={Object.assign({},btnBase,{background:"transparent",color:C.textLight,border:"1px solid "+C.sand})}>Nao, pular esta etapa</button>
    </div>
  );

  var emojis    = ["👋","🌸","📅","⏱️","🔒"];
  var titles    = ["Bem-vinda ao Flora!","Como te chamas?","Quando foi a ultima menstruacao?","Quanto dura o teu ciclo?","Protege a tua privacidade"];
  var subs      = ["O teu companheiro de saude feminina.","Queremos personalizar a tua experiencia.","Isto ajuda-nos a calcular o teu proximo ciclo.","A maioria dos ciclos dura entre 21 e 35 dias.","Queres adicionar um PIN para proteger os teus dados?"];
  var actions   = ["Comecar","Continuar","Continuar","Continuar",null];
  var canNext   = step===0?true:step===1?profile.name.trim().length>0:step===2?!!lastPeriodStart:true;

  return (
    <div style={{ height:"100%", background:C.cream, display:"flex", flexDirection:"column" }}>
      <div style={{ display:"flex", gap:6, padding:"20px 24px 0" }}>
        {[0,1,2,3,4].map(function(i){ return <div key={i} style={{ flex:1, height:4, borderRadius:2, background:i<=step?C.roseDark:C.sand }}/>; })}
      </div>
      <div style={{ flex:1, padding:"32px 28px", display:"flex", flexDirection:"column" }}>
        <div style={{ fontSize:60, textAlign:"center", marginBottom:20 }}>{emojis[step]}</div>
        <div style={{ fontFamily:"Georgia,serif", fontSize:24, fontWeight:700, color:C.text, textAlign:"center", marginBottom:8 }}>{titles[step]}</div>
        <div style={{ fontSize:14, color:C.textLight, textAlign:"center", marginBottom:28, lineHeight:1.6 }}>{subs[step]}</div>
        {contents[step]}
        {actions[step] && (
          <button onClick={function(){ if(canNext) props.onNext(); }} style={Object.assign({},btnBase,{marginTop:"auto",background:canNext?C.roseDark:C.sand,color:canNext?"#fff":C.textLight})}>
            {actions[step]}
          </button>
        )}
      </div>
    </div>
  );
}

function PinScreen(props) {
  var mode = props.mode;
  var storedPin = props.storedPin;
  var onSuccess = props.onSuccess;
  var onSkip = props.onSkip;

  var [pinStep, setPinStep] = useState(mode==="enter"?"enter":"set");
  var [first,   setFirst]   = useState("");
  var [second,  setSecond]  = useState("");
  var [input,   setInput]   = useState("");
  var [newPin,  setNewPin]  = useState("");
  var [error,   setError]   = useState(false);

  var dots = pinStep==="set"?first:pinStep==="confirm"?second:input;

  function handleKey(k) {
    if (k==="del") {
      setError(false);
      if (pinStep==="set")     setFirst(function(p){ return p.slice(0,-1); });
      if (pinStep==="confirm") setSecond(function(p){ return p.slice(0,-1); });
      if (pinStep==="enter")   setInput(function(p){ return p.slice(0,-1); });
      return;
    }
    var next = dots + k;
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
        if (next===storedPin) { onSuccess(storedPin); }
        else { setError(true); setInput(""); }
      }
    }
  }

  var title = pinStep==="enter"?"Digite o seu PIN":pinStep==="set"?"Crie o seu PIN":"Confirme o PIN";
  var keys  = ["1","2","3","4","5","6","7","8","9","","0","del"];

  return (
    <div style={{ height:"100%", background:"linear-gradient(160deg,"+C.roseLight+" 0%,"+C.cream+" 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:28 }}>
      <div style={{ fontSize:48, marginBottom:12 }}>🔒</div>
      <div style={{ fontFamily:"Georgia,serif", fontSize:22, fontWeight:700, color:C.text, marginBottom:6 }}>{title}</div>
      {error && <div style={{ color:C.red, fontSize:13, marginBottom:8 }}>PIN incorrecto. Tenta novamente.</div>}
      <div style={{ display:"flex", gap:16, margin:"24px 0" }}>
        {[0,1,2,3].map(function(i){ return <div key={i} style={{ width:18, height:18, borderRadius:"50%", background:dots.length>i?C.roseDark:C.sand, border:"2px solid "+C.roseDark }}/>; })}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, width:240 }}>
        {keys.map(function(k,i){
          return (
            <button key={i} onClick={function(){ if(k) handleKey(k); }} style={{ height:62, borderRadius:16, background:k==="del"?C.sand:k===""?"transparent":C.white, border:k==="del"||k===""?"none":"1px solid "+C.sand, fontSize:k==="del"?20:22, fontWeight:600, color:C.text, cursor:k?"pointer":"default" }}>
              {k==="del"?"<":k}
            </button>
          );
        })}
      </div>
      {mode!=="enter" && onSkip && (
        <button onClick={onSkip} style={{ marginTop:24, fontSize:13, color:C.textLight, background:"none", border:"none", cursor:"pointer" }}>Pular esta etapa</button>
      )}
    </div>
  );
}

function HomeScreen(props) {
  var profile = props.profile;
  var cycle   = props.cycle;
  var status  = props.status;
  var today   = new Date();
  return (
    <div style={{ paddingBottom:80 }}>
      <div style={Object.assign({},gradHeader,{padding:"48px 24px 32px"})}>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.75)", letterSpacing:1, marginBottom:4 }}>{today.getDate()} DE {MONTHS_PT[today.getMonth()].toUpperCase()}</div>
        <div style={{ fontFamily:"Georgia,serif", fontSize:22, color:"#fff", fontWeight:700 }}>Ola{profile.name?", "+profile.name:""}! 👋</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.8)", marginTop:4 }}>{props.todayQuote}</div>
      </div>
      <div style={{ padding:"0 18px" }}>
        <div style={{ background:"#fff", borderRadius:20, padding:"20px 22px", marginTop:20, boxShadow:"0 4px 20px rgba(0,0,0,0.07)" }}>
          <div style={{ fontSize:12, color:C.textLight, letterSpacing:1, marginBottom:8 }}>ESTADO ACTUAL</div>
          <div style={{ display:"inline-block", background:status.bg, color:status.color, borderRadius:12, padding:"6px 14px", fontSize:13, fontWeight:600, marginBottom:16 }}>{status.label}</div>
          {cycle ? (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <StatBox label="Proxima mens."  value={Math.max(0,cycle.daysUntilNext)+" dias"} icon="📅"/>
              <StatBox label="Dia do ciclo"   value={Math.max(1,cycle.dayOfCycle)+"o"}         icon="🔄"/>
              <StatBox label="Ovulacao em"    value={cycle.dayOfCycle<profile.cycleLength-14?(profile.cycleLength-14-cycle.dayOfCycle+1)+" dias":"Passou"} icon="🥚"/>
              <StatBox label="Duracao ciclo"  value={profile.cycleLength+" dias"}              icon="📊"/>
            </div>
          ) : (
            <div style={{ textAlign:"center", padding:"16px 0", color:C.textLight, fontSize:14 }}>
              <div style={{ fontSize:32, marginBottom:8 }}>📋</div>
              Configura o teu perfil para ver informacoes do ciclo
              <button onClick={function(){ props.setTab("profile"); }} style={Object.assign({},btnBase,{display:"block",margin:"12px auto 0",padding:"10px 24px",fontSize:13,width:"auto"})}>Configurar agora</button>
            </div>
          )}
        </div>
        {cycle && cycle.isFertile && (
          <div style={{ background:"#FFF4EC", borderRadius:16, padding:"16px 18px", marginTop:14, border:"1px solid "+C.peach }}>
            <div style={{ fontWeight:600, color:C.terracotta, fontSize:14 }}>⚠️ Periodo Fertil Activo</div>
            <div style={{ fontSize:13, color:C.textLight, marginTop:4 }}>Estas nos teus dias mais ferteis. Se nao queres engravidar, usa metodo contraceptivo.</div>
          </div>
        )}
        <div style={{ marginTop:20 }}>
          <div style={{ fontSize:14, fontWeight:600, color:C.text, marginBottom:12 }}>Accoes Rapidas</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <QuickCard icon="📅" label="Ver Calendario"   color={C.roseLight}  onClick={function(){ props.setTab("calendar"); }}/>
            <QuickCard icon="📚" label="Aprender"          color="#F0EAF9"      onClick={function(){ props.setTab("education"); }}/>
            <QuickCard icon="✏️" label="Registar Periodo"  color={C.greenLight} onClick={function(){ props.setLastPeriodStart(new Date().toISOString().split("T")[0]); }}/>
            <QuickCard icon="💎" label={props.premium?"Premium":"Activar Premium"} color="#FFF8E8" onClick={function(){ props.setPremium(true); }}/>
          </div>
        </div>
        {!props.premium && (
          <div style={{ marginTop:20, borderRadius:18, background:"linear-gradient(135deg,"+C.lilacDark+","+C.roseDark+")", padding:"18px 20px", color:"#fff" }}>
            <div style={{ fontSize:18, marginBottom:6 }}>💎 Flora Premium</div>
            <div style={{ fontSize:13, opacity:0.9, marginBottom:14 }}>Previsoes mais precisas e conteudos exclusivos.</div>
            <button onClick={function(){ props.setPremium(true); }} style={{ background:"#fff", color:C.lilacDark, border:"none", borderRadius:10, padding:"8px 18px", fontSize:13, fontWeight:600, cursor:"pointer" }}>Experimentar Gratis 7 dias</button>
          </div>
        )}
      </div>
    </div>
  );
}

function CalendarScreen(props) {
  var cycle    = props.cycle;
  var profile  = props.profile;
  var getDayType = props.getDayType;
  var [calMonth, setCalMonth] = useState(new Date());
  var year  = calMonth.getFullYear();
  var month = calMonth.getMonth();
  var today = new Date();

  var cells = [];
  for (var i=0;i<getFirstDay(year,month);i++) cells.push(null);
  for (var d=1;d<=getDaysInMonth(year,month);d++) cells.push(new Date(year,month,d));

  var TYPE_BG    = { period:C.rose, fertile:"#FFC8A8", ovulation:C.terracotta, normal:"transparent" };
  var TYPE_COLOR = { period:"#fff", fertile:C.terracotta, ovulation:"#fff", normal:C.text };

  return (
    <div style={{ paddingBottom:80 }}>
      <div style={Object.assign({},gradHeader,{padding:"48px 24px 24px"})}>
        <div style={{ fontFamily:"Georgia,serif", fontSize:22, color:"#fff", fontWeight:700, marginBottom:12 }}>Calendario</div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <button onClick={function(){ setCalMonth(new Date(year,month-1,1)); }} style={{ background:"rgba(255,255,255,0.2)", border:"none", color:"#fff", borderRadius:10, width:36, height:36, fontSize:18, cursor:"pointer" }}>{"<"}</button>
          <div style={{ fontSize:16, color:"#fff", fontWeight:600 }}>{MONTHS_PT[month]+" "+year}</div>
          <button onClick={function(){ setCalMonth(new Date(year,month+1,1)); }} style={{ background:"rgba(255,255,255,0.2)", border:"none", color:"#fff", borderRadius:10, width:36, height:36, fontSize:18, cursor:"pointer" }}>{">"}</button>
        </div>
      </div>
      <div style={{ padding:"16px 18px" }}>
        <div style={{ display:"flex", gap:14, marginBottom:16, flexWrap:"wrap" }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:C.textLight }}><div style={{ width:12, height:12, borderRadius:"50%", background:C.rose }}/> Menstruacao</div>
          <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:C.textLight }}><div style={{ width:12, height:12, borderRadius:"50%", background:"#FFC8A8" }}/> Fertil</div>
          <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:C.textLight }}><div style={{ width:12, height:12, borderRadius:"50%", background:C.terracotta }}/> Ovulacao</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", marginBottom:8 }}>
          {DAYS_PT.map(function(d){ return <div key={d} style={{ textAlign:"center", fontSize:11, color:C.textLight, padding:"4px 0", fontWeight:600 }}>{d}</div>; })}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:4 }}>
          {cells.map(function(date,idx){
            if (!date) return <div key={"e"+idx}/>;
            var t    = getDayType(date);
            var isTd = sameDay(date,today);
            return (
              <div key={"d"+idx} style={{ aspectRatio:"1", borderRadius:"50%", background:TYPE_BG[t], display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:isTd?700:400, color:TYPE_COLOR[t], border:isTd?"2px solid "+C.roseDark:"none" }}>
                {date.getDate()}
              </div>
            );
          })}
        </div>
        {cycle && (
          <div style={{ marginTop:20 }}>
            <div style={{ fontSize:14, fontWeight:600, color:C.text, marginBottom:12 }}>Proximos eventos</div>
            {[
              {icon:"🩸",label:"Proxima menstruacao",date:cycle.nextStart,   color:C.roseDark},
              {icon:"🥚",label:"Ovulacao",           date:cycle.ovulation,   color:C.terracotta},
              {icon:"💚",label:"Inicio fertil",       date:cycle.fertileStart,color:C.green},
            ].map(function(ev){
              return (
                <div key={ev.label} style={{ display:"flex", alignItems:"center", gap:12, background:"#fff", borderRadius:14, padding:"12px 16px", marginBottom:8, boxShadow:"0 2px 10px rgba(0,0,0,0.05)" }}>
                  <div style={{ fontSize:24 }}>{ev.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{ev.label}</div>
                    <div style={{ fontSize:12, color:C.textLight }}>{fmtDate(ev.date)}</div>
                  </div>
                  <div style={{ fontSize:12, color:ev.color, fontWeight:600 }}>{Math.max(0,Math.ceil((ev.date-new Date())/(1000*60*60*24)))+" dias"}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function EducationScreen() {
  var [sel, setSel] = useState(null);
  if (sel !== null) {
    var item = EDU[sel];
    return (
      <div style={{ paddingBottom:80 }}>
        <div style={Object.assign({},gradHeader,{padding:"48px 24px 32px"})}>
          <button onClick={function(){ setSel(null); }} style={{ background:"rgba(255,255,255,0.2)", border:"none", color:"#fff", borderRadius:10, padding:"6px 14px", fontSize:13, cursor:"pointer", marginBottom:12 }}>{"< Voltar"}</button>
          <div style={{ fontSize:48, marginBottom:8 }}>{item.icon}</div>
          <div style={{ fontFamily:"Georgia,serif", fontSize:20, color:"#fff", fontWeight:700 }}>{item.title}</div>
        </div>
        <div style={{ padding:"20px 18px" }}>
          <div style={{ background:"#fff", borderRadius:18, padding:20, fontSize:15, lineHeight:1.8, color:C.text }}>{item.body}</div>
          <div style={{ marginTop:16, background:C.greenLight, borderRadius:14, padding:"14px 18px", fontSize:13, color:C.green, fontWeight:600 }}>💡 Fala sempre com um profissional de saude para aconselhamento personalizado.</div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ paddingBottom:80 }}>
      <div style={Object.assign({},gradHeader,{padding:"48px 24px 28px"})}>
        <div style={{ fontFamily:"Georgia,serif", fontSize:22, color:"#fff", fontWeight:700 }}>Aprende e Cresce</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.8)", marginTop:4 }}>Informacao de saude simples e clara</div>
      </div>
      <div style={{ padding:"16px 18px" }}>
        {EDU.map(function(item,i){
          return (
            <button key={i} onClick={function(){ setSel(i); }} style={{ display:"flex", alignItems:"center", gap:16, background:"#fff", border:"none", borderRadius:16, padding:"16px 18px", marginBottom:12, width:"100%", textAlign:"left", cursor:"pointer", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize:36 }}>{item.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:600, color:C.text }}>{item.title}</div>
                <div style={{ fontSize:12, color:C.textLight, marginTop:2 }}>{item.body.substring(0,65)+"..."}</div>
              </div>
              <div style={{ fontSize:12, background:C.roseLight, color:C.roseDark, padding:"4px 10px", borderRadius:8, fontWeight:600 }}>{item.tag}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProfileScreen(props) {
  var [local, setLocal] = useState(Object.assign({},props.profile));
  var [lps,   setLps]   = useState(props.lastPeriodStart||"");
  var [saved, setSaved] = useState(false);
  function save() {
    props.setProfile(local);
    props.setLastPeriodStart(lps||null);
    setSaved(true);
    setTimeout(function(){ setSaved(false); },2000);
  }
  return (
    <div style={{ paddingBottom:80 }}>
      <div style={Object.assign({},gradHeader,{padding:"48px 24px 32px",textAlign:"center"})}>
        <div style={{ width:72, height:72, borderRadius:"50%", background:"rgba(255,255,255,0.25)", margin:"0 auto 12px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36 }}>🌸</div>
        <div style={{ fontFamily:"Georgia,serif", fontSize:20, color:"#fff", fontWeight:700 }}>{props.profile.name||"O Meu Perfil"}</div>
      </div>
      <div style={{ padding:"16px 18px" }}>
        <div style={{ background:"#fff", borderRadius:18, padding:"20px 18px", boxShadow:"0 4px 20px rgba(0,0,0,0.07)", marginBottom:16 }}>
          <div style={{ fontSize:12, color:C.textLight, marginBottom:6 }}>Nome</div>
          <input value={local.name} onChange={function(e){ setLocal(function(p){ return Object.assign({},p,{name:e.target.value}); }); }} style={inputBase} placeholder="O teu nome"/>
          <div style={{ fontSize:12, color:C.textLight, marginBottom:6, marginTop:14 }}>Ultima menstruacao</div>
          <input type="date" value={lps} onChange={function(e){ setLps(e.target.value); }} max={new Date().toISOString().split("T")[0]} style={inputBase}/>
          <div style={{ fontSize:12, color:C.textLight, marginBottom:6, marginTop:14 }}>Duracao do ciclo (dias)</div>
          <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:8 }}>
            <StepBtn onClick={function(){ setLocal(function(p){ return Object.assign({},p,{cycleLength:Math.max(21,p.cycleLength-1)}); }); }}>-</StepBtn>
            <div style={{ fontSize:28, fontWeight:700, color:C.roseDark, minWidth:50, textAlign:"center" }}>{local.cycleLength}</div>
            <StepBtn onClick={function(){ setLocal(function(p){ return Object.assign({},p,{cycleLength:Math.min(35,p.cycleLength+1)}); }); }}>+</StepBtn>
          </div>
          <div style={{ fontSize:12, color:C.textLight, marginBottom:6 }}>Duracao do periodo (dias)</div>
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <StepBtn onClick={function(){ setLocal(function(p){ return Object.assign({},p,{periodLength:Math.max(2,p.periodLength-1)}); }); }}>-</StepBtn>
            <div style={{ fontSize:28, fontWeight:700, color:C.roseDark, minWidth:50, textAlign:"center" }}>{local.periodLength}</div>
            <StepBtn onClick={function(){ setLocal(function(p){ return Object.assign({},p,{periodLength:Math.min(10,p.periodLength+1)}); }); }}>+</StepBtn>
          </div>
        </div>
        <div style={{ background:props.premium?"linear-gradient(135deg,"+C.lilacDark+","+C.roseDark+")":C.sand, borderRadius:16, padding:"16px 18px", marginBottom:16, display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ fontSize:28 }}>{props.premium?"💎":"🔓"}</div>
          <div>
            <div style={{ fontWeight:600, color:props.premium?"#fff":C.text, fontSize:14 }}>{props.premium?"Flora Premium Activo":"Versao Gratuita"}</div>
            <div style={{ fontSize:12, color:props.premium?"rgba(255,255,255,0.8)":C.textLight }}>{props.premium?"Tens acesso a todas as funcionalidades":"Actualiza para funcionalidades completas"}</div>
          </div>
          {!props.premium && <button onClick={function(){ props.setPremium(true); }} style={{ marginLeft:"auto", background:C.roseDark, color:"#fff", border:"none", borderRadius:10, padding:"8px 14px", fontSize:12, fontWeight:600, cursor:"pointer" }}>Premium</button>}
        </div>
        <button onClick={function(){ props.onChangePIN(); }} style={{ display:"flex", alignItems:"center", gap:12, width:"100%", background:"#fff", border:"none", borderRadius:16, padding:"16px 18px", cursor:"pointer", textAlign:"left", boxShadow:"0 2px 10px rgba(0,0,0,0.05)", marginBottom:16 }}>
          <div style={{ fontSize:24 }}>🔒</div>
          <div>
            <div style={{ fontSize:14, fontWeight:600, color:C.text }}>Modo Privado</div>
            <div style={{ fontSize:12, color:C.textLight }}>Alterar PIN de proteccao</div>
          </div>
        </button>
        <button onClick={save} style={Object.assign({},btnBase,{background:saved?C.green:C.roseDark})}>{saved?"Guardado!":"Guardar Alteracoes"}</button>
      </div>
    </div>
  );
}

export default function App() {
  var [screen,          setScreen]          = useState("splash");
  var [onboardStep,     setOnboardStep]     = useState(0);
  var [profile,         setProfile]         = useState({name:"",cycleLength:28,periodLength:5});
  var [lastPeriodStart, setLastPeriodStart] = useState(null);
  var [storedPin,       setStoredPin]       = useState(null);
  var [pinMode,         setPinMode]         = useState("set");
  var [premium,         setPremium]         = useState(false);
  var [tab,             setTab]             = useState("home");
  var [todayQuote]                          = useState(MOTIVATIONAL[Math.floor(Math.random()*MOTIVATIONAL.length)]);

  useEffect(function(){
    if (screen!=="splash") return;
    var t = setTimeout(function(){ setScreen("onboarding"); },2200);
    return function(){ clearTimeout(t); };
  },[screen]);

  var cycle = (function(){
    if (!lastPeriodStart) return null;
    var start        = new Date(lastPeriodStart);
    var periodEnd    = addDays(start,profile.periodLength-1);
    var nextStart    = addDays(start,profile.cycleLength);
    var ovulation    = addDays(start,profile.cycleLength-14);
    var fertileStart = addDays(ovulation,-5);
    var fertileEnd   = addDays(ovulation,1);
    var today        = new Date();
    var dayOfCycle   = Math.floor((today-start)/(1000*60*60*24))+1;
    var daysUntilNext= Math.ceil((nextStart-today)/(1000*60*60*24));
    return { start:start, periodEnd:periodEnd, nextStart:nextStart, ovulation:ovulation, fertileStart:fertileStart, fertileEnd:fertileEnd, dayOfCycle:dayOfCycle, daysUntilNext:daysUntilNext, isFertile:today>=fertileStart&&today<=fertileEnd, isPeriod:today>=start&&today<=periodEnd };
  })();

  function getDayType(date) {
    if (!cycle) return "normal";
    if (sameDay(date,cycle.ovulation)) return "ovulation";
    if (date>=cycle.fertileStart && date<=cycle.fertileEnd) return "fertile";
    if (date>=cycle.start && date<=cycle.periodEnd) return "period";
    return "normal";
  }

  function getStatus() {
    if (!cycle) return {label:"Configure o seu ciclo",color:C.textLight,bg:C.sand};
    if (cycle.isPeriod)          return {label:"Menstruacao",color:C.roseDark,bg:C.roseLight};
    if (cycle.isFertile)         return {label:"Periodo Fertil",color:C.terracotta,bg:"#FFF0E8"};
    if (cycle.daysUntilNext<=3)  return {label:"Menstruacao em "+cycle.daysUntilNext+" dias",color:C.lilacDark,bg:"#F3EAF9"};
    return {label:"Dia "+cycle.dayOfCycle+" do ciclo",color:C.green,bg:C.greenLight};
  }

  var status = getStatus();
  var TABS = [{id:"home",icon:"🏠",label:"Inicio"},{id:"calendar",icon:"📅",label:"Calendario"},{id:"education",icon:"📚",label:"Aprender"},{id:"profile",icon:"👤",label:"Perfil"}];

  if (screen==="splash")     return <MobileFrame><SplashScreen/></MobileFrame>;
  if (screen==="onboarding") return (
    <MobileFrame>
      <OnboardingScreen step={onboardStep} profile={profile} setProfile={setProfile} lastPeriodStart={lastPeriodStart} setLastPeriodStart={setLastPeriodStart}
        onNext={function(){ setOnboardStep(function(s){ return s+1; }); }}
        onSkipPin={function(){ setScreen("home"); }}
        onGoPin={function(){ setPinMode("set"); setScreen("pin"); }}
      />
    </MobileFrame>
  );
  if (screen==="pin") return (
    <MobileFrame>
      <PinScreen mode={pinMode} storedPin={storedPin} onSuccess={function(p){ setStoredPin(p); setScreen("home"); }} onSkip={function(){ setScreen("home"); }}/>
    </MobileFrame>
  );

  return (
    <MobileFrame>
      <div style={{ height:"100%", background:C.cream, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        <div style={{ flex:1, overflowY:"auto" }}>
          {tab==="home"      && <HomeScreen profile={profile} cycle={cycle} status={status} todayQuote={todayQuote} setTab={setTab} setLastPeriodStart={setLastPeriodStart} premium={premium} setPremium={setPremium}/>}
          {tab==="calendar"  && <CalendarScreen cycle={cycle} profile={profile} getDayType={getDayType}/>}
          {tab==="education" && <EducationScreen/>}
          {tab==="profile"   && <ProfileScreen profile={profile} setProfile={setProfile} lastPeriodStart={lastPeriodStart} setLastPeriodStart={setLastPeriodStart} premium={premium} setPremium={setPremium} onChangePIN={function(){ setPinMode("set"); setScreen("pin"); }}/>}
        </div>
        <div style={{ display:"flex", background:"#fff", borderTop:"1px solid "+C.sand, padding:"8px 0 12px" }}>
          {TABS.map(function(t){
            return (
              <button key={t.id} onClick={function(){ setTab(t.id); }} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4, background:"none", border:"none", cursor:"pointer", padding:"6px 0" }}>
                <div style={{ fontSize:tab===t.id?24:22 }}>{t.icon}</div>
                <div style={{ fontSize:10, fontWeight:tab===t.id?700:400, color:tab===t.id?C.roseDark:C.textLight }}>{t.label}</div>
                {tab===t.id && <div style={{ width:20, height:3, borderRadius:2, background:C.roseDark }}/>}
              </button>
            );
          })}
        </div>
      </div>
    </MobileFrame>
  );
}
