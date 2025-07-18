import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';
import { fetchAllData } from '../utils/MajorSlashApi';

export default function HeaderProvider() {
  const [movies, setMovies] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetchAllData()
      .then((data) => setMovies(data))
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!movies) return <div>Loading...</div>;

  return (
    <HeaderContext.Provider value={movies}>
      <Outlet />
    </HeaderContext.Provider>
  );
}
