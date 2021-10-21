import React, { useState } from 'react';
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
import { storage } from '../../firebase';

import useAuth from '../../hooks/useAuth';
import useError from '../../hooks/useError';

import { Form, SubHeading, EditGroup, PictureWrapper } from './Profile.styles';
import Button from './Button';
import SelectImage from "./SelectImage";

const PictureEdit = ({isLoading, isEditing, onEdit, setEditImage, setLoadingState}) => {

    const { currentUser: {uid, photoURL}, currentUser } = useAuth();
    const { dispatchError } = useError();
    const [image, setImage] = useState({})

    const handleSubmitImage = async e => {
        e.preventDefault();
        try{
            if(image.file){
                setLoadingState(true);
                await storage.ref(`users/${uid}/profile.jpg`).put(image.file);
                const url = await storage.ref(`users/${uid}/profile.jpg`).getDownloadURL();
                await currentUser.updateProfile({photoURL: url});
                setImage({});
                setEditImage(false);
                dispatchError({type: 'reset'});
            }
            else{
                throw new Error();
            }
        }
        catch(error){
            dispatchError({type: 'update/change-image-failed'});
        }
        setLoadingState(false);
    }

    return(
        <Form onSubmit={handleSubmitImage} noValiate>
            <SubHeading isEditing={isEditing}>Profile picture</SubHeading>
            <EditGroup>
                <PictureWrapper>
                    {isEditing ? <SelectImage onImageChange={setImage} image={image}/> : <img src={photoURL} alt='Profile'/>}
                </PictureWrapper>
                {isEditing ? <Button disabled={isLoading} type='submit' icon={faCheck}>Submit</Button> : <Button onClick={onEdit} type='button' icon={faEdit}>Edit</Button>}
            </EditGroup>
        </Form>
    )
}

export default PictureEdit;