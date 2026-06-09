import { useState, useEffect } from "react";

const TOUR = [
  { date: "2026-05-25", city: "Eindhoven", country: "NL", venue: "TBD" },
  { date: "2026-05-26", city: "Bayreuth", country: "DE", venue: "TBD" },
  { date: "2026-05-27", city: "OFF", country: "DE", venue: null },
  { date: "2026-05-28", city: "Stuttgart", country: "DE", venue: "TBD" },
  { date: "2026-05-29", city: "Barberaz", country: "FR", venue: "TBD" },
  { date: "2026-05-30", city: "Cassano D'Adda", country: "IT", venue: "TBD" },
  { date: "2026-06-11", city: "Fredericton", country: "NB", venue: "The Cap", radio: "CHSR 97.9 FM", radioEmail: "MusicDirector@chsrfm.ca" },
  { date: "2026-06-12", city: "Charlottetown", country: "PEI", venue: "Baba's Lounge", radio: "CBC Radio One PEI 96.1", radioEmail: "via cbc.ca/pei" },
  { date: "2026-06-14", city: "Moncton", country: "NB", venue: "The Caveau", radio: "Codiac 93.5 FM", radioEmail: "musique@codiacfm.ca" },
  { date: "2026-06-18", city: "Chicago", country: "IL", venue: "The Hideout", radio: "WLUW 88.7 FM", radioEmail: "musicdeptwluw@gmail.com" },
  { date: "2026-06-19", city: "Detroit", country: "MI", venue: "The Sanctuary", radio: "WDET 101.9 FM", radioEmail: "via wdet.org" },
  { date: "2026-06-21", city: "Gilbert", country: "PA", venue: "TBD" },
  { date: "2026-06-26", city: "Vancouver", country: "BC", venue: "TBD" },
  { date: "2026-06-27", city: "Winnipeg", country: "MB", venue: "TBD" },
  { date: "2026-07-17", city: "Edmonton", country: "AB", venue: "Temple", radio: "CKUA 94.9 FM", radioEmail: "via ckua.com" },
  { date: "2026-07-18", city: "Yellowknife", country: "NWT", venue: "TBD" },
  { date: "2026-08-07", city: "Tillsonburg", country: "ON", venue: "TBD" },
  { date: "2026-08-28", city: "Muskoka", country: "ON", venue: "TBD" },
  { date: "2026-09-25", city: "London", country: "ON", venue: "TBD" },
  { date: "2026-11-06", city: "Atlanta", country: "GA", venue: "TBD" },
  { date: "2026-11-07", city: "Charlotte", country: "NC", venue: "TBD" },
  { date: "2026-11-08", city: "Richmond", country: "VA", venue: "TBD" },
  { date: "2026-11-11", city: "Baltimore", country: "DC", venue: "TBD" },
  { date: "2026-11-12", city: "Philadelphia", country: "PA", venue: "TBD" },
  { date: "2026-11-13", city: "Boston", country: "MA", venue: "TBD" },
  { date: "2026-11-14", city: "Brooklyn", country: "NY", venue: "TBD" },
  { date: "2026-11-19", city: "Los Angeles", country: "CA", venue: "TBD" },
  { date: "2026-11-20", city: "Vancouver", country: "BC", venue: "TBD" },
  { date: "2026-11-21", city: "Seattle", country: "WA", venue: "TBD" },
];

const MORNING_STEPS = [
  { id: "m1", time: "10 min", title: "No phone", desc: "Shower. Coffee. Window. Let your nervous system wake up before the world hits it." },
  { id: "m2", time: "5 min", title: "Box breathing", desc: "Inhale 4. Hold 4. Exhale 4. Hold 4. Repeat. This is medicine — treat it like your Vyvanse." },
  { id: "m3", time: "5 min", title: "One honest sentence", desc: "How are you actually feeling right now. Notes app. Nobody sees it. Gets it out of your head." },
  { id: "m4", time: "10 min", title: "Move your body", desc: "10 pushups. Walk around the van. Parking lot. Anything. Just move." },
  { id: "m5", time: "5 min", title: "One real good thing", desc: "Something specific and true about today. Not generic. Something real." },
];

const NIGHT_STEPS = [
  { id: "n1", title: "Eat a real meal", desc: "Before anything else. Protein. This is the most important meal of your day." },
  { id: "n2", title: "Facial routine", desc: "You're already doing this. Keep it. It's grounding." },
  { id: "n3", title: "Back up footage", desc: "20 minute timer. When it goes off, close the laptop." },
  { id: "n4", title: "Phone across the room", desc: "Not face down beside you. Across the room. Make reaching for it an act." },
  { id: "n5", title: "One sentence written", desc: "Whatever is loudest in your head. Externalize it." },
  { id: "n6", title: "Box breathing", desc: "Same as morning. 5 minutes. Then sleep." },
];

const CRISIS_STEPS = [
  { id: "c1", title: "Don't reach for the phone first", desc: "It's across the room. That distance is intentional." },
  { id: "c2", title: "Box breathing first", desc: "5 minutes before anything else." },
  { id: "c3", title: "Write one sentence", desc: "Whatever is loudest. Get it out of your head." },
  { id: "c4", title: "If ideations come", desc: "Text 988. Both are here.", crisis: true },
];

const VISION = [
  { year: "NOW → 18 MONTHS", color: "#ffd732", items: ["Sell out every show", "100K across TikTok / IG / YouTube", "Record written and made", "Mando sync conversation started", "Team becomes affordable"] },
  { year: "YEAR 3", color: "#ff6b35", items: ["Larger than Turnstile", "Large theatre touring internationally", "Big features + major syncs", "Record out and working", "Burn Industry label seeded with 5 artists"] },
  { year: "YEAR 5", color: "#e8192c", items: ["18,000 capacity at home", "Coachella top liner", "Solo film released", "Music/creative agency running", "Multi-millionaire"] },
];

const BUMPER_TEMPLATES = [
  (city, station, venue, date) => `Hey, this is Denz from The OBGMs. You're listening to ${station}. We're playing ${venue} in ${city} on ${date}. Come through.`,
  (city, station, venue, date) => `What's up ${city}, Denz from The OBGMs on ${station}. We just finished tearing through Europe and we're bringing everything to ${venue} on ${date}. See you there.`,
  (city, station, venue, date) => `Hey ${city}, Denz from The OBGMs on ${station}. We built this band for people who look out for each other. Come find your people at ${venue} on ${date}.`,
];

const OPS_TASKS = [
  "Email Mando re: sync opportunities",
  "Follow up on advance for next show",
  "SOCAN registration — last 3 shows",
  "Check ticket sales for next 3 markets",
  "Email promoter: request logo + marketing budget",
  "Confirm accommodations next city",
  "Follow up outstanding contracts",
  "Check in with bandmates on logistics",
  "Send merch inventory update",
  "Invoice outstanding guarantees",
  "Follow up with Rough Trade contact",
  "Check Killphonic status",
];

const CONTENT_TASKS = [
  "Edit one clip from last night — post today",
  "Film a van moment — raw, 30 seconds",
  "Post geo-targeted promo for show in 14 days",
  "Schedule one post for the week ahead",
  "Record a 15-second vocal warmup clip",
  "Caption and post a still from last night",
  "Film load-in at tonight's venue",
  "Post one story from soundcheck",
  "Create one piece of content for next major market",
  "Film a day on tour reel — no polish needed",
  "Post city-specific ticket link in bio",
  "Respond to 10 comments — build community",
];

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function formatDate(str) {
  const [,m,d] = str.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(m)-1]} ${parseInt(d)}`;
}

function daysUntil(dateStr) {
  const today = new Date(); today.setHours(0,0,0,0);
  const target = new Date(dateStr); target.setHours(0,0,0,0);
  return Math.round((target - today) / 86400000);
}

function getShowForDate(dateStr) {
  return TOUR.find(s => s.date === dateStr && s.city !== 'OFF');
}

function getNextShows(n = 3) {
  const today = todayStr();
  return TOUR.filter(s => s.date >= today && s.city !== 'OFF').slice(0, n);
}

function getTwoWeekShow() {
  return getNextShows(10).find(s => daysUntil(s.date) >= 10 && daysUntil(s.date) <= 18);
}

function getDailyTask(list, offset = 0) {
  const d = new Date();
  const idx = (d.getDate() * 7 + d.getMonth() * 31 + offset) % list.length;
  return list[idx];
}

export default function App() {
  const [mode, setMode] = useState('morning');
  const [morningDone, setMorningDone] = useState({});
  const [nightDone, setNightDone] = useState({});
  const [crisisDone, setCrisisDone] = useState({});
  const [opsDone, setOpsDone] = useState(false);
  const [contentDone, setContentDone] = useState(false);
  const [extraTasks, setExtraTasks] = useState([]);
  const [extraDone, setExtraDone] = useState({});
  const [bumperCity, setBumperCity] = useState(null);
  const [bumperVer, setBumperVer] = useState(0);
  const [copied, setCopied] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [showCrisis, setShowCrisis] = useState(false);

  const today = todayStr();
  const todayShow = getShowForDate(today);
  const nextShows = getNextShows(3);
  const twoWeekShow = getTwoWeekShow();
  const opsTask = getDailyTask(OPS_TASKS, 0);
  const contentTask = getDailyTask(CONTENT_TASKS, 5);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('bi_dash_' + today) || '{}');
      if (saved.morningDone) setMorningDone(saved.morningDone);
      if (saved.nightDone) setNightDone(saved.nightDone);
      if (saved.opsDone) setOpsDone(saved.opsDone);
      if (saved.contentDone) setContentDone(saved.contentDone);
      if (saved.extraTasks) setExtraTasks(saved.extraTasks);
      if (saved.extraDone) setExtraDone(saved.extraDone);
    } catch(e) {}
    setTimeout(() => setLoaded(true), 80);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem('bi_dash_' + today, JSON.stringify({ morningDone, nightDone, opsDone, contentDone, extraTasks, extraDone }));
    } catch(e) {}
  }, [morningDone, nightDone, opsDone, contentDone, extraTasks, extraDone, loaded]);

  const morningCount = Object.values(morningDone).filter(Boolean).length;
  const nightCount = Object.values(nightDone).filter(Boolean).length;
  const workDone = opsDone && contentDone;

  function unlockExtra() {
    const remaining = [...OPS_TASKS, ...CONTENT_TASKS]
      .filter(t => t !== opsTask && t !== contentTask)
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
    setExtraTasks(remaining);
  }

  function copyText(text, key) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(''), 2000);
    }).catch(() => {});
  }

  const C = { bg:'#080808', card:'#111', border:'#1e1e1e', gold:'#ffd732', orange:'#ff6b35', red:'#e8192c', blue:'#7eb8f7', text:'#f0ece0', muted:'#666', dim:'#2a2a2a' };
  const days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const now = new Date();

  const base = { fontFamily:"'Courier New',Courier,monospace", boxSizing:'border-box' };
  const card = { ...base, background:C.card, border:`1px solid ${C.border}`, borderRadius:4, padding:16, marginBottom:10 };
  const label = { fontSize:9, letterSpacing:'0.35em', color:C.muted, marginBottom:6, textTransform:'uppercase' };
  const navBtn = (active) => ({ ...base, padding:'7px 12px', borderRadius:3, border:`1px solid ${active?C.gold:C.border}`, background:active?C.gold:'transparent', color:active?'#080808':C.muted, fontSize:10, letterSpacing:'0.2em', fontWeight:700, cursor:'pointer', whiteSpace:'nowrap' });
  const check = (done, color) => ({ width:28, height:28, borderRadius:'50%', border:`2px solid ${done?color:C.dim}`, background:done?color:'transparent', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0, transition:'all 0.2s' });
  const btnFull = (color) => ({ ...base, padding:'10px 18px', background:color, border:`1px solid ${color}`, color:'#080808', fontSize:10, letterSpacing:'0.25em', fontWeight:700, cursor:'pointer', borderRadius:3 });
  const btnOut = (color) => ({ ...base, padding:'10px 18px', background:'transparent', border:`1px solid ${color}`, color, fontSize:10, letterSpacing:'0.25em', fontWeight:700, cursor:'pointer', borderRadius:3 });

  return (
    <div style={{ minHeight:'100vh', background:C.bg, color:C.text, paddingBottom:80, ...base }}>

      {/* HEADER */}
      <div style={{ padding:'24px 20px 0', opacity:loaded?1:0, transition:'opacity 0.5s' }}>
        <div style={{ fontSize:9, letterSpacing:'0.45em', color:C.muted, marginBottom:6 }}>BURN INDUSTRY / THE OBGMS</div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:16 }}>
          <div>
            <span style={{ fontSize:38, fontWeight:900, letterSpacing:'-0.03em' }}>{days[now.getDay()]}</span>
            <span style={{ fontSize:38, fontWeight:900, color:C.gold, marginLeft:8 }}>{now.getDate()}</span>
            <span style={{ fontSize:13, color:C.muted, marginLeft:8, letterSpacing:'0.2em' }}>{months[now.getMonth()]}</span>
          </div>
          {todayShow ? (
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:9, letterSpacing:'0.3em', color:C.gold, marginBottom:3 }}>TONIGHT</div>
              <div style={{ fontSize:15, fontWeight:700 }}>{todayShow.city}</div>
              {todayShow.venue && todayShow.venue !== 'TBD' && <div style={{ fontSize:11, color:C.muted }}>{todayShow.venue}</div>}
            </div>
          ) : (
            <div style={{ textAlign:'right' }}>
              <div style={{ fontSize:9, letterSpacing:'0.3em', color:C.muted, marginBottom:3 }}>NEXT SHOW</div>
              {nextShows[0] && <div style={{ fontSize:13, fontWeight:700 }}>{nextShows[0].city} — {formatDate(nextShows[0].date)}</div>}
            </div>
          )}
        </div>

        {/* STATUS */}
        <div style={{ display:'flex', gap:8, marginBottom:4 }}>
          {[
            { label:'MORNING', count:morningCount, total:MORNING_STEPS.length, color:C.gold },
            { label:'WORK', count:(opsDone?1:0)+(contentDone?1:0), total:2, color:C.orange },
            { label:'NIGHT', count:nightCount, total:NIGHT_STEPS.length, color:C.blue },
          ].map(b => (
            <div key={b.label} style={{ flex:1, background:C.card, border:`1px solid ${b.count===b.total?b.color:C.border}`, borderRadius:3, padding:'8px 10px', transition:'border-color 0.3s' }}>
              <div style={{ ...label, marginBottom:3 }}>{b.label}</div>
              <div style={{ fontSize:14, fontWeight:700, color:b.count===b.total?b.color:C.text }}>{b.count}/{b.total}</div>
            </div>
          ))}
        </div>
      </div>

      {/* NAV */}
      <div style={{ display:'flex', gap:6, padding:'14px 20px', overflowX:'auto', borderBottom:`1px solid ${C.border}`, marginTop:16 }}>
        {[['morning','MORNING'],['work','WORK'],['night','NIGHT'],['vision','VISION'],['bumpers','BUMPERS'],['outreach','OUTREACH']].map(([key,lbl]) => (
          <button key={key} style={navBtn(mode===key)} onClick={() => setMode(key)}>{lbl}</button>
        ))}
      </div>

      <div style={{ padding:'20px 20px 0' }}>

        {/* ── MORNING ── */}
        {mode === 'morning' && <>
          <div style={{ ...card, borderLeft:`3px solid ${C.gold}` }}>
            <div style={{ ...label, color:C.gold }}>MORNING PROTOCOL</div>
            <div style={{ fontSize:12, color:C.muted }}>Starts when you start moving. Not at a clock time.</div>
          </div>
          {MORNING_STEPS.map(step => (
            <div key={step.id} style={{ display:'flex', gap:12, alignItems:'flex-start', padding:'14px 0', borderBottom:`1px solid ${C.border}`, opacity:morningDone[step.id]?0.4:1, transition:'opacity 0.3s', cursor:'pointer' }}
              onClick={() => setMorningDone(p => ({...p,[step.id]:!p[step.id]}))}>
              <div style={check(morningDone[step.id], C.gold)}>
                {morningDone[step.id] && <span style={{ fontSize:12, color:'#080808', fontWeight:900 }}>✓</span>}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', gap:8, alignItems:'baseline', marginBottom:4 }}>
                  <span style={{ fontSize:13, fontWeight:700 }}>{step.title}</span>
                  <span style={{ fontSize:10, color:C.muted }}>{step.time}</span>
                </div>
                <div style={{ fontSize:12, color:C.muted, lineHeight:1.6 }}>{step.desc}</div>
              </div>
            </div>
          ))}
          {morningCount === MORNING_STEPS.length && (
            <div style={{ ...card, borderColor:C.gold, textAlign:'center', marginTop:12 }}>
              <div style={{ fontSize:14, color:C.gold, fontWeight:700, letterSpacing:'0.15em' }}>MORNING DONE.</div>
              <div style={{ fontSize:11, color:C.muted, marginTop:4 }}>Go to WORK.</div>
            </div>
          )}
        </>}

        {/* ── WORK ── */}
        {mode === 'work' && <>
          {twoWeekShow && (
            <div style={{ ...card, borderLeft:`3px solid ${C.orange}` }}>
              <div style={{ ...label, color:C.orange }}>2-WEEK CONTENT TARGET</div>
              <div style={{ fontSize:14, fontWeight:700 }}>{twoWeekShow.city} — {formatDate(twoWeekShow.date)}</div>
              <div style={{ fontSize:11, color:C.muted, marginTop:3 }}>Content you make today should target this market.</div>
            </div>
          )}

          {/* OPS TASK */}
          <div style={{ ...card, border:`1px solid ${opsDone?C.dim:C.border}`, background:opsDone?'#0a0a0a':C.card, transition:'all 0.3s' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
              <div>
                <div style={{ ...label, color:C.gold }}>OPERATIONS</div>
                <div style={{ fontSize:9, color:C.muted, letterSpacing:'0.2em' }}>1 HR MAX — THEN CLOSE IT</div>
              </div>
              <div style={check(opsDone, C.gold)} onClick={() => setOpsDone(!opsDone)}>
                {opsDone && <span style={{ fontSize:11, color:'#080808', fontWeight:900 }}>✓</span>}
              </div>
            </div>
            <div style={{ fontSize:14, color:opsDone?C.muted:C.text, textDecoration:opsDone?'line-through':'none', lineHeight:1.5 }}>{opsTask}</div>
          </div>

          {/* CONTENT TASK */}
          <div style={{ ...card, border:`1px solid ${contentDone?C.dim:C.border}`, background:contentDone?'#0a0a0a':C.card, transition:'all 0.3s' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
              <div>
                <div style={{ ...label, color:C.orange }}>CONTENT</div>
                <div style={{ fontSize:9, color:C.muted, letterSpacing:'0.2em' }}>ONE DELIVERABLE — DONE MEANS DONE</div>
              </div>
              <div style={check(contentDone, C.orange)} onClick={() => setContentDone(!contentDone)}>
                {contentDone && <span style={{ fontSize:11, color:'#080808', fontWeight:900 }}>✓</span>}
              </div>
            </div>
            <div style={{ fontSize:14, color:contentDone?C.muted:C.text, textDecoration:contentDone?'line-through':'none', lineHeight:1.5 }}>{contentTask}</div>
          </div>

          {/* RECORD LOCKED */}
          <div style={{ ...card, opacity:0.35 }}>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              <div><div style={label}>RECORD</div><div style={{ fontSize:12, color:C.muted, fontStyle:'italic' }}>Not on tour. Protect it.</div></div>
              <div style={{ fontSize:9, letterSpacing:'0.2em', color:C.dim, alignSelf:'center' }}>LOCKED</div>
            </div>
          </div>

          {workDone && extraTasks.length === 0 && (
            <div style={{ textAlign:'center', padding:'16px 0' }}>
              <button style={btnFull(C.gold)} onClick={unlockExtra}>UNLOCK MORE TASKS</button>
            </div>
          )}

          {extraTasks.length > 0 && (
            <div style={{ marginTop:16 }}>
              <div style={{ ...label, marginBottom:12 }}>BONUS — ONLY IF YOU HAVE ENERGY</div>
              {extraTasks.map((task, i) => (
                <div key={i} style={{ ...card, background:extraDone[i]?'#0a0a0a':C.card, marginBottom:8 }}>
                  <div style={{ display:'flex', gap:10, alignItems:'flex-start', cursor:'pointer' }} onClick={() => setExtraDone(p => ({...p,[i]:!p[i]}))}>
                    <div style={check(extraDone[i], C.muted)}>
                      {extraDone[i] && <span style={{ fontSize:10, color:'#080808', fontWeight:900 }}>✓</span>}
                    </div>
                    <div style={{ fontSize:13, color:extraDone[i]?C.muted:C.text, textDecoration:extraDone[i]?'line-through':'none', paddingTop:4, lineHeight:1.5 }}>{task}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>}

        {/* ── NIGHT ── */}
        {mode === 'night' && <>
          {nextShows.length > 0 && (
            <div style={{ ...card, borderLeft:`3px solid ${C.blue}` }}>
              <div style={{ ...label, color:C.blue }}>COMING UP</div>
              {nextShows.map((show, i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', marginBottom:6, opacity:i===0?1:0.45 }}>
                  <div style={{ fontSize:i===0?14:12, fontWeight:i===0?700:400 }}>{show.city}{show.venue && show.venue!=='TBD'?` — ${show.venue}`:''}</div>
                  <div style={{ fontSize:11, color:C.muted }}>{formatDate(show.date)}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ ...card, borderLeft:`3px solid ${C.blue}` }}>
            <div style={{ ...label, color:C.blue }}>NIGHT PROTOCOL</div>
            <div style={{ fontSize:12, color:C.muted }}>After load out and fans. In this order.</div>
          </div>

          {NIGHT_STEPS.map(step => (
            <div key={step.id} style={{ display:'flex', gap:12, alignItems:'flex-start', padding:'14px 0', borderBottom:`1px solid ${C.border}`, opacity:nightDone[step.id]?0.4:1, transition:'opacity 0.3s', cursor:'pointer' }}
              onClick={() => setNightDone(p => ({...p,[step.id]:!p[step.id]}))}>
              <div style={check(nightDone[step.id], C.blue)}>
                {nightDone[step.id] && <span style={{ fontSize:12, color:'#080808', fontWeight:900 }}>✓</span>}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700, marginBottom:4 }}>{step.title}</div>
                <div style={{ fontSize:12, color:C.muted, lineHeight:1.6 }}>{step.desc}</div>
              </div>
            </div>
          ))}

          <div style={{ marginTop:16 }}>
            <button style={{ ...btnOut(C.red), width:'100%', padding:14 }} onClick={() => setShowCrisis(!showCrisis)}>
              {showCrisis ? '▲ CLOSE 2AM PROTOCOL' : '2AM PROTOCOL'}
            </button>
          </div>

          {showCrisis && (
            <div style={{ ...card, borderColor:C.red, marginTop:8 }}>
              <div style={{ ...label, color:C.red }}>IF YOU WAKE AT 2AM</div>
              {CRISIS_STEPS.map(step => (
                <div key={step.id} style={{ display:'flex', gap:12, alignItems:'flex-start', padding:'14px 0', borderBottom:`1px solid ${step.crisis?C.red:C.border}`, cursor:'pointer' }}
                  onClick={() => setCrisisDone(p => ({...p,[step.id]:!p[step.id]}))}>
                  <div style={check(crisisDone[step.id], C.red)}>
                    {crisisDone[step.id] && <span style={{ fontSize:11, color:'#fff', fontWeight:900 }}>✓</span>}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:step.crisis?C.red:C.text, marginBottom:3 }}>{step.title}</div>
                    <div style={{ fontSize:12, color:C.muted, lineHeight:1.5 }}>{step.desc}</div>
                    {step.crisis && (
                      <a href="sms:988" style={{ display:'inline-block', marginTop:10, padding:'10px 18px', background:C.red, color:'#fff', fontSize:10, letterSpacing:'0.25em', fontWeight:700, borderRadius:3, textDecoration:'none', ...base }}>
                        TEXT 988 NOW
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>}

        {/* ── VISION ── */}
        {mode === 'vision' && <>
          <div style={{ ...card, borderLeft:`3px solid ${C.gold}`, marginBottom:20 }}>
            <div style={{ ...label, color:C.gold }}>THE MISSION</div>
            <div style={{ fontSize:13, color:C.muted, lineHeight:1.7, fontStyle:'italic' }}>"Protecting each other because the government won't."</div>
          </div>

          {VISION.map((v, i) => (
            <div key={i} style={{ ...card, borderLeft:`3px solid ${v.color}`, marginBottom:10 }}>
              <div style={{ ...label, color:v.color }}>{v.year}</div>
              {v.items.map((item, j) => (
                <div key={j} style={{ display:'flex', gap:8, marginBottom:6 }}>
                  <span style={{ color:v.color, flexShrink:0 }}>→</span>
                  <span style={{ fontSize:13, color:C.muted, lineHeight:1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}

          <div style={{ ...card, marginTop:8 }}>
            <div style={{ ...label, marginBottom:12 }}>FULL TOUR — {TOUR.filter(s=>s.city!=='OFF').length} SHOWS</div>
            {TOUR.map((show, i) => {
              const d = daysUntil(show.date);
              const isPast = d < 0;
              const isToday = d === 0;
              return (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'5px 0', borderBottom:`1px solid ${C.border}`, opacity:isPast?0.25:1 }}>
                  <div style={{ fontSize:12, color:isToday?C.gold:show.city==='OFF'?C.dim:C.text, fontWeight:isToday?700:400 }}>
                    {show.city==='OFF' ? '— OFF —' : show.city}
                    {show.country && show.city!=='OFF' && <span style={{ fontSize:10, color:C.muted, marginLeft:6 }}>{show.country}</span>}
                  </div>
                  <div style={{ fontSize:11, color:isToday?C.gold:C.muted }}>
                    {isToday?'TONIGHT':formatDate(show.date)}
                  </div>
                </div>
              );
            })}
          </div>
        </>}

        {/* ── BUMPERS ── */}
        {mode === 'bumpers' && <>
          <div style={{ ...card, borderLeft:`3px solid ${C.orange}` }}>
            <div style={{ ...label, color:C.orange }}>RADIO BUMPERS</div>
            <div style={{ fontSize:12, color:C.muted, lineHeight:1.6 }}>One quiet recording session. All cities. Send with every radio email.</div>
          </div>

          <div style={{ ...label, marginBottom:10 }}>SELECT CITY</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:20 }}>
            {TOUR.filter(s => s.radio && s.city !== 'OFF').map((show, i) => (
              <button key={i}
                style={{ ...base, padding:'6px 12px', borderRadius:3, border:`1px solid ${bumperCity?.city===show.city?C.orange:C.border}`, background:bumperCity?.city===show.city?C.orange:'transparent', color:bumperCity?.city===show.city?'#080808':C.muted, fontSize:10, letterSpacing:'0.2em', cursor:'pointer' }}
                onClick={() => { setBumperCity(show); setBumperVer(0); }}
              >{show.city}</button>
            ))}
          </div>

          {bumperCity && (
            <div style={card}>
              <div style={{ ...label, color:C.orange }}>{bumperCity.city.toUpperCase()} — {bumperCity.radio}</div>
              <div style={{ display:'flex', gap:6, marginBottom:14 }}>
                {[0,1,2].map(v => (
                  <button key={v} style={{ ...base, padding:'5px 10px', borderRadius:3, border:`1px solid ${bumperVer===v?C.gold:C.border}`, background:bumperVer===v?C.gold:'transparent', color:bumperVer===v?'#080808':C.muted, fontSize:10, cursor:'pointer' }} onClick={() => setBumperVer(v)}>V{v+1}</button>
                ))}
              </div>
              <div style={{ background:'#0a0a0a', border:`1px solid ${C.border}`, borderRadius:3, padding:14, fontSize:13, lineHeight:1.7, color:C.text, fontStyle:'italic', marginBottom:12 }}>
                "{BUMPER_TEMPLATES[bumperVer](bumperCity.city, bumperCity.radio, bumperCity.venue!=='TBD'?bumperCity.venue:'the venue', formatDate(bumperCity.date))}"
              </div>
              <button style={btnFull(C.gold)} onClick={() => copyText(BUMPER_TEMPLATES[bumperVer](bumperCity.city, bumperCity.radio, bumperCity.venue!=='TBD'?bumperCity.venue:'the venue', formatDate(bumperCity.date)), 'bumper')}>
                {copied==='bumper'?'COPIED ✓':'COPY SCRIPT'}
              </button>
              <div style={{ marginTop:12, fontSize:11, color:C.muted, borderLeft:`2px solid ${C.border}`, paddingLeft:10 }}>
                Send to: {bumperCity.radioEmail}
              </div>
            </div>
          )}

          {!bumperCity && <div style={{ fontSize:12, color:C.muted, fontStyle:'italic' }}>Select a city above.</div>}
        </>}

        {/* ── OUTREACH ── */}
        {mode === 'outreach' && <>
          <div style={{ ...card, borderLeft:`3px solid ${C.gold}` }}>
            <div style={{ ...label, color:C.gold }}>OUTREACH RULE</div>
            <div style={{ fontSize:12, color:C.muted, lineHeight:1.6 }}>Every city you play in 14 days gets outreach today. Promoter first. Then radio. Then press.</div>
          </div>

          <div style={{ ...label, marginBottom:10 }}>NEEDS OUTREACH NOW</div>
          {TOUR.filter(s => s.city!=='OFF' && daysUntil(s.date) > 0 && daysUntil(s.date) <= 21).map((show, i) => (
            <div key={i} style={card}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                <div>
                  <div style={{ fontSize:15, fontWeight:700 }}>{show.city}</div>
                  <div style={{ fontSize:11, color:C.muted }}>{formatDate(show.date)} · {show.venue && show.venue!=='TBD'?show.venue:'venue TBD'}</div>
                </div>
                <div style={{ fontSize:11, color:daysUntil(show.date)<=7?C.red:C.orange, fontWeight:700 }}>{daysUntil(show.date)}D</div>
              </div>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                {['PROMOTER','RADIO','PRESS','LOCAL BAND'].map(type => (
                  <div key={type} style={{ fontSize:9, letterSpacing:'0.15em', padding:'3px 8px', border:`1px solid ${C.border}`, borderRadius:2, color:C.muted }}>{type}</div>
                ))}
              </div>
              {show.radio && (
                <div style={{ marginTop:10, fontSize:11, color:C.muted, borderTop:`1px solid ${C.border}`, paddingTop:8 }}>
                  Radio: {show.radio} — {show.radioEmail}
                </div>
              )}
            </div>
          ))}

          {TOUR.filter(s => s.city!=='OFF' && daysUntil(s.date) > 0 && daysUntil(s.date) <= 21).length === 0 && (
            <div style={{ fontSize:12, color:C.muted, fontStyle:'italic', paddingBottom:16 }}>No shows in the next 21 days.</div>
          )}

          <div style={{ ...label, marginBottom:10, marginTop:20 }}>PROMOTER TEMPLATE</div>
          <div style={card}>
            <div style={{ background:'#0a0a0a', border:`1px solid ${C.border}`, borderRadius:3, padding:14, fontSize:13, lineHeight:1.8, color:C.text, whiteSpace:'pre-wrap', marginBottom:12 }}>
{`Hey [name],

Here's where I'm at on my end for [city] on [date]:

I'm pushing content targeting this market this week. I can have co-branded assets ready as soon as you send the venue logo.

What's your marketing budget for this show and who are your go-to local media contacts?

Denz — The OBGMs`}
            </div>
            <button style={btnFull(C.gold)} onClick={() => copyText(`Hey [name],\n\nHere's where I'm at on my end for [city] on [date]:\n\nI'm pushing content targeting this market this week. I can have co-branded assets ready as soon as you send the venue logo.\n\nWhat's your marketing budget for this show and who are your go-to local media contacts?\n\nDenz — The OBGMs`, 'promo')}>
              {copied==='promo'?'COPIED ✓':'COPY TEMPLATE'}
            </button>
          </div>
        </>}

      </div>
    </div>
  );
}
