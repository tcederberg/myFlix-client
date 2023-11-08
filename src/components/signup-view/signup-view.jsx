import { useState } from "react";
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
        <form onSubmit={handleSubmit}>
            <label htmlFor="">Username:
            <input type="text" value={Username} onChange={(e)=>setUsername(e.target.value)} />
            </label>
            <label htmlFor="">Password:
            <input type="password" value={Password} onChange={(e)=>{setPassword(e.target.value)}} />
            </label>
            <label htmlFor="">Email:
            <input type="email" value={Email} onChange={(e)=>{setEmail(e.target.value)}} />
            </label>
            <label htmlFor="">Birthday:
            <input type="date" value={Birthday} onChange={(e)=>{setBirthday(e.target.value)}} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};