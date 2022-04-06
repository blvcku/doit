import PlusIcon from '../../../../images/plus.svg';
import MinusIcon from '../../../../images/minus.svg';
import useUserProfile from '../../../../hooks/useUserProfile';
import { MemberContainer, MemberButton } from '../../../projects/project/membersList/Members.styles';

const Person = ({isAdded, displayName, uid, photoURL, deleteFromForm, addToForm}) => {

    const { setUserID } = useUserProfile();

    const openUserProfile = e => {
        e.preventDefault();
        setUserID(uid);
    }

    return(
        <MemberContainer>
            <div>
                <img onClick={openUserProfile} style={{cursor: 'pointer'}} src={photoURL} alt={displayName} />
                <p>{displayName}</p>
            </div>
            {isAdded ? (
                <MemberButton onClick={e => deleteFromForm(e, uid)} type='button'>
                    <img src={MinusIcon} alt='Delete' />
                </MemberButton>
            ) : (
                <MemberButton onClick={e => addToForm(e, uid)} type='button'>
                    <img src={PlusIcon} alt='Add' />
                </MemberButton>
            )}
        </MemberContainer>
    )
}

export default Person;