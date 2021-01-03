import React from 'react'
import './css/experience.css'
import d10 from './media/d10.png'
import exp from './experience.json'
import d11 from './media/d11.png'
import d12 from './media/d12.png'
import d13 from './media/d13.png'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { "experience": [] }
    }
    componentDidMount() {
        this.setState({ "experience": exp["experience"] }, () => { console.log(this.state.experience[0].type) })
    }
    render() {
        return (
            <div className="Experience section" data-anchor="Experience" >
                <div className="exp__contener">
                    <div className="expe__wrapper">
                        <div className="exp__details" data-aos="fade-left">
                            {
                                this.state.experience.map((exp, index) => (
                                    <span className="exp__card">
                                        <div className="type" >{exp.type}</div>
                                        <span className="position" >{exp.position}, </span>
                                        <span className="compney" >{exp.compney_name}</span>
                                        <span className="duration"> {exp.duation} </span>
                                        <div className="tool_techno">
                                            {exp.tool_technologies.map((tool, i) => (
                                                <span>{tool} </span>
                                            ))}
                                        </div>
                                        <p className="desc">{(exp.description).length < 200 ? exp.description : exp.description.substring(0, 200).concat("...")}</p>
                                        {
                                            exp.link !== "" ?
                                                <a href={exp.link}>
                                                    <div className="link">
                                                        <span><svg xmlns="http://www.w3.org/2000/svg" id="icon-arrow-right" viewBox="0 0 21 12">
                                                            <path d="M17.104 5.072l-4.138-4.014L14.056 0l6 5.82-6 5.82-1.09-1.057 4.138-4.014H0V5.072h17.104z"></path>
                                                        </svg>
                                                        </span>
                                                        <span>visit</span>
                                                    </div>
                                                </a> : ""
                                        }
                                    </span>
                                ))
                            }
                        </div>
                        <div className="design__elements">
                            <div className="d10">
                                <img src={d10} alt="not found"></img>
                            </div>
                            <div className="d11">
                                <img src={d11} alt="not found"></img>
                            </div>
                            <div className="d12__1">
                                <img src={d12} alt="not found"></img>
                            </div>
                            <div className="d12__2">
                                <img src={d12} alt="not found"></img>
                            </div>
                            <div className="d13">
                                <img src={d13} alt="not found"></img>
                            </div>
                            {this.state.experience.length > 1 ?
                                <div className="swipe__right">
                                    <span>swipe</span> <svg xmlns="http://www.w3.org/2000/svg" id="icon-arrow-right" viewBox="0 0 21 12">
                                        <path d="M17.104 5.072l-4.138-4.014L14.056 0l6 5.82-6 5.82-1.09-1.057 4.138-4.014H0V5.072h17.104z"></path>
                                    </svg>
                                </div>
                                : ""
                            }

                            <div className="text__03" data-aos="fade-right">03<span style={{ fontSize: "20px" }}>Experience </span></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default App;
