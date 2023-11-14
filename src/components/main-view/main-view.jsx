import React, { useEffect, useState } from "react";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Col, Row } from "react-bootstrap";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import "./main-view.scss";
import { MoviesList } from "../movies-list/movies-list";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser:null);
    const [token, setToken] = useState(storedToken? storedToken:null);
    const movies = useSelector((state) => state.movies.list);
    const dispatch = useDispatch();
    

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
            dispatch(setMovies(moviesFromApi));
        });
    }, [token]);

    return (
        <BrowserRouter>
          <NavigationBar
            user={user}
            onLoggedOut={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          />
          <Row className="justify-content-md-center">
            <Routes>
              <Route
                path="/signup"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
                        <SignupView />
                      </Col>
                    )}
                  </>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
                        <LoginView onLoggedIn={(user) => setUser(user)} />
                      </Col>
                    )}
                  </>
                }
              />
              <Route
                path="/movies/:movieId"
                element={
                  <>
                    {!user ? (
                      <Navigate to="/login" replace />
                    ) : movies.length === 0 ? (
                      <Col>The list is empty!</Col>
                    ) : (
                      <Col md={8}>
                        <MovieView user={user} token={token} setUser={setUser} />
                      </Col>
                    )}
                  </>
                }
              />
             
              <Route
                path="/"
                element={
                  <>
                    {!user ? <Navigate to="/login" replace /> : <MoviesList />}
                  </>
                }
              />
              <Route
                path = "/users/:Username"
                element={
                  <>
                    {!user ? (
                      <Navigate to="/login" replace />
                    ) : (
                      <Col md={8}>
                        <ProfileView user={user} token={token} movies={movies} setUser={setUser}/>
                      </Col>
                    )}
                  </>
                }
              />
            </Routes>
          </Row>
        </BrowserRouter>
      );
    };