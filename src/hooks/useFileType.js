import { useState, useEffect } from 'react';
import useImage from './useImage';

const useFileType = (callback) => {
    const [file, setFile] = useState(null);
    const [FileElement, setFileElement] = useState(null);
    const { setImage } = useImage();

    useEffect(() => {
        const handleClickImage = (e) => {
            e.preventDefault();
            setImage(file);
        };
        if (file && file.type && file.name && file.url) {
            if (file.type.startsWith('video')) {
                setFileElement(
                    <video
                        src={file.url}
                        onLoadedData={callback}
                        controls={true}
                    />,
                );
            } else if (file.type.startsWith('audio')) {
                setFileElement(
                    <audio
                        src={file.url}
                        onLoadedData={callback}
                        controls={true}
                    />,
                );
            } else {
                setFileElement(
                    <img
                        onClick={handleClickImage}
                        src={file.url}
                        alt={file.name}
                        onLoad={callback}
                    />,
                );
            }
        }
    }, [file, callback, setImage]);

    return { setFile, FileElement, file };
};

export default useFileType;
