import React,{useState,useEffect} from 'react'
import './../styles/searchResult.css'
import Card from './Card';
interface movieInterface {
    _id : String,
    movieName: String,
    movieYear: Number,
    movieDescription: String,
    movieRating : Number
}
interface resultProps {
    movies : movieInterface[]
}
const SearchResult: React.FC<resultProps> = ({movies} : resultProps) => {
    // When user does a query, change max, min year for slider
    let min_year: number = Math.min.apply(Math, movies.map(function(o) { return o.movieYear; }));
    let max_year: number = Math.max.apply(Math, movies.map(function(o) { return o.movieYear; }));
    const numberOfElementsPerPage : number = 12;
    /* Decides if user sorts on desc or asc order */
    const [desc_year, setDescYear] = useState(false);
    const [desc_rating, setDescRating] = useState(false);
    /* Used for page control*/
    const [pageNumber, setPageNumber] = useState(0);
    const [previousButtonHidden, setPreviousButtonHidden] = useState(true);
    const [nextButtonHidden, setNextButtonHidden] = useState(true);
    /* Only shows after first search */
    const [filtersHidden, setFiltersHidden] = useState(true);

    const [searchResult, setsearchResult] = useState([] as movieInterface[]);
    const [filteryear,setFilterYear] = useState( min_year as Number);
    const [rating, setRating] = useState(0.0 as Number);

    /* Render component when query from SearchScreen has returned */
    useEffect(() => { 
        setsearchResult(movies);
        setPageNumber(0);
        filterResult();
    }, [movies])

    useEffect(() => {
        filterResult()
    }, [pageNumber, numberOfElementsPerPage])

    /* Keeps only the movies that are released later than the chosen year*/
    const filterOnYear = (oldResult : movieInterface[]) : movieInterface[] =>{ 
        let returnResult : movieInterface[] = [];
            for (let index = 0; index < oldResult.length; index++) {
                const element = oldResult[index];
                if(element.movieYear >= filteryear){
                    returnResult.push(element)
                }  
            }
            return returnResult;
    }
    /* Keeps only the movies that has rating higher than the chosen rating treshold*/
    const filterOnRating = (oldResult : movieInterface[]) : movieInterface[] =>{
        let returnResult : movieInterface[] = []; 
            for (let index = 0; index < oldResult.length; index++) {
                const element = oldResult[index];
                if(element.movieRating >= rating){
                    returnResult.push(element)
                }  
            }
            return returnResult;
    }

    const filterOnNumberOfElements = (oldResult : movieInterface[]) : movieInterface[] => {
        let output : movieInterface[] = [];
        setPreviousButtonHidden(pageNumber === 0);
        setNextButtonHidden(oldResult.length <= (pageNumber + 1) * numberOfElementsPerPage);
        let startIndex = pageNumber * numberOfElementsPerPage;
        let endIndex = Math.min(startIndex + numberOfElementsPerPage, oldResult.length);
        for (let index = startIndex; index < endIndex; index++) {
            output.push(oldResult[index])
        }
        return output;
    }
    /* Combines all filter functions to only show the movies meeting the requirements and filtered on number of movie records per page */
    const filterResult = () : void =>{
        let oldResult = movies;
        let newResult: movieInterface[] = filterOnRating(oldResult);
        newResult = filterOnYear(newResult);
        newResult = filterOnNumberOfElements(newResult);
        setsearchResult(newResult);
    }
    /* Usaed to change page, showing different movie records */
    const previousPage = () : void => {
        setPageNumber(pageNumber => pageNumber - 1); // Compatible with async
    }
    const nextPage = () : void => {
        setPageNumber(pageNumber => pageNumber + 1); // Compatible with async
    }
    /* Toggles if the filter button should be shown, based on if a query is done or not */
    const hideShowFilters = () : void => {
        setFiltersHidden(filtersHidden => !filtersHidden);
    }
    /* These two function is called when user clicks sort buttons. If clicked multiple times, they toggle ascending of descending order of sorting  */
    const sortOnYear = () =>{
        const sorted : movieInterface[] = movies.sort((a, b) => (a.movieYear < b.movieYear) ? 1 : -1)
        if(desc_year){
            sorted.reverse()
        }
        setsearchResult(sorted);
        filterResult();
        setDescYear((desc_year)=> !desc_year)
    }
    const sortOnRating = () =>{
        const sorted : movieInterface[] = movies.sort((a, b) => (a.movieRating < b.movieRating) ? 1 : -1)
        if(desc_rating){
            sorted.reverse()
        }
        setsearchResult(sorted);
        filterResult();
        setDescRating((desc_rating)=> !desc_rating);
        console.log(desc_rating);
    }

    return (
        <div className="movie">
            <div className="hideshowfilters">
                <button className="filterbutton resultbutton" onClick={hideShowFilters}>{filtersHidden ? "Show filters" : "Hide filters"}</button>
            </div>
            <div className="filterbox" hidden={filtersHidden}>
                {/* Filter on year */}
                <div className="filtername">
                    CurrentYear: {filteryear}
                </div>
                <div className="leftvalue">{min_year}</div>
                <input className="filterslider" type="range" min={min_year.toString()} max={max_year.toString()} value={filteryear.toString()} onChange={(e)=>setFilterYear(parseInt(e.target.value))} />
                <div className="rightvalue">{max_year}</div>
                <br/>
                {/* Filter on rating */}
                <div className="filtername">
                    Rating: {rating}
                </div>
                <div className="leftvalue">{0}</div>
                <input className="filterslider" type="range" min='0.0' max='10.0' step='0.1' value={rating.toString()} onChange={(e) => setRating(parseFloat(e.target.value))} />
                <div className="rightvalue">{10}</div>
                <br/>
                <button className="filterbutton resultbutton" onClick={filterResult}>Apply filters</button>
                {/* Sort buttons */}
                <button className="filterbutton resultbutton" onClick={sortOnYear}>Sort on year</button>
                <button className="filterbutton resultbutton" onClick={sortOnRating}>Sort on rating</button>
            </div>

            {/* Page bottons on top */}
            <div className="pagebuttons">
                <button className="prevpagebutton resultbutton" onClick={previousPage} hidden={previousButtonHidden}>&lt;</button>
                <button className="nextpagebutton resultbutton" onClick={nextPage} hidden={nextButtonHidden}>&gt;</button>
            </div>

            {/* Cards */}
            <div className = "container">
                {searchResult.map((movie,i) => (
                    <Card movie={movie} cardIndex={i}/>
                ))}
            </div>

            {/* Page bottons on top */}
            <div className="pagebuttons bottombuttons">
                <button className="prevpagebutton resultbutton" onClick={previousPage} hidden={previousButtonHidden}>&lt;</button>
                <button className="nextpagebutton resultbutton" onClick={nextPage} hidden={nextButtonHidden}>&gt;</button>
            </div>
            
        </div>
    )
}
export default SearchResult;