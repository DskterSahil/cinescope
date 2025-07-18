import express from "express";
const router = express.Router();
import axios from "axios";

import { fetchIndianMovies,
     fetchAnimeReleases,
      fetchTrendingMovies,
       fetchNetflixTrendingMovies,
       fetchAmazonTrendingMovies,
        fetchAllWeek
    } from "../controllers/homecontroller.js";

router.get("/", async(req, res) => {
    try {
        const [indianMovies, animeReleases, trendingMovies, nfTrendMovies, amazonTrendMovies, allWeekRecomm] = await Promise.all([
            fetchIndianMovies(),
            fetchAnimeReleases(),
            fetchTrendingMovies(),
            fetchNetflixTrendingMovies(),
            fetchAmazonTrendingMovies(),
            fetchAllWeek(),
        ])

        res.json({
            indianMovies,
            animeReleases,
            trendingMovies,
            nfTrendMovies,
            amazonTrendMovies,
            allWeekRecomm

        })
    } catch(err) {
        console.log("error!!", err)
        res.status(500).json({error: "error from api fetching"})
    }
})

export default router;
