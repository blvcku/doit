import React, { useState } from 'react';

export const ConfirmBoxContext = React.createContext();

const ConfirmBoxProvider = ({children}) => {

    const [confirmInfo, setConfirmInfo] = useState(null);

    const value = {
        confirmInfo,
        setConfirmInfo
    };

    return(
        <ConfirmBoxContext.Provider value={value}>
            {children}
        </ConfirmBoxContext.Provider>
    )

}

export default ConfirmBoxProvider;