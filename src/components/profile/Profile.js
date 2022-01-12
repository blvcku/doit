import React, { useState } from "react";
import PersonIcon from '../../images/profile/person.svg';
import { storage, db } from "../../firebase";

import useAuth from "../../hooks/useAuth";
import useError from "../../hooks/useError";

import { Container, GridContainer, Aside, Form, InputsWrapper, Button, SuccesMessage, Figure, Label } from './Profile.styles';
import Loader from '../loading/Loader';

const Profile = () => {

    const { logout, currentUser: {photoURL, displayName, email, uid}, currentUser } = useAuth();
    const { dispatchError } = useError();
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [emailLoading, setEmailLoading] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');

    const handleLogout = async e => {
        e.preventDefault();
        if(logoutLoading) return;
        dispatchError({type: 'reset'});
        try{
            setLogoutLoading(true);
            logout();
        }
        catch(error){
            dispatchError({type: 'auth/failed-to-log-out'});
        }
        setLogoutLoading(false);
    }

    const handleSubmitEmail = async e => {
        e.preventDefault();
        if(emailLoading) return;
        dispatchError({type: 'reset'});
        setEmailMessage('');
        const form = e.target;
        const { value: email } = form.elements['email'];
        const { value: username } = form.elements['username'];
        if(!email.trim()) return dispatchError({type: 'auth/invalid-email'});
        if(username.trim().length < 6) return dispatchError({type: 'auth/username-too-short'});
        if(username.trim().length > 20) return dispatchError({type: 'auth/username-too-long'});
        try{
            setEmailLoading(true);
            await currentUser.updateEmail(email.trim());
            await currentUser.updateProfile({displayName: username.trim()});
            await db.collection('users').doc(currentUser.uid).update({
                displayName: username.trim()
            });
            setEmailMessage('Success! Your username and email have been changed!')
        }
        catch(error){
            dispatchError({type: error.code});
        }
        setEmailLoading(false);
    }

    const handleSubmitPassword = async e => {
        e.preventDefault();
        if(passwordLoading) return;
        dispatchError({type: 'reset'});
        setPasswordMessage('');
        const form = e.target;
        const { value:password } = form.elements['password'];
        const { value:confirm } = form.elements['confirm'];
        if(password.trim().length < 6) return dispatchError({type: 'auth/password-too-short'});
        if(password.trim() !== confirm.trim()) return dispatchError({type: 'auth/passwords-not-match'});
        try{
            setPasswordLoading(true);
            await currentUser.updatePassword(password.trim());
            form.reset();
            setPasswordMessage('Success! Your password has been changed!');
        }
        catch(error){
            dispatchError({type: error.code});
        }
        setPasswordLoading(false);
    }

    const handleChangeImage = async e => {
        e.preventDefault();
        if(logoutLoading) return;
        dispatchError({type: 'reset'});
        const file = e.target.files[0];
        if(!file) return;
        if(file.type !== 'image/png' && file.type !== 'image/jpeg') return dispatchError({type: 'update/wrong-image-type'});
        try{
            setLogoutLoading(true);
            await storage.ref(`users/${uid}/profile.jpg`).put(file);
            const url = await storage.ref(`users/${uid}/profile.jpg`).getDownloadURL();
            await currentUser.updateProfile({photoURL: url});
            await db.collection('users').doc(currentUser.uid).update({
                photoURL: url
            })
        }
        catch(error){
            dispatchError({type: 'update/change-image-failed'});
        }
        setLogoutLoading(false);
    }

    return(
        <Container>
            <GridContainer>
                <Aside>
                    <div>
                        <img src={PersonIcon} alt='Person' />
                        <h1>Account Settings</h1>
                    </div>
                </Aside>
                <Form onSubmit={handleSubmitEmail} noValidate>
                    {emailLoading && <Loader />}
                    <h3>Personal Information</h3>
                    <InputsWrapper>
                        <label htmlFor="username">Username</label>
                        <input defaultValue={displayName} type='text' name='username' id='username' placeholder="Name"/>
                        <label htmlFor='email'>E-mail</label>
                        <input defaultValue={email} type='email' name='email' id='email' placeholder="E-mail"/>
                        <SuccesMessage>{emailMessage}</SuccesMessage>
                    </InputsWrapper>
                    <Button type='submit'>Save</Button>
                </Form>
                <Form noValidate>
                    {logoutLoading && <Loader />}
                    <Figure>
                        <img src={photoURL} alt={displayName} />
                        <figcaption>{displayName}</figcaption>
                    </Figure>
                    <Label htmlFor='profilePicture'>Change profile picture</Label>
                    <input onChange={handleChangeImage} style={{display: 'none'}} type='file' id='profilePicture' name='profilePicture' />
                    <Button style={{background: '#DB382C'}} type='button' onClick={handleLogout}>Log out</Button>
                </Form>
                <Form onSubmit={handleSubmitPassword} noValidate>
                    {passwordLoading && <Loader />}
                    <h3>Password Information</h3>
                    <InputsWrapper>
                        <label htmlFor='password'>Password</label>
                        <input autoComplete="off" type='password' name='password' id='password' placeholder='Password' />
                        <label htmlFor='confirm'>Confirm</label>
                        <input autoComplete="off" type='password' name='confirm' id='confirm' placeholder='Confirm Password' />
                        <SuccesMessage>{passwordMessage}</SuccesMessage>
                    </InputsWrapper>
                    <Button type='submit'>Save</Button>
                </Form>
            </GridContainer>
        </Container>
    )
}

export default Profile;