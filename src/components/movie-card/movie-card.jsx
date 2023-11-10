import PropTypes from "prop-types";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./movie-card.scss";

export const MovieCard = ({ movie, token, setUser, user }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (user.favoriteMovies && user.favoriteMovies.includes(movie._id)) {
            setIsFavorite(true);
        }
    }, [user]);

    const addFavoriteMovie = () => {
        fetch(`https://my-movies-flix-007-49f90683c638.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
        { method: "POST",
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }else {
                console.log("failed to add favorite movie");
            }
        })
        .then((responseUser) => {
            if (responseUser) {
                localStorage.setItem("user", JSON.stringify(responseUser));
                setUser(responseUser);
                setIsFavorite(true);
                console.log("movie successfully added to favorites");
                console.log(responseUser.favoriteMovies);
            }
        });
    };

    const removeFavoriteMovie = () => {
        fetch(`https://my-movies-flix-007-49f90683c638.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } 
    })
    .then((user) => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            setIsFavorite(false);
            console.log("movie successfully removed from favorites");
        }
    });
    };
    return (
    <Col key={movie._id}
        className="mb-5 col-xl-3 col-lg-4 col-md-6 col-sm-12 card-size">
        <Card className="border-0 h-100 justify-content-center card-custom">
            <Card.Body className="d-flex flex-column">
                {isFavorite ? (
                    <Button
                    className="w-100"
                    variant="danger"
                    onClick={removeFavoriteMovie}
                    >Remove favorite </Button>
                ) : (
                    <Button
                    className="w-100"
                    variant="primary"
                    onClick={addFavoriteMovie}
                    >Add favorite </Button>
                )}
                <Link
                classname="mt-auto align-self-stretch"
                to={`/movies/${encodeURIComponent(movie._id)}`}
                >
                    <Button 
                    className="w-100"
                    variant="primary"
                    >More info </Button>
                </Link>
            </Card.Body>
        </Card>
    </Col>
    );
};