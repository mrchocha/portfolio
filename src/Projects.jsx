import React from "react";
import "./css/projects.css";
import pro from "./projects.json";
import github from "./media/github_b.png"
import Reveal from "./Reveal";

// Moves the spotlight glow to the cursor position inside the card
const spotlight = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", (e.clientX - rect.left) + "px");
    e.currentTarget.style.setProperty("--y", (e.clientY - rect.top) + "px");
};

class App extends React.Component {
    render() {
        const projects = pro["projects"];
        return (
            <section className="Projects section" id="projects">
                <div className="section__inner">
                    <header className="section__head">
                        <span className="section__num">03</span>
                        <h2 className="section__title">Personal projects</h2>
                    </header>
                    <div className="proj__grid">
                        {projects.map((proj, index) => (
                            <Reveal as="article" key={index} delay={(index % 3) * 0.08} tilt onMouseMove={spotlight}
                                className={"card spot proj__card" + (index === 0 ? " proj__card--wide" : "")}>
                                <div className="proj__top">
                                    <span className="proj__org">{proj.compney_name}</span>
                                    {proj.stars !== undefined ?
                                        <span className="proj__stars">
                                            <img src={github} alt="GitHub"></img>
                                            ★ {proj.stars}
                                        </span> : ""
                                    }
                                </div>
                                <h3 className="proj__name">{proj.name}</h3>
                                <p className="proj__desc">{proj.description}</p>
                                <div className="proj__tools">
                                    {proj.tool_technologies.map((tool) => (
                                        <span className="chip" key={tool}>{tool.trim()}</span>
                                    ))}
                                </div>
                                {proj.link !== "" ?
                                    <a className="link-arrow" href={proj.link} target="_blank" rel="noopener noreferrer">
                                        View on GitHub <span aria-hidden="true">→</span>
                                    </a> : ""
                                }
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
}

export default App;
