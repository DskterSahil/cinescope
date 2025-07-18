import React from 'react';
import { MovieContext } from '../../context/MovieContext';
const Overview = () => {
  const details = React.useContext(MovieContext);
 
  const formattedDate = new Date(details.details.release_date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});
  
  const runtimeMinutes = details.details.runtime;
  const hours = Math.floor(runtimeMinutes / 60);
  const minutes = runtimeMinutes % 60;
  const formattedRuntime = `${hours}h ${minutes}m`;

  const genresFormatted = details.details.genres.map(genre => genre.name).join(', ');
  console.log(genresFormatted);
  

  return (
    <section className="overview-content">
      <h2 className="objective">{details.details.tagline}</h2>
      <p className="description">{details.details.overview}</p>
      <h2>Release</h2>
      <p>{formattedDate}</p>
      <h2>Runtime</h2>
      <p>{formattedRuntime}</p>
      <h2>Genre</h2>
      <p>{genresFormatted}</p>
      <h2>Production Countries</h2>
      <p>{details.details.productionCountries[0]}</p>
    </section>
  );
};

export default Overview;
