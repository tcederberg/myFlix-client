import { useState } from "react";
import { useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("https://my-movies-flix-007-49f90683c638.herokuapp.com/movies")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const moviesFromApi = data.map((movie) => {
                return {
                    _id: movie._id,
                    Title: movie.Title,
                    ImagePath: movie.ImagePath,
                    Description: movie.Description,
                    Genre: {
                        Name: movie.Genre.Name,
                        Description: movie.Genre.Description
                    },
                    Director: {
                        Name: movie.Director.Name,
                        Bio: movie.Director.Bio,
                        Birth: movie.Director.Birth,
                        Death: movie.Director.Death
                    },
                    Featured: movie.Featured,
                };
            });
            setMovies(moviesFromApi);
        });
    }, []);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}/>
        );
    }
    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }
    return (
        <div>
           {movies.map((movie) => (
            <MovieCard
            key={movie.Title}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
            }}
            />
           ))}
        </div>
    );
};