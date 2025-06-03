import React, { useEffect } from 'react'
import './marquee.css'
import { setupMarqueeAnimation } from './marquee'

const Marquee = () => {
    useEffect(() => {
        setupMarqueeAnimation()
    }, [])

    return (
        <div className="card-marquee">
            <div className="marquee">
                <h1>Design Beyond Boundaries</h1>
                <h1>Built for Tomorrow</h1>
                <h1>Real Impact</h1>
                <h1>Digital Visions</h1>
            </div>
        </div>
    )
}

export default Marquee