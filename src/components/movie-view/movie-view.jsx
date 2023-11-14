import "../movie-view/movie-view.scss";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const MovieView = ({ user, token, setUser }) => {
    const movies = useSelector((state) => state.movies.list);  
  const { movieId } = useParams(); 

  const movie = movies.find((m) => m.id === movieId);

   let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id));

  const [isFavorite, setIsFavorite] = useState(
    favoriteMovies.includes(movies._id)
  );

  function favoriteMovie() {
    fetch(`https://my-movies-flix-007-49f90683c638.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Something went wrong");
        return false;
      }
    }).then((user) => {
      if (user) {
        alert("Successfuly added to favorites")
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setIsFavorite(true);
        console.log(isFavorite);
      }
    });
  };

  const unfavoriteMovie = () => {
    fetch(`https://moviesappmyflix-02f853986708.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else { 
        alert("Something went wrong");
        return false;
      }
    }).then((user) => {
      if (user) {
        alert("Successfully removed from favorites")
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setIsFavorite(false);
        console.log(isFavorite);
      }
    });
  };
    
  return (
    <div className="d-grid gap-3">
      <div>
        <img className="rounded-5" src={movie.ImagePath} />
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Featured: </span>
        <span>{movie.Featured}</span>
      </div>
      <Link to={`/`}>
        <Button className="back-button">Back</Button>
      </Link>
      {isFavorite ? (
        <Button className="fav-button" onClick={unfavoriteMovie}>
          Unfavorite
        </Button>
      ) : (
        <Button className="fav-button" onClick={favoriteMovie}>
          Favorite
        </Button>
      )}
    </div>
  );
};