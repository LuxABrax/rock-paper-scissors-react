import React, { useState, useEffect } from 'react'

import './Hand.css';

export default function Hand({ sign, mode, sendResult, img, color, clickable, setClickable }) {


    const [active, setActive] = useState(false);

    useEffect(() => {
        if (mode === 'time' || mode === 'wait') setActive(false);
    }, [mode]);

    return (
        <div>
            <div
                className={`Hand ${color} pos1 ${clickable ? "" : "signNotClickable"} ${active && !clickable ? "active" : ""
                    }`}
                onClick={() => {
                    if (mode === "fight") {
                        setActive(true);
                        sendResult(sign);
                        setClickable(!clickable);
                    }
                }}
            >
                <img src={img} alt='sign' />
            </div>
        </div>
    )
}
