import React, { Children, useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom';
import MovieCardSlider from '../utils/MoiveCardSlider';
import { fetchAllData } from '../utils/MajorSlashApi';
import {UserContext} from "../context/UserContext"
import { useNavigate } from 'react-router-dom';


import './login.css';

export default function Login() {
    const navigate = useNavigate();
    const [allData, setAllData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    const [isLoginPage, setIsLoginPage] = useState(true);

    const { setIsLoggedIn, setUserData } = React.useContext(UserContext);

    useEffect(() => {
        async function allWeekFetch() {
            const { allWeekRecomm } = await fetchAllData();
            setAllData(allWeekRecomm || []);
        }
        allWeekFetch();
    }, [isLogged]);

    useEffect(() => {
        const form = document.querySelector('.login-form');
        if (form) form.reset();
    }, [isLoginPage]);

    useEffect(() => {
        if (!allData.length) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % allData.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [allData]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const username = isLoginPage ? null : event.target.username?.value;
        const email = event.target.email?.value;
        const pass = event.target.password?.value;

        if (!isLoginPage && !username) {
            alert('Enter Username');
            return;
        }

        if (!email || !pass) {
            alert('Enter the details');
            return;
        }

        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };

        const body = isLoginPage
            ? { email, password: pass }
            : { username, email, password: pass };

        try {
            const endpoint = isLoginPage ? 'login' : 'register';
            const response = await axios.post(`https://cinescope-ncpj.onrender.com/auth/${endpoint}`, body, config);

            if (isLoginPage) {

                const { token, user } = response.data;  // Make sure your backend returns { token, user }

                    localStorage.setItem('token', token);
                    console.log(token)
                    localStorage.setItem('userData', JSON.stringify(user));
                    setIsLogged(true)
                    setIsLoggedIn(true);
                    setUserData(user);
                    const redirectPath = localStorage.getItem("redirectAfterLogin");
                    console.log(redirect)
                    if (redirectPath) {
                        localStorage.removeItem("redirectAfterLogin");
                        navigate(redirectPath);
                    }


            } else {
                if (response.status === 200 || response.status === 201) {
                    alert('Registration successful! Please login.');
                    setIsLoginPage(true);
                }
            }
        } catch (error) {
            if (error.response) {
                console.error('Request failed', error.response.data.error);
                alert(error.response.data.error);
            } else {
                console.error('Network issue:', error.message);
            }
        }
    };

    const currentMovie = allData.length > 0 ? allData[currentIndex] : { backdrop: null };

    

    return isLogged ? (
        <Navigate to="/dashboard" />
    ) : (
        <div id="authPage_container">
            <div id="authPage_sildeshow">
                <div id="authPage_img">
                    {allData.length > 0 ? (
                        <MovieCardSlider image={currentMovie.backdrop} />
                    ) : (
                        <div
                            style={{
                                width: '100%',
                                height: '100vh',
                                background: '#1B1919',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                            }}
                        >
                            Loading movies...
                        </div>
                    )}
                </div>
            </div>

            {!isLoginPage ? (
                <div className="register-container" key="register">
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Username"
                                className="form-input"
                                autoComplete="new-username"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter Your Email"
                                className="form-input"
                                autoComplete="new-email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter Password"
                                className="form-input"
                                autoComplete="new-password"
                            />
                        </div>
                        <button className="submit-btn">Sign Up</button>
                    </form>
                    <p className="switch-text">
                        Already have an account?
                        <button onClick={() => setIsLoginPage(true)} className="switch-btn">
                            Sign In
                        </button>
                    </p>
                </div>
            ) : (
                <div className="login-container" key="login">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter Your Email"
                                className="form-input"
                                autoComplete="username"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter Password"
                                className="form-input"
                                autoComplete="current-password"
                            />
                        </div>
                        <button className="submit-btn">Sign In</button>
                    </form>
                    <p className="switch-text">
                        Don’t have an account?
                        <button onClick={() => setIsLoginPage(false)} className="switch-btn">
                            Sign Up
                        </button>
                    </p>
                </div>
            )}

                
        </div>
    );
}
    