import React from 'react';
import { MovieContext } from '../../context/MovieContext';

const Cast = () => {
  const { details } = React.useContext(MovieContext);
  const credits = details.credits.slice(0,8).map(item => (
     {

      
      name: item.original_name,
      character: item.character,
      profile_path: `https://image.tmdb.org/t/p/w500${item.profile_path}`
    }
  ) )

  const castCardStyles = {
    border: '1px solid transparent',
    borderRadius: '12px',
    width: '130px',
    height: '160px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    // boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    marginLeft: '15px'
  }

  const imageStyles = {
    width: '100%',
    // height: '130px',
    objectFit: 'cover'
  }

  const infoContainerStyles = {
    padding: '6px',
    textAlign: 'center'
  }

  const nameStyles = {
    fontSize: '0.9rem',
    fontWeight: '600',
    margin: '0 0 2px 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }

  const characterStyles = {
    fontSize: '0.8rem',
    color: '#666',
    margin: '0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }

  return (
    <section className="cast-content" style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px', 
      padding: '20px' 
    }}>
      {credits.map((item, index) => (
        <div className='cast-card'
         key = {index} 
         style={castCardStyles}>

            <img 
              src={item.profile_path}
              alt="actor"
              style={imageStyles}
              className='cast-img' />

            <div className='cast-info' style={infoContainerStyles}>
              <h3 style={nameStyles}>{item.name}</h3>
              <p style={characterStyles}>{item.character}</p>
            </div>
        </div>
      ))}

      
    </section>
  );
};

export default Cast;
