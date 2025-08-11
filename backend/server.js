import express from 'express';
import cors from 'cors';
import homepageRoute from './routes/homepage.js';
import authRoute from './authenication/auth.js';
import api from './api.js';
import watchList from "./routes/watchlist.js";

const app = express();

// Middlewares
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/", homepageRoute);
app.use("/auth", authRoute);


app.use("/add-to-watchlist", watchList);

// Dynamic endpoint for movie and TV show details
app.get("/detail/:type/:id", async (req, res) => {
    try {
        const { type, id } = req.params;

        if (type !== 'movie' && type !== 'tv') {
            return res.status(400).json({ error: "Invalid type. Must be 'movie' or 'tv'" });
        }

        const detailUrl = `/${type}/${id}?append_to_response=credits`;
        const imagesUrl = `/${type}/${id}/images`;

        const [detailResponse, imagesResponse] = await Promise.all([
            api.get(detailUrl, { retry: 3 }),
            api.get(imagesUrl, { retry: 3 })
        ]);

        const details = type === 'movie' ? {
            title: detailResponse.data.title,
            overview: detailResponse.data.overview,
            poster_path: `https://image.tmdb.org/t/p/w500${detailResponse.data.poster_path}`,
            productionCountries: detailResponse.data.production_countries.map(item => item.name),
            release_date: detailResponse.data.release_date,
            tagline: detailResponse.data.tagline,
            runtime: detailResponse.data.runtime,
            genres: detailResponse.data.genres,
            backdrop_path: `https://image.tmdb.org/t/p/original${detailResponse.data.backdrop_path}`,
            credits: detailResponse.data.credits.cast,
        } : {
            title: detailResponse.data.name,
            overview: detailResponse.data.overview,
            poster_path: `https://image.tmdb.org/t/p/w500${detailResponse.data.poster_path}`,
            productionCountries: detailResponse.data.origin_country,
            first_air_date: detailResponse.data.first_air_date,
            last_air_date: detailResponse.data.last_air_date,
            number_of_seasons: detailResponse.data.number_of_seasons,
            number_of_episodes: detailResponse.data.number_of_episodes,
            genres: detailResponse.data.genres,
            backdrop_path: `https://image.tmdb.org/t/p/original${detailResponse.data.backdrop_path}`,
            credits: detailResponse.data.credits.cast,
        };

        const images = imagesResponse.data.backdrops.slice(1, 5).map(item => ({
            file_path: `https://image.tmdb.org/t/p/original${item.file_path}`
        }));

        res.json({ details, images });
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ error: "Error fetching data from the API.", details: err.message });
    }
});


// Search endpoint
app.get("/search/:query", async (req, res) => {
    try {
        const { query } = req.params;
        const searchUrl = `/search/multi?query=${encodeURIComponent(query)}`;

        const response = await api.get(searchUrl, { retry: 3 });

        const searchResults = response.data.results
            .filter(item => item.poster_path)
            .map(item => ({
                title: item.title || item.name,
                id: item.id,
                overview: item.overview || "No overview available",
                release_date: item.release_date || item.first_air_date || "Unknown",
                poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                vote_average: Number(item.vote_average || 0).toFixed(1),
                media_type: item.media_type || "Unknown"
            }));

        res.json(searchResults);

    } catch (err) {
        console.error("Error fetching search data:", err.response?.data || err.message);
        res.status(500).json({
            error: "Error fetching search data from the API.",
            details: err.response?.data || err.message
        });
    }
});

// Endpoint for similar content
app.get("/info/:type/:id", async (req, res) => {
    try {
        const { type, id } = req.params;
        const url = `/${type}/${id}/similar`;

        const response = await api.get(url, {
            params: {
                language: 'en-US',
                region: 'US',
                page: 1,
            },
            retry: 3
        });

        const sortedResults = response.data.results.sort(
            (a, b) => b.vote_count - a.vote_count
        ).slice(0, 8);

        res.json({
            ...response.data,
            results: sortedResults
        });

    } catch (err) {
        console.error("Error fetching similar content:", err);
        res.status(500).json({ error: "Failed to fetch similar content.", details: err.message });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});