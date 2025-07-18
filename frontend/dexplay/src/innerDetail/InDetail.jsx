import React from "react";
import { useLocation } from "react-router";
import YouTubePlayer from "./YoutubePlayer";
import NetflixIcon from "../assets/netflixIcon.svg";
import PrimeVideoIcon from "../assets/primevideo.svg";

import "./indetail.css"

export default function InDetail() {
    const [videoId, setVideoId] = React.useState("")
    const [recomm, setRecomm] = React.useState("")

    const [loading, setLoading] = React.useState(true)


    const location = useLocation()
    const {title, overview, poster_path, first_air_date, release_date}  = location.state?.data.details
    const release_year = first_air_date ? first_air_date.substring(0,4) : release_date.substring(0,4);


    const createSlug = (title, year) => {
                return `${title.toLowerCase().replace(/\s+/g, '-')}-${year}`;
                }
    

    const movieSlug =  createSlug(title, release_year)
    console.log(movieSlug)

    React.useEffect( ()=>{

      const fetchTrailer =   async ()=>{
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${movieSlug}%20official%20trailer&key=AIzaSyDVAx1WS0YmrEqvuGS2B3JLoupqHZ7RWpY`)
        const data = await response.json();
    
        if (data.items && data.items.length > 0) {
          setVideoId(data.items[0].id.videoId)
        }
    }

    fetchTrailer()

    }, [movieSlug])


    const Card = ({ imageUrl }) => (
        <div className="slide-card">
            <img src={imageUrl} alt="Slide" className="slide-image" />
        </div>
        );

    React.useEffect(() => {
           fetch('https://cinescope-ncpj.onrender.com/')
             .then(response => {
               if (!response.ok) {
                 throw new Error('Network response was not ok');
               }
               return response.json();
             })
             .then(data => {
               setRecomm(data);
               setLoading(false);
             })
             .catch(err => {
               console.error("Error fetching movies:", err);
               setError(err.message);
               setLoading(false);
             });
         }, []);

    return (
        <>
            <div className="indetail-wrapper">

                <div className="indetail_left-container">
                    <div className="img_banner">
                        <img src={poster_path} alt="banner" />
                    </div>

                    <div className="indetail_left-content">
                        <h2>{title}</h2>
                        <p className="indetail_overview">
                            {overview}
                        </p>
                    

                        <div className="buttons">
                            <button>Watchlist</button>
                            <button>Favourite</button>    
                        </div>
                    </div>    

                </div>

                <div className="indetail_right-container">
                    <div className="trailer-container">
                        <YouTubePlayer videoId={videoId}  className="youtube-player"/>
                    </div>

                    <div className="ott_platform_avail">
                        <img src={NetflixIcon} alt="netflix"  className="netflixIcon"/>
                        <img src={PrimeVideoIcon} alt="primevideo" className="primevideoIcon" />
                    </div>
                   
                </div>
            </div>
        </>
    );
}