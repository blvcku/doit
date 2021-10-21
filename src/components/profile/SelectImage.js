import React, { useState, useRef } from "react";

import useError from "../../hooks/useError";

import { DropZone, ImagePlaceholder } from "./SelectImage.styles";

const SelectImage = ({image: {file, url}, onImageChange}) => {

    const [dragOver, setDragOver] = useState(false);
    const { dispatchError } = useError();
    const inputRef = useRef();

    const handleDragOver = e => {
        e.preventDefault();
        setDragOver(true);
    }

    const resetDragOver = e => {
        e.preventDefault();
        setDragOver(false);
    }

    const handleClickDropZone = e => {
        e.preventDefault();
        inputRef.current.click();
    }

    const handleInputClick = e => {
        e.stopPropagation();
    }

    const handleChangeImage = e => {
        e.preventDefault();
        const data = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        if(data.length){
            setDragOver(false);
            const file = data[0];
            if(file.type !== 'image/png' && file.type !== 'image/jpeg'){
                return dispatchError({type: 'update/wrong-image-type'});
            }
            const reader = new FileReader();
            reader.onload = e => {
                onImageChange(prev => ({...prev, file: file, url: e.target.result}))
            }
            reader.readAsDataURL(file);
        }
    }

    return(
        <DropZone onClick={handleClickDropZone} dragOver={dragOver} onDrop={handleChangeImage} onDragEnd={resetDragOver} onDragLeave={resetDragOver} onDragOver={handleDragOver}>
            <p>Drop file here or click to upload</p>
            <input ref={inputRef} type='file' name='profilepic' onClick={handleInputClick} onChange={handleChangeImage} files={file} />
            <ImagePlaceholder image={{file, url}} />
        </DropZone>
    )
}

export default SelectImage;