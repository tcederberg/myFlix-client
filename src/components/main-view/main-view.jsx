import { useState } from "react";
import { useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import "./main-view.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser:null);
    const [token, setToken] = useState(storedToken? storedToken:null);
    const [movies, setMovies] = useState([]);
    

    useEffect(() => {
        if (!token) { 
            return;
        }
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

    return (
        <>
            <NavigationBar 
            user={user}
            onLoggedOut={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
            }} />
            <Row className="margin-top-custom justify-content-center mb-5">
                <BrowserRouter>
                    <Routes>
                        <Route
                        path="/login"
                        element={
                            <>
                            {user ? (
                                <Navigate to="/movies" />
                            ) : (
                                <LoginView
                                onLoggedIn={(user, token) => {
                                    setUser(user);
                                    setToken(token);
                                }} />
                            )}
                            </>
                        }
                        />
                        <Route
                        path="/signup"
                        element={<>{user ? <Navigate to="/movies" /> : <SignupView />}</>}
                        />
                        <Route
                        path="/movies"
                        element={
                            <>
                            {movies.map((movie) => {
                                return (
                                    <MovieCard
                                    movie={movie}
                                    token={token}
                                    setUser={setUser}
                                    user={user}
                                />
                                );
                            })}
                            </>
                        }
                        />
                        <Route
                        path="/movies/:movieId"
                        element={<MovieView movies={movies} />}
                        />
                        <Route 
                        path="/profile"
                        element={
                            <ProfileView
                            user={user}
                            token={token}
                            movies={movies}
                            setUser={setUser}
                            />
                        }
                        />
                    </Routes>
                </BrowserRouter>
            </Row>
        </>
    );
};