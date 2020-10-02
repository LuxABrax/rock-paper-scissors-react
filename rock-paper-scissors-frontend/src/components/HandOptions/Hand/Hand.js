import React, { useState, useEffect } from 'react'

import './Hand.css';

export default function Hand({ sign, mode, sendResult, img }) {

    const [clickable, setClickable] = useState(true);
    const [active, setActive] = useState("none");

    useEffect(() => {
        if (mode === "result") setClickable(!clickable);
    }, [mode]);

    return (
        <div>
            <div
                className={`Hand pos1 ${clickable ? "" : "signNotClickable"} ${active === "rock" ? "active" : ""
                    }`}
                onClick={() => {
                    if (mode === "fight") {
                        setActive(sign);
                        sendResult(sign);
                        setClickable(!clickable);
                    }
                }}
            >
                <img src={img} alt='rock' />
            </div>
        </div>
    )
}
