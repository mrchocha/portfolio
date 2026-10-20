import { motion, useScroll, useSpring } from 'motion/react'

// A thin accent bar across the top of the page that fills as you scroll
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
    return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}
