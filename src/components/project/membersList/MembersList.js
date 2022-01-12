import React, { useState, useEffect } from "react";
import { functions } from "../../../firebase";
import XIcon from '../../../images/x.svg';
import AssignedIcon from '../../../images/project/peopleassigned.svg';
import { useHistory } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";

import { MembersContainer, CloseButton, MembersWrapper, MembersGroup, List, OverflowContainer } from "./Members.styles";
import Loader from '../../loading/Loader';
import Member from './Member';

const MembersList = ({membersIDs, isOwner, authorID, invites, projectID}) => {
    
    const [members, setMembers] = useState([]);
    const [friendsData, setFriendsData] = useState([]);
    const [loadingMembers, setLoadingMembers] = useState(true);
    const [loadingFriends, setLoadingFriends] = useState(true);
    const history = useHistory();
    const { currentUserData: {friends} } = useAuth();

    useEffect(() => {
        const getUsersData = functions.httpsCallable('getUsersData');
        const getData = async () => {
            try{
                const { data } = await getUsersData({uids: membersIDs});
                setMembers(data);
                setLoadingMembers(false);
            }
            catch(error){
                console.error(error);
                setLoadingMembers(false);
            }
        }
        if(membersIDs) getData();
    }, [membersIDs])

    useEffect(() => {
        const getUsersData = functions.httpsCallable('getUsersData');
        const getData = async () => {
            try{
                const { data } = await getUsersData({uids: friends});
                setFriendsData(data);
                setLoadingFriends(false);
            }
            catch(error){
                console.error(error);
                setLoadingFriends(false);
            }
        }
        if(isOwner && friends) getData();
        else setLoadingFriends(false);
    }, [friends, isOwner])

    const handleClose = e => {
        e.preventDefault();
        history.goBack();
    }

    return(
        <MembersContainer>
            {(loadingMembers || loadingFriends) && <Loader />}
            <CloseButton onClick={handleClose} type='button'>
                <img src={XIcon} alt='Close' />
            </CloseButton>
            <img src={AssignedIcon} alt='People assigned' />
            <h1>People Assigned</h1>
            <MembersWrapper isOwner={isOwner}>
                <MembersGroup>
                    <h2>Participants</h2>
                    <OverflowContainer isOwner={isOwner}>
                        <h3>Owner</h3>
                        <List>
                            {members.map(({photoURL, displayName, uid}) => {
                                if(uid !== authorID) return null;
                                return <Member projectID={projectID} isOwner={isOwner} key={uid} photoURL={photoURL} displayName={displayName} uid={uid} status='owner' />
                            })}
                        </List>
                        <h4>Members</h4>
                        <List emptyInformation='No members' >
                            {members.map(({photoURL, displayName, uid}) => {
                                if(uid === authorID) return null;
                                return <Member projectID={projectID} isOwner={isOwner} key={uid} photoURL={photoURL} displayName={displayName} uid={uid} status='member' />
                            })}
                        </List>
                    </OverflowContainer>
                </MembersGroup>
                {isOwner ? (
                    <MembersGroup>
                        <h2>Add to project</h2>
                        <OverflowContainer isOwner={isOwner}>
                            <h3>Friends</h3>
                            <List emptyInformation='No friends'>
                                {friendsData.map(({photoURL, displayName, uid}) => {
                                    if(membersIDs.includes(uid)) return null;
                                    if(invites.includes(uid)) return <Member isOwner={isOwner} projectID={projectID} key={uid} photoURL={photoURL} displayName={displayName} uid={uid} status='invited' />
                                    return <Member projectID={projectID} isOwner={isOwner} key={uid} photoURL={photoURL} displayName={displayName} uid={uid} status='friend' />
                                })}
                            </List>
                        </OverflowContainer>
                    </MembersGroup>
                ) : null}
            </MembersWrapper>
        </MembersContainer>
    )
}

export default MembersList;