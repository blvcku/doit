import React, { useState } from 'react';

import useAuth from '../hooks/useAuth';
import useError from '../hooks/useError';

const Dashboard = (props) => {

    const { currentUser, logout } = useAuth();
    const { dispatchError } = useError();

    const handleLogout = async e => {
        e.preventDefault();
        try{
            logout();
        }
        catch{
            dispatchError();
        }
    }

    return(
        <div>
            <h1>Dashboard</h1>
            <h3>{currentUser.email}</h3>
            <h4>{currentUser.displayName}</h4>
            <button type='button' onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard;