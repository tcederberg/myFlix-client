import "../movie-view/movie-view.scss";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import NavigationBar from "../navigation-bar/navigation-bar";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    if (!movies.length) {
        return <></>;
    }
    const movie = movies.find((m) => m._id === movieId);
    if (!movie) {
        return <div>movie not found</div>;
    }
    return (
        <>
        <Container className="">
            <Row className="justify-content-md-center">
                <Col className="col-lg-6">
                    <Card className="border-0 moviePoster mx-auto">
                        <Card.Img src={movie.ImagePath} className="rounded-4" />
                    </Card>
                </Col>
                <Col className="col-lg-6 mt-5 mt-md-0">
                    <Card className="movie-info border-0 h-100 card-custom">
                        <Card.Body className="d-flex flex-column">
                            <Card.Title className="fs-2">{movie.Title}</Card.Title>
                            <Card.Text>{movie.Description}</Card.Text>
                            <Card.Title>Director: </Card.Title>
                            <Card.Text>{movie.Director.Name}</Card.Text>
                            <Card.Title>Genre: </Card.Title>
                            <Card.Text>{movie.Genre.Name}</Card.Text>
                        </Card.Body>
                        <Link to="/movies">
                        <Button
                            className="mt-auto m-4"
                            variant="primary"
                            onClick={onBackClick}>Go Back
                        </Button>
                        </Link>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    );
};

MovieView.propTypes = {
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