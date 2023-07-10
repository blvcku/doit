import Member from '../../components/member/Member';

const Person = ({
    isAdded,
    displayName,
    uid,
    photoURL,
    deleteFromForm,
    addToForm,
}) => {
    return (
        <Member
            uid={uid}
            displayName={displayName}
            photoURL={photoURL}
            buttonType={isAdded ? 'delete' : 'add'}
            buttonClickHandler={(e) =>
                isAdded ? deleteFromForm(e, uid) : addToForm(e, uid)
            }
        />
    );
};

export default Person;
