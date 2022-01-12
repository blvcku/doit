import { useState } from "react";
import { functions } from "../../firebase";
import DefaultImage from '../../images/default.jpg';
import AcceptIcon from '../../images/friends/accept.svg';
import RequestIcon from '../../images/friends/request.svg';
import ApprovedIcon from '../../images/friends/approved.svg';
import DeleteIcon from '../../images/delete.svg';

import useConfirmBox from "../../hooks/useConfirmBox";
import useError from '../../hooks/useError';

import { FriendContainer, SmallButton, ImageContainer, ApprovedButton, Button } from "./Friends.styles";

const Person = ({uid, photoURL = DefaultImage, displayName, status, innerRef}) => {

    const { setConfirmInfo } = useConfirmBox();
    const { dispatchError } = useError();
    const [loading, setLoading] = useState(false);

    const handleDeleteFriend = e => {
        if(loading) return;
        e.preventDefault();
        setConfirmInfo({message: `delete ${displayName} from your friend list`, action: deleteFriend});
    }

    const deleteFriend = async () => {
        if(loading) return;
        try{
            setLoading(true);
            dispatchError({type: 'reset'});
            const deleteFunction = functions.httpsCallable('deleteFriend');
            await deleteFunction({friend: uid})
        }
        catch(error){
            dispatchError({type: 'friends/delete'});
        }
        setLoading(false);
    }

    const handleRequestFriend = async e => {
        e.preventDefault();
        if(loading) return;
        try{
            setLoading(true);
            dispatchError({type: 'reset'});
            const requestFriend = functions.httpsCallable('requestFriend');
            await requestFriend({requestedFriend: uid});
        }
        catch(error){
            dispatchError({type: 'friends/request'});
        }
        setLoading(false);
    }

    const handleDeleteRequest = async e => {
        e.preventDefault();
        if(loading) return;
        try{
            setLoading(true);
            dispatchError({type: 'reset'});
            const deleteRequest = functions.httpsCallable('deleteRequest');
            await deleteRequest({requestedFriend: uid});
        }
        catch(error){
            dispatchError({type: 'friends/request-delete'});
        }
        setLoading(false);
    }

    const handleDeclineInvite = async e => {
        e.preventDefault();
        if(loading) return;
        try{
            setLoading(true);
            dispatchError({type: 'reset'});
            const declineInvite = functions.httpsCallable('declineInvite');
            await declineInvite({invite: uid});
        }
        catch(error){
            dispatchError({type: 'friends/invite-decline'});
        }
        setLoading(false);
    }

    const handleAcceptInvite = async e => {
        e.preventDefault();
        if(loading) return;
        try{
            setLoading(true);
            dispatchError({type: 'reset'});
            const acceptInvite = functions.httpsCallable('acceptInvite');
            await acceptInvite({invite: uid});
        }
        catch(error){
            dispatchError({type: 'friends/accept'});
        }
        setLoading(false);
    }

    return(
        <FriendContainer ref={innerRef ? innerRef : null}>
            <figure>
                <ImageContainer>
                    <img src={photoURL} alt={displayName} />
                </ImageContainer>
                <figcaption>{displayName}</figcaption>
            </figure>
            <div>
                {
                    {
                        'friend':
                            <>
                                <ApprovedButton disabled={loading} type='button'>
                                    <img src={ApprovedIcon} alt='approved' />
                                    Approved
                                </ApprovedButton>
                                <SmallButton disabled={loading} onClick={handleDeleteFriend} type='button'>
                                    <img src={DeleteIcon} alt='Delete friend' />
                                </SmallButton>
                            </>,
                        'invite':
                            <>
                                <Button disabled={loading} onClick={handleAcceptInvite} type='button'>
                                    <img src={AcceptIcon} alt='accept' />
                                    Accept
                                </Button>
                                <SmallButton disabled={loading} onClick={handleDeclineInvite} type='button'>
                                    <img src={DeleteIcon} alt='Decline' />
                                </SmallButton>
                            </>,
                        'request':
                            <>
                                <Button disabled={loading} style={{cursor: 'auto',background: '#8C8C8C', padding: '0px 23px'}} type='button'>
                                    Request Sent
                                </Button>
                                <SmallButton disabled={loading} onClick={handleDeleteRequest} type='button'>
                                    <img src={DeleteIcon} alt='Delete request' />
                                </SmallButton>
                            </>
                    }[status] ||
                            <>
                                <Button disabled={loading} style={{gap: '6px'}} onClick={handleRequestFriend} type='button'>
                                    <img src={RequestIcon} alt='request' />
                                    Request Friend
                                </Button>
                            </>
                }
            </div>
        </FriendContainer>
    )
}

export default Person;