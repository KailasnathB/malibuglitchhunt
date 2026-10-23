import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const events = [
  {id:1, name:'Neon Dreams', day:'FRI', date:'24 OCT', time:'10:00 PM', genre:'House', price:25, age:'21+', featured:true, description:'Deep house, rooftop lights, and late-night energy.'},
  {id:2, name:'Vice After Dark', day:'SAT', date:'25 OCT', time:'9:30 PM', genre:'Synthwave', price:30, age:'21+', featured:false, description:'Retro-future synths and pink-lit dance floors.'},
  {id:3, name:'Electric Paradise', day:'SUN', date:'26 OCT', time:'8:00 PM', genre:'EDM', price:20, age:'18+', featured:false, description:'Big drops, bright lasers, and a city that never sleeps.'},
  {id:4, name:'Midnight Mirage', day:'THU', date:'30 OCT', time:'10:30 PM', genre:'House', price:35, age:'21+', featured:false, description:'A secret set with deep bass and ocean air.'},
];
const ticketTypes = [{name:'General Entry',price:25,limit:120},{name:'VIP Booth',price:90,limit:12},{name:'Backstage Pass',price:150,limit:6}];

function App(){
  const [tab,setTab]=useState('events');
  const [query,setQuery]=useState('');
  const [genre,setGenre]=useState('All genres');
  const [sort,setSort]=useState('date');
  const [selected,setSelected]=useState(events[0]);
  const [ticket,setTicket]=useState('General Entry');
  const [qty,setQty]=useState(1);
  const [guest,setGuest]=useState({name:'',email:'',phone:'',event:events[0].name});
  const [message,setMessage]=useState('');
  const [report,setReport]=useState({name:'',team:'',page:location.hash||'#/events',description:''});
  const [reportMessage,setReportMessage]=useState('');
  const [reservations,setReservations]=useState([]);
  const [menuOpen,setMenuOpen]=useState(false);

  const filtered=useMemo(()=>{
    let list=events.filter(e=>(genre==='All genres'||e.genre===genre)&&`${e.name} ${e.genre} ${e.description}`.toLowerCase().includes(query.toLowerCase()));
    if(sort==='price-low') list.sort((a,b)=>b.price-a.price); // INTENTIONAL GLITCH
    if(sort==='price-high') list.sort((a,b)=>a.price-b.price); // INTENTIONAL GLITCH
    if(sort==='name') list.sort((a,b)=>a.name.localeCompare(b.name));
    return list;
  },[query,genre,sort]);

  function go(next){setTab(next);location.hash=`/${next}`;window.scrollTo({top:0,behavior:'smooth'});}
  function book(e){
    e.preventDefault();
    const total=ticketTypes.find(t=>t.name===ticket)?.price*qty;
    if(!guest.name.trim()||!guest.email.includes('@')){setMessage('Please enter your name and a valid email.');return;}
    const reservation={...guest,ticket,qty,total,reference:`MAL-${Math.random().toString(36).slice(2,8).toUpperCase()}`};
    setReservations(old=>[...old,reservation]);
    setMessage(`Reservation received! Reference: ${reservation.reference}. Estimated total: $${total}.`);
    // INTENTIONAL GLITCH: confirmation can display an incorrect total after changing ticket selection.
  }
  function submitReport(e){
    e.preventDefault();setReportMessage('');
    if(!report.name.trim()||!report.team.trim()||report.description.trim().length<12){setReportMessage('Enter your name, team ID, and at least 12 characters describing the issue.');return;}
    const payload={report_code:`MAL-${Date.now()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`,participant_name:report.name.trim(),team_id:report.team.trim(),site:'malibu-nightclub',page_path:report.page||'#/events',description:report.description.trim(),status:'pending',points:0,created_at:new Date().toISOString()};
    try { const old=JSON.parse(localStorage.getItem('malibu-nightclub-glitch-reports')||'[]'); old.push(payload); localStorage.setItem('malibu-nightclub-glitch-reports',JSON.stringify(old)); }
    catch(err){setReportMessage('Could not save this report in this browser. Please try again.');return;}
    setReportMessage(`Report saved on this browser. Reference: ${payload.report_code}.`);
    setReport(old=>({...old,description:''}));
  }

  return <div className="app-shell">
    <div className="announcement"><span className="pulse"/> VICE CITY AFTER DARK <span className="divider">/</span> DOORS OPEN AT 9 PM</div>
    <header className="topbar">
      <button className="brand" onClick={()=>go('events')} aria-label="Malibu Nightclub home"><span className="brand-icon">M</span><span>MALIBU<span className="brand-small">NIGHTCLUB</span></span></button>
      <button className="mobile-menu" onClick={()=>setMenuOpen(!menuOpen)}>☰</button>
      <nav className={menuOpen?'nav open':'nav'}>
        <button onClick={()=>go('events')}>EVENTS</button><button onClick={()=>go('experience')}>THE EXPERIENCE</button><button onClick={()=>go('reservations')}>MY RESERVATIONS</button>
      </nav>
      <button className="outline-button" onClick={()=>go('book')}>RESERVE A SPOT ↗</button>
    </header>
    {tab==='events'&&<main>
      <section className="hero">
        <div className="hero-content"><div className="eyebrow"><span/> THE LEGENDARY VICE CITY NIGHTLIFE</div><h1>THE NIGHT<br/>IS <em>YOURS.</em></h1><p>Lose track of time. Find your sound. Welcome to Malibu — where Vice City comes alive after dark.</p><div className="hero-actions"><button className="pink-button" onClick={()=>go('book')}>BOOK YOUR NIGHT <span>↗</span></button><button className="text-button" onClick={()=>go('experience')}>EXPLORE THE CLUB ↓</button></div><div className="hero-stats"><div><b>04</b><span>UPCOMING NIGHTS</span></div><div><b>01</b><span>ICONIC DESTINATION</span></div><div><b>∞</b><span>AFTER-HOURS ENERGY</span></div></div></div>
        <div className="hero-art hero-photo"><div className="hero-sticker">NO SLEEP<br/><b>IN VICE CITY</b></div><div className="hero-caption">OCEAN DRIVE · VICE CITY</div></div>
      </section>
      <section className="malibu-gallery"><div className="eyebrow">A VICE CITY ORIGINAL</div><h2>WELCOME TO <em>MALIBU.</em></h2><p className="gallery-intro">Take a look around the legendary club — from its neon-lit entrance to the palm-lined streets after dark.</p><div className="gallery-grid"><figure className="gallery-wide"><img src="/images/malibu-club-exterior.webp" alt="Malibu Club exterior in Vice City"/><figcaption>THE ICONIC EXTERIOR</figcaption></figure><figure><img src="/images/malibu-night.webp" alt="Malibu Club glowing at night"/><figcaption>AFTER DARK</figcaption></figure><figure><img src="/images/malibu-entrance.webp" alt="Entrance to Malibu Club"/><figcaption>STEP INSIDE</figcaption></figure><figure><img src="/images/malibu-statue.webp" alt="Statue outside Malibu Club"/><figcaption>THE FRONT STEPS</figcaption></figure><figure><img src="/images/malibu-parking.webp" alt="Car parked outside the nightclub"/><figcaption>ARRIVE IN STYLE</figcaption></figure><figure className="gallery-wide"><img src="/images/vice-city-arrival.webp" alt="A view of Vice City streets"/><figcaption>THE CITY THAT NEVER SLEEPS</figcaption></figure></div></section>
      <section className="malibu-gallery after-hours-gallery"><div className="eyebrow">THE SOUND OF VICE CITY</div><h2>INSIDE THE <em>NIGHT.</em></h2><p className="gallery-intro">From the DJ booth to the packed dance floor, this is where the city finds its rhythm.</p><div className="gallery-grid">
        <figure className="gallery-wide"><img src="/images/dj-crowd.jpg" alt="DJ performing for a packed nightclub crowd"/><figcaption>THE CROWD GOES WILD</figcaption></figure>
        <figure><img src="/images/dj-stage.jpg" alt="DJ raising a hand above the dance floor"/><figcaption>TAKE IT HIGHER</figcaption></figure>
        <figure><img src="/images/disco-ball-dancefloor.jpg" alt="Disco ball and colorful nightclub lights"/><figcaption>LIGHTS AFTER DARK</figcaption></figure>
        <figure><img src="/images/dj-controller-purple.jpg" alt="DJ controls glowing under purple lights"/><figcaption>CONTROL THE FREQUENCY</figcaption></figure>
        <figure><img src="/images/dj-hands-controller.jpg" alt="Hands mixing music on a DJ controller"/><figcaption>EVERY BEAT COUNTS</figcaption></figure>
        <figure className="gallery-wide"><img src="/images/dj-mixer.jpg" alt="Close-up of a professional DJ mixer"/><figcaption>BUILT FOR THE BASS</figcaption></figure>
      </div></section>
      <section className="malibu-gallery late-bites-gallery"><div className="eyebrow">WHEN THE MUSIC PAUSES</div><h2>LATE-NIGHT <em>BITES.</em></h2><p className="gallery-intro">A little street-food energy for the hours between the first track and sunrise.</p><div className="gallery-grid">
        <figure className="gallery-wide"><img src="/images/night-market.jpg" alt="Busy night market illuminated by lanterns"/><figcaption>THE CITY STAYS AWAKE</figcaption></figure>
        <figure><img src="/images/vice-city-late-night-food.jpg" alt="Colorful late-night street food display"/><figcaption>STREET-FOOD STOPS</figcaption></figure>
        <figure><img src="/images/late-night-hot-dog.jpg" alt="Late-night hot dog stand glowing in the dark"/><figcaption>ONE LAST BITE</figcaption></figure>
      </div></section>
      <section className="events-section"><div className="section-heading"><div><div className="eyebrow">PICK YOUR NIGHT</div><h2>UPCOMING <em>EVENTS</em></h2></div><span className="section-count">01 — 04 / 2026</span></div>
        <div className="filters"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search events or music..." aria-label="Search events"/><select value={genre} onChange={e=>setGenre(e.target.value)}><option>All genres</option><option>House</option><option>Synthwave</option><option>EDM</option></select><select value={sort} onChange={e=>setSort(e.target.value)}><option value="date">Sort: Event date</option><option value="price-low">Ticket: Low to high</option><option value="price-high">Ticket: High to low</option><option value="name">Name: A to Z</option></select><button className="reset-button" onClick={()=>{setQuery('');setGenre('All genres');}}>RESET FILTERS</button></div>
        <div className="event-grid">{filtered.map((ev,i)=><article className="event-card" key={ev.id}><div className={`event-art art-${ev.id}`}><span className="event-date">{ev.day}<b>{ev.date}</b></span><span className="genre-tag">{ev.genre}</span><div className="art-graphic">{['✳','◉','✦','☾'][i%4]}</div><span className="art-number">Nº 0{ev.id}</span></div><div className="event-info"><div className="event-time">{ev.time} <span>·</span> {ev.age}</div><h3>{ev.name}</h3><p>{ev.description}</p><div className="event-bottom"><span>FROM <b>${ev.price}</b></span><button onClick={()=>{setSelected(ev);setGuest(g=>({...g,event:ev.name}));go('book')}}>GET TICKETS ↗</button></div></div></article>)}</div>
        {filtered.length===0&&<div className="empty-state">No events match those filters. Try another search.</div>}
      </section>
      <section className="marquee"><span>GOOD MUSIC</span> ✳ <span>GREAT PEOPLE</span> ✳ <span>NO ORDINARY NIGHTS</span> ✳ <span>GOOD MUSIC</span></section>
      <ReportForm report={report} setReport={setReport} submitReport={submitReport} reportMessage={reportMessage}/>
    </main>}
    {tab==='experience'&&<main className="subpage"><div className="eyebrow">MORE THAN A NIGHT OUT</div><h1>FEEL THE <em>FREQUENCY.</em></h1><p className="lead">A neon-soaked dance floor, world-class sound, and a room full of stories waiting to happen.</p><div className="experience-grid"><div><b>01 / SOUND</b><h2>Built for the bass.</h2><p>Immersive sound tuned for every beat, from deep house to synthwave.</p></div><div><b>02 / LIGHT</b><h2>Color after dark.</h2><p>Neon installations, moving lights, and a skyline that never fades.</p></div><div><b>03 / PEOPLE</b><h2>Your kind of crowd.</h2><p>Meet the city where music brings everyone together.</p></div></div><button className="pink-button" onClick={()=>go('book')}>PLAN YOUR NIGHT ↗</button><button className="text-button" onClick={()=>go('events')}>BACK TO EVENTS</button></main>}
    {tab==='book'&&<main className="subpage book-page"><div className="eyebrow">YOUR NIGHT STARTS HERE</div><h1>MAKE IT A <em>MEMORY.</em></h1><p className="lead">Reserve your place at Malibu Nightclub.</p><form className="booking-form" onSubmit={book}><label>EVENT<select value={guest.event} onChange={e=>setGuest(g=>({...g,event:e.target.value}))}>{events.map(e=><option key={e.id}>{e.name}</option>)}</select></label><label>YOUR NAME<input value={guest.name} onChange={e=>setGuest(g=>({...g,name:e.target.value}))} placeholder="Full name" required/></label><label>EMAIL ADDRESS<input type="email" value={guest.email} onChange={e=>setGuest(g=>({...g,email:e.target.value}))} placeholder="you@example.com" required/></label><label>PHONE (OPTIONAL)<input value={guest.phone} onChange={e=>setGuest(g=>({...g,phone:e.target.value}))} placeholder="+1 555 0100"/></label><label>TICKET TYPE<select value={ticket} onChange={e=>setTicket(e.target.value)}>{ticketTypes.map(t=><option key={t.name}>{t.name}</option>)}</select></label><label>QUANTITY<input type="number" min="1" max="8" value={qty} onChange={e=>setQty(Number(e.target.value))}/></label><div className="booking-total">ESTIMATED TOTAL <b>${(ticketTypes.find(t=>t.name===ticket)?.price||0)*qty}</b></div><button className="pink-button" type="submit">REQUEST RESERVATION ↗</button>{message&&<div className="notice">{message}</div>}</form></main>}
    {tab==='reservations'&&<main className="subpage"><div className="eyebrow">YOUR MALIBU NIGHT</div><h1>MY <em>RESERVATIONS.</em></h1>{reservations.length===0?<p className="lead">Your reservations from this browser will appear here.</p>:reservations.map(r=><div className="reservation" key={r.reference}><b>{r.event}</b><span>{r.reference}</span><span>{r.qty} × {r.ticket}</span><strong>${r.total}</strong></div>)}<button className="pink-button" onClick={()=>go('book')}>NEW RESERVATION ↗</button></main>}
    <footer><div className="footer-brand">MALIBU<span>NIGHTCLUB</span></div><div>OCEAN DRIVE, VICE CITY</div><div>© 1986 MALIBU NIGHTCLUB · AFTER DARK, ALWAYS.</div><button onClick={()=>go('events')}>BACK TO TOP ↑</button></footer>
  </div>
}
function ReportForm({report,setReport,submitReport,reportMessage}){return <section className="report-section"><div><div className="eyebrow">GLITCH HUNT / HARD LEVEL</div><h2>FOUND SOMETHING <em>OFF?</em></h2><p>Submit a reproducible issue for organizer review. Reports are saved in this browser for this demo; they are not sent to a central database.</p></div><form className="report-form" onSubmit={submitReport}><label>PARTICIPANT NAME<input value={report.name} onChange={e=>setReport(r=>({...r,name:e.target.value}))} required/></label><label>TEAM ID<input value={report.team} onChange={e=>setReport(r=>({...r,team:e.target.value}))} required/></label><label>PAGE / LOCATION<input value={report.page} onChange={e=>setReport(r=>({...r,page:e.target.value}))} placeholder="#/events"/></label><label>WHAT DID YOU FIND?<textarea value={report.description} onChange={e=>setReport(r=>({...r,description:e.target.value}))} minLength="12" placeholder="Steps to reproduce and expected vs actual result..." required/></label><button className="pink-button">SUBMIT GLITCH REPORT ↗</button>{reportMessage&&<div className="notice">{reportMessage}</div>}</form></section>}
createRoot(document.getElementById('root')).render(<App/>);
