import { motion } from 'motion/react'

// Marks a word with a highlighter stroke that sweeps in from the left once it scrolls into view
export default function Highlight({ children }) {
    return (
        <span className="hl">
            <motion.span className="hl__bg" aria-hidden="true"
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }} />
            <span className="hl__text">{children}</span>
        </span>
    )
}
