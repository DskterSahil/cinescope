import React from 'react'
import {Navigate} from 'react-router-dom'

export default function ProtectedRoute({children}){

    function tokenCheck(token){
        if(!token) return true

        try{
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000
            return payload.exp < currentTime
        }
        catch(error){
            console.error("Error while token checking:", error)
            return true
        }
    }

    const token = localStorage.getItem('token')
    const isTokenExpired = tokenCheck(token)

    if(!token || isTokenExpired){
        localStorage.removeItem('token')
        return <Navigate to="/login" replace/> 
    }


      

    return children
}
