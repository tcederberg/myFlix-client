import React from "react";
import { useState } from "react";

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
        <form onSubmit={handleSubmit}> 
            <label>
                Username: <input type="text" value={Username} onChange={(e) => {setUsername(e.target.value)}} required minLength={6}/>
            </label>
            <label>
                Password: <input type="password" value={Password} onChange={(e) => {setPassword(e.target.value)}} required/>
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};