import React, { useState, useEffect } from "react";
import "./OpponentHand.css";



/*
MAKE BACKGROUND AND CREATE HAND COMPONENT
*/

const OpponentHand = ({ player, sendResult, mode, color }) => {
    const [clickable, setClickable] = useState(true);
    const [active, setActive] = useState("none");
    /* 
     */
    //const [signs, setSigns] = useState(['paper', 'scissors', 'rock']);
    const [signs, setSigns] = useState([
        { sign: "rock", img: "images/rock-basic.png" },
        { sign: "paper", img: "/images/paper-basic.png" },
        { sign: "scissors", img: "/images/scissors-basic.png" },
    ]);

    useEffect(() => {
        if (mode === "time") setClickable(true);
        if (mode === 'prep') setActive(false);
    }, [mode]);



    return (
        <div className={`handOptions__outerContainer player${player}`}>
            <div className={`handOptions__innerContainer ${color}`}>
                <div className={`Hand ${color} pos1`}>
                    <img src={signs[0].img} alt='sign' />
                </div>
                <div className={`Hand ${color} pos1`}>
                    <img src={signs[1].img} alt='sign' />
                </div>
                <div className={`Hand ${color} pos1`}>
                    <img src={signs[2].img} alt='sign' />
                </div>
            </div>
        </div>
    );
};

export default OpponentHand;
