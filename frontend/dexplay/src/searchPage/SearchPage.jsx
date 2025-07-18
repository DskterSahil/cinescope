import React from "react";
import { MovieContext } from "../context/MovieContext";
import Card from "./Card";
import "./searchPage.css";

export default function SearchPage() {
    const [searchData, setSearchData] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [query, setQuery] = React.useState("");

    function debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            if(timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    const fetchSearchResults = React.useCallback(async (searchQuery) => {
        if(!searchQuery.trim()) {
            setSearchData("");
            return;
        }
        
        setLoading(true);

        try {
            const res = await fetch(`https://cinescope-ncpj.onrender.com/search/${searchQuery}`);
            if(!res.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await res.json();
            setSearchData(data);
        }
        catch(error) {
            console.error("Error fetching data:", error);
        }
        finally {
            setLoading(false);
        }
    }, []);

    const debouncedFetch = React.useCallback(
        debounce((searchQuery) => {
            fetchSearchResults(searchQuery);
        }, 500), 
        [fetchSearchResults]
    );
    
    function handleSearch(event) {
        const newQuery = event.target.value;
        setQuery(newQuery);
        debouncedFetch(newQuery);
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        fetchSearchResults(query);
    }

   

    return (
        <div className="search-wrapper">
            <form className="search-form" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    className="search-input"
                    placeholder="Search for a movie/series"
                    name="search-bar"
                    value={query}
                    onChange={handleSearch}
                />
                <button type="submit">Search</button>
            </form>
            
            {loading && <p>Loading...</p>}
            
            {/* Display search results here */}
            {searchData && !loading && (
                <div className="search-results">
                    {searchData.map((item) => (
                        <Card key={item.id} data={item} />
                    ))}
                </div>
            )}
        </div>
    );
}