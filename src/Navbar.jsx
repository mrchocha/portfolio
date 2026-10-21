import React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import './css/Navbar.css'

const LINKS = [
    { id: 'home', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'opensource', label: 'Open source' },
    { id: 'contact', label: 'Contact' },
];

const ease = [0.22, 1, 0.36, 1];

// "RC." monogram set in Geist Bold, the same drawing as public/favicon.svg
const Mark = () => (
    <svg className="Navbar__mark" viewBox="0 0 36 36" aria-hidden="true">
        <rect width="36" height="36" rx="9" style={{ fill: 'var(--ink)' }} />
        <path style={{ fill: 'var(--surface)' }} d="M11.16 12.75L6.56 12.75L6.56 23.25L8.83 23.25L8.83 19.42L10.78 19.42C12.01 19.42 12.49 19.72 12.57 20.60L12.76 23.25L15.04 23.25L14.79 20.25C14.68 19.12 14.18 18.58 13.09 18.43C14.19 18.10 14.95 17.23 14.95 15.90C14.95 13.87 13.34 12.75 11.16 12.75ZM8.83 17.51L8.83 14.66L10.85 14.66C11.99 14.66 12.63 15.16 12.63 16.09C12.63 17.01 11.99 17.51 10.85 17.51ZM25.94 19.48L23.57 19.38C23.35 20.78 22.54 21.58 21.32 21.58C19.49 21.58 18.63 20.04 18.63 18.01C18.63 15.97 19.47 14.42 21.32 14.42C22.49 14.42 23.29 15.16 23.54 16.46L25.89 16.36C25.43 13.93 23.79 12.51 21.37 12.51C18.26 12.51 16.31 14.89 16.31 18.01C16.31 21.12 18.26 23.49 21.37 23.49C23.88 23.49 25.51 22.01 25.94 19.48Z" />
        <rect x="27.24" y="21.05" width="2.2" height="2.2" style={{ fill: 'var(--volt)' }} />
    </svg>
);

// Floating bar: logo on the left, section links in the middle, contact button on the right.
// On small screens the links move into a dropdown card opened by the menu button.
class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false, active: 'home', scrolled: false };
        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);
        this.onScroll = this.onScroll.bind(this);
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
        window.addEventListener('scroll', this.onScroll, { passive: true });
        this.onScroll();
    }
    componentWillUnmount() {
        this.observer.disconnect();
        window.removeEventListener('scroll', this.onScroll);
    }
    // The bar gets a stronger background and shadow once the page has scrolled
    onScroll() {
        const scrolled = window.scrollY > 8;
        if (scrolled !== this.state.scrolled) this.setState({ scrolled });
    }
    toggle() {
        this.setState((state) => ({ open: !state.open }));
    }
    close() {
        this.setState({ open: false });
    }
    render() {
        const { open, active, scrolled } = this.state;
        const links = (pill) => LINKS.map(({ id, label }) => (
            <a key={id} className={"Navbar__link" + (active === id ? " is-active" : "")} href={"#" + id}
                aria-current={active === id ? "true" : undefined} onClick={this.close}>
                {pill && active === id ? <motion.span className="Navbar__pill" layoutId="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }}></motion.span> : ""}
                {label}
            </a>
        ));
        return (
            <header className={"Navbar" + (scrolled || open ? " is-scrolled" : "")}>
                <div className="Navbar__inner">
                    <a className="Navbar__logo" href="#home" aria-label="Rahul Chocha, back to top" onClick={this.close}>
                        <Mark />
                        <span className="Navbar__wordmark">Rahul Chocha</span>
                    </a>
                    <nav className="Navbar__links" aria-label="Sections">
                        {links(true)}
                    </nav>
                    <div className="Navbar__actions">
                        <a className="button button--primary Navbar__cta" href="#contact">
                            Get in touch <span aria-hidden="true">→</span>
                        </a>
                        <button className={"Navbar__toggle" + (open ? " is-open" : "")} type="button"
                            aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
                            aria-controls="Navbar__menu" onClick={this.toggle}>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
                <AnimatePresence>
                    {open ?
                        <motion.nav className="Navbar__menu" id="Navbar__menu" aria-label="Sections"
                            initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.98 }} transition={{ duration: 0.25, ease }}>
                            {links(false)}
                            <a className="button button--primary Navbar__menu-cta" href="#contact" onClick={this.close}>
                                Get in touch <span aria-hidden="true">→</span>
                            </a>
                        </motion.nav> : null
                    }
                </AnimatePresence>
            </header>
        );
    };
}

export default Navbar;
