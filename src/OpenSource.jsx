import React from "react";
import "./css/projects.css";
import "./css/opensource.css";
import pro from "./projects.json";
import cont from "./contact.json";
import github from "./media/github_b.png";
import Reveal from "./Reveal";
import Highlight from "./Highlight";

// Moves the spotlight glow to the cursor position inside the card
const spotlight = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", (e.clientX - rect.left) + "px");
    e.currentTarget.style.setProperty("--y", (e.clientY - rect.top) + "px");
};

// "https://github.com/mrchocha" → "mrchocha"
const username = new URL(cont.contact.find((c) => c.img === "github").link).pathname.split("/")[1];
const allPulls = "https://github.com/pulls?q=is%3Apr+is%3Amerged+author%3A" + username;

// "HolmesGPT (CNCF)" → name "HolmesGPT", tag "CNCF"
const splitName = (text) => {
    const match = text.match(/^(.*?)\s*\((.+)\)$/);
    return match ? { name: match[1], tag: match[2] } : { name: text, tag: "" };
};

// Links labelled like "#652" are pull requests; anything else links to a repository
const isPull = (ref) => ref.label.startsWith("#");

// GitHub owner of a link, e.g. "HolmesGPT" for github.com/HolmesGPT/holmesgpt/pull/652
const ownerOf = (link) => new URL(link).pathname.split("/")[1];

// Repository name of a link, e.g. "holmesgpt"
const repoOf = (link) => new URL(link).pathname.split("/")[2];

const MergeIcon = () => (
    <svg className="oss__icon" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="4" cy="3.5" r="1.75" />
        <circle cx="4" cy="12.5" r="1.75" />
        <circle cx="12" cy="8" r="1.75" />
        <path d="M4 5.25v5.5M4 5.5c0 2.5 2.25 2.5 6.25 2.5" />
    </svg>
);

// The owner's GitHub avatar, with the first letter underneath in case the image fails to load
const Avatar = ({ owner }) => (
    <span className="oss__avatar" aria-hidden="true">
        {owner.charAt(0).toUpperCase()}
        <img src={"https://github.com/" + owner + ".png?size=96"} alt="" loading="lazy"
            onError={(e) => { e.currentTarget.style.display = "none"; }}></img>
    </span>
);

const Links = ({ links }) => links.map((ref) => (
    <a key={ref.label} className="chip oss__link" href={ref.link} target="_blank" rel="noopener noreferrer"
        title={isPull(ref) ? "Merged pull request " + ref.label : ref.label + " on GitHub"}>
        {ref.label}
    </a>
));

// The first contribution is featured across two columns, with its pull requests beside the description.
// The rest fill the grid, and a full-width tile at the end links to every merged pull request on GitHub.
class App extends React.Component {
    render() {
        const openSource = pro["openSource"];
        const pullCount = (item) => item.links.filter(isPull).length;
        const total = openSource.reduce((sum, item) => sum + pullCount(item), 0);
        return (
            <section className="OpenSource section" id="opensource">
                <div className="section__inner">
                    <header className="section__head">
                        <span className="section__eyebrow">Open source</span>
                        <h2 className="section__title">Merged <Highlight>upstream</Highlight></h2>
                        <p className="section__lede">{total}+ merged pull requests across {openSource.length} open-source projects, including CNCF and YC-backed tools.</p>
                    </header>
                    <div className="oss__grid">
                        {openSource.map((item, index) => {
                            const { name, tag } = splitName(item.name);
                            const owners = [...new Set(item.links.map((ref) => ownerOf(ref.link)))].slice(0, 2);
                            const pulls = pullCount(item);
                            const featured = index === 0;
                            return (
                                <Reveal as="article" key={index} delay={(index % 3) * 0.08} onMouseMove={spotlight}
                                    className={"card spot proj__card oss__card" + (featured ? " oss__card--featured" : "")}>
                                    <span className="proj__dots" aria-hidden="true"></span>
                                    <div className="proj__body">
                                        <div className="proj__top">
                                            <span className={"oss__avatars" + (owners.length > 1 ? " is-stacked" : "")}>
                                                {owners.map((owner) => <Avatar key={owner} owner={owner} />)}
                                            </span>
                                            {tag ? <span className="oss__tag">{tag}</span> : ""}
                                        </div>
                                        <div className={featured ? "oss__main" : ""}>
                                        <div>
                                            <h3 className="proj__name">{name}</h3>
                                            <p className="proj__desc">{item.description}</p>
                                        </div>
                                        {featured && pulls > 0 ?
                                            <div className="oss__spotlight">
                                                <div className="oss__spotlight-head">
                                                    <MergeIcon />
                                                    Merged pull requests
                                                    <span className="oss__count">{pulls}</span>
                                                </div>
                                                <ul className="oss__prs">
                                                    {item.links.filter(isPull).map((ref) => (
                                                        <li key={ref.label}>
                                                            <a className="oss__pr" href={ref.link} target="_blank" rel="noopener noreferrer">
                                                                <span className="oss__pr-num">{ref.label}</span>
                                                                <span className="oss__pr-repo">{repoOf(ref.link)}</span>
                                                                <span className="oss__pr-arrow" aria-hidden="true">↗</span>
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div> : ""
                                        }
                                        </div>
                                    </div>
                                    {!featured ?
                                        <div className="proj__foot">
                                            <span className="oss__foot-count">
                                                {pulls > 0 ? <MergeIcon /> : ""}
                                                {pulls > 0 ? pulls + (pulls > 1 ? " PRs" : " PR") : "Repos"}
                                            </span>
                                            <span className="oss__foot-links"><Links links={item.links} /></span>
                                        </div> : ""
                                    }
                                </Reveal>
                            );
                        })}
                        <Reveal as="a" delay={0.16} href={allPulls} target="_blank" rel="noopener noreferrer" className="proj__more proj__more--row oss__more">
                            <span className="proj__more-stack" aria-hidden="true">
                                <span></span>
                                <span></span>
                                <span><img src={github} alt=""></img></span>
                            </span>
                            <span className="proj__more-text">
                                <span className="proj__more-title">See all my pull requests</span>
                                <span className="proj__more-desc">Every merged PR on GitHub, kept up to date.</span>
                            </span>
                            <span className="button proj__more-cta">
                                Open on GitHub <span aria-hidden="true">→</span>
                            </span>
                        </Reveal>
                    </div>
                </div>
            </section>
        );
    }
}

export default App;
