import React, { useReducer } from 'react';
import errorReducer from '../reducers/errorReducer';

export const ErrorContext = React.createContext();

const ErrorProvider = ({ children }) => {
    const [error, dispatchError] = useReducer(errorReducer, { error: '' });

    const value = {
        error,
        dispatchError,
    };

    return (
        <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
    );
};

export default ErrorProvider;
