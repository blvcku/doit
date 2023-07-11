import { ProfileFormInputElement, ProfileFormLabel } from './ProfileFormInput.styles';

const ProfileFormInput = ({ name, label, ...inputProps }) => {
    return (
        <>
            <ProfileFormLabel htmlFor={name}>{label}</ProfileFormLabel>
            <ProfileFormInputElement name={name} id={name} {...inputProps} />
        </>
    );
};

export default ProfileFormInput;