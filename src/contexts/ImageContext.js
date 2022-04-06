import React, { useState } from 'react';

export const ImageContext = React.createContext();

const ImageProvider = ({children}) => {

    const [image, setImage] = useState({});

    const value = {
        image,
        setImage
    };

    return (
        <ImageContext.Provider value={value}>
            {children}
        </ImageContext.Provider>
    )
}

export default ImageProvider;