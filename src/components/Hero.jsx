import React from "react";
import { useState } from "react";
import YouTube from "react-youtube";
import Button from "./Button";

const Hero = ({ selectedMovie }) => {
  const imagePath = "https://image.tmdb.org/t/p/w1280/";
  const [playTrailer, setPlayTrailer] = useState(false);
  const renderTrailer = () => {
    const trailer = selectedMovie.videos.results.find(
      (vid) => vid.name === "Official Trailer"
    );
    const key = trailer ? trailer.key : selectedMovie.videos.results[0].key;
    return (
      <YouTube
        videoId={key}
        className="youtube-container"
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            controls: 0,
          },
        }}
      />
    );
  };

  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url(${imagePath}${selectedMovie.backdrop_path})`,
      }}
    >
      <div className="hero-content max-center">
        {playTrailer && (
          <span className="close-button" onClick={() => setPlayTrailer(false)}>
            +
          </span>
        )}
        {selectedMovie.videos && playTrailer ? renderTrailer() : null}
        <Button className="button" onClick={() => setPlayTrailer(true)}>
          Play Trailer
        </Button>
        <h1 className="hero-title">{selectedMovie.title}</h1>
        {selectedMovie.overview ? (
          <p className="hero-overview">{selectedMovie.overview}</p>
        ) : null}
      </div>
    </div>
  );
};
export default Hero;
