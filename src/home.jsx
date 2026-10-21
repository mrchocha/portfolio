import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import cont from "./contact.json";
import TerminalLines from "./TerminalLines";
import CountUp from "./CountUp";
import cloudflareLogo from "./media/logos/cloudflare.png";
import lyearnLogo from "./media/logos/lyearn.png";
import pibitLogo from "./media/logos/pibit.jpg";
import "./css/home.css";

const ease = [0.22, 1, 0.36, 1];

// The Gmail link from contact.json, so "Get in touch" opens an email to the same address
const email = cont.contact.find((c) => c.link.startsWith("mailto:")).link;

// Lines typed into the terminal panel. A line with no prompt is output.
const TERMINAL = [
  { prompt: "$", text: "whoami" },
  { text: "Rahul Chocha · Systems Engineer @ Cloudflare" },
  { prompt: "$", text: "ls open-source/" },
  { text: "HolmesGPT  Tegon  Memphis  Go-functional  DiceDB" },
];

// Headline numbers, taken from experience.json and projects.json
const STATS = [
  { to: 5, suffix: "+ yrs", label: "Building backend systems" },
  { to: 2, suffix: "M+/s", label: "Records processed by a risk platform" },
  { to: 100, suffix: "K+", label: "Active users served" },
  { to: 5, suffix: "+", label: "Open-source projects contributed to" },
];

// Words that take turns in the highlighter at the end of the headline
const WORDS = ["scale", "stay up", "run fast"];

// Swaps the highlighted word every few seconds: the highlighter wipes in, then wipes out to the right.
// Visitors who ask for less motion see only the first word.
function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % WORDS.length),
      2800,
    );
    return () => clearInterval(timer);
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.span
        className="hl"
        key={WORDS[index]}
        initial="hidden"
        animate="shown"
        exit="gone"
      >
        <motion.span
          className="hl__bg"
          aria-hidden="true"
          variants={{
            hidden: { scaleX: 0, originX: 0 },
            shown: {
              scaleX: 1,
              originX: 0,
              transition: { duration: 0.5, ease, delay: 0.1 },
            },
            gone: {
              scaleX: 0,
              originX: 1,
              transition: { duration: 0.35, ease },
            },
          }}
        />
        <motion.span
          className="hl__text"
          variants={{
            hidden: { opacity: 0, y: "0.25em" },
            shown: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.4, ease, delay: 0.25 },
            },
            gone: { opacity: 0, y: "-0.25em", transition: { duration: 0.2 } },
          }}
        >
          {WORDS[index]}
        </motion.span>
      </motion.span>
    </AnimatePresence>
  );
}

const COMPANIES = [
  { name: "Cloudflare", logo: cloudflareLogo },
  { name: "Lyearn", logo: lyearnLogo },
  { name: "Pibit.ai (YC W21)", logo: pibitLogo },
];

// Fades an element up into place, staggered by delay
const rise = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease, delay },
});

class App extends React.Component {
  render() {
    return (
      <section className="Home" id="home">
        <div className="Home__glow" aria-hidden="true"></div>
        <div className="Home__inner">
          <div className="Home__hero">
            <div className="Home__copy">
              <motion.a className="Home__badge" href="#experience" {...rise(0)}>
                <span className="Home__dot" aria-hidden="true"></span>
                Currently at Cloudflare
                <span className="Home__badge-arrow" aria-hidden="true">
                  →
                </span>
              </motion.a>
              <motion.h1
                className="Home__name"
                aria-label={
                  "Rahul Chocha. Building systems that " + WORDS.join(", ")
                }
                {...rise(0.08)}
              >
                <span className="Home__name-line" aria-hidden="true">
                  Rahul Chocha
                </span>
                <span className="Home__tagline" aria-hidden="true">
                  Building systems that <RotatingWord />
                </span>
              </motion.h1>
              <motion.p className="Home__about" {...rise(0.16)}>
                Systems engineer building distributed backend and infrastructure
                platforms in Go and Rust. Previously at Lyearn and Pibit.ai, and
                a contributor to CNCF open-source projects.
              </motion.p>
              <motion.div className="Home__actions" {...rise(0.24)}>
                <a className="button button--primary" href="#projects">
                  View my work
                </a>
                <a className="button" href={email}>
                  Get in touch
                </a>
              </motion.div>
            </div>

            <motion.div className="Home__terminal" {...rise(0.32)}>
              <div className="Home__window-bar">
                <i></i>
                <i></i>
                <i></i>
                <span>~/rahul</span>
              </div>
              <TerminalLines lines={TERMINAL} delay={900} />
            </motion.div>
          </div>

          <motion.dl className="Home__stats" {...rise(0.4)}>
            {STATS.map((stat) => (
              <div className="Home__stat" key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>
                  <CountUp to={stat.to} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.div className="Home__companies" {...rise(0.48)}>
            <span className="Home__companies-label">Experience at</span>
            <ul>
              {COMPANIES.map((company) => (
                <li key={company.name}>
                  <img src={company.logo} alt=""></img>
                  {company.name}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    );
  }
}

export default App;
