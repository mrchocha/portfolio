import { motion, useSpring } from 'motion/react'

// Fades and slides its children in once they scroll into view.
// Pass a delay to stagger a list of cards. With tilt, the element leans toward the cursor.
// Other props, such as href or onMouseMove, go to the element.
export default function Reveal({ children, delay = 0, as = 'div', tilt = false, onMouseMove, onMouseLeave, ...props }) {
    const Tag = motion[as]
    const rotateX = useSpring(0, { stiffness: 200, damping: 20 })
    const rotateY = useSpring(0, { stiffness: 200, damping: 20 })

    const handleMove = (e) => {
        if (tilt) {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = (e.clientX - rect.left) / rect.width - 0.5
            const y = (e.clientY - rect.top) / rect.height - 0.5
            rotateY.set(x * 10)
            rotateX.set(-y * 10)
        }
        if (onMouseMove) onMouseMove(e)
    }
    const handleLeave = (e) => {
        rotateX.set(0)
        rotateY.set(0)
        if (onMouseLeave) onMouseLeave(e)
    }

    return (
        <Tag
            {...props}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={tilt ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
        >
            {children}
        </Tag>
    )
}
