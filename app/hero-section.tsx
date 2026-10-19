"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Download, Mail, MapPin, Sparkles } from "lucide-react";

const roleNames = ["Social Studies Undergraduate", "Community Volunteer", "SDG 16 Ambassador"];

export default function HeroSection() {
  const [role, setRole] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setRole((current) => (current + 1) % roleNames.length), 3600);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero section-wrap" id="home">
      <div className="hero-copy">
        <p className="hero-eyebrow"><span className="status-dot" />People. Purpose. Possibility.</p>
        <p className="hero-hello">Hello, I’m</p>
        <h1>Malmi Asinsala<br /><span>Konara<span className="hero-name-dot">.</span></span></h1>
        <div className="hero-role-line"><span className="hero-short-line" /><p key={role}>{roleNames[role]}</p></div>
        <p className="hero-description">Connecting indigenous knowledge with community action. Learning, leading, and contributing to a more inclusive, sustainable tomorrow.</p>
        <div className="hero-actions">
          <a className="hero-button hero-button-primary" href="#projects">Explore my work <ArrowUpRight size={18} aria-hidden="true" /></a>
          <a className="hero-button hero-button-secondary" href="/Malmi-Asinsala-Konara-CV.pdf" download>Download CV <Download size={16} aria-hidden="true" /></a>
        </div>
        <div className="hero-meta">
          <span><MapPin size={15} aria-hidden="true" />Buttala, Sri Lanka</span>
          <span className="hero-meta-divider" aria-hidden="true" />
          <a href="mailto:malmiasinsala1@gmail.com"><Mail size={15} aria-hidden="true" />Say hello</a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-visual-orbit hero-orbit-one" />
        <div className="hero-visual-orbit hero-orbit-two" />
        <span className="hero-visual-star hero-star-one" aria-hidden="true">✳</span>
        <span className="hero-visual-star hero-star-two" aria-hidden="true">✦</span>
        <div className="hero-photo-frame">
          <img src="/images/malmi-konara.jpg" alt="Malmi Asinsala Konara enjoying nature beneath green leaves" width="1152" height="1536" fetchPriority="high" />
          <div className="hero-photo-shade" />
          <span className="hero-photo-caption">Rooted in knowledge.<br /><em>Driven by purpose.</em></span>
        </div>
        <div className="hero-floating-label"><span className="hero-floating-icon"><Sparkles size={19} aria-hidden="true" /></span><span><strong>A little action.</strong><small>A meaningful difference.</small></span></div>
        <span className="hero-visual-label">LEARNING · LEADING · GIVING BACK</span>
      </div>
      <a className="hero-scroll-cue" href="#about"><span>Scroll to discover</span><ArrowDown size={15} aria-hidden="true" /></a>
    </section>
  );
}
