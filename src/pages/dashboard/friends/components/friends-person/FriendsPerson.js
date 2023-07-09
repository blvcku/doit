import { useState } from 'react';
import {
    deleteFriend,
    requestFriend,
    deleteRequest,
    declineInvite,
    acceptInvite,
} from '../../../../../services/friends';
import DefaultImage from '../../../../../assets/images/default.jpg';
import AcceptIcon from '../../../../../assets/icons/accept.svg';
import RequestIcon from '../../../../../assets/icons/request.svg';
import ApprovedIcon from '../../../../../assets/icons/approved.svg';
import DeleteIcon from '../../../../../assets/icons/delete.svg';
import useConfirmBox from '../../../../../contexts/confirm-box-context/useConfirmBox';
import useError from '../../../../../contexts/error-context/useError';
import {
    FriendContainer,
    SmallButton,
    ImageContainer,
    ApprovedButton,
    Button,
} from './FriendsPerson.styles';

const Person = ({
    uid,
    photoURL = DefaultImage,
    displayName,
    status,
    innerRef,
}) => {
    const { setConfirmInfo } = useConfirmBox();
    const { dispatchError } = useError();
    const [loading, setLoading] = useState(false);

    const handleDeleteFriend = (e) => {
        e.preventDefault();
        if (loading) return;
        dispatchError({ type: 'reset' });
        setConfirmInfo({
            message: `delete ${displayName} from your friend list`,
            action: async () => {
                try {
                    setLoading(true);
                    await deleteFriend(uid);
                } catch (error) {
                    dispatchError({ type: 'friends/delete' });
                }
                setLoading(false);
            },
        });
    };

    const handleRequestFriend = async (e) => {
        e.preventDefault();
        if (loading) return;
        dispatchError({ type: 'reset' });
        try {
            setLoading(true);
            await requestFriend(uid);
        } catch (error) {
            dispatchError({ type: 'friends/request' });
        }
        setLoading(false);
    };

    const handleDeleteRequest = async (e) => {
        e.preventDefault();
        if (loading) return;
        dispatchError({ type: 'reset' });
        try {
            setLoading(true);
            await deleteRequest(uid);
        } catch (error) {
            dispatchError({ type: 'friends/request-delete' });
        }
        setLoading(false);
    };

    const handleDeclineInvite = async (e) => {
        e.preventDefault();
        if (loading) return;
        dispatchError({ type: 'reset' });
        try {
            setLoading(true);
            await declineInvite(uid);
        } catch (error) {
            dispatchError({ type: 'friends/invite-decline' });
        }
        setLoading(false);
    };

    const handleAcceptInvite = async (e) => {
        e.preventDefault();
        if (loading) return;
        dispatchError({ type: 'reset' });
        try {
            setLoading(true);
            await acceptInvite(uid);
        } catch (error) {
            dispatchError({ type: 'friends/accept' });
        }
        setLoading(false);
    };

    return (
        <FriendContainer ref={innerRef ? innerRef : null}>
            <figure>
                <ImageContainer>
                    <img src={photoURL} alt={displayName} />
                </ImageContainer>
                <figcaption>{displayName}</figcaption>
            </figure>
            <div>
                {{
                    friend: (
                        <>
                            <ApprovedButton disabled={loading} type="button">
                                <img src={ApprovedIcon} alt="" />
                                Approved
                            </ApprovedButton>
                            <SmallButton
                                disabled={loading}
                                onClick={handleDeleteFriend}
                                type="button"
                            >
                                <img src={DeleteIcon} alt="Delete friend" />
                            </SmallButton>
                        </>
                    ),
                    invite: (
                        <>
                            <Button
                                disabled={loading}
                                onClick={handleAcceptInvite}
                                type="button"
                            >
                                <img src={AcceptIcon} alt="" />
                                Accept
                            </Button>
                            <SmallButton
                                disabled={loading}
                                onClick={handleDeclineInvite}
                                type="button"
                            >
                                <img src={DeleteIcon} alt="Decline invite" />
                            </SmallButton>
                        </>
                    ),
                    request: (
                        <>
                            <Button
                                disabled={loading}
                                style={{
                                    cursor: 'auto',
                                    background: '#8C8C8C',
                                    padding: '0px 23px',
                                }}
                                type="button"
                            >
                                Request Sent
                            </Button>
                            <SmallButton
                                disabled={loading}
                                onClick={handleDeleteRequest}
                                type="button"
                            >
                                <img src={DeleteIcon} alt="Delete request" />
                            </SmallButton>
                        </>
                    ),
                }[status] || (
                    <>
                        <Button
                            disabled={loading}
                            style={{ gap: '6px' }}
                            onClick={handleRequestFriend}
                            type="button"
                        >
                            <img src={RequestIcon} alt="" />
                            Request Friend
                        </Button>
                    </>
                )}
            </div>
        </FriendContainer>
    );
};

export default Person;
