import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Bus,
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
} from "lucide-react";

/* ─── Utility Components ─── */

function SectionTag({ children }) {
  return <p className="section-tag"><span />{children}</p>;
}

function useAnimatedCounter(target, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}

function AnimatedMetric({ value, suffix, label, live }) {
  const { count, ref } = useAnimatedCounter(value);
  return (
    <div ref={ref}>
      <strong>{count.toLocaleString()}<span>{suffix}</span></strong>
      <p>{label}{live && <span className="live-dot" />}</p>
    </div>
  );
}

function ScrollReveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[20px]"} ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── Data ─── */

const partners = ["SOUTHERN EXPRESS", "CTB KANDY", "SLTB COLOMBO", "PEARL TOURS", "LANKA BUS", "CITY LINK"];

/* ─── Dashboard Preview ─── */

function RouteDashboard() {
  return (
    <div className="dashboard-shell" aria-label="RouteIQ fleet management dashboard preview">
      <div className="dashboard-topbar">
        <div className="dashboard-brand"><span className="mini-mark"><Bus size={13} /></span> RouteIQ <span className="dashboard-divider" /> Command center</div>
        <div className="dashboard-status"><span className="status-dot" /> Live tracking</div>
        <div className="dashboard-avatar">AK</div>
      </div>
      <div className="dashboard-body">
        <aside className="dashboard-sidebar">
          <span className="side-active"><MapPinned size={15} /> Overview</span>
          <span><Bus size={15} /> Fleet</span>
          <span><Route size={15} /> Routes</span>
          <span><BarChart3 size={15} /> Analytics</span>
        </aside>
        <div className="map-stage">
          <div className="map-label map-label-a">Colombo</div>
          <div className="map-label map-label-b">Kandy</div>
          <div className="map-label map-label-c">Galle</div>
          <svg viewBox="0 0 720 440" className="route-map" role="img" aria-label="Optimized bus routes across Sri Lanka">
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
          <div className="map-pulse"><span /> Tracking 42 buses</div>
          <div className="map-zoom"><button aria-label="Zoom in">+</button><button aria-label="Zoom out">−</button></div>
        </div>
        <aside className="dashboard-panel">
          <div className="panel-heading"><span>Today&apos;s routes</span><button>View all</button></div>
          <div className="route-row"><span className="route-color green" /><div><b>Colombo → Kandy</b><small>12 stops · 98% on time</small></div><strong>09:42</strong></div>
          <div className="route-row"><span className="route-color blue" /><div><b>Colombo → Galle</b><small>8 stops · In transit</small></div><strong>10:16</strong></div>
          <div className="route-row"><span className="route-color purple" /><div><b>Expressway 01</b><small>12 stops · Ready to go</small></div><strong>11:05</strong></div>
          <div className="panel-insight"><Sparkles size={15} /><span><b>AI suggestion</b> Reassign Bus 17 to reduce 23 min delay on Route 04.</span><ChevronRight size={15} /></div>
        </aside>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */

export default function Home() {
  return (
    <main className="routeiq-home">
      {/* ─── Hero Section ─── */}
      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />
        <div className="shell hero-content">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse-ring" /> AI-powered transit intelligence</div>
            <h1>The operating system<br />for modern <em>bus operations</em>.</h1>
            <p className="hero-lede">RouteIQ gives bus operators real-time fleet tracking, AI-powered route optimization, and online ticketing — one platform to run your entire operation.</p>
            <div className="hero-actions">
              <Link to="/Signup" className="button-primary">Start free trial <ArrowRight size={17} /></Link>
              <a href="#demo" className="button-secondary"><span className="play-icon"><Play size={12} fill="currentColor" /></span> Watch 2-min demo</a>
            </div>
            <div className="hero-proof">
              <div className="avatars"><i>SL</i><i>CT</i><i>PK</i><i>+</i></div>
              <span>Trusted by <b>120+ operators</b> across Sri Lanka</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="float-card savings-card"><span className="float-icon"><Fuel size={16} /></span><div><small>Fuel saved this month</small><strong>₨ 2.4M</strong><em>+24.8%</em></div></div>
            <RouteDashboard />
            <div className="float-card eta-card"><span className="eta-check"><Check size={16} /></span><div><small>On-time arrivals</small><strong>98.4%</strong></div><span className="tiny-chart">⌁</span></div>
          </div>
        </div>
        <div className="shell logo-strip"><span>Powering smarter operations at</span>{partners.map((partner) => <b key={partner}>{partner}</b>)}</div>
      </section>

      {/* ─── Animated Trust & Metrics ─── */}
      <ScrollReveal>
        <section className="metrics-section" aria-label="RouteIQ performance metrics">
          <div className="shell metric-grid">
            <AnimatedMetric value={12400} suffix="+" label="buses tracked island-wide" />
            <AnimatedMetric value={2100000} suffix="" label="tickets sold annually" />
            <AnimatedMetric value={98} suffix=".4%" label="on-time arrivals" />
            <AnimatedMetric value={99} suffix=".9%" label="platform uptime" live={true} />
          </div>
        </section>
      </ScrollReveal>

      {/* ─── Core Features / Bento Grid ─── */}
      <ScrollReveal>
        <section className="section light-section" id="platform">
          <div className="shell">
            <div className="section-heading centered"><SectionTag>Built for Sri Lankan transit</SectionTag><h2>See the smartest way<br />to run your fleet.</h2><p>One intelligent command center that makes every decision, mile, and passenger promise work harder.</p></div>
            <div className="bento-grid">
              <article className="bento-card bento-map"><div className="bento-copy"><span className="icon-tile"><Route size={20} /></span><h3>Routes that adapt before you have to.</h3><p>Continuously rebalance every stop against traffic, constraints, and real-time fleet signals across Sri Lanka.</p><a href="#demo">Explore route intelligence <ArrowRight size={15} /></a></div><div className="mini-route-art"><span className="mini-route-line" /><i className="mini-pin pin-1" /><i className="mini-pin pin-2" /><i className="mini-pin pin-3" /><b>23 min faster</b></div></article>
              <article className="bento-card bento-data"><div><span className="icon-tile blue"><Gauge size={20} /></span><h3>Every answer, in view.</h3><p>Turn fleet activity into actionable performance intelligence.</p></div><div className="bar-art"><span style={{ height: "34%" }} /><span style={{ height: "55%" }} /><span style={{ height: "44%" }} /><span style={{ height: "78%" }} /><span style={{ height: "62%" }} /><span style={{ height: "93%" }} /></div></article>
              <article className="bento-card bento-ai"><div className="ai-glow"><CloudCog size={30} /></div><h3>Your always-on<br />transit copilot.</h3><p>Ask RouteIQ what to optimize next and act on clear recommendations.</p><div className="prompt-pill"><Sparkles size={13} /> Find my fastest route today <ArrowRight size={13} /></div></article>
              <article className="bento-card bento-alert"><div className="alert-card"><span><BellRing size={16} /></span><div><b>Delay prevented</b><p>Route 04 rerouted around A2 congestion</p></div><Check size={16} /></div><span className="icon-tile gold"><Clock3 size={20} /></span><h3>Stay ahead of every exception.</h3><p>Get ahead of late arrivals before they become passenger complaints.</p></article>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── How It Works ─── */}
      <ScrollReveal delay={100}>
        <section className="section workflow-section" id="demo">
          <div className="shell workflow-layout"><div className="workflow-copy"><SectionTag>Intelligence that moves</SectionTag><h2>From chaos to clarity<br />in three moves.</h2><p>Built around the way bus operators actually work — without adding another screen to watch.</p><Link className="text-link" to="/Signup">See RouteIQ in action <ArrowRight size={16} /></Link></div><div className="steps"><article><span>01</span><div><h3>Connect your operation</h3><p>Bring in buses, drivers, routes, and the systems you already use.</p></div></article><article><span>02</span><div><h3>Let AI build the best plan</h3><p>RouteIQ evaluates thousands of route combinations in seconds.</p></div></article><article><span>03</span><div><h3>Keep every mile on track</h3><p>Respond to changes with live visibility and proactive recommendations.</p></div></article></div></div>
        </section>
      </ScrollReveal>

      {/* ─── Pricing Section ─── */}
      <ScrollReveal delay={150}>
        <section className="section pricing-section" id="pricing">
          <div className="shell">
            <div className="section-heading centered"><SectionTag>Transparent pricing</SectionTag><h2>Start free. Scale<br />as you grow.</h2><p>No hidden fees. No long contracts. Cancel anytime.</p></div>
            <div className="pricing-grid">
              {/* Starter */}
              <div className="pricing-card">
                <div className="pricing-tier"><span className="pricing-badge">Starter</span></div>
                <div className="pricing-price"><strong>Free</strong><p>for small operators</p></div>
                <ul className="pricing-features">
                  <li><Check size={14} /> Up to 5 buses tracked</li>
                  <li><Check size={14} /> Live GPS fleet tracking</li>
                  <li><Check size={14} /> Online ticket booking</li>
                  <li><Check size={14} /> Basic analytics dashboard</li>
                  <li><Check size={14} /> Mobile app access</li>
                </ul>
                <Link to="/Signup" className="button-secondary pricing-cta">Get started free <ArrowRight size={15} /></Link>
              </div>

              {/* Professional */}
              <div className="pricing-card pricing-popular">
                <div className="pricing-popular-badge">Most Popular</div>
                <div className="pricing-tier"><span className="pricing-badge accent">Professional</span></div>
                <div className="pricing-price"><strong>₨ 15,000<span>/mo</span></strong><p>for growing fleets</p></div>
                <ul className="pricing-features">
                  <li><Check size={14} /> Up to 50 buses tracked</li>
                  <li><Check size={14} /> AI route optimization</li>
                  <li><Check size={14} /> Advanced analytics &amp; reports</li>
                  <li><Check size={14} /> Stripe payment integration</li>
                  <li><Check size={14} /> Driver management tools</li>
                  <li><Check size={14} /> Priority support (4hr SLA)</li>
                </ul>
                <Link to="/Signup" className="button-primary pricing-cta">Start free trial <ArrowRight size={15} /></Link>
                <p className="pricing-note">No credit card required · 14-day free trial</p>
              </div>

              {/* Enterprise */}
              <div className="pricing-card">
                <div className="pricing-tier"><span className="pricing-badge purple">Enterprise</span></div>
                <div className="pricing-price"><strong>Custom</strong><p>for large operators</p></div>
                <ul className="pricing-features">
                  <li><Check size={14} /> Unlimited buses &amp; routes</li>
                  <li><Check size={14} /> Multi-tenant management</li>
                  <li><Check size={14} /> Custom AI models &amp; predictions</li>
                  <li><Check size={14} /> Enterprise SSO &amp; RBAC</li>
                  <li><Check size={14} /> SOC 2 Type II compliance</li>
                  <li><Check size={14} /> Dedicated support engineer</li>
                  <li><Check size={14} /> 99.9% uptime SLA</li>
                </ul>
                <Link to="/Signup" className="button-secondary pricing-cta">Talk to our team <ArrowRight size={15} /></Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── Testimonial / Social Proof ─── */}
      <ScrollReveal delay={100}>
        <section className="quote-section"><div className="shell quote-layout"><div><SectionTag>Results that speak</SectionTag><blockquote>&ldquo;RouteIQ gives our dispatchers the confidence to make the right call in the moment. We&rsquo;ve cut our planning time in half and reduced fuel costs across 48 buses.&rdquo;</blockquote><div className="person"><span>RP</span><p><b>Rajesh Perera</b><small>Operations Director, Southern Express Bus Company</small></p></div></div><aside className="case-result"><span>Southern Express</span><strong>₨ 4.8M</strong><p>estimated annual savings</p><hr /><div><span><Check size={15} /> 18% fewer kilometers</span><span><Check size={15} /> 42% faster planning</span><span><Check size={15} /> 98% on-time improvement</span></div><a href="#platform">Read the case study <ArrowRight size={15} /></a></aside></div></section>
      </ScrollReveal>

      {/* ─── Enterprise Security ─── */}
      <ScrollReveal>
        <section className="security-section"><div className="shell security-content"><div><p className="section-tag"><span /> Enterprise-grade from day one</p><h2>Move faster.<br />Stay in control.</h2></div><div className="security-list"><span><ShieldCheck size={18} /> SOC 2 Type II</span><span><LockKeyhole size={18} /> Enterprise SSO</span><span><Globe2 size={18} /> GDPR ready</span><span><ShieldCheck size={18} /> 99.9% uptime SLA</span></div></div></section>
      </ScrollReveal>

      {/* ─── Final CTA ─── */}
      <ScrollReveal delay={100}>
        <section className="final-cta"><div className="shell cta-panel"><div className="cta-grid" aria-hidden="true" /><div><SectionTag>Make every mile count</SectionTag><h2>Ready for a smarter<br />route forward?</h2><p>Start optimizing in minutes. No credit card required.</p><div className="hero-actions"><Link to="/Signup" className="button-primary">Start your free trial <ArrowRight size={17} /></Link><Link to="/Login" className="button-secondary dark-secondary">Talk to our team</Link></div></div><div className="cta-route" aria-hidden="true"><Route size={64} /><span>12,400+</span><small>buses tracked today</small></div></div></section>
      </ScrollReveal>
    </main>
  );
}
