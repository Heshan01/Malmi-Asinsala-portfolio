import { Award, BookOpen, Globe, Leaf, Sparkles, Users } from "lucide-react";
import HeroSection from "./hero-section.tsx";
import ProjectsSection from "./projects-section";
import SiteHeader from "./site-header";

const roles = [
  {
    title: "Treasurer",
    organization: "2021/22 Batch",
    date: "2026–2027",
    detail: "Batch responsibility",
  },
  {
    title: "Editor",
    organization: "Travel and Heritage Sub-Committee · FISSMS",
    date: "2025–2026",
  },
  {
    title: "G17 Ambassador",
    organization: "G17 Program · GWUIM",
    date: "2025–2026",
    detail: "SDG 16 · Peace, Justice and Strong Institutions",
  },
  {
    title: "Treasurer",
    organization: "Diversity and Reconciliation Sub-Committee · FISSMS",
    date: "2024–2025",
  },
  {
    title: "Member",
    organization: "EcoNexus Green Club · FISSMS, GWUIM",
    date: "2024–2026",
  },
  {
    title: "Member",
    organization: "Leo Club · FISSMS, GWUIM",
    date: "2023–2026",
  },
];

const skillGroups = [
  { title: "Digital toolkit", number: "01", icon: Globe, items: ["MS Office", "GIS Software", "SPSS", "Canva"] },
  { title: "People & leadership", number: "02", icon: Users, items: ["Leadership", "Teamwork", "Communication", "Problem solving", "Adaptability"] },
  { title: "Planning & creativity", number: "03", icon: Sparkles, items: ["Event organizing", "Project management", "Time management", "Financial management", "Art & creativity"] },
];

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />

      <div className="values-strip" aria-label="Values">
        <div className="section-wrap">
          <span>Indigenous knowledge</span><Sparkles aria-hidden="true" />
          <span>Community impact</span><Sparkles aria-hidden="true" />
          <span>Purposeful leadership</span><Sparkles aria-hidden="true" />
          <span>Sustainable futures</span>
        </div>
      </div>

      <section className="about-section section-wrap" id="about">
        <figure className="about-photo"><img src="/images/malmi-konara about.jpg" alt="Malmi Konara outdoors" loading="lazy" /><figcaption>Rooted in knowledge</figcaption></figure>
        <div className="about-heading">
          <p className="eyebrow">01 / A little about me</p>
          <h2>Curiosity at heart.<br /><em>Purpose in action.</em></h2>
        </div>
        <div className="about-copy">
          <p className="about-lead">I’m a Social Studies undergraduate with a belief that meaningful change begins with understanding people.</p>
          <p>I’m reading for a BSc (Hons) in Social Studies in Indigenous Knowledge at Gampaha Wickramarachchi University of Indigenous Medicine. My interests bring together community well-being, cultural heritage, and sustainability.</p>
          <p>Through volunteering and university leadership, I put learning into practice by organizing initiatives, working with diverse teams, and taking responsibility.</p>
          <div className="about-bottom-row">
            <div className="about-note"><span className="about-note-icon"><BookOpen size={21} /></span><span>Always learning.<br /><strong>Always looking for ways to contribute.</strong></span></div>
          </div>
        </div>
        <div className="focus-row">
          <div><HeartMark /><span>Community well-being</span></div>
          <div><Leaf aria-hidden="true" /><span>Environmental care</span></div>
          <div><span className="focus-symbol" aria-hidden="true">◎</span><span>Peace & inclusion</span></div>
        </div>
      </section>

      <ProjectsSection />

      <section className="experience-section section-wrap" id="experience">
        <div className="section-heading">
          <div><p className="eyebrow">03 / Learning to lead</p><h2>Responsibility.<br /><em>With a human touch.</em></h2></div>
          <p>University leadership and volunteering that have shaped how I collaborate, organize, and serve.</p>
        </div>
        <div className="experience-layout">
          <div className="experience-aside">
            <span className="large-asterisk" aria-hidden="true">✳</span>
            <h3>Showing up.<br />Taking ownership.<br /><span>Growing together.</span></h3>
            <p>Faculty of Indigenous Social Sciences and Management Studies · GWUIM</p>
          </div>
          <div className="experience-timeline">
            {roles.map((role, index) => (
              <article className="experience-item" key={`${role.title}-${role.organization}`}>
                <div className="experience-item-top"><span>{role.date}</span><span>0{index + 1}</span></div>
                <h3>{role.title}</h3>
                <p>{role.organization}</p>
                {role.detail && <small>{role.detail}</small>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="skills-section" id="skills">
        <div className="section-wrap">
          <div className="section-heading">
            <div><p className="eyebrow">04 / What I bring</p><h2>A thoughtful mix<br /><em>of skills & strengths.</em></h2></div>
            <p>Practical tools, a creative outlook, and the people skills to bring ideas to life.</p>
          </div>
          <div className="skills-grid">
            {skillGroups.map(({ title, number, icon: Icon, items }) => (
              <article className="skill-group" key={title}>
                <div className="skill-group-top"><Icon aria-hidden="true" /><span>{number}</span></div>
                <h3>{title}</h3>
                <div className="skill-tags">{items.map((item) => <span key={item}>{item}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="education-section section-wrap" id="education">
        <div>
          <p className="eyebrow">05 / Foundations & growth</p>
          <h2>Never stop<br /><em>being curious.</em></h2>
          <div className="education-list">
            <article><Award aria-hidden="true" /><div><span>Currently reading</span><h3>BSc (Hons) in Social Studies in Indigenous Knowledge</h3><p>Gampaha Wickramarachchi University of Indigenous Medicine</p><small>Faculty of Indigenous Social Sciences and Management Studies</small></div></article>
            <article><BookOpen aria-hidden="true" /><div><span>2022</span><h3>Certificate courses in English Language and Information Technology</h3><p>Open University of Sri Lanka · Monaragala</p></div></article>
          </div>
        </div>
        <aside className="certificates-card">
          <div className="certificates-title"><Award aria-hidden="true" /><h3>Certificates & participation</h3></div>
          <article><span>2025</span><h4>World Environment Day Event</h4><p>Organizing Committee · EcoNexus Green Club, FISSMS</p></article>
          <article><span>2025</span><h4>World Green Building Council</h4></article>
          <article><span>2025</span><h4>Environmental Key Global</h4></article>
          <article><span>Participation</span><h4>International Biological Diversity Day</h4><p>Panel discussion</p></article>
          <a className="text-link" href="/Malmi-Asinsala-Konara-CV.pdf" target="_blank" rel="noreferrer">View full CV <span aria-hidden="true">↗</span></a>
        </aside>
      </section>

      <footer className="contact-section" id="contact">
        <div className="section-wrap contact-wrap">
          <span className="contact-spark" aria-hidden="true">✳</span>
          <p className="eyebrow">Have an opportunity or an idea?</p>
          <h2>Let’s make a<br /><em>meaningful connection.</em></h2>
          <p className="contact-description">I’d love to hear about opportunities to learn, collaborate, and contribute to work that makes a difference.</p>
          <a className="contact-email" href="mailto:malmiasinsala1@gmail.com">malmiasinsala1@gmail.com <span aria-hidden="true">↗</span></a>
          <div className="contact-bottom"><a href="tel:+94710844565">+94 71 084 4565</a><span>Buttala, Sri Lanka</span><span>© {new Date().getFullYear()} Malmi Asinsala Konara</span></div>
        </div>
      </footer>
    </main>
  );
}

function HeartMark() {
  return <span className="focus-symbol" aria-hidden="true">♡</span>;
}
