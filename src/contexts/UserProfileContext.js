import React, { useState } from 'react';

export const UserProfileContext = React.createContext();

const UserProfileProvider = ({children}) => {

    const [userID, setUserID] = useState('');

    const value = {
        userID,
        setUserID
    };

    return(
        <UserProfileContext.Provider value={value}>
            {children}
        </UserProfileContext.Provider>
    )

}

export default UserProfileProvider;