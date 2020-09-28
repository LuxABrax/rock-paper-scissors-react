import React, { useState, useEffect } from 'react'

import './ScoreBoard.css';

export default function ScoreBoard({ user, results, socketID }) {

    const [score, setScore] = useState({ user: 0, opponent: 0 });

    useEffect(() => {
        let result;
        if (results) {
            if (socketID === results[0].socketID) {
                result = results[0].result;
            } else if (socketID === results[1].socketID) {
                result = results[1].result;
            }

            if (result === 'win') {
                console.log("I won");
                let points = score.user + 1;
                console.log("I lost", points);
                setScore({ ...score, user: points });

            } else if (result === 'loss') {
                let points = score.opponent + 1;
                console.log("I lost", points);
                setScore({ ...score, opponent: points });
            }

        }

    }, [results]);

    return (

        <div className='score-container'>

            {score.user} : {score.opponent}
        </div>
    )
}
