import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'

// Counts from 0 up to `to` once the number scrolls into view.
// Visitors who ask for less motion see the final number straight away.
export default function CountUp({ to, suffix = '' }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })
    const [value, setValue] = useState(0)

    useEffect(() => {
        if (!inView) return
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setValue(to)
            return
        }
        const controls = animate(0, to, {
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => setValue(Math.round(v)),
        })
        return () => controls.stop()
    }, [inView, to])

    return <span ref={ref}>{value}{suffix}</span>
}
