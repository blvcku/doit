import { useState, useEffect } from 'react';

const useFileType = () => {

    const [file, setFile] = useState(null);
    const [fileElement, setFileElement] = useState(null);

    useEffect(() => {
        if(file && file.type && file.name && file.file){
            if(file.type.startsWith('video')){
                setFileElement(<video src={file.file} controls={true} />)
            }
            else if(file.type.startsWith('audio')){
                setFileElement(<audio src={file.file} controls={true} />)
            }
            else{
                setFileElement(<img src={file.file} alt={file.name} />)
            }
        }
    }, [file]);

    return { setFile, fileElement, file };
}

export default useFileType;