import React from 'react'
import { NavLink } from 'react-router';
import './card.css'

export default function Card(props) {
    const {data} = props
    const { id, title, poster, vote_average, media_type } = data;    
    
    return(
        <NavLink to={`/detail/${media_type}/${id}`} className="card-link">
        <div className="card-wrapper">
            <div className="card">
                <img src={poster} alt={title} className="img-card" />
            </div>

            <div className='hoverd-card'>
                <h3>{title}</h3>
                <p>{vote_average}</p>
                <p>{media_type}</p>
            </div>
        </div>

        
        </NavLink>
    )
}