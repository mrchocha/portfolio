import React from 'react'
import { motion } from 'motion/react'
import './css/Navbar.css'

const LINKS = [
    { id: 'home', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'opensource', label: 'Open source' },
    { id: 'contact', label: 'Contact' },
];

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false, active: 'home' };
        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);
    }
    componentDidMount() {
        // Highlight the link for whichever section sits in the middle of the viewport
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) this.setState({ active: entry.target.id });
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        LINKS.forEach(({ id }) => {
            const section = document.getElementById(id);
            if (section) this.observer.observe(section);
        });
    }
    componentWillUnmount() {
        this.observer.disconnect();
    }
    toggle() {
        this.setState((state) => ({ open: !state.open }));
    }
    close() {
        this.setState({ open: false });
    }
    render() {
        const { open, active } = this.state;
        return (
            <header className="Navbar">
                <div className="Navbar__inner">
                    <a className="Navbar__logo" href="#home" aria-label="Back to top">
                        <svg className="Navbar__mark" viewBox="0 0 36 36" aria-hidden="true">
                            <rect x="0.5" y="0.5" width="35" height="35" rx="8" style={{ fill: 'var(--surface-2)', stroke: 'var(--line)' }} />
                            <path d="M11 11.5 L18 18 L11 24.5" fill="none" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'var(--accent)' }} />
                            <rect x="21" y="22" width="8" height="2.6" rx="1.3" style={{ fill: 'var(--accent)' }} />
                        </svg>
                        <span className="Navbar__wordmark">rc<span className="Navbar__caret">_</span></span>
                    </a>
                    <nav className={"Navbar__links" + (open ? " is-open" : "")} id="Navbar__links">
                        {LINKS.map(({ id, label }) => (
                            <a key={id} className={"Navbar__link" + (active === id ? " is-active" : "")} href={"#" + id} onClick={this.close}>
                                {active === id ? <motion.span className="Navbar__pill" layoutId="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 30 }}></motion.span> : ""}
                                {label}
                            </a>
                        ))}
                    </nav>
                    <div className="Navbar__actions">
                        <button className="Navbar__toggle" type="button" aria-expanded={open} aria-controls="Navbar__links" onClick={this.toggle}>
                            {open ? 'Close' : 'Menu'}
                        </button>
                    </div>
                </div>
            </header>
        );
    };
}

export default Navbar;
