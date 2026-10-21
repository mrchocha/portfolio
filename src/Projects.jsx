import React from "react";
import { motion } from "motion/react";
import "./css/projects.css";
import pro from "./projects.json";
import github from "./media/github_b.png"
import Reveal from "./Reveal";
import Highlight from "./Highlight";
import cont from "./contact.json";

// Moves the spotlight glow to the cursor position inside the card
const spotlight = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", (e.clientX - rect.left) + "px");
    e.currentTarget.style.setProperty("--y", (e.clientY - rect.top) + "px");
};

// GitHub's colours for each language, shown as a dot next to the project's main language
const LANG_COLORS = {
    "Rust": "#dea584",
    "C++": "#f34b7d",
    "C": "#555555",
    "Java": "#b07219",
    "Go": "#00add8",
};

// "https://github.com/mrchocha/network-experiments/tree/main/x" → "mrchocha/network-experiments"
const githubProfile = cont.contact.find((c) => c.img === "github").link;

// The featured project takes two of the three columns, so the "more" card spans
// whatever is left on the last row (or the full row when the grid is already even)
const moreSpan = (count) => 3 - ((count + 1) % 3);

const repoOf = (link) => new URL(link).pathname.split("/").filter(Boolean).slice(0, 2).join("/");

// LSM-tree diagram for projects with "visual": "lsm". Blocks pop in level by level.
const LEVELS = [
    { label: "WAL", blocks: 6, className: "lsm__row--wal" },
    { label: "MemTable", blocks: 1, mem: true },
    { label: "L0", blocks: 8 },
    { label: "L1", blocks: 4 },
    { label: "L2", blocks: 2 },
];
const LsmDiagram = () => (
    <div className="lsm" aria-hidden="true">
        {LEVELS.map((level, row) => (
            <React.Fragment key={level.label}>
                {level.label === "L0" ? <span className="lsm__flush">↓ flush</span> : ""}
                <div className={"lsm__row " + (level.className || "")}>
                    <span className="lsm__label">{level.label}</span>
                    <span className="lsm__blocks">
                        {Array.from({ length: level.blocks }, (_, i) => (
                            <motion.span key={i} className={"lsm__block" + (level.mem ? " lsm__block--mem" : "")}
                                initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 + row * 0.12 + i * 0.03 }} />
                        ))}
                    </span>
                </div>
            </React.Fragment>
        ))}
    </div>
);

class App extends React.Component {
    render() {
        const projects = pro["projects"];
        return (
            <section className="Projects section" id="projects">
                <div className="section__inner">
                    <header className="section__head">
                        <span className="section__eyebrow">Projects</span>
                        <h2 className="section__title">Things I've <Highlight>built</Highlight></h2>
                        <p className="section__lede">A few highlights from my GitHub: systems projects for learning how storage engines, containers and consensus work from the inside.</p>
                    </header>
                    <div className="proj__grid">
                        {projects.map((proj, index) => {
                            const wip = /\(WIP\)/i.test(proj.name);
                            const name = proj.name.replace(/\s*\(WIP\)/i, "");
                            const lang = proj.tool_technologies[0].trim();
                            const wide = index === 0;
                            const content = (
                                <div>
                                    <h3 className="proj__name">{name}</h3>
                                    <p className="proj__desc">{proj.description}</p>
                                </div>
                            );
                            return (
                                <Reveal as="article" key={index} delay={(index % 3) * 0.08} onMouseMove={spotlight}
                                    className={"card spot proj__card" + (wide ? " proj__card--wide" : "")}>
                                    <span className="proj__dots" aria-hidden="true"></span>
                                    <div className="proj__body">
                                        <div className="proj__top">
                                            <span className="proj__lang">
                                                <span className="proj__lang-dot" style={{ background: LANG_COLORS[lang] || "var(--ink-faint)" }}></span>
                                                {lang}<span className="proj__org"> · {proj.compney_name}</span>
                                            </span>
                                            <span className="proj__badges">
                                                {wip ? <span className="proj__wip">In progress</span> : ""}
                                                {proj.stars ?
                                                    <span className="proj__stars" title={proj.stars + " stars on GitHub"}>
                                                        <img src={github} alt=""></img>
                                                        ★ {proj.stars}
                                                    </span> : ""
                                                }
                                            </span>
                                        </div>
                                        {proj.visual === "lsm" && wide ?
                                            <div className="proj__main">
                                                {content}
                                                <LsmDiagram />
                                            </div> : content
                                        }
                                        <div className="proj__tools">
                                            {proj.tool_technologies.slice(1).map((tool) => (
                                                <span className="chip" key={tool}>{tool.trim()}</span>
                                            ))}
                                        </div>
                                    </div>
                                    {proj.link !== "" ?
                                        <div className="proj__foot">
                                            <span className="proj__repo">{repoOf(proj.link)}</span>
                                            <a className="link-arrow" href={proj.link} target="_blank" rel="noopener noreferrer">
                                                View on GitHub <span aria-hidden="true">→</span>
                                            </a>
                                        </div> : ""
                                    }
                                </Reveal>
                            );
                        })}
                        <Reveal as="a" delay={0.1} href={githubProfile + "?tab=repositories"} target="_blank" rel="noopener noreferrer"
                            className={"proj__more" + (moreSpan(projects.length) === 3 ? " proj__more--row" : "")} style={{ "--span": moreSpan(projects.length) }}>
                            <span className="proj__more-stack" aria-hidden="true">
                                <span></span>
                                <span></span>
                                <span><img src={github} alt=""></img></span>
                            </span>
                            <span className="proj__more-text">
                                <span className="proj__more-title">And many more on GitHub</span>
                                <span className="proj__more-desc">Experiments, coursework and smaller tools that didn't make this list.</span>
                            </span>
                            <span className="button proj__more-cta">
                                Browse all repositories <span aria-hidden="true">→</span>
                            </span>
                        </Reveal>
                    </div>
                </div>
            </section>
        );
    }
}

export default App;
