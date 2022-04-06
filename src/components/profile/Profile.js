import React, { useState, useEffect } from "react";
import ProfileIcon from '../../images/account.svg';
import { useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useError from "../../hooks/useError";
import useConfirmBox from '../../hooks/useConfirmBox';
import useTitle from '../../hooks/useTitle';
import { Container, GridContainer, Aside, Form, InputsWrapper, Button, SuccesMessage, Figure, Label, ButtonsContainer } from './Profile.styles';
import Loader from '../loading/Loader';

const Profile = () => {

    const { updateProfileImage, updatePassword, updateEmail, updateUsername, deleteAccount, logout, currentUser: { photoURL, displayName, email } } = useAuth();
    const { dispatchError } = useError();
    const { setConfirmInfo } = useConfirmBox();
    const { setTitle } = useTitle();
    const history = useHistory();
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [emailLoading, setEmailLoading] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');

    useEffect(() => {
        setTitle('Account');
    }, [setTitle]);

    const handleLogout = async e => {
        e.preventDefault();
        if(logoutLoading) return;
        dispatchError({type: 'reset'});
        try{
            setLogoutLoading(true);
            await logout();
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
        const { value: newEmail } = form.elements['email'];
        const { value: username } = form.elements['username'];
        if(!newEmail.trim()) return dispatchError({type: 'auth/invalid-email'});
        if(username.trim().length < 6) return dispatchError({type: 'auth/username-too-short'});
        try{
            setEmailLoading(true);
            await updateUsername(username);
            setEmailMessage('Success! Your username has been changed!')
            if(newEmail.trim() !== email){
                await updateEmail(newEmail);
                setEmailMessage('Success! Check your inbox to verify email address.');
            }
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
            await updatePassword(password);
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
            await updateProfileImage(file);
        }
        catch(error){
            dispatchError({type: 'update/change-image-failed'});
        }
        setLogoutLoading(false);
    }

    const handleDeleteAccount = e => {
        e.preventDefault();
        setConfirmInfo({message: 'delete your account', action: delAccount});
    }

    const delAccount = async () => {
        dispatchError({type: 'reset'});
        if(logoutLoading) return;
        try{
            setLogoutLoading(true);
            await deleteAccount();
            return history.push('/login');
        }
        catch(error){
            dispatchError({type: error.code});
        }
        setLogoutLoading(false);
    }

    return(
        <Container>
            <GridContainer>
                <Aside>
                    <div>
                        <img src={ProfileIcon} alt='Profile' />
                        <h1>Account Settings</h1>
                    </div>
                </Aside>
                <Form onSubmit={handleSubmitEmail} noValidate>
                    {emailLoading && <Loader />}
                    <h3>Personal Information</h3>
                    <InputsWrapper>
                        <label htmlFor="username">Username</label>
                        <input maxLength='20' defaultValue={displayName} type='text' name='username' id='username' placeholder="Name"/>
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
                    <ButtonsContainer>
                        <Button type='button' onClick={handleLogout}>Log out</Button>
                        <Button style={{background: '#DB382C'}} type='button' onClick={handleDeleteAccount} >Delete Account</Button>
                    </ButtonsContainer>
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