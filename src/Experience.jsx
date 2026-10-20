import React from 'react'
import { motion } from 'motion/react'
import './css/experience.css'
import exp from './experience.json'
import Reveal from './Reveal'
import cloudflareLogo from './media/logos/cloudflare.png'
import lyearnLogo from './media/logos/lyearn.png'
import pibitLogo from './media/logos/pibit.jpg'

// Company logos, keyed by the "logo" field in experience.json
const LOGOS = {
    cloudflare: cloudflareLogo,
    lyearn: lyearnLogo,
    pibit: pibitLogo,
};

const ease = [0.22, 1, 0.36, 1]

// Moves the spotlight glow to the cursor position inside the card
const spotlight = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", (e.clientX - rect.left) + "px");
    e.currentTarget.style.setProperty("--y", (e.clientY - rect.top) + "px");
};

class App extends React.Component {
    render() {
        return (
            <section className="Experience section" id="experience">
                <div className="section__inner">
                    <header className="section__head">
                        <span className="section__num">02</span>
                        <h2 className="section__title">Experience</h2>
                    </header>
                    <ol className="exp__timeline">
                        <motion.span className="exp__line" aria-hidden="true"
                            initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }} transition={{ duration: 1.6, ease }}></motion.span>
                        {exp["experience"].map((item, index) => (
                            <li className="exp__item" key={index}>
                                <span className={"exp__node" + (index === 0 ? " exp__node--current" : "")} aria-hidden="true"></span>
                                <Reveal as="div" className="card spot exp__card" delay={index * 0.1} onMouseMove={spotlight}>
                                    <div className="exp__top">
                                        <span className="exp__type">{item.type}</span>
                                        <span className="exp__duration">{item.duation}</span>
                                    </div>
                                    <div className="exp__company-row">
                                        <span className="exp__logo" aria-hidden="true">
                                            {LOGOS[item.logo] ? <img src={LOGOS[item.logo]} alt=""></img> : item.compney_name.charAt(0)}
                                        </span>
                                        <div>
                                            <h3 className="exp__position">{item.position}</h3>
                                            <p className="exp__company">{item.compney_name}</p>
                                        </div>
                                    </div>
                                    <div className="exp__tools">
                                        {item.tool_technologies.map((tool) => (
                                            <span className="chip" key={tool}>{tool}</span>
                                        ))}
                                    </div>
                                    {item.description ? <p className="exp__desc">{item.description}</p> : ""}
                                    {item.highlights && item.highlights.length > 0 ?
                                        <ul className="exp__highlights">
                                            {item.highlights.map((point, i) => (
                                                <li key={i}>{point}</li>
                                            ))}
                                        </ul> : ""
                                    }
                                    {item.link !== "" ?
                                        <a className="link-arrow" href={item.link} target="_blank" rel="noopener noreferrer">
                                            Visit website <span aria-hidden="true">→</span>
                                        </a> : ""
                                    }
                                </Reveal>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>
        )
    };
}

export default App;
