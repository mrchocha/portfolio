import React from "react";
import "./css/skills.css";
import d17 from './media/d17.png'
import github from "./media/github.png"
import insta from "./media/insta.png"
import gmail from "./media/gmail.png"
import linkedin from "./media/linkedin.png"
import cont from './contact.json'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { "contact": [] };
        this.img = {
            "github": github,
            "instagram": insta,
            "gmail": gmail,
            "linkedin": linkedin
        }
    }
    componentDidMount() {
        this.setState({ "contact": cont["contact"] }, () => { console.log(this.state.contact) });
    }
    render() {
        return (
            <div className="Contact section " data-anchor="Contact">
                <div className="cont__contener">
                    <div className="cont__wrapper">
                        <div className="cont__details" data-aos="fade-left">
                            {
                                this.state.contact.map((con, index) => (
                                    <a href={con.link}>
                                        <div className="cont__card">
                                            <div className="name">
                                                {con.name}
                                            </div>
                                            <div className="cont__img">
                                                <img src={this.img[con.img]} alt="not found"></img>
                                            </div>
                                            <a href={con.link}>
                                                <div className="link cont__link">
                                                    <span>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            id="icon-arrow-right"
                                                            viewBox="0 0 21 12"
                                                        >
                                                            <path d="M17.104 5.072l-4.138-4.014L14.056 0l6 5.82-6 5.82-1.09-1.057 4.138-4.014H0V5.072h17.104z"></path>
                                                        </svg>
                                                    </span>
                                                    <span>view</span>
                                                </div>
                                            </a>
                                        </div>
                                    </a>
                                ))
                            }

                        </div>
                        <div className="design__elements">
                            <div className="d17">
                                <img src={d17} alt="not found"></img>
                            </div>
                            <div className="text__06" data-aos="fade-right" >
                                06<span style={{ fontSize: "20px" }}>Connect me</span>
                            </div>

                            <div className="copy__rights"> Copyright ©2020 All rights reserved | by Rahul Chocha </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
