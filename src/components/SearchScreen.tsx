import React, { useState} from 'react'
import SearchResult from './SearchResult';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles/search.css'

interface movieInterface {
    _id : String,
    movieName: String,
    movieYear: Number,
    movieDescription: String,
    movieRating: Number
}
export default function SearchScreen() {
    /* Query and search result */
    const [query, setQuery] = useState('');
    const [searchresult, setSearchResult] = useState(null as movieInterface[])

    /* Updates query string when user writes in field */
    const handleChange = (e : any) : void => { 
        setQuery(e.target.value);
    }

    /* DB Search */
    const retrieveFromDB = () : void =>{
        fetch('http://it2810-56.idi.ntnu.no:3000/movies/movietitle/' + query)
        .then((response) => response.json())
        .then((movies_json) =>{
            setSearchResult(movies_json);
        }) 
    }
    /* Feeling lucky functionality, retrieves a random movie record */
    const getRandomElement = (array: any[]): any => array[Math.floor(Math.random() * array.length)];
    const feelingLucky = () : void =>{
        fetch('http://it2810-56.idi.ntnu.no:3000/movies/movietitle/' + query)
        .then((response) => response.json())
        .then((movies_json) => {
            setSearchResult(movies_json);
        })
        .then(() => setSearchResult((searchresult)=>[getRandomElement(searchresult)]))
    } 
    return (
        <div>
            <div className="searchBar">
                <input id="bar" type="text" placeholder="Input MovieTitle" onChange={handleChange} onKeyPress={(e)=>{if(e.key==='Enter'){retrieveFromDB()}}}/>
                <input className="btn" type="button" value='Search'  onClick={retrieveFromDB}/>
                <input className="btn" type="button" value='Im feeling lucky'  onClick={feelingLucky}/>
            </div>
            {searchresult ? (<SearchResult movies={searchresult}/>) : null }
        </div>
    )
}