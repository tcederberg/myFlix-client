export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.image} style={{height: "350px", width: "300px" }} />
            </div>
            <br />
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genres.name}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director.name}</span>
            </div>
            <div>
                <span>Featured: </span>
                <span>{movie.featured}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};