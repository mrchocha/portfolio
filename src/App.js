import './App.css';
import React from 'react'
import Home from './home'
import Education from './Education'
import Experience from './Experience'
import Projects from './Projects'
import Skills from './Skills'
import Contact from './Contact'
import AOS from 'aos';
import "aos/dist/aos.css";
import fullpage from "../node_modules/fullpage.js"
import jQuery from "../node_modules/jquery"


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: null };
  }
  componentDidMount() {
    AOS.init({
      // initialise with other settings
      duration: 2000,
      once: true
    });
    var anchors = ['Home', 'Education', 'Experience', 'Projects', 'Skills', 'Contact'];
    if (window.screen.width >= window.screen.height) {
      new fullpage('#fullpage', {
        //options here
        autoScrolling: true,
        scrollHorizontally: true,
        verticalCentered: true,
        anchors: anchors,
        afterSlideLoad: function () {
          jQuery('.slide.active [data-aos]').addClass("aos-animate");
        },
        afterLoad: function () {
          jQuery('.section.active [data-aos]').addClass("aos-animate");
          //jQuery('.fp-table.active .aos-init').addClass('aos-animate'
          var activeSection = jQuery('.section.active');
          var activeSlide = activeSection.find('.slide.active');
          var activeComponant = (activeSlide.prevObject[0].classList[0]);
          var index = anchors.indexOf(activeComponant)
          document.querySelector('.active__navlink').classList.remove('active__navlink');
          document.querySelectorAll('.navlink')[index].classList.add('active__navlink');
        }
      });
    }

  }

  render() {
    return (
      <div className="App" id="fullpage">
        <Home ></Home>
        <Education></Education>
        <Experience></Experience>
        <Projects></Projects>
        <Skills></Skills>
        <Contact></Contact>
      </div>
    )
  };
}

export default App;
