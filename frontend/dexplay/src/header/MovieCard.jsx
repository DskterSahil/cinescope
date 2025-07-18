import React, { useContext, useEffect, useState } from 'react';
import './MovieCard.css';
import HeaderContext from '../context/HeaderContext';
// import BackdropSlider from '../detailPage/BackdropSlider';
import MovieCardSlider from '../utils/MoiveCardSlider';

const MovieCard = () => {
  const { allWeekRecomm = [] } = useContext(HeaderContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!allWeekRecomm.length) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % allWeekRecomm.length);
    }, 10000); // change every 10s

    return () => clearInterval(interval);
  }, [allWeekRecomm]);

  if (!allWeekRecomm.length) return null;

  const currentMovie = allWeekRecomm[currentIndex];

  const handleWatch = () => {
    console.log("Watch ID:", currentMovie.id);
    // navigate or open modal, etc.
  };

  const handleDetail = () => {
    console.log("Detail ID:", currentMovie.id);
    // navigate(`/detail/movie/${currentMovie.id}`)
  };

  return (
    <div className="parent">
      <div className="image-frame">
        <MovieCardSlider image={currentMovie.backdrop} />
      </div>

      <div className="movie-details">
        <span className="movie-title">{currentMovie.title}</span>

        <div className="buttons_MovieCard">
          <button className="watch-btn" onClick={handleWatch}>Watch</button>
          <button className="detail-btn" onClick={handleDetail}>Detail</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
