import React from 'react'
import { motion } from 'motion/react'
import './css/experience.css'
import exp from './experience.json'
import cont from './contact.json'
import Reveal from './Reveal'
import Highlight from './Highlight'
import cloudflareLogo from './media/logos/cloudflare.png'
import lyearnLogo from './media/logos/lyearn.png'
import pibitLogo from './media/logos/pibit.jpg'

// Company logos, keyed by the "logo" field in experience.json
const LOGOS = {
    cloudflare: cloudflareLogo,
    lyearn: lyearnLogo,
    pibit: pibitLogo,
};

const linkedin = cont.contact.find((c) => c.img === "linkedin").link;

// Splits "Systems Engineer, Bangalore, India" into the title and the place
const splitPosition = (position) => {
    const comma = position.indexOf(',')
    if (comma === -1) return { title: position, place: '' }
    return { title: position.slice(0, comma), place: position.slice(comma + 1).trim() }
}

const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };

// "Oct 2022" → months since year 0; "Present" → this month
const toMonths = (text) => {
    if (/present/i.test(text)) {
        const now = new Date();
        return now.getFullYear() * 12 + now.getMonth();
    }
    const [month, year] = text.trim().split(/\s+/);
    return Number(year) * 12 + MONTHS[month.slice(0, 3).toLowerCase()];
}

// "Oct 2022 - June 2025" → "2 yrs 9 mos", counting both the first and last month
const tenure = (range) => {
    const [start, end] = range.split(' - ');
    const months = toMonths(end) - toMonths(start) + 1;
    const years = Math.floor(months / 12);
    const rest = months % 12;
    return [
        years ? years + (years > 1 ? " yrs" : " yr") : "",
        rest ? rest + (rest > 1 ? " mos" : " mo") : "",
    ].filter(Boolean).join(" ");
}

const startYear = Math.min(...exp["experience"].map((item) => Number(item.duation.match(/\d{4}/)[0])));

const Logo = ({ item }) => (
    <span className="exp__logo" aria-hidden="true">
        {LOGOS[item.logo] ? <img src={LOGOS[item.logo]} alt=""></img> : item.compney_name.charAt(0)}
    </span>
)

// Every role is listed down the page. The career card stays pinned beside them,
// highlights whichever role is in the middle of the screen, and fills the line
// under each company as you read through that role.
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: 0 };
        this.roles = React.createRef();
        this.tabs = React.createRef();
        this.onScroll = this.onScroll.bind(this);
    }
    componentDidMount() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) this.setState({ active: Number(entry.target.dataset.index) });
            });
        }, { rootMargin: '-35% 0px -60% 0px' });
        this.roles.current.querySelectorAll('.exp__role').forEach((role) => this.observer.observe(role));
        window.addEventListener('scroll', this.onScroll, { passive: true });
        window.addEventListener('resize', this.onScroll);
        this.updateLines();
    }
    componentDidUpdate(prevProps, prevState) {
        // On small screens the list is a sideways row: keep the highlighted company in view
        if (prevState.active === this.state.active) return;
        const row = this.tabs.current;
        const tab = row.children[this.state.active];
        if (row.scrollWidth > row.clientWidth && tab) {
            row.scrollTo({ left: tab.offsetLeft - 20, behavior: 'smooth' });
        }
    }
    componentWillUnmount() {
        this.observer.disconnect();
        window.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('resize', this.onScroll);
        cancelAnimationFrame(this.frame);
    }
    onScroll() {
        if (this.frame) return;
        this.frame = requestAnimationFrame(() => {
            this.frame = null;
            this.updateLines();
        });
    }
    // Sets --p on each timeline line to how far the middle of the screen is through that role, 0 to 1
    updateLines() {
        const middle = window.innerHeight / 2;
        const lines = this.tabs.current.querySelectorAll('.exp__tab-line');
        Array.from(this.roles.current.children).forEach((role, index) => {
            if (!lines[index]) return;
            const rect = role.getBoundingClientRect();
            const progress = Math.min(1, Math.max(0, (middle - rect.top) / rect.height));
            lines[index].style.setProperty('--p', progress);
        });
    }
    render() {
        const items = exp["experience"];
        const { active } = this.state;
        return (
            <section className="Experience section" id="experience">
                <div className="section__inner">
                    <header className="section__head">
                        <span className="section__eyebrow">Experience</span>
                        <h2 className="section__title">Where I've <Highlight>worked</Highlight></h2>
                    </header>
                    <div className="exp__layout">
                        <nav className="exp__side" aria-label="Companies">
                            <div className="exp__side-head">
                                <span>Career</span>
                                <span>{startYear} — Now</span>
                            </div>
                            <div className="exp__tabs" ref={this.tabs}>
                                {items.map((it, index) => (
                                    <a key={index} href={"#exp-role-" + index}
                                        aria-current={index === active ? "true" : undefined}
                                        className={"exp__tab" + (index === active ? " is-active" : "")}>
                                        {index === active ?
                                            <motion.span className="exp__tab-bg" layoutId="exp-tab"
                                                transition={{ type: 'spring', stiffness: 400, damping: 34 }}></motion.span> : ""
                                        }
                                        {index < items.length - 1 ?
                                            <span className="exp__tab-line" aria-hidden="true"></span> : ""
                                        }
                                        <Logo item={it} />
                                        <span className="exp__tab-text">
                                            <span className="exp__tab-top">
                                                <span className="exp__tab-name">{it.compney_name}</span>
                                                <span className="exp__tab-tenure" suppressHydrationWarning>{tenure(it.duation)}</span>
                                            </span>
                                            <span className="exp__tab-role">{splitPosition(it.position).title}</span>
                                            <span className="exp__tab-dates">{it.duation}</span>
                                        </span>
                                    </a>
                                ))}
                            </div>
                            <a className="exp__side-foot" href={linkedin} target="_blank" rel="noopener noreferrer">
                                Full history on LinkedIn <span aria-hidden="true">↗</span>
                            </a>
                        </nav>

                        <div className="exp__roles" ref={this.roles}>
                            {items.map((item, index) => {
                                const { title, place } = splitPosition(item.position);
                                const current = item.duation.includes("Present");
                                return (
                                    <Reveal as="article" key={index} id={"exp-role-" + index} data-index={index}
                                        className={"card exp__role" + (index === active ? " is-active" : "")}>
                                        <div className="exp__meta">
                                            <span className={"exp__type" + (current ? " is-current" : "")}>
                                                {current ? <span className="exp__now" aria-hidden="true"></span> : ""}
                                                {current ? "Current role" : item.type}
                                            </span>
                                            <span className="exp__duration">{item.duation}</span>
                                        </div>
                                        <div className="exp__heading">
                                            <Logo item={item} />
                                            <div>
                                                <h3 className="exp__position">{title}</h3>
                                                <p className="exp__company">
                                                    {item.compney_name}{place ? " · " + place : ""}{current ? " · " + item.type : ""}
                                                </p>
                                            </div>
                                        </div>

                                        {item.metrics && item.metrics.length > 0 ?
                                            <dl className="exp__metrics">
                                                {item.metrics.map((metric) => (
                                                    <div className="exp__metric" key={metric.label}>
                                                        <dt>{metric.label}</dt>
                                                        <dd>{metric.value}</dd>
                                                    </div>
                                                ))}
                                            </dl> : ""
                                        }

                                        {item.description ? <p className="exp__desc">{item.description}</p> : ""}
                                        {item.highlights && item.highlights.length > 0 ?
                                            <ul className="exp__highlights">
                                                {item.highlights.map((point, i) => (
                                                    <li key={i}>{point}</li>
                                                ))}
                                            </ul> : ""
                                        }

                                        <div className="exp__stack">
                                            <span className="exp__stack-label">Stack</span>
                                            <div>
                                                {item.tool_technologies.map((tool) => (
                                                    <span className="chip" key={tool}>{tool}</span>
                                                ))}
                                            </div>
                                        </div>
                                        {item.link !== "" ?
                                            <a className="link-arrow" href={item.link} target="_blank" rel="noopener noreferrer">
                                                Visit website <span aria-hidden="true">→</span>
                                            </a> : ""
                                        }
                                    </Reveal>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        )
    };
}

export default App;
