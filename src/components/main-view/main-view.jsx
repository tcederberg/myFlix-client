import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        { id: 1, 
            title: "Toy Story",
            description: "A cowboy doll is profoundly threatened and jealous when a new spaceman action figure supplants him as top toy in a boy's bedroom.",
            genres: 
                {
                    name: "Animated",
                    description: "Animation is a method in which pictures are manipulated to appear as moving images.",
                },
            director: 
                {
                    name: "John Lasseter",
                    bio: "John Alan Lasseter is an American filmmaker, animator, and voice actor. He is the head of animation at Skydance Animation.",
                    birth: "1957",
                },
            image: "https://www.imdb.com/title/tt0114709/mediaviewer/rm3813007616/?ref_=tt_ov_i",
            featured: false,
        },
        { id: 2, 
            title: "Big Daddy",
            description: "A lazy law school graduate adopts a kid to impress his girlfriend, but everything doesn't go as planned and he becomes the unlikely foster father.",
            genres:
                {
                    name: "Comedy",
                    description: "Codemy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerated characteristics for humorous effect.",
                },
            director: 
                {
                    name: "Dennis Dugan",
                    bio: "Dennis Barton Dugan is an American film director, actor, comedian, and screenwriter from Wheaton, IL.",
                    birth: "1946",
                },
            image: "https://www.imdb.com/title/tt0142342/mediaviewer/rm3948547585/?ref_=tt_ov_i",
            featured: false,
        },
        { id: 3,
            title: "Avatar",
            description: "A paraplegic Marine dispatched to the mood Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
            genres:
                {
                    name: "Action",
                    description: "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.",
                },
            director: 
                {
                    name: "James Cameron",
                    bio: "James Francis Cameron CC is a Canadian filmmaker. A major figure in the post-New Hollywood era.",
                    birth: "1954",
                },
            image: "https://www.imdb.com/title/tt0499549/mediaviewer/rm2864126209/?ref_=tt_ov_i",
            featured: true,
        },
        { id: 4,
            title: "The Terminator",
            description: "A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg killing machine, sent from the same year, which has been programmed to execute a young woman whose unborn son is the key to humanity's future.",
            genres:
                {
                    name: "Action",
                    description: "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.",
                },
            director: 
                {
                    name: "James Cameron",
                    bio: "James Francis Cameron CC is a Canadian filmmaker. A major figure in the post-New Hollywood era.",
                    birth: "1954",
                },
            image: "https://www.imdb.com/title/tt0088247/mediaviewer/rm774208512/?ref_=tt_ov_i",
            featured: false,
        },
        { id: 5, 
            title: "Insomnia",
            description: "Two Los Angeles homicide detectives are dispatched to a northern town where the sun doesn't set to investigate the methodical murder of a local teen.",
            genres:
                {
                    name: "Thriller",
                    description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.",
                },
            director: 
                {
                    name: "Christopher Nolan",
                    bio: "Best Known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.",
                    birth: "1970",
                },
            image: "https://www.imdb.com/title/tt0278504/mediaviewer/rm1323303168/?ref_=tt_ov_i",
            featured: false,
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}/>
        );
    }
    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }
    return (
        <div>
           {movies.map((movie) => (
            <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
            }}
            />
           ))}
        </div>
    );
};