import React from "react";
import "./css/projects.css";
import d14 from "./media/d14.png";
import pro from "./projects.json";
import github from "./media/github_b.png"
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { projects: [] };
    }
    componentDidMount() {
        this.setState({ projects: pro["projects"] }, () => {
            console.log(this.state.projects[0]);
        });
    }
    render() {
        return (
            <div className="Projects section" data-anchor="Projects">
                <div className="proj__contener">
                    <div className="proj__wrapper">
                        <div className="proj__details" data-aos="fade-left">
                            {this.state.projects.map((proj, index) => (
                                <div className="proj__card">
                                    <div className="name">{proj.name}</div>
                                    <span className="compney">{proj.compney_name}</span>
                                    <div className="stars"><img className="github__project" src={github} alt="not found"></img> {proj.stars}★</div>
                                    <div className="tool_techno">
                                        {
                                            proj.tool_technologies.map((tool, i) => (
                                                <span>{tool} </span>
                                            ))
                                        }
                                        {
                                            proj.link !== "" ? (
                                                <a href={proj.link}>
                                                    <div className="link">
                                                        <span>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                id="icon-arrow-right"
                                                                viewBox="0 0 21 12"
                                                            >
                                                                <path d="M17.104 5.072l-4.138-4.014L14.056 0l6 5.82-6 5.82-1.09-1.057 4.138-4.014H0V5.072h17.104z"></path>
                                                            </svg>
                                                        </span>
                                                        <span>visit</span>
                                                    </div>
                                                </a>
                                            ) : (
                                                    ""
                                                )
                                        }
                                    </div>
                                    <p className="desc">
                                        {proj.description.length < 200
                                            ? proj.description
                                            : proj.description.substring(0, 200).concat("...")}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="text__04" data-aos="fade-right">
                            04<span style={{ fontSize: "20px" }}>Projects </span>
                        </div>
                    </div>
                    <div className="design__elements">
                        <div className="d14">
                            <img src={d14} alt="not found"></img>
                        </div>

                        <div className="project__square"></div>
                        {this.state.projects.length > 1 ?
                            <div className="swipe__right2">
                                <span>swipe</span> <svg xmlns="http://www.w3.org/2000/svg" id="icon-arrow-right" viewBox="0 0 21 12">
                                    <path d="M17.104 5.072l-4.138-4.014L14.056 0l6 5.82-6 5.82-1.09-1.057 4.138-4.014H0V5.072h17.104z"></path>
                                </svg>
                            </div>
                            : ""
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
