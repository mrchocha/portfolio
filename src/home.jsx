import React from "react";
import { motion } from "motion/react";
import cont from "./contact.json";
import TerminalLines from "./TerminalLines";
import "./css/home.css";

const ease = [0.22, 1, 0.36, 1];
const NAME = "Rahul Chocha";

// The Gmail link from contact.json, so "Get in touch" opens an email to the same address
const email = cont.contact.find((c) => c.link.startsWith("mailto:")).link;

// Lines typed into the terminal panel. A line with no prompt is output.
const TERMINAL = [
  { prompt: "$", text: "whoami" },
  { text: "Rahul Chocha · Systems Engineer @ Cloudflare" },
  { prompt: "$", text: "ls open-source/" },
  { text: "HolmesGPT  Tegon  Memphis  Go-functional  DiceDB" },
];

const press = {
  whileHover: { y: -2, scale: 1.02 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 400, damping: 22 },
};

class App extends React.Component {
  render() {
    return (
      <section className="Home" id="home">
        <div className="Home__glow" aria-hidden="true"></div>
        <div className="Home__inner">
          <motion.a
            className="Home__badge"
            href="#experience"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="Home__dot" aria-hidden="true"></span>
            Systems engineer at Cloudflare <span aria-hidden="true">→</span>
          </motion.a>
          <h1 className="Home__name" aria-label={NAME}>
            {NAME.split("").map((ch, i) => (
              <motion.span
                className="Home__char"
                key={i}
                aria-hidden="true"
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease, delay: 0.15 + i * 0.03 }}
              >
                {ch === " " ? " " : ch}
              </motion.span>
            ))}
          </h1>
          <motion.p
            className="Home__about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
          >
            "AI is the new electricity."
            <span className="Home__quote-by">— Andrew Ng</span>
          </motion.p>
          <motion.div
            className="Home__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.6 }}
          >
            <motion.a
              className="button button--primary"
              href="#projects"
              {...press}
            >
              View projects
            </motion.a>
            <motion.a className="button" href={email} {...press}>
              Get in touch
            </motion.a>
          </motion.div>

          <motion.div
            className="Home__terminal"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.8 }}
          >
            <div className="Home__window-bar">
              <i></i>
              <i></i>
              <i></i>
              <span>~/rahul</span>
            </div>
            <TerminalLines lines={TERMINAL} delay={1000} />
          </motion.div>
        </div>
      </section>
    );
  }
}

export default App;
