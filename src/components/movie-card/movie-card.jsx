import PropTypes from "prop-types";
import "./movie-card.scss";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
    <Card className="card border-0 h-100">
        <Card.Img src={movie.ImagePath} className="img" />
        <Card.Body className="d-flex flex-column">
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Button
                className="mt-auto"
                variant="primary"
                onClick={() => {
                    onMovieClick(movie);
                }}
            >More info 
            </Button>
        </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        ImagePath: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        onMovieClick: PropTypes.func.isRequired
    })
};