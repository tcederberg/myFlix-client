import { useState } from "react";
import { useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser:null);
    const [token, setToken] = useState(storedToken? storedToken:null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

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
                    Featured: movie.Featured.toString(),
                };
            });
            setMovies(moviesFromApi);
        });
    }, [token]);

    if (!user) {
        return (
        <>
            <LoginView onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
            }} />
            or
            <SignupView />
            </>
        );
    }
    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}/>
        );
    }
    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }
    return (
        <>
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
        <button onClick={() => { setUser(null); storedToken(null); localStorage.clear() }} >Logout</button>
        </>
    )
};