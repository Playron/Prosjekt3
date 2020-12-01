import React, { useState } from 'react'
import PopUp from './PopUp';

export default function Card({movie, cardIndex}){
    interface movieInterface {
        _id : String,
        movieName: String,
        movieYear: Number,
        movieDescription: String,
        movieRating : Number
        moviePoster: String
    }
    const [showCard, setShowCard] = useState(false);
    const [cardInfo, setCardInfo] = useState(null as movieInterface);
    const cardClicked = (i : number) : void =>{
        setCardInfo(movie);
        setShowCard(true);
    } 
    return (
        <>
            <div className="card" onClick={() => cardClicked(cardIndex)}>
                <div className = "card-image">
                    <img src={require('./../images/card.png')} alt={require('./../images/card.png')}/>
                </div>
                <h3>{movie.movieName} ({movie.movieYear})</h3>
                <h4>IMDb-rating: {movie.movieRating}</h4>
            </div>
            {/* Decides if popup should be rendered or not */}
            {showCard ? (<PopUp showCard={showCard} card_info={cardInfo} onClose={() => setShowCard(false)}/>) : null }
        </>
    )
}