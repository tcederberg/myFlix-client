import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";

export const MovieCard = ({ movie }) => {
    return (
        <Card bg="secondary" style={{ cursor: "pointer" }} className="h-100">
          <Card.Img className="card-img" variant="top" src={movie.ImagePath} />
          <Card.Body className="text-center">
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Director.Name}</Card.Text>
            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
              <Button className="button-text" variant="link">Open</Button>
            </Link>
          </Card.Body>
        </Card>
      );
    };

    MovieCard.propTypes = {
        movie: PropTypes.shape({
            ImagePath: PropTypes.string.isRequired,
            Title: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
            Genre: PropTypes.shape({
                Name: PropTypes.string.isRequired,
            }),
            Director: PropTypes.shape({
                Name: PropTypes.string.isRequired,
            }),
            Featured: PropTypes.bool.isRequired
        })
    };