import React from 'react'
import './css/Navbar.css'
import edu from './media/edu_w.png'
import home from './media/home_w.png'
import work from './media/work_w.png'
import logo from './media/R.png'
import cross from './media/cross.png'
import person from './media/contect_w.png'
import exp from './media/exp.png'
import skills from './media/skills.png'

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "on": 0
        }
        this.navbar_open = this.navbar_open.bind(this);
        this.navbar_close = this.navbar_close.bind(this);
        this.nav_link_active = this.nav_link_active.bind(this);
    }
    componentDidMount() {
        document.querySelector('.App').addEventListener('click', this.navbar_close);
        if ((window.screen.width) < (window.screen.height)) document.querySelector('.navlink__container').addEventListener('click', this.navbar_close);
    }

    navbar_open() {
        if (document.querySelector('.Navbar_wrper').classList.contains('active__nav')) return this.navbar_close();
        document.querySelector('.Navbar_wrper').classList.add('active__nav');
        this.setState({ "on": 1 });
        document.querySelector('.swiper__navbar').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width = "80" height = "80" viewBox = "0 0 172 172" style = " fill:#000000;" > <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g><path d="M86,100.1599l-51.6,51.6l-14.1599,-14.1599l51.6,-51.6l-51.6,-51.6l14.1599,-14.1599l51.6,51.6l51.6,-51.6l14.1599,14.1599l-51.6,51.6l51.6,51.6l-14.1599,14.1599z" fill="#8bb7f0"></path><path d="M137.6,23.2802l11.1198,11.1198l-48.5599,48.5599l-3.0401,3.0401l3.0401,3.0401l48.5599,48.5599l-11.1198,11.1198l-48.5599,-48.5599l-3.0401,-3.0401l-3.0401,3.0401l-48.5599,48.5599l-11.1198,-11.1198l48.5599,-48.5599l3.0401,-3.0401l-3.0401,-3.0401l-48.5599,-48.5599l11.1198,-11.1198l48.5599,48.5599l3.0401,3.0401l3.0401,-3.0401l48.5599,-48.5599M137.6,17.2l-51.6,51.6l-51.6,-51.6l-17.2,17.2l51.6,51.6l-51.6,51.6l17.2,17.2l51.6,-51.6l51.6,51.6l17.2,-17.2l-51.6,-51.6l51.6,-51.6l-17.2,-17.2z" fill="#4e7ab5"></path></g></g></svg > '

    }
    navbar_close() {
        console.log("njsbfdbfn")
        document.querySelector('.Navbar_wrper').classList.remove('active__nav');
        this.setState({ "on": 0 });
        document.querySelector('.swiper__navbar').innerHTML = '<img src="https://img.icons8.com/office/60/000000/menu--v3.png" /> '
    }
    nav_link_active = (event) => {
        document.querySelector('.active__navlink').classList.remove('active__navlink');
        document.querySelectorAll('.navlink')[event - 1].classList.add('active__navlink');

    }

    render() {
        return (
            <div className="Navbar" id="Navbar" >
                <a className="Nav_logo " href="#">
                    <img className="logo__img" src={logo} alt="img not found"></img>
                </a>
                <div className="Navbar_wrper " onMouseEnter={this.navbar_open} onMouseLeave={this.navbar_close}>
                    <div className="navlink__container" id="navlink__container">
                        <a className="navlink active__navlink" id="navlink" onClick={(e) => this.nav_link_active(1)} href="#Home">
                            <img className="link__img " src={home} alt="img not found"></img>
                            <span className="link__name"> Home </span>
                        </a>
                        <a className="navlink " id="navlink" onClick={(e) => this.nav_link_active(2)} href="#Education">
                            <img className="link__img" src={edu} alt="img not found"></img>
                            <span className="link__name"> Education </span>
                        </a>
                        <a className="navlink" id="navlink" onClick={(e) => this.nav_link_active(3)} href="#Experience">
                            <img className="link__img" src={exp} alt="img not found"></img>
                            <span className="link__name"> Experience </span>
                        </a>
                        <a className="navlink" id="navlink" onClick={(e) => this.nav_link_active(4)} href="#Projects">
                            <img className="link__img" src={work} alt="img not found"></img>
                            <span className="link__name"> Porjects </span>
                        </a>
                        <a className="navlink" id="navlink" onClick={(e) => this.nav_link_active(5)} href="#Skills">
                            <img className="link__img" src={skills} alt="img not found"></img>
                            <span className="link__name"> Skills </span>
                        </a>
                        <a className="navlink" id="navlink" onClick={(e) => this.nav_link_active(6)} href="#Contact">
                            <img className="link__img" src={person} alt="img not found"></img>
                            <span className="link__name"> Connect me </span>
                        </a>
                    </div>
                </div>
                <div className="swiper__navbar" id="swiper__navbar" onTouchStart={this.navbar_open}><img src="https://img.icons8.com/office/60/000000/menu--v3.png" /></div>
            </div >
        )
    };
}

export default Navbar;
