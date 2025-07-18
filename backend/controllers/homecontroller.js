import api from '../api.js';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// 🗓️ Get current month date range
const getCurrentMonthRange = () => {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return {
        start: startDate.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0],
    };
};
const { start, end } = getCurrentMonthRange();

// 🧠 Reusable Caching Function with Cache Busting
const createCachedFetch = (fetchFunction, cacheDuration) => {
    let cache = null;
    let cacheTimestamp = 0;

    return async (refresh = false, ...args) => {
        const now = Date.now();
        if (!refresh && cache && (now - cacheTimestamp < cacheDuration)) {
            return cache;
        }

        try {
            console.log(`Fetching fresh data for ${fetchFunction.name}...`);
            const data = await fetchFunction(...args);
            cache = data;
            cacheTimestamp = now;
            return data;
        } catch (err) {
            console.error(`❌ Error fetching data for ${fetchFunction.name}:`, err.message);
            return []; // Return empty array on error
        }
    };
};


// 🔁 Reusable fetch function from TMDB
async function fetchFromTMDB(endpoint, params = {}) {
    const response = await api.get(endpoint, { params, retry: 3 }); // Added retry option

    return response.data.results.map(item => ({
        title: item.title || item.name,
        id: item.id,
        overview: item.overview,
        release_date: item.release_date || item.first_air_date,
        poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        media_type: item.media_type || (item.title ? 'movie' : 'tv')
    }));
}


// 📈 Trending (All)
const fetchTrendingMoviesInternal = () => fetchFromTMDB('/trending/all/week', { language: 'en-US' });

// 🇮🇳 Indian Movies
const fetchIndianMoviesInternal = () => fetchFromTMDB('/discover/movie', {
    language: 'en-US',
    region: 'IN',
    sort_by: 'popularity.desc',
    with_original_language: 'hi',
    'primary_release_date.gte': start,
    'release_date.lte': end,
    with_origin_country: 'IN',
    page: 1
});

// 🇯🇵 Anime Releases (TV shows)
const fetchAnimeReleasesInternal = () => fetchFromTMDB('/discover/tv', {
    language: 'en-US',
    sort_by: 'popularity.desc',
    'first_air_date.gte': start,
    'first_air_date.lte': end,
    with_original_language: 'ja',
    with_genres: '16'
});

// 🎥 Netflix Trending
const fetchNetflixTrendingMoviesInternal = () => fetchFromTMDB('/discover/movie', {
    language: 'en-US',
    with_watch_providers: '8',
    watch_region: 'IN',
    with_watch_monetization_types: 'flatrate',
    sort_by: 'popularity.desc',
    page: 1
});

// 🎬 Amazon Prime Trending
const fetchAmazonTrendingMoviesInternal = () => fetchFromTMDB('/discover/movie', {
    language: 'en-US',
    with_watch_providers: '119',
    watch_region: 'IN',
    with_watch_monetization_types: 'flatrate',
    sort_by: 'popularity.desc',
    page: 1
});

// 🍿 All Week Recommendations
const fetchAllWeekInternal = async () => {
    const response = await api.get('/movie/1061474/recommendations', { retry: 3 });

    return response.data.results.map(item => ({
        title: item.title || item.name,
        id: item.id,
        name: item.name,
        overview: item.overview,
        release_date: item.release_date || item.first_air_date,
        backdrop: `https://image.tmdb.org/t/p/original/${item.backdrop_path}`,
        media_type: item.media_type || 'movie'
    }));
};


// 📦 Create cached versions of the fetch functions
export const fetchTrendingMovies = createCachedFetch(fetchTrendingMoviesInternal, CACHE_DURATION);
export const fetchIndianMovies = createCachedFetch(fetchIndianMoviesInternal, CACHE_DURATION);
export const fetchAnimeReleases = createCachedFetch(fetchAnimeReleasesInternal, CACHE_DURATION);
export const fetchNetflixTrendingMovies = createCachedFetch(fetchNetflixTrendingMoviesInternal, CACHE_DURATION);
export const fetchAmazonTrendingMovies = createCachedFetch(fetchAmazonTrendingMoviesInternal, CACHE_DURATION);
export const fetchAllWeek = createCachedFetch(fetchAllWeekInternal, CACHE_DURATION);