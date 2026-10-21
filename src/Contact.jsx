import React from "react";
import "./css/contact.css";
import cont from './contact.json'
import github from "./media/github.png"
import insta from "./media/insta.png"
import gmail from "./media/gmail.png"
import linkedin from "./media/linkedin.png"
import Reveal from "./Reveal";
import Highlight from "./Highlight";

// Moves the spotlight glow to the cursor position inside the card
const spotlight = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", (e.clientX - rect.left) + "px");
    e.currentTarget.style.setProperty("--y", (e.clientY - rect.top) + "px");
};

// Shows the address or site name on the card, for example "github.com" or "rahulahir4530@gmail.com"
const hostOf = (link) => link.startsWith("mailto:")
    ? link.slice("mailto:".length)
    : new URL(link).hostname.replace(/^www\./, "");

class App extends React.Component {
    constructor(props) {
        super(props);
        this.img = {
            "github": github,
            "instagram": insta,
            "gmail": gmail,
            "linkedin": linkedin
        }
    }
    render() {
        return (
            <section className="Contact section" id="contact">
                <div className="section__inner">
                    <header className="section__head">
                        <span className="section__eyebrow">Contact</span>
                        <h2 className="section__title">Let's <Highlight>talk</Highlight></h2>
                        <p className="section__lede">Reach out about roles, projects, open source, or anything in backend and infrastructure.</p>
                    </header>
                    <div className="cont__grid">
                        {cont["contact"].map((con, index) => (
                            <Reveal as="a" key={index} delay={index * 0.08} onMouseMove={spotlight}
                                className="card spot cont__card" href={con.link}
                                target={con.link.startsWith("mailto:") ? undefined : "_blank"}
                                rel="noopener noreferrer">
                                <div className="cont__top">
                                    <img className="cont__icon" src={this.img[con.img]} alt=""></img>
                                    <span className="cont__arrow" aria-hidden="true">↗</span>
                                </div>
                                <span className="cont__name">{con.name}</span>
                                <span className="cont__host">{hostOf(con.link)}</span>
                            </Reveal>
                        ))}
                    </div>
                    <footer className="copy__rights">
                        <span suppressHydrationWarning>© {new Date().getFullYear()} Rahul Chocha</span>
                        <a href="#home">Back to top ↑</a>
                    </footer>
                </div>
            </section>
        );
    }
}

export default App;
