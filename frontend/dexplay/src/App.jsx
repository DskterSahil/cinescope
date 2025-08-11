import NavBar from './navbar/Navbar';
import './App.css';
import React from 'react';
import MovieCard from './header/MovieCard';
import Profile from './userpage/Dashboard';
import SlideShow from './slideshow/SlideShow';
import Detail from './detailPage/Detail';
import Overview from './detailPage/components/Overview';
import Cast from './detailPage/components/Cast';
import Reviews from './detailPage/components/Reviews';
import Related from './detailPage/components/Related';
import { Routes, Route } from 'react-router-dom';
import SearchPage from './searchPage/SearchPage';
import Homepage from './homepage/Homepage';
import InDetail from './innerDetail/InDetail';
import HeaderProvider from './components/HeaderProvider';
import Login from  "./login/Login"
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './userpage/Dashboard';
import { UserContext } from './context/UserContext';

function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [userData, setUserData] = React.useState(null);
    // localStorage.clear();
    console.log(userData)

     React.useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('userData');
        
        if (token && storedUser) {
          setIsLoggedIn(true);
          setUserData(JSON.parse(storedUser));
        }
      }, []);

  return (
    <div className="app-container">
      <nav className="nav-wrapper">
        <NavBar />
      </nav>
      <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}>
        <Routes>
          {/* Wrap all with HeaderProvider */}
          <Route path="/" element={<HeaderProvider />}>
            {/* This is the home route */}
            <Route
              index
              element={
                <>
                  <MovieCard />
                  <Homepage />
                </>
              }
            />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="search" element={<SearchPage />} />
            <Route path="infoabout" element={<InDetail />} />
            <Route path="login" element={<Login />} />



            <Route path="detail/:type/:id" element={<Detail />}>
              <Route index element={<Overview />} />
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="related" element={<Related />} />
            </Route>
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
