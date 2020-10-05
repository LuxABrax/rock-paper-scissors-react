import React, { useState, useEffect } from "react";
import "./OpponentHand.css";



/*
MAKE BACKGROUND AND CREATE HAND COMPONENT
*/

const OpponentHand = ({ opponentRes, mode }) => {

    const [active, setActive] = useState("none");

    const [signs, setSigns] = useState([
        { sign: "rock", img: "images/rock-basic.png" },
        { sign: "paper", img: "/images/paper-basic.png" },
        { sign: "scissors", img: "/images/scissors-basic.png" },
    ]);

    useEffect(() => {
        console.log(opponentRes);
        if (mode === 'result') {
            setActive(opponentRes);
        } else {
            setActive('none');
        }
    }, [mode, opponentRes]);



    return (
        <div className={`handOptions__outerContainer player opponentHand`}>
            <div className={`handOptions__innerContainer `}>
                <div className={`Hand  pos1 rock ${active === 'rock' ? 'active' : ''}`}>
                    <img src={signs[0].img} alt='sign' />
                </div>
                <div className={`Hand  pos1 paper ${active === 'paper' ? 'active' : ''}`}>
                    <img src={signs[1].img} alt='sign' />
                </div>
                <div className={`Hand  pos1 scissors ${active === 'scissors' ? 'active' : ''}`}>
                    <img src={signs[2].img} alt='sign' />
                </div>
            </div>
        </div>
    );
};

export default OpponentHand;
