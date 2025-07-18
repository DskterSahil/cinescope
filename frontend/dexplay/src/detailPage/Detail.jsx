import React from "react";
import { Routes, Route, NavLink, useParams, Outlet, useNavigate } from "react-router-dom";
import "./detail.css";
import Overview from "./components/Overview";
import Cast from "./components/Cast";
import Reviews from "./components/Reviews";
import Related from "./components/Related";
import BackdropSlider from "./BackdropSlider";
import { MovieContext } from '../context/MovieContext';

export default function Detail() {

    const [details, setDetails] = React.useState("")
    const [loading, setLoading] = React.useState(true)
    const navigate = useNavigate()

    const activeStyle = {
        color: "#ffcc00",
        cursor: "pointer"
    };
    const { type ,id } = useParams();
    
    React.useEffect(() => {
        fetch(`https://cinescope-ncpj.onrender.com/detail/${type}/${id}`)
            .then(res => res.json())
            .then(data => {
                setDetails(data)
                setLoading(false)
            })
    }
        , [ type, id ])

        if (loading || !details) {
            return <div>Loading...</div>;
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
                            <button className="watch-btn">Watch</button>
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
