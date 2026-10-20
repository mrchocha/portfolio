import React, { useEffect, useState } from 'react'

const CHAR_MS = 40

// Types the commands out one character at a time, one after another.
// Output lines appear at once when their command finishes, like a terminal response.
// Visitors who ask for less motion see every line straight away.
export default function TerminalLines({ lines, delay = 0 }) {
    // Only commands are typed, so only their characters count toward the total
    const total = lines.reduce((sum, line) => sum + (line.prompt ? line.text.length : 0), 0)
    const [shown, setShown] = useState(0)
    const [started, setStarted] = useState(false)

    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setShown(total)
            return
        }
        const timer = setTimeout(() => setStarted(true), delay)
        return () => clearTimeout(timer)
    }, [delay, total])

    useEffect(() => {
        if (!started || shown >= total) return
        const timer = setTimeout(() => setShown((n) => n + 1), CHAR_MS)
        return () => clearTimeout(timer)
    }, [started, shown, total])

    const done = shown >= total
    let offset = 0

    return (
        <div className="Home__term-body">
            {lines.map((line, index) => {
                const start = offset
                const isCommand = Boolean(line.prompt)
                const end = isCommand ? start + line.text.length : start
                offset = end
                if (shown < start) return null

                // Output has no typing: it is shown in full as soon as the line above it finishes
                const count = isCommand ? Math.min(line.text.length, shown - start) : line.text.length
                const caretHere = isCommand && !done && shown < end
                return (
                    <div className="Home__term-line" key={index}>
                        {isCommand ? <span className="Home__prompt">{line.prompt}</span> : ""}
                        <span className={isCommand ? "Home__cmd" : "Home__out"}>{line.text.slice(0, count)}</span>
                        {caretHere ? <span className="Home__caret" aria-hidden="true"></span> : ""}
                    </div>
                )
            })}
        </div>
    )
}
