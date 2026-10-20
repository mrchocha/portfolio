import './App.css';
import React from 'react'
import Home from './home'
import Experience from './Experience'
import Projects from './Projects'
import OpenSource from './OpenSource'
import Contact from './Contact'

class App extends React.Component {
  render() {
    return (
      <main className="App">
        <Home></Home>
        <Experience></Experience>
        <Projects></Projects>
        <OpenSource></OpenSource>
        <Contact></Contact>
      </main>
    )
  };
}

export default App;
