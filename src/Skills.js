import React from "react";
import "./css/contact.css";
import d15 from './media/d15.png'
import d16 from "./media/d16.png";
import d4 from "./media/d4.png";
import SVG3DTagCloud from "../node_modules/3d-word-cloud/js/jquery.svg3dtagcloud"
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { "entries": [] };
    }
    componentDidMount() {
        var entries = [
            { label: 'C' },
            { label: 'C++' },
            { label: 'HTML' },
            { label: 'CSS' },
            { label: 'JS' },
            { label: 'NodeJS' },
            { label: 'ReactJs' },
            { label: 'Jquery' },
            { label: 'Github' },
            { label: 'Particles.js' },
            { label: 'Heroku' },
            { label: 'Python' },
            { label: 'Particles.js' },
            { label: 'Java' },
            { label: 'Matlab' },
            { label: 'Shell Script' },
            { label: 'Scilab' },
            { label: 'Latex' },
            { label: 'MySQL' },
            { label: 'PostgreSQL' },
            { label: 'MongoDB' },
            { label: 'OracleDB' },
            { label: 'Django' },
            { label: 'Ubuntu' },
            { label: 'AOS' }
        ];
        var fov = 300;
        if (window.screen.width < window.screen.height) {
            fov = 200;
        }
        var settings = {

            entries: entries,
            width: window.screen.width,
            height: window.screen.height,
            radius: '100%',
            radiusMin: 75,
            bgDraw: false,
            bgColor: '#fff',
            opacityOver: 0.001,
            opacityOut: 1,
            opacitySpeed: 6,
            fov: fov,
            speed: 0.3,
            fontFamily: "'Anton', sans-serif",
            fontSize: '25',
            fontColor: '#111',
            fontWeight: 'normal',//bold
            fontStyle: 'normal',//italic 
            fontStretch: 'narrower',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
            fontToUpperCase: false,
            tooltipFontFamily: "Monoton, cursive",
            tooltipFontSize: '11',
            tooltipFontColor: '#fff',
            tooltipFontWeight: 'normal',//bold
            tooltipFontStyle: 'normal',//italic 
            tooltipFontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
            tooltipFontToUpperCase: false,
            tooltipTextAnchor: 'left',
            tooltipDiffX: 0,
            tooltipDiffY: 10,
            animatingSpeed: 0.01,
            animatingRadiusLimit: 1.3

        };
        var svg3DTagCloud = new SVG3DTagCloud(document.getElementById('holder'), settings);

    }
    render() {

        return (
            <div className="Skills section" data-anchor="Skills">
                <div className="ski__contener">
                    <div className="ski__wrapper">
                        <div className="ski__details" data-aos="fade-left">
                            <div id="holder"></div>
                        </div>
                        <div className="text__05" data-aos="fade-right">
                            05<span style={{ fontSize: "20px" }}>Skills </span>
                        </div>
                    </div>
                    <div className="design__elements">
                        <div className="d15">
                            <img src={d15} alt="not found"></img>
                        </div>
                        <div className="d16">
                            <img src={d16} alt="not found"></img>
                        </div>
                        <div className="skill__d4">
                            <img src={d4} alt="not found"></img>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
