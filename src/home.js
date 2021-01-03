import React from 'react'
import Myphoto from './media/my.jpg'
import './css/home.css'
import AOS from 'aos';
import d1 from './media/d1.png'
import d3 from './media/d4.png'
import d5 from './media/d5.png'

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        AOS.refresh()
    }
    render() {
        return (
            <div className="Home section active" data-anchor="Home" >
                <div className="home__contener">
                    <div className="home__wrapper">
                        <div className="my__photo" data-aos="zoom-in-right">
                            <img src={Myphoto} alr="not found"></img>
                        </div>
                        <div className="home__title">
                            <div data-aos="fade-left">Hello,</div>
                            <div data-aos="fade-down"><div>Rahul</div> <div>Chocha</div></div>
                            <div data-aos="fade-up">Here.</div>
                        </div>
                        <div className="design__elements">
                            <div className="d1">
                                <img src={d1} alt="not found"></img>
                            </div>
                            <div className="d3">
                                <img src={d3} alt="not found"></img>
                            </div>
                            <div className="d5">
                                <img src={d5} alt="not found"></img>
                            </div>
                            <div className="mrchocha__text">
                                MR_CHOCHA
                            </div>
                            <div className="text__01" data-aos="fade-right">
                                01<span style={{ fontSize: "20px" }} >mrchocha </span>
                            </div>
                        </div>
                        <data className="about__me" data-aos="fade-left">B.Tech I.C.T engineer, exploring web along with Data Structures and Algorithms.</data>
                    </div>
                </div>

            </div>
        )
    };
}

export default App;
