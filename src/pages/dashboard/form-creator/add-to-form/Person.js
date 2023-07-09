import PlusIcon from '../../../../assets/icons/plus-green.svg';
import MinusIcon from '../../../../assets/icons/minus.svg';
import useUserProfile from '../../contexts/user-profile-context/useUserProfile';
import {
    MemberContainer,
    MemberButton,
} from '../../projects/project/members-list/Members.styles';

const Person = ({
    isAdded,
    displayName,
    uid,
    photoURL,
    deleteFromForm,
    addToForm,
}) => {
    const { setUserID } = useUserProfile();

    const openUserProfile = (e) => {
        e.preventDefault();
        setUserID(uid);
    };

    return (
        <MemberContainer>
            <div>
                <img
                    onClick={openUserProfile}
                    style={{ cursor: 'pointer' }}
                    src={photoURL}
                    alt={displayName}
                />
                <p>{displayName}</p>
            </div>
            {isAdded ? (
                <MemberButton
                    onClick={(e) => deleteFromForm(e, uid)}
                    type="button"
                >
                    <img src={MinusIcon} alt="Delete from form" />
                </MemberButton>
            ) : (
                <MemberButton onClick={(e) => addToForm(e, uid)} type="button">
                    <img src={PlusIcon} alt="Add to form" />
                </MemberButton>
            )}
        </MemberContainer>
    );
};

export default Person;
