import React, { useState } from "react";
import {
    Button,
    Card,
    CardGroup,
    Col,
    Container,
    Form,
    Row,
} from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            access: Username,
            secret: Password
        };
        fetch("https://my-movies-flix-007-49f90683c638.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
        .then((data) => {
            console.log("Login response: ", data);
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
            }else {
                alert("No such user");
            }
        })
        .catch((e) => {
            alert("Something went wrong");
        });
    }
    return (
        <Container className="margin-top-custom">
            <Row className="justify-content-md-center">
                <Col md={5}>
                    <CardGroup className="">
                        <Card className="mb-5 border border-0">
                            <Card.Body>
                                <Card.Title>Already have an account? Login: </Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>
                                            Username: 
                                            <Form.Control
                                            type="text"
                                            value={Username}
                                            onChange={(e) => {
                                                setUsername(e.target.value);
                                            }} required
                                            placeholder="enter your username"
                                            />
                                        </Form.Label>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            Password:
                                            <Form.Control
                                            type="password"
                                            value={Password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                            }} required
                                            placeholder="enter your password"
                                            />
                                        </Form.Label>
                                    </Form.Group>
                                    <Button 
                                    variant="primary"
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="text-white"
                                    >submit
                                    </Button>
                                </Form>{" "}
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
};