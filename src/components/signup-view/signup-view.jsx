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
import CardHeader from "react-bootstrap/esm/CardHeader";

export const SignupView = () => {
    const[Username, setUsername] = useState("");
    const[Password, setPassword] = useState("");
    const[Email, setEmail] = useState("");
    const[Birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: Username,
            Password: Password,
            Email: Email,
            Birthday: Birthday
        };
        fetch("https://my-movies-flix-007-49f90683c638.herokuapp.com/users",
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if(response.ok){
                alert("Signup successful");
                window.location.reload();
            }else {
                alert("Signup failed")
            }
        });
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={5}>
                    <CardGroup>
                        <Card className="mb-5 border border-0">
                            <Card.Body>
                                <Card.Title>Please register: </Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Username: 
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
                                        <Form.Label>Password:
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
                                    <Form.Group>
                                        <Form.Label>Email:
                                            <Form.Control
                                            type="email"
                                            value={Email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                            }} required
                                            placeholder="enter your email"
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
                                    >submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
};
