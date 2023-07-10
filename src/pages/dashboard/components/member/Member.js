import { useState } from 'react';
import {
    MemberContainer,
    MemberInformationsContainer,
    MemberProfileImage,
    MemberProfileName,
    MemberButton,
    MemberButtonIcon,
} from './Member.styles';
import PlusIcon from '../../../../assets/icons/plus-green.svg';
import MinusIcon from '../../../../assets/icons/minus.svg';
import useUserProfile from '../../contexts/user-profile-context/useUserProfile';

const Member = ({
    uid,
    buttonClickHandler,
    photoURL,
    displayName,
    buttonType,
}) => {
    const [loading, setLoading] = useState(false);
    const { setUserID } = useUserProfile();

    const openUserProfile = (e) => {
        e.preventDefault();
        setUserID(uid);
    };

    const handleButtonClick = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        await buttonClickHandler(e);
        setLoading(false);
    };

    return (
        <MemberContainer>
            <MemberInformationsContainer>
                <MemberProfileImage
                    onClick={openUserProfile}
                    src={photoURL}
                    alt={displayName}
                />
                <MemberProfileName>{displayName}</MemberProfileName>
            </MemberInformationsContainer>
            {buttonType ? (
                buttonType === 'add' ? (
                    <MemberButton
                        disabled={loading}
                        onClick={handleButtonClick}
                        type="button"
                    >
                        <MemberButtonIcon src={PlusIcon} alt="Add" />
                    </MemberButton>
                ) : (
                    <MemberButton
                        disabled={loading}
                        onClick={handleButtonClick}
                        type="button"
                    >
                        <MemberButtonIcon src={MinusIcon} alt="Delete" />
                    </MemberButton>
                )
            ) : null}
        </MemberContainer>
    );
};

export default Member;
