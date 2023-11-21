import React, { useEffect, useReducer, useState } from "react";
import {
    Button,
    Card,
    CardGroup,
    Col,
    Container,
    Form,
    Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, movies, setUser }) => {
    const[Username, setUsername] = useState("");
    const[Password, setPassword] = useState("");
    const[Email, setEmail] = useState("");
    const[Birthday, setBirthday] = useState("");

    let result = movies.filter((m) => user.favoriteMovies.includes(m._id));
    
    const handleSubmit = (event) => {
        event.preventDefault();

        let data = {
            Username: Username,
            Password: Password,
            Email: Email,
            Birthday: Birthday
        };
        console.log(JSON.stringify(data));
        console.log(Username);

        fetch(`https://my-movies-flix-007-49f90683c638.herokuapp.com/users/${user.Username}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        }).then((response) => {
            if(response.ok){
                alert("update successful");
                const data = response.json();
                localStorage.setItem("user", JSONstringify(data));
                window.location.reload();
            }else {
                alert("update failed")
            }
        });
};

const deleteAccount = () => {
    fetch(`https://my-movies-flix-007-49f90683c638.herokuapp.com/users/${user.Username}`,
    { method: "DELETE",
      headers: { Authorization: `Bearer ${token}`,
    },
    }).then((response) => {
        if (response.ok) {
            setUser(null);
            alert("your account has successfully been deleted");
            window.location.replace("/login");
        }else {
            alert("could not delete account");
        }
    });
};

return (
    <>
        <Container className="">
            <Row className="justify-content-md-center">
                <Col md={5}>
                    <CardGroup>
                        <Card className="mb-5 border border-0 card-custom">
                            <Card.Body>
                                <Card.Title>My Profile </Card.Title>
                                <Card.Text>Want to update your info? </Card.Text>
                                <Form onSubmit={handleUpdate}>
                                    <Form.Group>
                                        <Form.Label>Username: 
                                            <Form.Control
                                            type="text"
                                            value={Username}
                                            onChange={(e) => {
                                                setUsername(e.target.value);
                                            }} required
                                            placeholder={user.Username}
                                        />
                                        </Form.Label>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password:
                                            <Form.Control
                                            type="password"
                                            value={Password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                            }} required
                                            placeholder="******"
                                        />
                                        </Form.Label>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Email:
                                            <Form.Control
                                            type="email"
                                            value={Email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                            }} required
                                            placeholder={user.Email}
                                        />
                                        </Form.Label>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Birthday:
                                            <Form.Control
                                            type="date"
                                            value={Birthday}
                                            onChange={(e) => {
                                                setBirthday(e.target.value);
                                            }} required
                                        />
                                        </Form.Label>
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="text-white"
                                    >update profile
                                    </Button>
                                    <Link to="/login">
                                        <Button
                                        variant="danger"
                                        type=""
                                        onClick={deleteAccount}
                                        className="text-white"
                                        >Delete your account 
                                        </Button>
                                    </Link>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
        <Container>
            <Row className="">
                {result.map((movie) => {
                    return (
                        <Col key={movie._id} className="mb-4">
                            <MovieCard
                            movie={movie}
                            token={token}
                            setUser={setUser}
                            user={user} />
                        </Col>
                    );
                })}
            </Row>
        </Container>
    </>
);
};  