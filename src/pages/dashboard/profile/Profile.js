import React, { useState, useEffect } from 'react';
import AccountIcon from '../../../assets/icons/account.svg';
import { useHistory } from 'react-router-dom';
import useAuth from '../../../contexts/auth-context/useAuth';
import useError from '../../../contexts/error-context/useError';
import useConfirmBox from '../../../contexts/confirm-box-context/useConfirmBox';
import useTitle from '../../../hooks/useTitle';
import {
    ProfileWrapper,
    ProfileContainer,
    ProfileImageContainer,
    ProfileButtonsContainer,
    ProfileImage,
    ProfileName,
    ProfileHeading,
    ProfileIcon,
    ProfileAsideContainer,
    ProfileAsideWrapper,
    ProfileFileLabel,
    ProfileFileInput,
} from './Profile.styles';
import Loader from '../../../components/loading/Loader';
import { ProfileFormContainer } from './components/profile-form/ProfileForm.styles';
import ProfileButton from './components/profile-button/ProfileButton';
import ProfileForm from './components/profile-form/ProfileForm';

const Profile = () => {
    const {
        updateProfileImage,
        updatePassword,
        updateEmail,
        updateUsername,
        deleteAccount,
        logout,
        currentUser: { photoURL, displayName, email },
    } = useAuth();
    const { dispatchError } = useError();
    const { setConfirmInfo } = useConfirmBox();
    const { setTitle } = useTitle();
    const history = useHistory();
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');

    const personalInformationInputs = [
        {
            label: 'Username',
            name: 'username',
            defaultValue: displayName,
            maxLength: 20,
            type: 'text',
            placeholder: 'Name',
        },
        {
            label: 'E-mail',
            name: 'email',
            defaultValue: email,
            type: 'email',
            placeholder: 'E-mail',
        },
    ];

    const passwordInformationInputs = [
        {
            label: 'Password',
            name: 'password',
            type: 'password',
            autoComplete: 'off',
            placeholder: 'Password',
        },
        {
            label: 'Confirm',
            name: 'confirm',
            type: 'password',
            autoComplete: 'off',
            placeholder: 'Confirm Password',
        },
    ];

    useEffect(() => {
        setTitle('Account');
    }, [setTitle]);

    const handleLogout = async (e) => {
        e.preventDefault();
        if (logoutLoading) return;
        dispatchError({ type: 'reset' });
        try {
            setLogoutLoading(true);
            await logout();
        } catch (error) {
            dispatchError({ type: 'auth/failed-to-log-out' });
        }
        setLogoutLoading(false);
    };

    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        dispatchError({ type: 'reset' });
        setEmailMessage('');
        const form = e.target;
        const { value: newEmail } = form.elements['email'];
        const { value: username } = form.elements['username'];
        if (!newEmail.trim())
            return dispatchError({ type: 'auth/invalid-email' });
        if (username.trim().length < 6)
            return dispatchError({ type: 'auth/username-too-short' });
        try {
            await updateUsername(username);
            setEmailMessage('Success! Your username has been changed!');
            if (newEmail.trim() !== email) {
                await updateEmail(newEmail);
                setEmailMessage(
                    'Success! Check your inbox to verify email address.',
                );
            }
        } catch (error) {
            dispatchError({ type: error.code });
        }
    };

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        dispatchError({ type: 'reset' });
        setPasswordMessage('');
        const form = e.target;
        const { value: password } = form.elements['password'];
        const { value: confirm } = form.elements['confirm'];
        if (password.trim().length < 6)
            return dispatchError({ type: 'auth/password-too-short' });
        if (password.trim() !== confirm.trim())
            return dispatchError({ type: 'auth/passwords-not-match' });
        try {
            await updatePassword(password);
            form.reset();
            setPasswordMessage('Success! Your password has been changed!');
        } catch (error) {
            dispatchError({ type: error.code });
        }
    };

    const handleChangeImage = async (e) => {
        e.preventDefault();
        if (logoutLoading) return;
        dispatchError({ type: 'reset' });
        const file = e.target.files[0];
        if (!file) return;
        if (file.type !== 'image/png' && file.type !== 'image/jpeg')
            return dispatchError({ type: 'update/wrong-image-type' });
        try {
            setLogoutLoading(true);
            await updateProfileImage(file);
        } catch (error) {
            dispatchError({ type: 'update/change-image-failed' });
        }
        setLogoutLoading(false);
    };

    const handleDeleteAccount = (e) => {
        e.preventDefault();
        setConfirmInfo({ message: 'delete your account', action: delAccount });
    };

    const delAccount = async () => {
        dispatchError({ type: 'reset' });
        if (logoutLoading) return;
        try {
            setLogoutLoading(true);
            await deleteAccount();
            return history.push('/login');
        } catch (error) {
            dispatchError({ type: error.code });
        }
        setLogoutLoading(false);
    };

    return (
        <ProfileWrapper>
            <ProfileContainer>
                <ProfileAsideContainer>
                    <ProfileAsideWrapper>
                        <ProfileIcon src={AccountIcon} alt="" />
                        <ProfileHeading>Account Settings</ProfileHeading>
                    </ProfileAsideWrapper>
                </ProfileAsideContainer>
                <ProfileForm
                    title="Personal Information"
                    submitHandler={handleSubmitEmail}
                    successMessage={emailMessage}
                    inputs={personalInformationInputs}
                />
                <ProfileFormContainer noValidate>
                    {logoutLoading && <Loader />}
                    <ProfileImageContainer>
                        <ProfileImage src={photoURL} alt={displayName} />
                        <ProfileName>{displayName}</ProfileName>
                    </ProfileImageContainer>
                    <ProfileFileLabel htmlFor="profilePicture">
                        Change profile picture
                    </ProfileFileLabel>
                    <ProfileFileInput
                        onChange={handleChangeImage}
                        type="file"
                        id="profilePicture"
                        name="profilePicture"
                    />
                    <ProfileButtonsContainer>
                        <ProfileButton type="button" onClick={handleLogout}>
                            Log out
                        </ProfileButton>
                        <ProfileButton
                            style={{ background: '#DB382C' }}
                            type="button"
                            onClick={handleDeleteAccount}
                        >
                            Delete Account
                        </ProfileButton>
                    </ProfileButtonsContainer>
                </ProfileFormContainer>
                <ProfileForm
                    title="Password Information"
                    submitHandler={handleSubmitPassword}
                    successMessage={passwordMessage}
                    inputs={passwordInformationInputs}
                />
            </ProfileContainer>
        </ProfileWrapper>
    );
};

export default Profile;
