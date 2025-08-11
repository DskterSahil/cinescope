



import React from "react";
// import Card from "../searchPage/Card";
import Card from "../searchPage/Card";
import "./dashboard.css";
import axios from "axios";

export default function Dashboard() {
// Example watchlist data. Replace with your real data or fetch.
const token = localStorage.getItem('token')
const storedUserData = localStorage.getItem('userData');
const userData = storedUserData ? JSON.parse(storedUserData) : null;
const [userWatchlist, setUserWatchlist] = React.useState([
    // {
    // id: "tt0111161",
    // title: "My Oxford year",
    // image: "https://image.tmdb.org/t/p/w500/jrhXbIOFingzdLjkccjg9vZnqIp.jpg",
    // year: "1994",
    // type: "movie",
    // },
    // {
    // id: "tt0903747",
    // title: "Old Guard 2",
    // image: "https://image.tmdb.org/t/p/w500/wqfu3bPLJaEWJVk3QOm0rKhxf1A.jpg",
    // year: "2008–2013",
    // type: "series",
    // },
    // {
    // id: "tt2395695",
    // title: "365 Days",
    // image: "https://image.tmdb.org/t/p/w500/7qU0SOVcQ8BTJLodcAlulUAG16C.jpg",
    // year: "2015",
    // type: "movie",
    // },
    // {
    // id: "tt0111161",
    // title: "My Oxford year",
    // image: "https://image.tmdb.org/t/p/w500/jrhXbIOFingzdLjkccjg9vZnqIp.jpg",
    // year: "1994",
    // type: "movie",
    // },
    // {
    // id: "tt0903747",
    // title: "Old Guard 2",
    // image: "https://image.tmdb.org/t/p/w500/wqfu3bPLJaEWJVk3QOm0rKhxf1A.jpg",
    // year: "2008–2013",
    // type: "series",
    // },
    // {
    // id: "tt2395695",
    // title: "365 Days",
    // image: "https://image.tmdb.org/t/p/w500/7qU0SOVcQ8BTJLodcAlulUAG16C.jpg",
    // year: "2015",
    // type: "movie",
    // },
    // {
    // id: "tt0111161",
    // title: "My Oxford year",
    // image: "https://image.tmdb.org/t/p/w500/jrhXbIOFingzdLjkccjg9vZnqIp.jpg",
    // year: "1994",
    // type: "movie",
    // },
    // {
    // id: "tt0903747",
    // title: "Old Guard 2",
    // image: "https://image.tmdb.org/t/p/w500/wqfu3bPLJaEWJVk3QOm0rKhxf1A.jpg",
    // year: "2008–2013",
    // type: "series",
    // },
    // {
    // id: "tt2395695",
    // title: "365 Days",
    // image: "https://image.tmdb.org/t/p/w500/7qU0SOVcQ8BTJLodcAlulUAG16C.jpg",
    // year: "2015",
    // type: "movie",
    // },
    // {
    // id: "tt0111161",
    // title: "My Oxford year",
    // image: "https://image.tmdb.org/t/p/w500/jrhXbIOFingzdLjkccjg9vZnqIp.jpg",
    // year: "1994",
    // type: "movie",
    // },
    // {
    // id: "tt0903747",
    // title: "Old Guard 2",
    // image: "https://image.tmdb.org/t/p/w500/wqfu3bPLJaEWJVk3QOm0rKhxf1A.jpg",
    // year: "2008–2013",
    // type: "series",
    // },
    // {
    // id: "tt2395695",
    // title: "365 Days",
    // image: "https://image.tmdb.org/t/p/w500/7qU0SOVcQ8BTJLodcAlulUAG16C.jpg",
    // year: "2015",
    // type: "movie",
    // },

    {
    "id": 30,
    "user_id": "bf8c8b89-1b9b-4ed6-828a-45d4b4bd7edc",
    "item_id": "259909",
    "item_type": "tv",
    "added_at": "2025-08-11T04:02:56.658Z",
    "item_name": "Dexter: Resurrection",
    "item_poster": "https://image.tmdb.org/t/p/w500/hIawSocuwqgNeRf3JuKuxgMHmSC.jpg",
    "item_year": "2025"
}
    ]);


 React.useEffect(() => {
  async function fetchData() {
    try {
      const url = 'https://cinescope-ncpj.onrender.com/add-to-watchlist/get';
      const config = {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      const response = await axios.get(url, config);

      // Axios automatically parses JSON → in backend, send JSON
      setUserWatchlist(response.data);  
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  }

  fetchData();
}, [token]); // include token if it might change


async function handleRemoveFromWatchlist(itemId, itemType) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: { item_id: itemId, item_type: itemType } // body for axios.delete
    };

    const response = await axios.delete("https://cinescope-ncpj.onrender.com/add-to-watchlist/remove", config);

    if (response.status === 200) {
      setUserWatchlist(prev =>
        prev.filter(
          (item) => !(item.item_id === itemId && item.item_type === itemType)
        )
      );
    }
  } catch (error) {
    console.error("Error removing item:", error);
    alert("Failed to remove from watchlist");
  }
}
 

function handleLogout() {
  // Clear authentication data
  localStorage.removeItem('token');
  localStorage.removeItem('userData');

  // Redirect to login page
  window.location.href = '/login';
}




return (
<div className="dashboard">
<div className="image_banner_container">
<div className="big_banner">
<img src="https://image.tmdb.org/t/p/original/9CsTtHlvErQ93jvIWIjs06G0Abe.jpg" alt="Banner" />
</div>

    <div className="profile_block">
  <div className="profile-img">
    <img
      src="https://static.animekai.to/65/i/d/b8/6873ccddc9d2f.jpg"
      alt="Profile"
    />
  </div>
  <h1 className="username">{userData?.username}</h1>

  {/* Logout button */}
  <button className="logout-btn" onClick={handleLogout}>
    Logout
  </button>
</div>

  </div>

  <section className="watchlist_section">
    <div className="section_header">
      <h2>Watchlist</h2>
      <span className="count">{userWatchlist?.length || 0}</span>
    </div>

    <div className="watchlist_grid">
  {userWatchlist?.length ? (
        userWatchlist.map((item) => {
          const data = {
            id: item.item_id,
            title: item.item_name,
            poster: item.item_poster,
            vote_average: item.item_year, // or year
            media_type: item.item_type
          };

          return (
            <div
              key={`${item.item_id}-${item.item_type}`}
              className="card-container"
            >
              <button
                className="remove-btn"
                onClick={() =>
                  handleRemoveFromWatchlist(item.item_id, item.item_type)
                }
              >
                ✖
              </button>
              <Card data={data} />
            </div>
          );
        })
      ) : (
        <div className="empty_state">
          <p>Your watchlist is empty. Start adding movies and series!</p>
        </div>
      )}
    </div>
  </section>
</div>

);
}