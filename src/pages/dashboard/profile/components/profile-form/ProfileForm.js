import React, { useState } from 'react';
import {
    ProfileFormContainer,
    ProfileFormHeading,
    ProfileFormInputsContainer,
    ProfileFormSuccesMessage,
} from './ProfileForm.styles';
import ProfileFormInput from '../profile-form-input/ProfileFormInput';
import Loader from '../../../../../components/loading/Loader';
import ProfileButton from '../profile-button/ProfileButton';

const ProfileForm = ({
    title,
    submitHandler,
    successMessage,
    inputs,
    ...containerProps
}) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        await submitHandler(e);
        setLoading(false);
    };

    return (
        <ProfileFormContainer
            onSubmit={handleSubmit}
            noValidate
            {...containerProps}
        >
            {loading && <Loader />}
            <ProfileFormHeading>{title}</ProfileFormHeading>
            <ProfileFormInputsContainer>
                {inputs.map(({ name, ...rest }) => (
                    <ProfileFormInput key={name} name={name} {...rest} />
                ))}
                <ProfileFormSuccesMessage>
                    {successMessage}
                </ProfileFormSuccesMessage>
            </ProfileFormInputsContainer>
            <ProfileButton type="submit">Save</ProfileButton>
        </ProfileFormContainer>
    );
};

export default ProfileForm;
