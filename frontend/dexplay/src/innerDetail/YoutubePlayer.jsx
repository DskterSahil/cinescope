import React from "react";

const YouTubePlayer = ({ videoId }) => {
  return (
    <div className="video-container">
      <iframe
        title="YouTube Video Player"
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="youtube-iframe"
      ></iframe>
    </div>
  );
};

export default YouTubePlayer;
