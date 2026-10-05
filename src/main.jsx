import { useState } from "react";
import {
  Activity, Brain, CaretRight, CheckCircle, Clock, DeviceMobile,
  Heartbeat, Moon, Plus, ShieldCheck, Sparkle, TrendUp, Watch
} from "@phosphor-icons/react";
import "./styles.css";

const metrics = [
  ["Recovery", "82", "/ 100", "+6%", "good", Heartbeat],
  ["Sleep", "7h 48m", "", "+34m", "good", Moon],
  ["HRV", "61 ms", "", "+8%", "good", Activity],
  ["Resting HR", "52 bpm", "", "-3 bpm", "good", Heartbeat],
  ["Strain", "11.2", "/ 21", "Moderate", "neutral", TrendUp],
];

const devices = [
  ["WHOOP", "Connected", Watch],
  ["Apple Health", "Coming soon", Activity],
  ["Oura", "Coming soon", Moon],
  ["Garmin", "Coming soon", Activity],
];

function App() {
  const [connected, setConnected] = useState(true);
  const [toast, setToast] = useState("");
  const [question, setQuestion] = useState("");

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(window.__loopToast);
    window.__loopToast = window.setTimeout(() => setToast(""), 2600);
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">↻</div>
          <div><b>LOOP</b><span>Your data. Your health.</span></div>
        </div>
        <nav>
          {["Overview","Recovery","Sleep","Activity","Insights"].map((item,i) => (
            <button className={i === 0 ? "nav active" : "nav"} key={item} onClick={() => notify(item + " module is next in the build.")}>
              {i===0?<TrendUp/>:i===1?<Heartbeat/>:i===2?<Moon/>:i===3?<Activity/>:<Brain/>}{item}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav" onClick={() => notify("Settings module is coming next.")}>⚙ Settings</button>
          <div className="privacy"><ShieldCheck size={20}/><div><b>Private by default</b><span>Your health data stays yours.</span></div></div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="search">⌕ <input placeholder="Search your health data..." /></div>
          <button className="icon-btn" onClick={() => notify("Notifications are clear.")}>♢</button>
          <div className="avatar">VG</div>
        </header>

        <section className="content">
          <div className="heading">
            <div><div className="eyebrow">MONDAY · 5 OCTOBER 2026</div><h1>Good morning, <span>Venu.</span></h1><p>Your latest signals suggest a strong day for focused work.</p></div>
            <div className="actions">
              <button className="ghost" onClick={() => notify("Device manager opened.")}><DeviceMobile/> Manage devices</button>
              <button className="primary" onClick={() => notify("Connect-device flow started.")}><Plus/> Connect device</button>
            </div>
          </div>

          <div className="metrics">
            {metrics.map(([label,value,unit,delta,tone,Icon]) => (
              <div className="metric" key={label}>
                <div className="metric-top"><Icon/><span>{label}</span></div>
                <strong>{value}<small>{unit}</small></strong>
                <span className={"delta "+tone}>{delta}</span>
              </div>
            ))}
          </div>

          <div className="grid">
            <section className="panel trends">
              <div className="panel-head"><div><h2>Health trends</h2><span>Last 14 days · normalized signals</span></div><div className="legend"><span><i className="dot cyan"/>HRV</span><span><i className="dot pink"/>RHR</span><span><i className="dot violet"/>Sleep</span></div></div>
              <div className="chart">
                <div className="axis"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
                <div className="lines">
                  <div className="gridlines">{[1,2,3,4,5].map(x=><i key={x}/>)}</div>
                  <svg viewBox="0 0 700 190" preserveAspectRatio="none"><polyline className="line cyan" points="0,105 55,92 110,111 165,83 220,89 275,72 330,79 385,61 440,69 495,49 550,57 605,38 660,46 700,30"/><polyline className="line pink" points="0,65 55,77 110,69 165,88 220,81 275,94 330,82 385,100 440,91 495,106 550,99 605,111 660,102 700,117"/><polyline className="line violet" points="0,135 55,125 110,128 165,113 220,119 275,101 330,109 385,93 440,101 495,84 550,89 605,70 660,77 700,62"/></svg>
                </div>
              </div>
              <div className="dates"><span>22 Sep</span><span>25 Sep</span><span>28 Sep</span><span>1 Oct</span><span>5 Oct</span></div>
            </section>

            <section className="panel sleep-card">
              <Moon size={22}/>
              <h2>Sleep quality</h2>
              <div className="sleep-value">92<small>/100</small></div>
              <div className="bars">{[55,72,63,84,77,91,80].map((h,i)=><i style={{height:h+"%"}} key={i}/>)}</div>
              <div className="sleep-meta"><span>Avg. 7h 48m</span><b>+34m</b></div>
              <div className="stages"><span>● Deep 1h 42m</span><span>● REM 1h 51m</span></div>
            </section>
          </div>

          <div className="lower">
            <section className="panel insight">
              <div className="insight-icon"><Sparkle size={22}/></div>
              <div><div className="eyebrow">LOOP INTELLIGENCE</div><h2>Your recovery is trending up.</h2><p>HRV has increased for four consecutive days while resting heart rate has fallen. Today looks like a good window for higher cognitive load and normal training.</p><button className="text-btn" onClick={() => notify("Full insight view is coming next.")}>Explore insight <CaretRight/></button></div>
            </section>

            <section className="panel coach">
              <div className="panel-head"><div><h2>Ask LOOP</h2><span>Your private health copilot</span></div><Brain size={21}/></div>
              <div className="coach-msg">Your recovery is strong today. What would you like to understand?</div>
              <div className="chips">{["Why is recovery up?","Should I train today?","Improve my sleep"].map(x=><button key={x} onClick={()=>setQuestion(x)}>{x}</button>)}</div>
              <div className="ask"><input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Ask anything about your data..." /><button onClick={()=>notify(question ? "LOOP will answer from your connected data." : "Type a question first.")}>→</button></div>
            </section>
          </div>

          <section className="panel devices">
            <div className="panel-head"><div><h2>Connected ecosystem</h2><span>One private health model, multiple sources.</span></div><button className="text-btn" onClick={()=>notify("Device manager opened.")}>Manage all <CaretRight/></button></div>
            <div className="device-grid">{devices.map(([name,status,Icon])=><div className="device" key={name}><div className="device-icon"><Icon size={20}/></div><div><b>{name}</b><span>{status}</span></div>{name==="WHOOP"&&connected?<CheckCircle className="connected"/>:<Clock className="muted"/>}</div>)}</div>
          </section>

          <footer><span>LOOP 0.1 · Local-first health platform</span><span><ShieldCheck/> Your data is yours.</span></footer>
        </section>
      </main>
      {toast && <div className="toast"><CheckCircle size={17}/>{toast}</div>}
    </div>
  );
}

export default App;
