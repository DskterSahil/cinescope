import React from 'react'
import SlideShow from '../slideshow/SlideShow'

import "./homepage.css"
import { Outlet } from 'react-router';

export default function Homepage(){
    const [movies, setMovies] = React.useState({
        trendingMovies: [],
        nfTrendMovies: [],
        amazonTrendMovies: [],
        animeReleases: [],
        indianMovies: [],
        allWeekRecomm: []
    });
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);



    React.useEffect(() => {
        fetch('http://localhost:3000/')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            setMovies(data);
            setLoading(false);
          })
          .catch(err => {
            console.error("Error fetching movies:", err);
            setError(err.message);
            setLoading(false);
          });
      }, []);


    //   console.log(movies.allWeekRecomm)



    return (
        <div className='homepage'>

            {loading ? (
                <div className="loading">Loading...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <>
                    <div className='homepage-wrapper'>
                        <h2>Trending Movies</h2>
                        <SlideShow data={movies.trendingMovies || []} />
                    </div>

                    <div className='homepage-wrapper'>
                        <h2>Netflix Originals</h2>
                        <SlideShow data={movies.nfTrendMovies || []} />
                    </div>

                    <div className='homepage-wrapper'>
                        <h2>Amazon Originals</h2>
                        <SlideShow data={movies.amazonTrendMovies || []} />
                    </div>

                    <div className='homepage-wrapper'>
                        <h2>Anime Releases</h2>
                        <SlideShow data={movies.animeReleases || []} />
                    </div>

                    <div className='homepage-wrapper'>
                        <h2>Indian Movies</h2>
                        <SlideShow data={movies.indianMovies || []} />
                    </div>


                    
                </>
            )}
        </div>
    )
}
