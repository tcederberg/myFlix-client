import React, { useState } from "react";
import {
    Button,
    Col,
    Form,
} from "react-bootstrap";
import { MovieCard } from "./../movie-card/movie-card";

export const ProfileView = ({ user, token, movies, setUser }) => {
    const[Username, setUsername] = useState(user.Username);
    const[Password, setPassword] = useState("");
    const[Email, setEmail] = useState(user.Email);
    const[Birthday, setBirthday] = useState(user.Birthday);

    
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

const deleteProfile = () => {
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
            alert("Something went wrong, could not delete account");
        }
    });
};

let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id));

return (
    <>
      {/* display user information and allow for changes to it */}
      <Form className="m-1" onSubmit={handleSubmit}>
        <Form.Group className="mb-4" controlId="formUsername">
          <Form.Label>Username: </Form.Label>
          <Form.Control
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formPassword">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formEmail">
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBirthday">
          <Form.Label>Birthday: </Form.Label>
          <Form.Control
            type="date"
            value={Birthday.slice(0,10)}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="my-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {favoriteMovies.map((movie) => (
        <Col className="mb-4" key={movie._id} md={3}>
          <MovieCard movie={movie} />
        </Col>
      ))}

      <Button className="mt-5" variant="danger" onClick={deleteProfile}>
        Delete Your Account
      </Button>
    </>
  );
};