import React from 'react'
import { useLocation } from 'react-router-dom'

export const Profile = () => {
    const {state} =useLocation();
    return (
        <div>
            <h2> User profile</h2>
            <h3>Name:{state.name}</h3>
            <h3>Email:{state.email}</h3>
        </div>
    )
}
