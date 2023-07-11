import { ProfileButtonContainer } from "./ProfileButton.styles";

const ProfileButton = ({children, ...buttonProps}) => {
    return(
        <ProfileButtonContainer {...buttonProps}>
            {children}
        </ProfileButtonContainer>
    )
}

export default ProfileButton;