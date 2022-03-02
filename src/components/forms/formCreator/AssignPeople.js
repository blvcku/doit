import { useState, useEffect } from 'react';
import { functions } from '../../../firebase';
import CloseIcon from '../../../images/formCreator/close.svg';
import PlusIcon from '../../../images/plus.svg';
import MinusIcon from '../../../images/minus.svg';
import { useHistory } from 'react-router-dom';

import useAuth from '../../../hooks/useAuth';

import { AssignPeopleContainer, CloseButton, StatusContainer, StatusButton, FriendsList } from "./FormCreator.styles";
import { MemberContainer, MemberButton } from '../../projects/project/membersList/Members.styles';

const AssignPeople = ({status, setForm, members}) => {

    const history = useHistory();
    const { currentUserData: {friends} } = useAuth();
    const [friendsData, setFriendsData] = useState([]);

    const handleClose = e => {
        e.preventDefault();
        history.goBack();
    }

    const setStatusToPublic = e => {
        e.preventDefault();
        setForm(prev => ({...prev, status: 'public'}));
    }

    const setStatusToPrivate = e => {
        e.preventDefault();
        setForm(prev => ({...prev, status: 'private'}));
    }

    const addToForm = (e, uid) => {
        e.preventDefault();
        const tempMembers = members;
        tempMembers.push(uid);
        setForm(prev => ({...prev, members: tempMembers}));
    }

    const deleteFromForm = (e, uid) => {
        e.preventDefault();
        const tempMembers = members;
        tempMembers.splice(tempMembers.indexOf(uid), 1);
        setForm(prev => ({...prev, members: tempMembers}));
    }

    useEffect(() => {
        const getData = async () => {
            try{
                const getUsersData = functions.httpsCallable('getUsersData');
                const { data } = await getUsersData({uids: friends});
                setFriendsData(data);
            }
            catch(error){
                console.error(error);
            }
        }
        if(status === 'private' && friends.length !== friendsData.length){
            getData();
        }
    }, [status, friends, friendsData]);

    return(
        <AssignPeopleContainer status={status}>
            <CloseButton type='button' onClick={handleClose} >
                <img src={CloseIcon} alt='Close' />
            </CloseButton>
            <h2>Add people</h2>
            <StatusContainer status={status} >
                <h3>Status</h3>
                <StatusButton onClick={setStatusToPublic} selected={status === 'public'} type='button'>
                    Public
                </StatusButton>
                <StatusButton onClick={setStatusToPrivate} selected={status === 'private'} type='button'>
                    Private
                </StatusButton>
            </StatusContainer>
            <FriendsList>
                {friendsData.map(({displayName, photoURL, uid}) => (
                    <MemberContainer key={uid}>
                        <div>
                            <img src={photoURL} alt={displayName} />
                            <p>{displayName}</p>
                        </div>
                        {members.includes(uid) ? (
                            <MemberButton onClick={e => deleteFromForm(e, uid)} type='button'>
                                <img src={MinusIcon} alt='Delete' />
                            </MemberButton>
                        ) : (
                            <MemberButton onClick={e => addToForm(e, uid)} type='button'>
                                <img src={PlusIcon} alt='Assign' />
                            </MemberButton>
                        )}
                    </MemberContainer>
                ))}
            </FriendsList>
        </AssignPeopleContainer>
    )
}

export default AssignPeople;