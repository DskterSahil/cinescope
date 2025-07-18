import axios from 'axios';

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NGIxYzY4NTg3ODVkYzFhOGE4YmY5NDA3MTIxMjE3NCIsIm5iZiI6MTczODI1Nzk1Mi4yOTIsInN1YiI6IjY3OWJiNjIwNGViYzk5MWVhNGJkOGU0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xfDgcwzod5uVu-wrJq7RRKDbnCoUgJxanLeNgzXbzzE';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TOKEN}`
    }
});

// Utility to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Add a response interceptor for retries
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error.config;

        if (!config || !config.retry) {
            return Promise.reject(error);
        }

        config.retryCount = config.retryCount || 0;

        if (config.retryCount >= config.retry) {
            return Promise.reject(error);
        }

        config.retryCount += 1;

        // Add exponential backoff
        const backoff = Math.pow(2, config.retryCount) * 100;
        await delay(backoff);

        return api(config);
    }
);

export default api;