import React from "react";
import "./css/projects.css";
import pro from "./projects.json";
import Reveal from "./Reveal";

// Moves the spotlight glow to the cursor position inside the card
const spotlight = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", (e.clientX - rect.left) + "px");
    e.currentTarget.style.setProperty("--y", (e.clientY - rect.top) + "px");
};

class App extends React.Component {
    render() {
        const openSource = pro["openSource"];
        return (
            <section className="OpenSource section" id="opensource">
                <div className="section__inner">
                    <header className="section__head">
                        <span className="section__num">04</span>
                        <h2 className="section__title">Open source</h2>
                        <p className="oss__count">{openSource.length} projects with merged contributions</p>
                    </header>
                    <div className="oss__grid">
                        {openSource.map((item, index) => (
                            <Reveal as="div" key={index} delay={index * 0.06} onMouseMove={spotlight}
                                className="card spot oss__card">
                                <span className="oss__name">{item.name}</span>
                                <span className="oss__desc">{item.description}</span>
                                <span className="oss__links">
                                    {item.links.map((ref) => (
                                        <a className="chip" key={ref.label} href={ref.link} target="_blank" rel="noopener noreferrer">{ref.label}</a>
                                    ))}
                                </span>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
}

export default App;
