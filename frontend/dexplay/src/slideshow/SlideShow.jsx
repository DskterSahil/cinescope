import React, { useState, useRef } from 'react';
import './SlideShow.css';
import { Link } from 'react-router-dom';

const Card = ({ imageUrl }) => (
  <div className="slide-card">
    <img src={imageUrl} alt="Slide" className="slide-image" />
  </div>
);

const SlideShow = ({ data: movies }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  // Fetch movies from your API endpoint
  // useEffect(() => {
  //   fetch('http://localhost:3000/')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       setMovies(data);
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       console.error("Error fetching movies:", err);
  //       setError(err.message);
  //       setLoading(false);
  //     });
  // }, []);

  // Show loading message while data is being fetched
  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }

  // Display an error message if the fetch fails
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  // If no movies are returned, show a fallback message
  if (!movies || movies.length === 0) {
    return <div>No movies available</div>;
  }

  // Use only the first 20 movies for the slideshow if available
  const slides = movies.slice(0, 20).map((movie, index) => ({
    id: movie.id || index,
    imageUrl: movie.poster,
    media_type: movie.media_type
    // Adjust according to your API's field (e.g., movie.poster_path)
  }));

  const handleNext = () => {
    const container = containerRef.current;
    if (!container) return;
    
    const containerWidth = container.offsetWidth;
    const cardWidth = containerWidth / 5;
    const scrollAmount = cardWidth * 5;
    const maxScroll = container.scrollWidth - containerWidth;
    
    let newPosition = scrollPosition + scrollAmount;
    
    if (newPosition >= maxScroll - cardWidth) {
      // When near the end, first complete the scroll smoothly
      container.scrollTo({ left: maxScroll, behavior: 'smooth' });
      
      // Then after animation, quickly reset to start
      setTimeout(() => {
        container.scrollTo({ left: 0, behavior: 'auto' });
        setScrollPosition(0);
      }, 300);
      return;
    }
    
    setScrollPosition(newPosition);
    container.scrollTo({ left: newPosition, behavior: 'smooth' });
  };

  const handlePrev = () => {
    const container = containerRef.current;
    if (!container) return;
    
    const containerWidth = container.offsetWidth;
    const cardWidth = containerWidth / 5;
    const scrollAmount = cardWidth * 5;
    const maxScroll = container.scrollWidth - containerWidth;
    
    let newPosition = scrollPosition - scrollAmount;
    
    if (newPosition <= cardWidth) {
      // When near the start, first complete the scroll smoothly
      container.scrollTo({ left: 0, behavior: 'smooth' });
      
      // Then after animation, quickly jump to end
      setTimeout(() => {
        container.scrollTo({ left: maxScroll, behavior: 'auto' });
        setScrollPosition(maxScroll);
      }, 300);
      return;
    }
    
    setScrollPosition(newPosition);
    container.scrollTo({ left: newPosition, behavior: 'smooth' });
  };

  return (
    <div className="slideshow-wrapper">
      {/* Navigation buttons are always visible for circular navigation */}
      <button className="nav-button prev" onClick={handlePrev}>
        &#10094;
      </button>
      
      <div className="slideshow-container" ref={containerRef}>
        {/* Add last 5 slides at the beginning and first 5 at the end for smooth circular effect */}
        {[...slides.slice(-5), ...slides, ...slides.slice(0, 5)].map((slide, index) => (
          <Link to={`/detail/${slide.media_type}/${slide.id}`} key={`${slide.id}-${index}`}>
            <Card imageUrl={slide.imageUrl} />
          </Link>
        ))}
      </div>

      <button className="nav-button next" onClick={handleNext}>
        &#10095;
      </button>
    </div>
  );
};

export default SlideShow;
