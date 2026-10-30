
"use client";

import { useEffect, useRef, useState } from "react";

/* PERSONAL DETAILS */
const profile = {
  email: "ahmed.patel.nxt24@gmail.com",
  phone: "+919619357962",
  phoneDisplay: "+91 9619357962",
  whatsapp: "https://wa.me/919619357962",
  github: "https://github.com/ahmedpatelnxt24-lang",
  instagram: "https://www.instagram.com/ahmed.intrendd/",
};

const navigation = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Education", "#education"],
  ["Contact", "#contact"],
];

const skills = [
  { name: "HTML5", detail: "Semantic website structure", symbol: "</>" },
  { name: "CSS3", detail: "Responsive layouts and animation", symbol: "{ }" },
  { name: "Tailwind CSS", detail: "Modern utility-first styling", symbol: "TW" },
  { name: "JavaScript", detail: "Interactive web experiences", symbol: "JS" },
  { name: "Next.js", detail: "React-based web applications", symbol: "N" },
  { name: "Figma", detail: "UI and UX design", symbol: "F" },
  { name: "WordPress", detail: "Website development", symbol: "W" },
  { name: "Java", detail: "Programming fundamentals", symbol: "J" },
];

const projects = [
  {
    number: "01",
    title: "Patel Clothes",
    type: "E-COMMERCE WEBSITE",
    description:
      "A modern clothing store project featuring product collections, responsive layouts, shopping cart interactions and a clean customer experience.",
    stack: ["HTML", "CSS", "JavaScript"],
  },
  {
    number: "02",
    title: "Creative Portfolio",
    type: "WEB DEVELOPMENT",
    description:
      "A modern developer portfolio featuring expressive typography, subtle animations, responsive layouts and thoughtful frontend design.",
    stack: ["Next.js", "Tailwind CSS"],
  },
];

/* DETERMINISTIC LIGHT BALLS */
const particles = Array.from({ length: 68 }, (_, i) => ({
  x: (i * 37.73 + 11) % 100,
  y: (i * 23.17 + 7) % 100,
  size: i % 12 === 0 ? 8 : i % 5 === 0 ? 6 : i % 3 === 0 ? 5 : 4,
  duration: 13 + (i % 12) * 2,
  delay: -(i % 19) * 1.4,
  dx: (i % 2 ? 1 : -1) * (35 + (i % 8) * 18),
  dy: (i % 3 ? -1 : 1) * (35 + (i % 6) * 18),
}));

function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#030303]" />
      <div className="background-grid absolute inset-0" />

      <div className="ambient-one absolute -left-48 top-0 h-[650px] w-[650px] rounded-full bg-white/[.035] blur-[150px]" />
      <div className="ambient-two absolute -right-48 top-1/3 h-[600px] w-[600px] rounded-full bg-white/[.025] blur-[140px]" />

      {particles.map((particle, index) => (
        <span
          key={index}
          className="roaming-ball absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            "--move-x": `${particle.dx}px`,
            "--move-y": `${particle.dy}px`,
          }}
        />
      ))}

      <div className="shooting-light shooting-one absolute h-px w-40 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <div className="shooting-light shooting-two absolute h-px w-28 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="background-vignette absolute inset-0" />
    </div>
  );
}

/* SCROLL REVEAL */
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(45px)",
        filter: visible ? "blur(0)" : "blur(5px)",
        transition:
          "opacity 850ms cubic-bezier(.22,1,.36,1), transform 850ms cubic-bezier(.22,1,.36,1), filter 850ms ease",
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ number, label, title, description }) {
  return (
    <Reveal className="mb-16">
      <div className="mb-6 flex items-center gap-4">
        <span className="text-xs text-zinc-300">{number}</span>
        <span className="h-px w-9 bg-zinc-600" />
        <span className="text-[11px] uppercase tracking-[.25em] text-zinc-500">
          {label}
        </span>
      </div>

      <h2 className="text-4xl font-semibold tracking-[-.065em] sm:text-6xl">
        {title}<span className="text-zinc-600">.</span>
      </h2>

      {description && (
        <p className="mt-6 max-w-xl text-sm leading-8 text-zinc-500">
          {description}
        </p>
      )}
    </Reveal>
  );
}

function PrimaryLink({ href, children, secondary = false, external = false }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group inline-flex items-center gap-6 px-7 py-4 text-xs font-semibold transition-all duration-300 hover:-translate-y-1 ${
        secondary
          ? "bg-white/[.07] text-white hover:bg-white/[.13]"
          : "bg-white text-black hover:bg-zinc-200"
      }`}
    >
      {children}
      <span className="text-lg transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
        ↗
      </span>
    </a>
  );
}

/* NEW SMALLER AP HERO */
function HeroMonogram() {
  return (
    <div className="relative mx-auto flex h-[350px] w-full max-w-[500px] items-center justify-center sm:h-[480px]">
      <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-white/[.045] blur-[100px]" />

      <span className="absolute left-3 top-12 text-[11px] tracking-[.18em] text-zinc-500">
        01 / DESIGN
      </span>

      <span className="absolute bottom-12 right-3 text-[11px] tracking-[.18em] text-zinc-500">
        02 / DEVELOPMENT
      </span>

      <div className="hero-floating relative text-center">
        <p className="text-[clamp(6rem,13vw,10rem)] font-black leading-none tracking-[-.12em] text-white">
          AP<span className="text-zinc-500">.</span>
        </p>

        <p className="mt-8 text-[10px] font-medium uppercase tracking-[.45em] text-zinc-400 sm:text-xs">
          CREATIVE DEVELOPER
        </p>

        <p className="mt-5 text-xs tracking-[.12em] text-zinc-600">
          DESIGN × CODE × EXPERIENCE
        </p>
      </div>

      <span className="absolute right-[16%] top-[20%] h-2 w-2 animate-pulse rounded-full bg-white shadow-[0_0_18px_white]" />
      <span className="absolute bottom-[23%] left-[14%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/70 shadow-[0_0_14px_white]" />
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: -500, y: -500 });

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);

      const available =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrollProgress(
        available > 0 ? (window.scrollY / available) * 100 : 0
      );
    }

    function handleMouse(event) {
      setMouse({ x: event.clientX, y: event.clientY });
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointermove", handleMouse);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handleMouse);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030303] text-white selection:bg-white/20">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #030303;
        }

        .background-grid {
          background-image:
            linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
          background-size: 90px 90px;
          animation: gridMove 45s linear infinite;
        }

        @keyframes gridMove {
          to { background-position: 90px 90px; }
        }

        .background-vignette {
          background: radial-gradient(
            ellipse at center,
            transparent 20%,
            rgba(0,0,0,.55) 100%
          );
        }

        .roaming-ball {
          opacity: .6;
          box-shadow:
            0 0 9px rgba(255,255,255,.6),
            0 0 22px rgba(255,255,255,.2);
          animation: roamBall ease-in-out infinite alternate;
          will-change: transform, opacity;
        }

        @keyframes roamBall {
          0% {
            transform: translate3d(0,0,0) scale(.75);
            opacity: .22;
          }
          45% { opacity: .95; }
          100% {
            transform: translate3d(
              var(--move-x),
              var(--move-y),
              0
            ) scale(1.35);
            opacity: .4;
          }
        }

        .ambient-one {
          animation: ambientMove 20s ease-in-out infinite alternate;
        }

        .ambient-two {
          animation: ambientMove 26s ease-in-out infinite alternate-reverse;
        }

        @keyframes ambientMove {
          to { transform: translate(150px,100px) scale(1.2); }
        }

        .shooting-light {
          opacity: 0;
          animation: shootingMove 13s linear infinite;
        }

        .shooting-one {
          top: 20%;
          left: 85%;
          animation-delay: 3s;
        }

        .shooting-two {
          top: 55%;
          left: 95%;
          animation-delay: 9s;
        }

        @keyframes shootingMove {
          0%, 78% {
            opacity: 0;
            transform: translate(0,0) rotate(-30deg);
          }
          82% { opacity: .75; }
          92%, 100% {
            opacity: 0;
            transform: translate(-420px,260px) rotate(-30deg);
          }
        }

        .hero-entrance {
          animation: heroEntrance 1.1s cubic-bezier(.22,1,.36,1) both;
        }

        @keyframes heroEntrance {
          from {
            opacity: 0;
            transform: translateY(55px);
            filter: blur(7px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .outline-text {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,.7);
        }

        .hero-floating {
          animation: heroFloat 8s ease-in-out infinite;
        }

        @keyframes heroFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }

        .skill-item {
          transition: transform .4s ease;
        }

        .skill-item:hover {
          transform: translateX(8px);
        }

        .project-title {
          transition: transform .45s ease, color .45s ease;
        }

        .project-row:hover .project-title {
          transform: translateX(12px);
          color: #aaa;
        }

        .scroll-bounce {
          animation: scrollBounce 2s ease-in-out infinite;
        }

        @keyframes scrollBounce {
          50% { transform: translateY(9px); }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: .01ms !important;
            transition-duration: .01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <AnimatedBackground />

      {/* MOUSE SPOTLIGHT */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed z-10 hidden h-[420px] w-[420px] rounded-full bg-white/[.035] blur-[110px] lg:block"
        style={{
          left: mouse.x - 210,
          top: mouse.y - 210,
        }}
      />

      {/* SCROLL PROGRESS */}
      <div className="fixed left-0 top-0 z-[100] h-[2px] w-full">
        <div
          className="h-full bg-white"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* NAVBAR */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/85 py-4 backdrop-blur-xl" : "py-7"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="#home" className="text-2xl font-black tracking-[-.08em]">
            AHMED<span className="text-zinc-500">.</span>
          </a>

          <div className="hidden items-center gap-9 md:flex">
            {navigation.map(([name, href]) => (
              <a
                key={name}
                href={href}
                className="text-xs font-medium text-zinc-400 transition hover:text-white"
              >
                {name}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden bg-white px-6 py-3 text-xs font-semibold text-black transition hover:bg-zinc-300 md:block"
          >
            Let's Connect ↗
          </a>

          <button
            type="button"
            className="text-2xl md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </nav>

        {menuOpen && (
          <div className="mx-5 mt-4 bg-[#111] p-5 md:hidden">
            {navigation.map(([name, href]) => (
              <a
                key={name}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block py-4 text-sm text-zinc-300"
              >
                {name}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative z-10 flex min-h-screen items-center px-6 pb-20 pt-32 lg:px-10"
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="hero-entrance mb-9 inline-flex items-center gap-3 text-[11px] uppercase tracking-[.2em] text-zinc-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white shadow-[0_0_12px_white]" />
              Available for opportunities
            </div>

            <p
              className="hero-entrance mb-7 text-xs uppercase tracking-[.25em] text-zinc-500"
              style={{ animationDelay: "120ms" }}
            >
              Web Developer / AI & Data Science Student
            </p>

            <h1 className="text-[clamp(4rem,10vw,8rem)] font-bold leading-[.92] tracking-[-.09em]">
              <span
                className="hero-entrance block"
                style={{ animationDelay: "220ms" }}
              >
                AHMED
              </span>
              <span
                className="hero-entrance outline-text block"
                style={{ animationDelay: "340ms" }}
              >
                PATEL.
              </span>
            </h1>

            <p
              className="hero-entrance mt-10 max-w-lg text-base leading-8 text-zinc-300"
              style={{ animationDelay: "450ms" }}
            >
              Designing modern interfaces.
              <br />
              Developing meaningful experiences.
            </p>

            <p
              className="hero-entrance mt-5 max-w-lg text-sm leading-8 text-zinc-500"
              style={{ animationDelay: "550ms" }}
            >
              I'm passionate about creating responsive websites,
              exploring frontend technologies and bringing creative
              ideas to life through code.
            </p>

            <div
              className="hero-entrance mt-10 flex flex-wrap gap-4"
              style={{ animationDelay: "650ms" }}
            >
              <PrimaryLink href="#projects">Explore My Work</PrimaryLink>
              <PrimaryLink href="#contact" secondary>Contact Me</PrimaryLink>
            </div>

            <div
              className="hero-entrance mt-16 flex flex-wrap gap-10"
              style={{ animationDelay: "750ms" }}
            >
              <div>
                <p className="text-3xl font-semibold">08</p>
                <p className="mt-2 text-[10px] uppercase tracking-[.2em] text-zinc-500">
                  Skills & Tools
                </p>
              </div>
              <div>
                <p className="text-3xl font-semibold">02</p>
                <p className="mt-2 text-[10px] uppercase tracking-[.2em] text-zinc-500">
                  Featured Projects
                </p>
              </div>
            </div>
          </div>

          <HeroMonogram />
        </div>

        <a
          href="#about"
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[.25em] text-zinc-500 lg:flex"
        >
          Scroll to explore
          <span className="scroll-bounce text-xl text-white">↓</span>
        </a>
      </section>

      {/* INTRO STRIP */}
      <div className="relative z-10 bg-black/40 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-7 text-[11px] uppercase tracking-[.2em] text-zinc-500">
          <span>Web Development</span>
          <span>✳</span>
          <span>UI / UX Design</span>
          <span>✳</span>
          <span>AI & Data Science</span>
          <span>✳</span>
          <span>Creative Technology</span>
        </div>
      </div>

      {/* ABOUT — NO PHOTO */}
      <section
        id="about"
        className="relative z-10 scroll-mt-20 px-6 py-28 lg:px-10 lg:py-36"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            number="01"
            label="Introduction"
            title="A little about me"
            description="A developer who enjoys bringing technology, creativity and thoughtful design together."
          />

          <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr] lg:gap-24">
            <Reveal>
              <p className="mb-7 text-xs uppercase tracking-[.3em] text-zinc-500">
                WHO I AM
              </p>

              <h3 className="text-3xl font-semibold leading-[1.2] tracking-[-.055em] sm:text-5xl">
                I create digital<br />
                experiences that are<br />
                <span className="text-zinc-500">
                  simple, functional<br />
                  and meaningful.
                </span>
              </h3>

              <p className="mt-9 max-w-xl text-sm leading-8 text-zinc-400 sm:text-base">
                I'm Ahmed Patel, an AI & Data Science student and web
                developer with a strong interest in modern web
                technologies, user experience and creative problem-solving.
              </p>

              <p className="mt-5 max-w-xl text-sm leading-8 text-zinc-400 sm:text-base">
                I enjoy building responsive websites, exploring new
                design ideas and improving the small details that make
                digital experiences feel professional.
              </p>

              <a
                href="#projects"
                className="mt-9 inline-flex items-center gap-5 text-xs font-semibold uppercase tracking-[.2em] transition-all duration-300 hover:gap-8 hover:text-zinc-400"
              >
                Explore My Work <span className="text-lg">↗</span>
              </a>
            </Reveal>

            <Reveal delay={200}>
              <div className="space-y-12">
                {[
                  {
                    number: "01",
                    label: "MY APPROACH",
                    title: "Design with purpose.",
                    text: "I believe a great website should look clean, feel intuitive and make every interaction useful.",
                  },
                  {
                    number: "02",
                    label: "WHAT I ENJOY",
                    title: "Building & experimenting.",
                    text: "From frontend layouts to animations and interfaces, I enjoy turning creative ideas into working projects.",
                  },
                  {
                    number: "03",
                    label: "CURRENT FOCUS",
                    title: "Learning. Creating. Improving.",
                    text: "I'm developing my skills in modern JavaScript frameworks, web development, AI and Data Science.",
                  },
                ].map((item) => (
                  <div key={item.number} className="group">
                    <p className="text-xs tracking-[.25em] text-zinc-600">
                      {item.number} / {item.label}
                    </p>
                    <h4 className="mt-5 text-xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-2">
                      {item.title}
                    </h4>
                    <p className="mt-4 max-w-md text-sm leading-7 text-zinc-500">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-24">
            <div className="grid gap-12 sm:grid-cols-3">
              {[
                ["Web.", "Development"],
                ["UI/UX.", "Design Thinking"],
                ["AI.", "Data Science"],
              ].map(([name, detail]) => (
                <div key={name}>
                  <p className="text-4xl font-semibold tracking-tight">
                    {name}
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-[.2em] text-zinc-500">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SKILLS — BORDERLESS */}
      <section
        id="skills"
        className="relative z-10 scroll-mt-20 bg-black/35 px-6 py-28 lg:px-10 lg:py-36"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            number="02"
            label="Capabilities"
            title="Skills & technologies"
            description="The tools and technologies I use to design, build and experiment with modern websites."
          />

          <div className="grid grid-cols-2 gap-x-8 gap-y-16 lg:grid-cols-4">
            {skills.map((skill, index) => (
              <Reveal key={skill.name} delay={(index % 4) * 90}>
                <div className="skill-item group">
                  <span className="text-3xl font-semibold text-zinc-500 transition-colors duration-300 group-hover:text-white">
                    {skill.symbol}
                  </span>
                  <h3 className="mt-7 text-xl font-semibold tracking-tight sm:text-2xl">
                    {skill.name}
                  </h3>
                  <p className="mt-3 text-xs leading-6 text-zinc-500">
                    {skill.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS — NO LOVE MEMORIES */}
      <section
        id="projects"
        className="relative z-10 scroll-mt-20 px-6 py-28 lg:px-10 lg:py-36"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            number="03"
            label="Selected Work"
            title="Featured projects"
            description="Some of the web development projects and digital experiences I've worked on."
          />

          <div className="space-y-20">
            {projects.map((project, index) => (
              <Reveal key={project.number} delay={index * 100}>
                <div className="project-row group grid gap-7 lg:grid-cols-[90px_1fr_1fr] lg:gap-12">
                  <span className="pt-2 text-xs text-zinc-500">
                    / {project.number}
                  </span>

                  <div>
                    <p className="mb-5 text-[11px] uppercase tracking-[.25em] text-zinc-500">
                      {project.type}
                    </p>
                    <h3 className="project-title text-3xl font-semibold tracking-[-.055em] sm:text-5xl">
                      {project.title}
                    </h3>
                  </div>

                  <div>
                    <p className="max-w-lg text-sm leading-8 text-zinc-400">
                      {project.description}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs uppercase tracking-[.15em] text-zinc-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section
        id="education"
        className="relative z-10 scroll-mt-20 bg-black/35 px-6 py-28 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            number="04"
            label="Education"
            title="Always learning"
          />

          <Reveal>
            <div className="grid gap-10 lg:grid-cols-2">
              <h3 className="text-3xl font-semibold leading-tight tracking-[-.05em] sm:text-5xl">
                Artificial Intelligence<br />
                <span className="text-zinc-500">
                  & Data Science.
                </span>
              </h3>

              <div>
                <p className="text-sm leading-8 text-zinc-400 sm:text-base">
                  I'm currently studying AI & Data Science while
                  building practical experience in programming,
                  frontend development and digital design.
                </p>
                <p className="mt-6 text-sm leading-8 text-zinc-500">
                  My goal is to keep improving as a developer by
                  combining technical knowledge with creativity,
                  experimentation and real-world projects.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="relative z-10 scroll-mt-20 px-6 py-32 lg:px-10 lg:py-44"
      >
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <p className="mb-10 text-xs uppercase tracking-[.3em] text-zinc-500">
              05 / Get In Touch
            </p>

            <h2 className="text-[clamp(3.4rem,10vw,8rem)] font-bold leading-[.95] tracking-[-.085em]">
              LET'S BUILD<br />
              <span className="outline-text">SOMETHING.</span>
            </h2>

            <p className="mx-auto mt-10 max-w-lg text-sm leading-8 text-zinc-500 sm:text-base">
              Have a project idea, collaboration opportunity or
              something interesting to discuss? Let's connect.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <PrimaryLink href={`mailto:${profile.email}`}>
                Send Email
              </PrimaryLink>

              <PrimaryLink href={profile.whatsapp} secondary external>
                Chat on WhatsApp
              </PrimaryLink>
            </div>

            <div className="mt-10 space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="block text-sm text-zinc-400 transition hover:text-white"
              >
                {profile.email}
              </a>

              <a
                href={`tel:${profile.phone}`}
                className="block text-sm text-zinc-400 transition hover:text-white"
              >
                {profile.phoneDisplay}
              </a>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-10">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium uppercase tracking-[.2em] text-zinc-500 transition hover:text-white"
              >
                GitHub ↗
              </a>

              <a
                href={profile.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium uppercase tracking-[.2em] text-zinc-500 transition hover:text-white"
              >
                Instagram ↗
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 bg-black/40 px-6 py-10 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center md:flex-row">
          <a
            href="#home"
            className="text-2xl font-black tracking-[-.08em]"
          >
            AHMED<span className="text-zinc-500">.</span>
          </a>

          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Ahmed Patel.
            Designed & Developed with care.
          </p>

          <a
            href="#home"
            className="text-xs uppercase tracking-widest text-zinc-400 transition hover:text-white"
          >
            Back to top ↑
          </a>
        </div>
      </footer>
    </main>
  );
}
