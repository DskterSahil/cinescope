import React from "react";
import { Routes, Route, NavLink, useParams, Outlet, useNavigate } from "react-router-dom";
import "./detail.css";
import BackdropSlider from "./BackdropSlider";
import { MovieContext } from '../context/MovieContext';
import { UserContext } from "../context/UserContext";
import axios from "axios";
export default function Detail() {
    const { isLoggedIn, setIsLoggedIn, userData, setUserData } = React.useContext(UserContext);

    const [details, setDetails] = React.useState("")
    const [loading, setLoading] = React.useState(true)
    const [isWatchlisted, setIsWatchlisted] = React.useState(false);
    const token = localStorage.getItem('token')


    // console.log(details.details.release_date.slice(0,4))
    // console.log(details.details)

    const navigate = useNavigate()

    const activeStyle = {
        color: "#ffcc00",
        cursor: "pointer"
    };

    const { type ,id } = useParams();
    
    React.useEffect(() => {
    async function fetchData() {
        try {
            const detailsRes = await fetch(`https://cinescope-ncpj.onrender.com/detail/${type}/${id}`);
            const detailsData = await detailsRes.json();
            setDetails(detailsData);
            setLoading(false);

            if (token) {
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                };
                const watchlistRes = await axios.get("https://cinescope-ncpj.onrender.com/add-to-watchlist/get", config);
                
                // Check if current media already exists in watchlist
                const found = watchlistRes.data.some(
                    item => item.item_id === id && item.item_type === type
                );
                setIsWatchlisted(found);
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

        fetchData();
    }, [type, id, token]);





    if (loading || !details) {
        return <div>Loading...</div>;
    }

    const year = details.details.release_date
        ? details.details.release_date.slice(0, 4)
        : details.details.last_air_date
            ? details.details.last_air_date.slice(0, 4)
            : '';

    
    
console.log(year)

   async function handleAddWatchlist(){

        try{

            const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },

        }

            const body = {
                    "item_id": id,
                    "item_type": type,
                    "item_poster": details.details.poster_path,
                    "item_name": details.details.title,
                    "item_year": year

                    }

            const response = await axios.post("https://cinescope-ncpj.onrender.com/add-to-watchlist", body, config )
              if (response.status === 200) {
                    alert(response.data.message);
                    setIsWatchlisted(true); // mark as added
                }

        }
        catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    localStorage.setItem("redirectAfterLogin", window.location.pathname);
                    alert("Session expired or invalid token. Please log in again.");
                    localStorage.removeItem('token');
                    localStorage.removeItem('userData');
                    setIsLoggedIn(false);
                    setUserData(null);
                    navigate('/login');
                } else {
                    alert(`Failed: ${error.response.data.message || "Something went wrong."}`);
                }
            } else if (error.request) {
                alert("Unable to reach server. Please check your network connection.");
            } else {
                alert("Unexpected error: " + error.message);
            }
        }


    }
        
    
    function handleDetail(){
        navigate(`/infoabout/` , {state: {data : details}  })
        
    }   
    
    return (
        <div className="detail-wrapper">
            <section className="left_part-container">

            <div className="poster-wrapper">
                <BackdropSlider images={details.images} />
            </div>

                <div className="flexbox">

                    <section className="lower-container">
                        <div className="img-md-wrapper">
                            <img src={details.details.poster_path} alt="poster medium" className="img-md" />
                        </div>

                        {/* <div className="rating">7.5</div> */}
                    </section>

                    <div className="buttons">
                        <h1 className="detail_title">{details.details.title.slice(0,10)}</h1>

                        <div className="flex">
                            <button
                                    onClick={!isWatchlisted ? handleAddWatchlist : undefined}
                                    className={`watch-btn ${isWatchlisted ? 'added' : ''}`}
                                    disabled={isWatchlisted}
                                >
                                    {isWatchlisted ? "Added" : "Watch"}
                                </button>

                            <button onClick={handleDetail} className="detail-btn">Detail</button>
                        </div>
                    </div>

                </div>

            </section>

            <section className="right_part-container">
                <nav className="toggler">
                    <ul>
                        <li>
                            <NavLink 
                                to="." 
                                end
                                style={({ isActive }) => isActive ? activeStyle : undefined}
                            >
                                Overview
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="cast"
                                style={({ isActive }) => isActive ? activeStyle : undefined}
                            >
                                Casts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="reviews"
                                style={({ isActive }) => isActive ? activeStyle : undefined}
                            >
                                Reviews
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="related"
                                style={({ isActive }) => isActive ? activeStyle : undefined}
                            >
                                Related
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <MovieContext.Provider value={details}>
                    <Outlet />
                </MovieContext.Provider>
                

                
            </section>

        </div>

    );
}
