import React, { useState, useEffect } from 'react';
import { functions } from '../../../../../services/firebase';
import CloseIcon from '../../../../../assets/icons/close-grey.svg';
import PeopleAssignedIcon from '../../../../../assets/icons/people-assigned.svg';
import { useHistory } from 'react-router-dom';
import useAuth from '../../../../../contexts/auth-context/useAuth';
import {
    ProjectMembersListContainer,
    ProjectMembersListCloseButton,
    ProjectMembersListCloseButtonIcon,
    ProjectMembersListHeading,
    ProjectMembersListIcon,
    ProjectMembersListWrapper,
    ProjectMembersListGroup,
    ProjectMembersListGroupHeading,
    ProjectMembersListOverflowContainer,
    ProjectMembersListGroupHeadingSmall,
    ProjectMembersListList,
} from './ProjectMembersList.styles';
import Loader from '../../../../../components/loading/Loader';
import ProjectMember from '../project-member/ProjectMember';

const ProjectMembersList = ({ membersIDs, isOwner, authorID, invites, projectID }) => {
    const [members, setMembers] = useState([]);
    const [friendsData, setFriendsData] = useState([]);
    const [loadingMembers, setLoadingMembers] = useState(true);
    const [loadingFriends, setLoadingFriends] = useState(true);
    const history = useHistory();
    const { currentUserData: { friends = [] } = {} } = useAuth();

    useEffect(() => {
        const getUsersData = functions.httpsCallable('getUsersData');
        const getData = async () => {
            try {
                const { data } = await getUsersData({ uids: membersIDs });
                setMembers(data);
                setLoadingMembers(false);
            } catch (error) {
                console.error(error);
                setLoadingMembers(false);
            }
        };
        if (membersIDs) getData();
    }, [membersIDs]);

    useEffect(() => {
        const getUsersData = functions.httpsCallable('getUsersData');
        const getData = async () => {
            try {
                const { data } = await getUsersData({ uids: friends });
                setFriendsData(data);
                setLoadingFriends(false);
            } catch (error) {
                console.error(error);
                setLoadingFriends(false);
            }
        };
        if (isOwner && friends) getData();
        else setLoadingFriends(false);
    }, [friends, isOwner]);

    const handleClose = (e) => {
        e.preventDefault();
        history.push(`/dashboard/projects/${projectID}`);
    };

    return (
        <ProjectMembersListContainer>
            {(loadingMembers || loadingFriends) && <Loader />}
            <ProjectMembersListCloseButton onClick={handleClose} type="button">
                <ProjectMembersListCloseButtonIcon src={CloseIcon} alt="Close members list window" />
            </ProjectMembersListCloseButton>
            <ProjectMembersListIcon src={PeopleAssignedIcon} alt="" />
            <ProjectMembersListHeading>People Assigned</ProjectMembersListHeading>
            <ProjectMembersListWrapper isOwner={isOwner}>
                <ProjectMembersListGroup>
                    <ProjectMembersListGroupHeading>Participants</ProjectMembersListGroupHeading>
                    <ProjectMembersListOverflowContainer isOwner={isOwner}>
                        <ProjectMembersListGroupHeadingSmall>Owner</ProjectMembersListGroupHeadingSmall>
                        <ProjectMembersListList>
                            {members.map(({ photoURL, displayName, uid }) => {
                                if (uid !== authorID) return null;
                                return (
                                    <ProjectMember
                                        projectID={projectID}
                                        isOwner={isOwner}
                                        key={uid}
                                        photoURL={photoURL}
                                        displayName={displayName}
                                        uid={uid}
                                        status="owner"
                                    />
                                );
                            })}
                        </ProjectMembersListList>
                        <ProjectMembersListGroupHeadingSmall as='h5'>Members</ProjectMembersListGroupHeadingSmall>
                        <ProjectMembersListList emptyInformation="No members">
                            {members.map(({ photoURL, displayName, uid }) => {
                                if (uid === authorID) return null;
                                return (
                                    <ProjectMember
                                        projectID={projectID}
                                        isOwner={isOwner}
                                        key={uid}
                                        photoURL={photoURL}
                                        displayName={displayName}
                                        uid={uid}
                                        status="member"
                                    />
                                );
                            })}
                        </ProjectMembersListList>
                    </ProjectMembersListOverflowContainer>
                </ProjectMembersListGroup>
                {isOwner ? (
                    <ProjectMembersListGroup>
                        <ProjectMembersListGroupHeading>Add to project</ProjectMembersListGroupHeading>
                        <ProjectMembersListOverflowContainer isOwner={isOwner}>
                            <ProjectMembersListGroupHeadingSmall>Friends</ProjectMembersListGroupHeadingSmall>
                            <ProjectMembersListList emptyInformation="No friends">
                                {friendsData.map(
                                    ({ photoURL, displayName, uid }) => {
                                        if (membersIDs.includes(uid))
                                            return null;
                                        if (invites.includes(uid))
                                            return (
                                                <ProjectMember
                                                    isOwner={isOwner}
                                                    projectID={projectID}
                                                    key={uid}
                                                    photoURL={photoURL}
                                                    displayName={displayName}
                                                    uid={uid}
                                                    status="invited"
                                                />
                                            );
                                        return (
                                            <ProjectMember
                                                projectID={projectID}
                                                isOwner={isOwner}
                                                key={uid}
                                                photoURL={photoURL}
                                                displayName={displayName}
                                                uid={uid}
                                                status="friend"
                                            />
                                        );
                                    },
                                )}
                            </ProjectMembersListList>
                        </ProjectMembersListOverflowContainer>
                    </ProjectMembersListGroup>
                ) : null}
            </ProjectMembersListWrapper>
        </ProjectMembersListContainer>
    );
};

export default ProjectMembersList;
