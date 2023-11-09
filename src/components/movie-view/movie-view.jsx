import "../movie-view/movie-view.scss";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <>
        <Container className="">
            <Row className="mt-5">
                <Col className="mt-5 col-12"></Col>
                <Col className="mt-5 col-12"></Col>
                <Col className="mt-5 col-12"></Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col className="col-lg-6">
                    <Card className="border-0 moviePoster mx-auto">
                        <Card.Img src={movie.ImagePath} className="rounded-4" />
                    </Card>
                </Col>
                <Col className="col-lg-6 mt-5 mt-md-0">
                    <Card className="movie-info border-0 h-100">
                        <Card.Body className="d-flex flex-column">
                            <Card.Title className="fs-2">{movie.Title}</Card.Title>
                            <Card.Text>{movie.Description}</Card.Text>
                            <Card.Title>Director: </Card.Title>
                            <Card.Text>{movie.Director.Name}</Card.Text>
                            <Card.Title>Genre: </Card.Title>
                            <Card.Text>{movie.Genre.Name}</Card.Text>
                        </Card.Body>
                        <Button
                            className="mt-auto m-4"
                            variant="primary"
                            onClick={onBackClick}>Go Back
                            </Button>
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
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};