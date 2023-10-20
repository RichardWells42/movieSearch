import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';
//e80063

const API_URL = 'http://www.omdbapi.com?apikey=e80063';

// i added this to see if it will fix search issue on netify. it didn't work!
//const redirectURI = "https://preeminent-fudge-f5f331.netlify.app";

// const movie1 = {
//   Poster: "https://m.media-amazon.com/images/M/MV5BMjE3Mzg0MjAxMl5BMl5BanBnXkFtZTcwNjIyODg5Mg@@._V1_SX300.jpg",
//   Title: "Spiderman and Grandma",
//   Type: "movie",
//   Year: "2009",
//   imdbID: "tt1433184"
// }


 const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
  
    //console.log(data.Search);
    setMovies(data.Search);
  }

  useEffect(() => {
    // searchMovies('spiderman');
    searchMovies('');
  }, []);

  return (
    <div className='app'>
      <h1>Movie Search</h1>

      <div className='search'>
        <input 
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon} 
          alt='search'
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0
          ? (
            <div className='container'>
              {movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </div>
          ) : (
            <div className='empty'>
              <h2>No movies found</h2>
            </div>
          )}
    </div>
  );
}


export default App;