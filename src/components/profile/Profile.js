import React, { useState } from "react";

import useAuth from "../../hooks/useAuth";
import useError from "../../hooks/useError";

import { Container, Wrapper, Heading, LogoutButton, LogoutButtonWrapper } from './Profile.styles';
import PictureEdit from "./PictureEdit";
import EmailEdit from "./EmailEdit";
import PasswordEdit from "./PasswordEdit";

const Profile = (props) => {

    const { logout } = useAuth();
    const { dispatchError } = useError();
    const [loading, setLoading] = useState(false);
    const [editImage, setEditImage] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);

    const handleLogout = async e => {
        e.preventDefault();
        try{
            setLoading(true);
            logout();
            return dispatchError({type: 'reset'});
        }
        catch(error){
            dispatchError({type: 'auth/failed-to-log-out'});
        }
        setLoading(false);
    }

    const handleEditImage = e => {
        e.preventDefault();
        setEditEmail(false);
        setEditPassword(false);
        setEditImage(true);
    }

    const handleEditEmail = e => {
        e.preventDefault();
        setEditImage(false);
        setEditPassword(false);
        setEditEmail(true);
    }

    const handleEditPassword = e => {
        e.preventDefault();
        setEditImage(false);
        setEditEmail(false);
        setEditPassword(true);
    }

    return(
        <Container>
            <Wrapper>
                <Heading>Settings</Heading>
                <PictureEdit isLoading={loading} isEditing={editImage} setEditImage={setEditImage} onEdit={handleEditImage} setLoadingState={setLoading}/>
                <EmailEdit isLoading={loading} isEditing={editEmail} setEditEmail={setEditEmail} onEdit={handleEditEmail} setLoadingState={setLoading} />
                <PasswordEdit isLoading={loading} isEditing={editPassword} setEditPassword={setEditPassword} onEdit={handleEditPassword} setLoadingState={setLoading} />
                <LogoutButtonWrapper>
                    <LogoutButton onClick={handleLogout} disabled={loading} type='button'>Log Out</LogoutButton>
                </LogoutButtonWrapper>
            </Wrapper>
        </Container>
    )
}

export default Profile;