import React , {useState , useEffect}from 'react';
import '../gameCard/gameCard.scss';

export default function GameCard({card , electionHandler , isActivated , isFlipped , back}) {
    const handleClickflip = () => {
        if(isActivated) {
            electionHandler(card)
            console.log(`clickflip on ${card.name}`)
        }
    };
    
    return (
        <div className= 'Card'>
            <div className= {`inner ${isFlipped  ? 'flipped' : ''}`} onClick={handleClickflip}>
                <div className="front">
                    <img src = {card.src}></img>
                    <p>
                        {card.name}
                    </p>
                </div>
                <div className="back">
                    <h1>
                        <img src = {back} ></img>
                    </h1>
                </div>
            </div>
        </div>
    );
}
