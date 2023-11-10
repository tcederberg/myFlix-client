import { useState } from "react";
import { useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./main-view.scss";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser:null);
    const [token, setToken] = useState(storedToken? storedToken:null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) return;
        fetch("https://my-movies-flix-007-49f90683c638.herokuapp.com/movies", {headers:{Authorization: `Bearer ${token}`}})
        .then((response) => response.json())
        .then((data) => {
            console.log("Movies from API", data);
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
        <div>
        <Row className="mt-5">
            <Col className="mt-t col-12"></Col>
            <Col className="mt-t col-12"></Col>
            <Col className="mt-t col-12"></Col>
        </Row>
        <Container>
            <Row className="justify-content-md-center">
                <Col className="text-center fs-2 m-5">
                    MyFlix Movie Archive
                </Col>
            </Row>
        </Container>
        <SignupView />
            <LoginView onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
            }} />
        </div>
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
        <Row className="mt-5">
            <Col className="mt-5 col-12"></Col>
            <Col className="mt-5 col-12"></Col>
            <Col className="mt-5 col-12"></Col>
        </Row>
        <Row className="mb-5 justify-content-center">
           {movies.map((movie) => (
            <Col key={movie.Title} 
            className="mb-5 col-xl-3 col-lg-4 col-md-6 col-sm-12 card-size">
            <MovieCard
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
            }}
            />
            </Col>
           ))}
           </Row>
            <Button onClick={() => { setUser(null); storedToken(null); localStorage.clear() }}
            className="m-3 text-align-center" >Logout</Button>
    </>
    );
};