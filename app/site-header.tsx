"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const links = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Skills", "#skills"],
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    let savedTheme: "dark" | "light" = "dark";
    try {
      savedTheme = window.localStorage.getItem("malmi-portfolio-theme") === "light" ? "light" : "dark";
    } catch {
      return;
    }
    setTheme(savedTheme);
    document.documentElement.dataset.theme = savedTheme;
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    try {
      window.localStorage.setItem("malmi-portfolio-theme", nextTheme);
    } catch {
      return;
    }
  }

  return (
    <header className="site-header">
      <div className="header-inner section-wrap">
        <a className="wordmark" href="#home" aria-label="Malmi Konara home">
          <span className="wordmark-main">mk<span>.</span></span>
          <small>MALMI KONARA</small>
        </a>
        <nav className={`main-nav${menuOpen ? " is-open" : ""}`} id="site-nav" aria-label="Main navigation">
          {links.map(([label, href]) => <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="header-link" href="#contact" onClick={() => setMenuOpen(false)}>Let’s connect <span aria-hidden="true">↗</span></a>
        </nav>
        <button
          className="theme-toggle"
          type="button"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          aria-pressed={theme === "light"}
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
          <span>{theme === "dark" ? "Light" : "Dark"}</span>
        </button>
        <button
          className={`menu-toggle${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
