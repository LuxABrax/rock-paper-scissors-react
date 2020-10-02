import React, { useState, useEffect } from 'react'

import './Hand.css';

export default function Hand({ sign, mode, sendResult, img, color, clickable, setClickable }) {


    const [active, setActive] = useState("none");

    return (
        <div>
            <div
                className={`Hand ${color} pos1 ${clickable ? "" : "signNotClickable"} ${active === "rock" ? "active" : ""
                    }`}
                onClick={() => {
                    if (mode === "fight") {
                        setActive(sign);
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
