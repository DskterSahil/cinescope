import NavBar from './navbar/Navbar';
import './App.css';
import MovieCard from './header/MovieCard';
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

function App() {
  return (
    <div className="app-container">
      <nav className="nav-wrapper">
        <NavBar />
      </nav>

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

          <Route path="search" element={<SearchPage />} />
          <Route path="infoabout" element={<InDetail />} />

          <Route path="detail/:type/:id" element={<Detail />}>
            <Route index element={<Overview />} />
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="related" element={<Related />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
