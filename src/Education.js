import React from 'react'
import './css/education.css'
import school from './media/school.jpg'
import d6 from './media/d6.png'
import d7 from './media/d7.png'
import d8 from './media/d8.png'
import d9 from './media/d9.png'
import AOS from 'aos';
class App extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        window.addEventListener('load', AOS.refresh)
    }
    render() {
        return (
            <div className="Education section" data-anchor="Education" >
                <div className="edue__contener">
                    <div className="edu__wrapper">
                        <div className="school__image" data-aos="zoom-out">
                            <img src={school} alt="not found"></img>
                        </div>
                    </div>
                    <div className="design__elements">
                        <div className="d6">
                            <img src={d6} alt="not found"></img>
                        </div>
                        <div className="d7">
                            <img src={d7} alt="not found"></img>
                        </div>
                        <div className="d8">
                            <img src={d8} alt="not found"></img>
                        </div>
                        <div className="d9">
                            <img src={d9} alt="not found"></img>
                        </div>

                        <div className="text__02" data-aos="fade-right">02<span style={{ fontSize: "20px" }}>Education </span></div>
                        <div className="school__square">
                        </div>
                    </div>
                    <div className="about__school" data-aos="fade-right">
                        Studying at <div>SCHOOL OF ENGINEERING AND APPLIED SCIENCE</div> as B.tech ICT student. My current CGPA is<div>3.04/4</div>
                    </div>
                </div>

            </div >
        )
    };
}

export default App;
