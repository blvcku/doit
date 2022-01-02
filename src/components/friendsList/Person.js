import { useState } from "react";
import { functions } from "../../firebase";
import DefaultImage from './default.jpg';
import AcceptIcon from './accept.svg';
import RequestIcon from './request.svg';

import useConfirmBox from "../../hooks/useConfirmBox";
import useError from '../../hooks/useError';

import { FriendContainer, SmallButton, ImageContainer, ApprovedButton, Button } from "./Friends.styles";
import ApprovedIcon from './approved.svg';
import DeleteIcon from '../project/tasks/delete.svg';
import Loader from '../loading/Loader';

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
            dispatchError({type: 'reset'});
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
            dispatchError({type: 'reset'});
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
            dispatchError({type: 'reset'});
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
            dispatchError({type: 'reset'});
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
            dispatchError({type: 'reset'});
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
                                <ApprovedButton type='button'>
                                    <img src={ApprovedIcon} alt='approved' />
                                    Approved
                                </ApprovedButton>
                                <SmallButton onClick={handleDeleteFriend} type='button'>
                                    <img src={DeleteIcon} alt='Delete friend' />
                                </SmallButton>
                            </>,
                        'invite':
                            <>
                                <Button onClick={handleAcceptInvite} type='button'>
                                    <img src={AcceptIcon} alt='accept' />
                                    Accept
                                </Button>
                                <SmallButton onClick={handleDeclineInvite} type='button'>
                                    <img src={DeleteIcon} alt='Decline' />
                                </SmallButton>
                            </>,
                        'request':
                            <>
                                <Button style={{cursor: 'auto',background: '#8C8C8C', padding: '0px 23px'}} type='button'>
                                    Request Sent
                                </Button>
                                <SmallButton onClick={handleDeleteRequest} type='button'>
                                    <img src={DeleteIcon} alt='Delete request' />
                                </SmallButton>
                            </>
                    }[status] ||
                            <>
                                <Button style={{gap: '6px'}} onClick={handleRequestFriend} type='button'>
                                    <img src={RequestIcon} alt='request' />
                                    Request Friend
                                </Button>
                            </>
                }
            </div>
            {loading && <Loader />}
        </FriendContainer>
    )
}

export default Person;