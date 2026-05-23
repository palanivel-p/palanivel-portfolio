import { useState, useEffect, useRef } from "react";

// ─── THEME CONFIG ─────────────────────────────────────────────────────────────
const THEME = {
  dark: {
    bg: "#0a0a0f",
    bgCard: "#111118",
    bgGlass: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.08)",
    borderAccent: "rgba(99,179,237,0.3)",
    text: "#f0f0f5",
    textMuted: "#8888a0",
    textDim: "#555566",
    accent: "#63b3ed",
    accentGlow: "rgba(99,179,237,0.15)",
    accentAlt: "#76e4c4",
    grad1: "#63b3ed",
    grad2: "#76e4c4",
    navBg: "rgba(10,10,15,0.85)",
  },
  light: {
    bg: "#f5f5fa",
    bgCard: "#ffffff",
    bgGlass: "rgba(255,255,255,0.7)",
    border: "rgba(0,0,0,0.08)",
    borderAccent: "rgba(49,130,206,0.3)",
    text: "#0d0d1a",
    textMuted: "#555570",
    textDim: "#9999aa",
    accent: "#2b7fcc",
    accentGlow: "rgba(43,127,204,0.1)",
    accentAlt: "#0a9e7e",
    grad1: "#2b7fcc",
    grad2: "#0a9e7e",
    navBg: "rgba(245,245,250,0.85)",
  },
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
// const NAV_LINKS = ["Home","About","Skills","Projects","Experience","Education","Contact"];

const SKILLS = {
  Frontend: [
    { name: "React.js", level: 85 },
    { name: "JavaScript", level: 90 },
    { name: "Tailwind CSS", level: 80 },
    { name: "Bootstrap", level: 88 },
    { name: "HTML5 / CSS3", level: 95 },
    { name: "jQuery / AJAX", level: 85 },
  ],
  Backend: [
    { name: "Laravel", level: 88 },
    { name: "Core PHP", level: 90 },
    { name: "REST API", level: 85 },
    { name: "MVC Architecture", level: 87 },
    { name: "Microservices", level: 72 },
  ],
  Database: [
    { name: "MySQL", level: 88 },
  ],
  Tools: [
    { name: "Git & GitHub", level: 85 },
    { name: "Postman", level: 80 },
    { name: "Linux Hosting", level: 75 },
    { name: "VS Code / PhpStorm", level: 90 },
  ],
  Specializations: [
    { name: "SaaS Development", level: 88 },
    { name: "POS Systems", level: 90 },
    { name: "Payment Gateways", level: 82 },
    { name: "WhatsApp API", level: 78 },
    { name: "Kiosk Systems", level: 80 },
    { name: "MQTT", level: 70 },
  ],
};

const PROJECTS = [
  {
    title: "Restaurant POS SaaS",
    category: "SaaS",
    description: "Scalable restaurant POS SaaS application supporting billing, inventory, CRM, expense management, and kitchen management across multiple shops.",
    tech: ["PHP", "Laravel", "MySQL", "JavaScript", "Bootstrap", "AJAX"],
    features: ["Multi-shop management", "KOT/Kitchen management", "Invoice & Excel export", "CRM & expense tracking", "Delivery & takeaway", "Payment gateway"],
    color: "#63b3ed",
    icon: "🍽️",
  },
  {
    title: "Kiosk Ordering System",
    category: "React",
    description: "Self-service kiosk ordering application with touch-friendly UI, integrated with restaurant POS SaaS for real-time order management.",
    tech: ["React.js", "JavaScript", "PHP", "REST APIs"],
    features: ["Touch-friendly UI", "Dynamic menu management", "Order token generation", "Kitchen integration", "Real-time updates"],
    color: "#76e4c4",
    icon: "📱",
  },
  {
    title: "Payment Gateway Integration",
    category: "Integration",
    description: "Integrated Pesapal, M-Pesa, and CC Avenue payment gateways into restaurant and business applications with secure callback handling.",
    tech: ["PHP", "REST APIs", "MySQL"],
    features: ["Pesapal integration", "M-Pesa support", "CC Avenue", "Transaction verification", "Mobile payments"],
    color: "#f6ad55",
    icon: "💳",
  },
  {
    title: "WhatsApp Integration Platform",
    category: "Integration",
    description: "WhatsApp notification and communication integration for restaurant and customer engagement systems with automated messaging.",
    tech: ["PHP", "REST APIs", "JavaScript"],
    features: ["Order notifications", "Automated messaging", "OTP support", "Customer engagement", "API integration"],
    color: "#68d391",
    icon: "💬",
  },
  {
    title: "Feedback Aggregator",
    category: "Laravel",
    description: "Centralized customer feedback management system for restaurants with analytics dashboard and multi-platform aggregation.",
    tech: ["Laravel", "MySQL", "React.js"],
    features: ["Feedback collection", "Analytics dashboard", "Review management", "Reports & filtering", "Multi-platform"],
    color: "#fc8181",
    icon: "⭐",
  },
  {
    title: "ERP & Inventory Management",
    category: "ERP",
    description: "Business ERP system for inventory, HR, attendance, and operational management with PWA support and comprehensive reporting.",
    tech: ["PHP", "Laravel", "MySQL", "JavaScript"],
    features: ["HR management", "Inventory tracking", "Attendance system", "Report generation", "PWA support"],
    color: "#b794f4",
    icon: "🏢",
  },
];

const EXPERIENCE = [
  {
    company: "Connective Links Technology",
    role: "Web Developer",
    period: "Sep 2024 – Present",
    location: "Chennai, Tamil Nadu",
    current: true,
    points: [
      "Developing restaurant POS SaaS applications with multi-shop management",
      "Building self-service kiosk ordering systems with React.js",
      "Integrating payment gateways: Pesapal, M-Pesa, CC Avenue",
      "Designing & consuming REST APIs and microservice architectures",
      "Third-party integrations including WhatsApp API and MQTT",
      "Performance optimization and scalable backend architecture",
    ],
  },
  {
    company: "GB Tech Corp",
    role: "Junior Web Developer",
    period: "Jan 2023 – Aug 2024",
    location: "Chennai, Tamil Nadu",
    current: false,
    points: [
      "Developed ERP systems for inventory and HR management",
      "Built cargo and charity management applications",
      "Created responsive admin panels and dashboard UIs",
      "Implemented payment integrations and report generation",
      "Delivered full-cycle web application development",
    ],
  },
];

const CERTS = [
  { name: "React.js Development", issuer: "Online Certification", icon: "⚛️" },
  { name: "Advanced JavaScript Concepts", issuer: "Online Certification", icon: "🟨" },
  { name: "PHP & MySQL Development", issuer: "Online Certification", icon: "🐘" },
];

// ─── UTILITY HOOKS ────────────────────────────────────────────────────────────
function useTyping(words, speed = 100) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[idx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        setText(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setIdx((i) => (i + 1) % words.length);
          setCharIdx(0);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, idx, charIdx, deleting, words, speed]);

  return text;
}

function useIntersection(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef();
  const visible = useIntersection(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Tag({ label, color }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.04em",
      border: `1px solid ${color}44`,
      color: color,
      background: `${color}14`,
      marginRight: 6,
      marginBottom: 6,
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      {label}
    </span>
  );
}

function SkillBar({ name, level, t, accent }) {
  const ref = useRef();
  const visible = useIntersection(ref);
  return (
    <div ref={ref} style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 13, color: t.text, fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: 12, color: t.textMuted, fontFamily: "'JetBrains Mono', monospace" }}>{level}%</span>
      </div>
      <div style={{ height: 5, background: t.border, borderRadius: 8, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: visible ? `${level}%` : "0%",
          background: `linear-gradient(90deg, ${accent}, ${t.accentAlt})`,
          borderRadius: 8,
          transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s",
          boxShadow: `0 0 8px ${accent}60`,
        }} />
      </div>
    </div>
  );
}

function ProjectCard({ project, t }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: t.bgCard,
        border: `1px solid ${hovered ? project.color + "44" : t.border}`,
        borderRadius: 16,
        padding: "24px",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered ? `0 20px 40px ${project.color}18` : "none",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <span style={{ fontSize: 28 }}>{project.icon}</span>
          <h3 style={{ margin: "8px 0 4px", fontSize: 17, fontWeight: 700, color: t.text, fontFamily: "'Clash Display', sans-serif" }}>
            {project.title}
          </h3>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
            color: project.color, border: `1px solid ${project.color}44`, borderRadius: 20,
            padding: "2px 8px", fontFamily: "'JetBrains Mono', monospace",
          }}>
            {project.category}
          </span>
        </div>
      </div>
      <p style={{ fontSize: 13.5, color: t.textMuted, lineHeight: 1.65, margin: 0 }}>{project.description}</p>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: t.textDim, marginBottom: 8 }}>KEY FEATURES</p>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
          {project.features.slice(0, 4).map((f, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: t.textMuted }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: project.color, flexShrink: 0 }} />
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: "auto" }}>
        {project.tech.map((tech) => <Tag key={tech} label={tech} color={project.color} />)}
      </div>
    </div>
  );
}

function TimelineItem({ item, t, idx }) {
  const ref = useRef();
  const visible = useIntersection(ref);
  return (
    <div
      ref={ref}
      style={{
        display: "flex", gap: 24,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-24px)",
        transition: `all 0.6s ease ${idx * 0.15}s`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          width: 14, height: 14, borderRadius: "50%", flexShrink: 0, marginTop: 4,
          background: item.current ? t.accent : t.textDim,
          boxShadow: item.current ? `0 0 12px ${t.accent}` : "none",
          border: `2px solid ${item.current ? t.accent : t.textDim}`,
        }} />
        {idx === 0 && <div style={{ width: 2, flexGrow: 1, marginTop: 8, background: `linear-gradient(to bottom, ${t.accent}, ${t.border})` }} />}
      </div>
      <div style={{
        background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14,
        padding: "20px 24px", flex: 1, marginBottom: 24,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: t.text, fontFamily: "'Clash Display', sans-serif" }}>{item.role}</h3>
            <p style={{ margin: "4px 0 0", fontSize: 14, color: t.accent, fontWeight: 600 }}>{item.company}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{
              fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
              color: item.current ? t.accentAlt : t.textMuted,
              background: item.current ? `${t.accentAlt}18` : t.bgGlass,
              border: `1px solid ${item.current ? t.accentAlt + "44" : t.border}`,
              padding: "3px 10px", borderRadius: 20,
            }}>
              {item.current ? "● CURRENT" : item.period}
            </span>
            {!item.current && <p style={{ margin: "4px 0 0", fontSize: 11, color: t.textDim, textAlign: "right" }}>{item.period}</p>}
            <p style={{ margin: "4px 0 0", fontSize: 12, color: t.textDim }}>{item.location}</p>
          </div>
        </div>
        <ul style={{ margin: "12px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
          {item.points.map((p, i) => (
            <li key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: t.textMuted, lineHeight: 1.5 }}>
              <span style={{ color: t.accent, marginTop: 2, flexShrink: 0 }}>→</span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── SECTIONS ─────────────────────────────────────────────────────────────────

function Hero({ t, scrollTo }) {
  const typed = useTyping(["Full Stack Developer", "SaaS Engineer", "Laravel Expert", "React.js Developer", "POS Specialist"]);

  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
      {/* Background effects */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 60% 60% at 70% 40%, ${t.accentGlow}, transparent)`,
      }} />
      <div style={{
        position: "absolute", top: 120, right: "8%",
        width: 320, height: 320, borderRadius: "50%",
        background: `radial-gradient(circle, ${t.accentGlow} 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      {/* Grid pattern */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03,
        backgroundImage: `linear-gradient(${t.text} 1px, transparent 1px), linear-gradient(90deg, ${t.text} 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
      }} />

      <div style={{ width: "100%", maxWidth: 1100, margin: "0 auto", padding: "0 24px", paddingTop: 80 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 60, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: `1px solid ${t.borderAccent}`, borderRadius: 24, padding: "6px 14px",
              background: t.accentGlow, marginBottom: 24,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: t.accentAlt, animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 12, color: t.accent, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, letterSpacing: "0.05em" }}>
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.05,
              fontFamily: "'Clash Display', sans-serif", color: t.text, margin: "0 0 8px",
            }}>
              PALANIVEL
            </h1>
            <div style={{
              fontSize: "clamp(1.1rem, 3vw, 1.5rem)", fontWeight: 700,
              fontFamily: "'Clash Display', sans-serif",
              background: `linear-gradient(135deg, ${t.grad1}, ${t.grad2})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              marginBottom: 20, minHeight: "2rem",
            }}>
              {typed}<span style={{ WebkitTextFillColor: t.accent, animation: "blink 1s step-end infinite" }}>_</span>
            </div>

            <p style={{ fontSize: 15, color: t.textMuted, lineHeight: 1.75, maxWidth: 520, marginBottom: 32 }}>
              Full Stack Web Developer specializing in scalable SaaS restaurant POS systems, kiosk ordering platforms, payment gateway integrations, and modern web applications. Based in Chennai, Tamil Nadu.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={() => scrollTo("projects")}
                style={{
                  padding: "12px 28px", borderRadius: 10, fontWeight: 700, fontSize: 14,
                  background: `linear-gradient(135deg, ${t.grad1}, ${t.grad2})`,
                  color: "#fff", border: "none", cursor: "pointer",
                  fontFamily: "'Clash Display', sans-serif", letterSpacing: "0.04em",
                  boxShadow: `0 8px 24px ${t.accent}44`,
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 12px 32px ${t.accent}66`; }}
                onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = `0 8px 24px ${t.accent}44`; }}
              >
                View Projects
              </button>
              <a
                href="mailto:velumsd2109@gmail.com"
                style={{
                  padding: "12px 28px", borderRadius: 10, fontWeight: 700, fontSize: 14,
                  background: "transparent", color: t.accent,
                  border: `1px solid ${t.borderAccent}`, cursor: "pointer",
                  fontFamily: "'Clash Display', sans-serif", letterSpacing: "0.04em",
                  textDecoration: "none", transition: "background 0.2s, border 0.2s",
                  display: "inline-block",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = t.accentGlow; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                Contact Me
              </a>
            </div>

            <div style={{ display: "flex", gap: 20, marginTop: 32, flexWrap: "wrap" }}>
              {[
                { label: "2+ Years", sub: "Experience" },
                { label: "6+", sub: "Projects" },
                { label: "2", sub: "Companies" },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: t.text, fontFamily: "'Clash Display', sans-serif" }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 500 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile card */}
          <div style={{ flexShrink: 0 }}>
            <div style={{
              width: 260, height: 320, borderRadius: 24,
              background: t.bgCard,
              border: `1px solid ${t.border}`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
              position: "relative", overflow: "hidden",
              boxShadow: `0 40px 80px ${t.accent}18`,
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: `radial-gradient(circle at 50% 0%, ${t.accentGlow}, transparent 60%)`,
                pointerEvents: "none",
              }} />
              <div style={{
                width: 100, height: 100, borderRadius: "50%",
                background: `linear-gradient(135deg, ${t.grad1}, ${t.grad2})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 40, fontWeight: 900, color: "#fff",
                fontFamily: "'Clash Display', sans-serif",
                boxShadow: `0 0 32px ${t.accent}66`,
              }}>
                P
              </div>
              <div style={{ textAlign: "center", padding: "0 20px" }}>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: t.text, fontFamily: "'Clash Display', sans-serif" }}>PALANIVEL</h3>
                <p style={{ margin: "4px 0 0", fontSize: 12, color: t.textMuted }}>Full Stack Developer</p>
                <p style={{ margin: "4px 0 0", fontSize: 11, color: t.textDim }}>📍 Chennai, Tamil Nadu</p>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                {[
                  { icon: "💼", href: "https://www.linkedin.com/in/palanivelp" },
                  { icon: "⚡", href: "https://github.com/palanivel-p/" },
                  { icon: "✉️", href: "mailto:velumsd210@gmail.com" },
                ].map((s) => (
                  <a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{
                      width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                      background: t.bgGlass, border: `1px solid ${t.border}`,
                      fontSize: 16, textDecoration: "none", transition: "border 0.2s",
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 56, flexWrap: "wrap" }}>
          {["PHP", "Laravel", "React.js", "MySQL", "REST API", "SaaS", "POS Systems"].map(tag => (
            <span key={tag} style={{
              fontSize: 11, padding: "4px 12px", borderRadius: 20,
              border: `1px solid ${t.border}`, color: t.textMuted,
              fontFamily: "'JetBrains Mono', monospace", fontWeight: 500,
            }}>{tag}</span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blink { 50% { opacity: 0 } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </section>
  );
}

function About({ t }) {
  return (
    <section id="about" style={{ padding: "100px 0", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <FadeIn>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            {/* <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: t.accent, fontWeight: 600, letterSpacing: "0.1em" }}>01 // ABOUT</span> */}
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 900, color: t.text, fontFamily: "'Clash Display', sans-serif", margin: "0 0 48px" }}>
            About Me
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          <FadeIn delay={0.1}>
            <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: "28px" }}>
              <span style={{ fontSize: 28, marginBottom: 12, display: "block" }}>👨‍💻</span>
              <h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 700, color: t.text, fontFamily: "'Clash Display', sans-serif" }}>Who I Am</h3>
              <p style={{ margin: 0, fontSize: 14, color: t.textMuted, lineHeight: 1.8 }}>
                Passionate Web Developer with experience in developing scalable SaaS applications, POS billing systems, kiosk ordering platforms, REST APIs, and third-party integrations. Skilled in both frontend and backend development using Core PHP, Laravel, React.js, JavaScript, and MySQL.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: "28px" }}>
              <span style={{ fontSize: 28, marginBottom: 12, display: "block" }}>🚀</span>
              <h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 700, color: t.text, fontFamily: "'Clash Display', sans-serif" }}>What I Build</h3>
              <p style={{ margin: 0, fontSize: 14, color: t.textMuted, lineHeight: 1.8 }}>
                Currently building restaurant POS SaaS products, kiosk systems, payment integrations (Pesapal, M-Pesa), WhatsApp integrations, feedback aggregator platforms, and microservice-based solutions for the hospitality industry.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: "28px" }}>
              <span style={{ fontSize: 28, marginBottom: 12, display: "block" }}>🎯</span>
              <h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 700, color: t.text, fontFamily: "'Clash Display', sans-serif" }}>Career Goal</h3>
              <p style={{ margin: 0, fontSize: 14, color: t.textMuted, lineHeight: 1.8 }}>
                To become a highly skilled Full Stack Developer specializing in scalable SaaS products, cloud-ready applications, and modern frontend technologies — continuously improving expertise in React.js, backend architecture, and microservices.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2} style={{ marginTop: 32 }}>
          <div style={{
            background: t.bgCard, border: `1px solid ${t.borderAccent}`,
            borderRadius: 16, padding: "28px 32px",
            borderLeft: `4px solid ${t.accent}`,
          }}>
            <p style={{ margin: 0, fontSize: 15, color: t.textMuted, lineHeight: 1.85, fontStyle: "italic" }}>
              "Web Developer with hands-on experience in designing and developing scalable SaaS-based restaurant POS systems, kiosk ordering applications, billing software, and business management platforms. Strong expertise in frontend and backend development using Core PHP, Laravel, React.js, JavaScript, AJAX, Bootstrap, and MySQL. Experienced in payment gateway integrations such as Pesapal and M-Pesa, WhatsApp integrations, REST APIs, microservices, and third-party API integrations."
            </p>
            <p style={{ margin: "12px 0 0", fontSize: 12, color: t.accent, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>— Professional Summary</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3} style={{ marginTop: 32 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { icon: "📧", label: "velumsd2109@gmail.com", href: "mailto:velumsd2109@gmail.com" },
              { icon: "📞", label: "+91 6382972009", href: "tel:+916382972009" },
              { icon: "📍", label: "Chennai, Tamil Nadu", href: null },
              { icon: "🔗", label: "LinkedIn", href: "https://www.linkedin.com/in/palanivelp" },
              { icon: "⚡", label: "GitHub", href: "https://github.com/palanivel-p/" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href || "#"}
                target={item.href?.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "7px 14px", borderRadius: 10, fontSize: 13,
                  background: t.bgCard, border: `1px solid ${t.border}`,
                  color: t.textMuted, textDecoration: "none",
                  transition: "border 0.2s, color 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.textMuted; }}
              >
                <span>{item.icon}</span>{item.label}
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Skills({ t }) {
  const [activeTab, setActiveTab] = useState("Frontend");
  const tabs = Object.keys(SKILLS);

  return (
    <section id="skills" style={{ padding: "100px 0", background: t.bgCard }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <FadeIn>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            {/* <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: t.accent, fontWeight: 600, letterSpacing: "0.1em" }}>02 // SKILLS</span> */}
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 900, color: t.text, fontFamily: "'Clash Display', sans-serif", margin: "0 0 48px" }}>
            Technical Skills
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
                  fontFamily: "'Clash Display', sans-serif", transition: "all 0.2s", border: "none",
                  background: activeTab === tab ? `linear-gradient(135deg, ${t.grad1}, ${t.grad2})` : t.bg,
                  color: activeTab === tab ? "#fff" : t.textMuted,
                  boxShadow: activeTab === tab ? `0 4px 16px ${t.accent}44` : "none",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32 }}>
            {SKILLS[activeTab].map((skill, i) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} t={t} accent={t.accent} />
            ))}
          </div>
        </FadeIn>

        {/* Other skill badges */}
        <FadeIn delay={0.3} style={{ marginTop: 48 }}>
          <p style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: t.textDim, fontWeight: 600, letterSpacing: "0.1em", marginBottom: 16 }}>
            ALSO SKILLED IN
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["MQTT", "Payment Gateway Integration", "Third-party APIs", "WhatsApp API", "Excel/PDF Generation", "Responsive Design", "Performance Optimization", "Plesk", "Hostinger", "XAMPP"].map(skill => (
              <span key={skill} style={{
                padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500,
                border: `1px solid ${t.border}`, color: t.textMuted,
                fontFamily: "'JetBrains Mono', monospace",
                transition: "border 0.2s, color 0.2s", cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.textMuted; }}
              >
                {skill}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Projects({ t }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "SaaS", "React", "Integration", "Laravel", "ERP"];
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <FadeIn>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            {/* <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: t.accent, fontWeight: 600, letterSpacing: "0.1em" }}>03 // PROJECTS</span> */}
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 900, color: t.text, fontFamily: "'Clash Display', sans-serif", margin: "0 0 16px" }}>
            Featured Work
          </h2>
          <p style={{ fontSize: 15, color: t.textMuted, marginBottom: 40 }}>Projects I've built from concept to production.</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} style={{
                padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer",
                border: `1px solid ${filter === cat ? t.accent : t.border}`,
                background: filter === cat ? t.accentGlow : "transparent",
                color: filter === cat ? t.accent : t.textMuted,
                fontFamily: "'JetBrains Mono', monospace", transition: "all 0.2s",
              }}>
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {filtered.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.08}>
              <ProjectCard project={project} t={t} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience({ t }) {
  return (
    <section id="experience" style={{ padding: "100px 0", background: t.bgCard }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <FadeIn>
          {/* <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: t.accent, fontWeight: 600, letterSpacing: "0.1em" }}>04 // EXPERIENCE</span> */}
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 900, color: t.text, fontFamily: "'Clash Display', sans-serif", margin: "12px 0 48px" }}>
            Work History
          </h2>
        </FadeIn>

        <div style={{ maxWidth: 740 }}>
          {EXPERIENCE.map((item, i) => (
            <TimelineItem key={item.company} item={item} t={t} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Education({ t }) {
  return (
    <section id="education" style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <FadeIn>
          {/* <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: t.accent, fontWeight: 600, letterSpacing: "0.1em" }}>05 // EDUCATION & CERTIFICATIONS</span> */}
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 900, color: t.text, fontFamily: "'Clash Display', sans-serif", margin: "12px 0 48px" }}>
            Learning Journey
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          <FadeIn delay={0.1}>
            <div style={{
              background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: "28px",
              borderTop: `3px solid ${t.accent}`,
            }}>
              <span style={{ fontSize: 28, marginBottom: 12, display: "block" }}>🎓</span>
              <h3 style={{ margin: "0 0 6px", fontSize: 17, fontWeight: 700, color: t.text, fontFamily: "'Clash Display', sans-serif" }}>
                BE Computer Science Engineering
              </h3>
              <p style={{ margin: "0 0 8px", fontSize: 14, color: t.accent, fontWeight: 600 }}>Arasu Engineering College</p>
              <p style={{ margin: 0, fontSize: 12, color: t.textMuted, fontFamily: "'JetBrains Mono', monospace" }}>2018 – 2022</p>
            </div>
          </FadeIn>

          {CERTS.map((cert, i) => (
            <FadeIn key={cert.name} delay={0.1 * (i + 2)}>
              <div style={{
                background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: "28px",
                borderTop: `3px solid ${t.accentAlt}`,
              }}>
                <span style={{ fontSize: 28, marginBottom: 12, display: "block" }}>{cert.icon}</span>
                <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: t.text, fontFamily: "'Clash Display', sans-serif" }}>{cert.name}</h3>
                <p style={{ margin: 0, fontSize: 12, color: t.textMuted }}>{cert.issuer}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ t }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    window.location.href = `mailto:velumsd210@gmail.com?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.email}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px", borderRadius: 10, fontSize: 14,
    background: t.bg, border: `1px solid ${t.border}`, color: t.text,
    fontFamily: "inherit", outline: "none", transition: "border 0.2s", boxSizing: "border-box",
  };

  return (
    <section id="contact" style={{ padding: "100px 0", background: t.bgCard }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <FadeIn>
          {/* <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: t.accent, fontWeight: 600, letterSpacing: "0.1em" }}>06 // CONTACT</span> */}
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 900, color: t.text, fontFamily: "'Clash Display', sans-serif", margin: "12px 0 16px" }}>
            Get In Touch
          </h2>
          <p style={{ fontSize: 15, color: t.textMuted, marginBottom: 48 }}>Open for new opportunities and collaborations.</p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40 }}>
          <FadeIn delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: "📧", label: "Email", val: "velumsd2109@gmail.com", href: "mailto:velumsd2109@gmail.com" },
                { icon: "📞", label: "Phone", val: "+91 6382972009", href: "tel:+916382972009" },
                { icon: "📍", label: "Location", val: "Chennai, Tamil Nadu", href: null },
                { icon: "💼", label: "LinkedIn", val: "linkedin.com/in/palanivelp", href: "https://www.linkedin.com/in/palanivelp" },
                { icon: "⚡", label: "GitHub", val: "github.com/palanivel-p", href: "https://github.com/palanivel-p/" },
              ].map(item => (
                <a key={item.label} href={item.href || "#"} target={item.href?.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: 14, padding: "16px 18px",
                    background: t.bg, border: `1px solid ${t.border}`, borderRadius: 12,
                    textDecoration: "none", transition: "border 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = t.accent}
                  onMouseLeave={e => e.currentTarget.style.borderColor = t.border}
                >
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <div>
                    <p style={{ margin: 0, fontSize: 11, color: t.textDim, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{item.label}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 13, color: t.textMuted }}>{item.val}</p>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = t.accent}
                onBlur={e => e.target.style.borderColor = t.border}
              />
              <input placeholder="Your Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = t.accent}
                onBlur={e => e.target.style.borderColor = t.border}
              />
              <textarea placeholder="Your Message" rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={e => e.target.style.borderColor = t.accent}
                onBlur={e => e.target.style.borderColor = t.border}
              />
              <button
                onClick={handleSubmit}
                style={{
                  padding: "14px 28px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer",
                  background: sent ? `linear-gradient(135deg, ${t.accentAlt}, #38a169)` : `linear-gradient(135deg, ${t.grad1}, ${t.grad2})`,
                  color: "#fff", border: "none", fontFamily: "'Clash Display', sans-serif",
                  letterSpacing: "0.04em", transition: "all 0.3s",
                  boxShadow: `0 8px 24px ${t.accent}44`,
                }}
              >
                {sent ? "✓ Message Sent!" : "Send Message"}
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Footer({ t }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer style={{ background: t.bg, borderTop: `1px solid ${t.border}`, padding: "40px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div>
            <span style={{ fontSize: 20, fontWeight: 900, color: t.text, fontFamily: "'Clash Display', sans-serif",
              background: `linear-gradient(135deg, ${t.grad1}, ${t.grad2})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              PALANIVEL
            </span>
            <p style={{ margin: "6px 0 0", fontSize: 12, color: t.textDim }}>Full Stack Developer · Chennai, India</p>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {NAV_LINKS.slice(1).map(link => (
              <button key={link} onClick={() => scrollTo(link.toLowerCase())}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: t.textMuted, padding: 0,
                  transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = t.accent}
                onMouseLeave={e => e.target.style.color = t.textMuted}
              >
                {link}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ margin: 0, fontSize: 12, color: t.textDim }}>© 2025 Palanivel. Crafted with React.js</p>
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { icon: "💼", href: "https://www.linkedin.com/in/palanivelp" },
              { icon: "⚡", href: "https://github.com/palanivel-p/" },
              { icon: "✉️", href: "mailto:velumsd210@gmail.com" },
            ].map(s => (
              <a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 18, textDecoration: "none", opacity: 0.6, transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                onMouseLeave={e => e.currentTarget.style.opacity = "0.6"}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Navbar({ dark, setDark, t, scrollProgress }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, zIndex: 200,
        height: 2, width: `${scrollProgress}%`,
        background: `linear-gradient(90deg, ${t.grad1}, ${t.grad2})`,
        transition: "width 0.1s",
        boxShadow: `0 0 8px ${t.accent}`,
      }} />

      <nav style={{
        position: "fixed", top: 2, left: 0, right: 0, zIndex: 100,
        background: scrolled ? t.navBg : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${t.border}` : "none",
        transition: "all 0.3s ease",
        padding: "0 24px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => scrollTo("home")}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 18, fontWeight: 900, fontFamily: "'Clash Display', sans-serif",
              background: `linear-gradient(135deg, ${t.grad1}, ${t.grad2})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              letterSpacing: "0.06em",
            }}>
            PALANIVEL
          </button>

          {/* Desktop nav */}
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <div style={{ display: "flex", gap: 2 }}>
              {NAV_LINKS.map(link => (
                <button key={link} onClick={() => scrollTo(link === "Home" ? "home" : link.toLowerCase())}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: 13, color: t.textMuted, padding: "6px 12px", borderRadius: 8,
                    fontFamily: "'Clash Display', sans-serif", fontWeight: 600, letterSpacing: "0.03em",
                    transition: "color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={e => { e.target.style.color = t.accent; e.target.style.background = t.accentGlow; }}
                  onMouseLeave={e => { e.target.style.color = t.textMuted; e.target.style.background = "transparent"; }}
                >
                  {link}
                </button>
              ))}
            </div>
            <button
              onClick={() => setDark(!dark)}
              style={{
                marginLeft: 8, width: 36, height: 36, borderRadius: 8,
                background: t.bgCard, border: `1px solid ${t.border}`,
                cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
                transition: "border 0.2s",
              }}
              title="Toggle theme"
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const t = THEME[dark ? "dark" : "light"];

  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      const progress = (window.scrollY / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollProgress(Math.min(100, progress));
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background: t.bg, color: t.text, minHeight: "100vh", fontFamily: "'Inter', sans-serif", transition: "background 0.3s, color 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${t.textDim}; border-radius: 4px; }
      `}</style>

      <Navbar dark={dark} setDark={setDark} t={t} scrollProgress={scrollProgress} />
      <Hero t={t} scrollTo={scrollTo} />
      <About t={t} />
      <Skills t={t} />
      <Projects t={t} />
      <Experience t={t} />
      <Education t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </div>
  );
}
