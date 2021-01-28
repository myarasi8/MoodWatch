import React, { useEffect, useState } from 'react'
import KEYS from "./config/keys"

function Movie(props) {
    const movieAPIKey = KEYS.MOVIE_API_KEY
    const baseUrl = 'http://image.tmdb.org/t/p/w185/'
    const [movies, setMovies] = useState([]);
    const emotion = props.emotion
    const genres = {
        "Action": 28,
        "Adventure": 12,
        "Animation": 16,
        "Comedy": 35,
        "Crime": 80,
        "Documentary": 99,
        "Drama": 18,
        "Family": 10751,
        "Fantasy": 14,
        "History": 36,
        "Mystery": 9648,
        "Romance": 10749,
        "SciFi": 878,
        "TV Movie": 10770,
        "Thriller": 53,
        "War": 10752,
        "Western": 37
    }

    let url = "https://api.themoviedb.org/3/discover/movie?api_key=" + movieAPIKey + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres="

    switch(emotion) {
        case "joy":
            url += genres.Action
            break;
        case "sadness":
            url += genres.Comedy
            break; 
        default:
            url += genres.SciFi
            break;   
    }

    const getMovies = (url) => {
        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch')
            }
            return response.json()
        })
        .then(response => {
            console.log(response.results)
            const movieArray = shuffle(response.results).slice(0, 5).map(movie => {
                return movie
            })
            
            setMovies(movieArray)            
        })
        .catch((e) => {
            console.log('Caught error', e)
        })
    }

    const shuffle = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

    return (
        <div>
            <p>You should watch one of these movies</p>
            <span data-testid="display">
            {
                movies.map((movie, index) => {
                    // return (<li key={index}>{movie}</li>)
                    return (<img key={index} src={baseUrl + movie.poster_path} alt={movie.title}/>)
                })
            }
            </span><br/>
            <button data-testid="button1" onClick={() => getMovies(url)}>Click Me</button>
        </div>
    );
}

export default Movie;
