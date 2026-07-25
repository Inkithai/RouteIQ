import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Check,
  ChevronRight,
  Clock3,
  CloudCog,
  Fuel,
  Gauge,
  Globe2,
  LockKeyhole,
  MapPinned,
  Play,
  Route,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

const partners = ["NORTHSTAR", "ARROW FREIGHT", "CARGOLINE", "MERIDIAN", "VELOCITY", "WILLOW"];

function RouteDashboard() {
  return (
    <div className="dashboard-shell" aria-label="RouteIQ route optimization dashboard preview">
      <div className="dashboard-topbar">
        <div className="dashboard-brand"><span className="mini-mark"><Route size={13} /></span> RouteIQ <span className="dashboard-divider" /> Command center</div>
        <div className="dashboard-status"><span className="status-dot" /> Live optimization</div>
        <div className="dashboard-avatar">AK</div>
      </div>
      <div className="dashboard-body">
        <aside className="dashboard-sidebar">
          <span className="side-active"><MapPinned size={15} /> Overview</span>
          <span><Route size={15} /> Routes</span>
          <span><UsersRound size={15} /> Fleet</span>
          <span><BarChart3 size={15} /> Analytics</span>
        </aside>
        <div className="map-stage">
          <div className="map-label map-label-a">Chicago, IL</div>
          <div className="map-label map-label-b">Evanston</div>
          <div className="map-label map-label-c">Oak Park</div>
          <svg viewBox="0 0 720 440" className="route-map" role="img" aria-label="Optimized delivery routes across Chicago">
            <path className="road road-one" d="M-20 306 C104 264 178 365 282 295 S441 226 526 295 S643 326 748 216" />
            <path className="road road-two" d="M73 -10 C170 77 118 151 245 193 S395 166 490 91 S605 46 755 108" />
            <path className="road road-three" d="M-10 167 C96 131 194 200 302 132 S472 77 568 166 S670 245 746 247" />
            <path className="route-line route-line-one" d="M80 315 C155 261 201 329 276 284 S376 204 446 252 S544 290 621 202" />
            <path className="route-line route-line-two" d="M160 100 C216 133 245 184 318 151 S440 108 477 153 S550 188 601 150" />
            <circle className="map-node origin" cx="80" cy="315" r="10" />
            <circle className="map-node" cx="276" cy="284" r="7" />
            <circle className="map-node" cx="446" cy="252" r="7" />
            <circle className="map-node" cx="621" cy="202" r="10" />
            <circle className="map-node" cx="160" cy="100" r="8" />
            <circle className="map-node" cx="318" cy="151" r="7" />
            <circle className="map-node" cx="477" cy="153" r="7" />
            <circle className="map-node" cx="601" cy="150" r="8" />
            <g className="vehicle vehicle-one"><rect x="358" y="213" rx="4" width="25" height="15" /><circle cx="365" cy="230" r="3" /><circle cx="377" cy="230" r="3" /></g>
          </svg>
          <div className="map-pulse"><span /> Optimizing 32 stops</div>
          <div className="map-zoom"><button aria-label="Zoom in">+</button><button aria-label="Zoom out">−</button></div>
        </div>
        <aside className="dashboard-panel">
          <div className="panel-heading"><span>Today&apos;s routes</span><button>View all</button></div>
          <div className="route-row"><span className="route-color green" /><div><b>Midwest 04</b><small>12 stops · 98% on time</small></div><strong>09:42</strong></div>
          <div className="route-row"><span className="route-color blue" /><div><b>West Loop 02</b><small>8 stops · In transit</small></div><strong>10:16</strong></div>
          <div className="route-row"><span className="route-color purple" /><div><b>North Shore 07</b><small>12 stops · Ready to go</small></div><strong>11:05</strong></div>
          <div className="panel-insight"><Sparkles size={15} /><span><b>AI suggestion</b> Consolidate 2 stops to save 18 min.</span><ChevronRight size={15} /></div>
        </aside>
      </div>
    </div>
  );
}

function SectionTag({ children }) {
  return <p className="section-tag"><span />{children}</p>;
}

export default function Home() {
  return (
    <main className="routeiq-home">
      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />
        <div className="shell hero-content">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse-ring" /> AI-powered fleet intelligence</div>
            <h1>Every route.<br /><em>Optimized</em> in seconds.</h1>
            <p className="hero-lede">RouteIQ turns live fleet data into the most efficient plan for every delivery—so you spend less on the road and deliver more on time.</p>
            <div className="hero-actions">
              <Link to="/Signup" className="button-primary">Start optimizing free <ArrowRight size={17} /></Link>
              <a href="#demo" className="button-secondary"><span className="play-icon"><Play size={12} fill="currentColor" /></span> Watch 2-min demo</a>
            </div>
            <div className="hero-proof"><div className="avatars"><i>MA</i><i>SL</i><i>JK</i><i>+</i></div><span>Trusted by <b>500+ teams</b> moving what matters</span></div>
          </div>
          <div className="hero-visual">
            <div className="float-card savings-card"><span className="float-icon"><Fuel size={16} /></span><div><small>Fuel saved this month</small><strong>$18,420</strong><em>+24.8%</em></div></div>
            <RouteDashboard />
            <div className="float-card eta-card"><span className="eta-check"><Check size={16} /></span><div><small>On-time arrivals</small><strong>98.4%</strong></div><span className="tiny-chart">⌁</span></div>
          </div>
        </div>
        <div className="shell logo-strip"><span>Powering smarter operations at</span>{partners.map((partner) => <b key={partner}>{partner}</b>)}</div>
      </section>

      <section className="metrics-section" aria-label="RouteIQ performance metrics">
        <div className="shell metric-grid">
          <div><strong>2.4M<span>+</span></strong><p>routes optimized</p></div>
          <div><strong>31<span>%</span></strong><p>average cost reduction</p></div>
          <div><strong>98.4<span>%</span></strong><p>on-time deliveries</p></div>
          <div><strong>14,832</strong><p>routes optimized today <span className="live-dot" /></p></div>
        </div>
      </section>

      <section className="section light-section" id="platform">
        <div className="shell">
          <div className="section-heading centered"><SectionTag>Built for the moving world</SectionTag><h2>See the smartest way<br />to run your fleet.</h2><p>One intelligent command center that makes every decision, mile, and customer promise work harder.</p></div>
          <div className="bento-grid">
            <article className="bento-card bento-map"><div className="bento-copy"><span className="icon-tile"><Route size={20} /></span><h3>Routes that adapt before you have to.</h3><p>Continuously rebalance every stop against traffic, constraints, and real-time fleet signals.</p><a href="#demo">Explore route intelligence <ArrowRight size={15} /></a></div><div className="mini-route-art"><span className="mini-route-line" /><i className="mini-pin pin-1" /><i className="mini-pin pin-2" /><i className="mini-pin pin-3" /><b>12 min faster</b></div></article>
            <article className="bento-card bento-data"><div><span className="icon-tile blue"><Gauge size={20} /></span><h3>Every answer, in view.</h3><p>Turn fleet activity into actionable performance intelligence.</p></div><div className="bar-art"><span style={{ height: "34%" }} /><span style={{ height: "55%" }} /><span style={{ height: "44%" }} /><span style={{ height: "78%" }} /><span style={{ height: "62%" }} /><span style={{ height: "93%" }} /></div></article>
            <article className="bento-card bento-ai"><div className="ai-glow"><CloudCog size={30} /></div><h3>Your always-on<br />operations copilot.</h3><p>Ask RouteIQ what to optimize next and act on clear recommendations.</p><div className="prompt-pill"><Sparkles size={13} /> Find my fastest win today <ArrowRight size={13} /></div></article>
            <article className="bento-card bento-alert"><div className="alert-card"><span><BellRing size={16} /></span><div><b>Delay prevented</b><p>Route 04 rerouted around I-90</p></div><Check size={16} /></div><span className="icon-tile gold"><Clock3 size={20} /></span><h3>Stay ahead of every exception.</h3><p>Get ahead of late arrivals before they become customer calls.</p></article>
          </div>
        </div>
      </section>

      <section className="section workflow-section" id="demo">
        <div className="shell workflow-layout"><div className="workflow-copy"><SectionTag>Intelligence that moves</SectionTag><h2>From chaos to clarity<br />in three moves.</h2><p>Built around the way dispatch teams actually work—without adding another screen to watch.</p><Link className="text-link" to="/Signup">See RouteIQ in action <ArrowRight size={16} /></Link></div><div className="steps"><article><span>01</span><div><h3>Connect your operation</h3><p>Bring in orders, drivers, constraints, and the systems you already use.</p></div></article><article><span>02</span><div><h3>Let AI build the best plan</h3><p>RouteIQ evaluates thousands of route combinations in seconds.</p></div></article><article><span>03</span><div><h3>Keep every mile on track</h3><p>Respond to changes with live visibility and proactive recommendations.</p></div></article></div></div>
      </section>

      <section className="quote-section"><div className="shell quote-layout"><div><SectionTag>Results that speak</SectionTag><blockquote>“RouteIQ gives our dispatchers the confidence to make the right call in the moment. We&apos;ve cut our planning time in half.”</blockquote><div className="person"><span>AT</span><p><b>Amelia Torres</b><small>VP of Operations, Northstar Logistics</small></p></div></div><aside className="case-result"><span>Northstar Logistics</span><strong>$1.2M</strong><p>estimated annual savings</p><hr /><div><span><Check size={15} /> 18% fewer miles</span><span><Check size={15} /> 42% faster planning</span></div><a href="#platform">Read the case study <ArrowRight size={15} /></a></aside></div></section>

      <section className="security-section"><div className="shell security-content"><div><p className="section-tag"><span /> Enterprise-grade from day one</p><h2>Move faster.<br />Stay in control.</h2></div><div className="security-list"><span><ShieldCheck size={18} /> SOC 2 Type II</span><span><LockKeyhole size={18} /> Enterprise SSO</span><span><Globe2 size={18} /> GDPR ready</span></div></div></section>

      <section className="final-cta"><div className="shell cta-panel"><div className="cta-grid" aria-hidden="true" /><div><SectionTag>Make every mile count</SectionTag><h2>Ready for a smarter<br />route forward?</h2><p>Start optimizing in minutes. No credit card required.</p><div className="hero-actions"><Link to="/Signup" className="button-primary">Start your free trial <ArrowRight size={17} /></Link><Link to="/Login" className="button-secondary dark-secondary">Talk to our team</Link></div></div><div className="cta-route" aria-hidden="true"><Route size={64} /><span>14,832</span><small>routes optimized today</small></div></div></section>
    </main>
  );
}
