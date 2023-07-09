import { useState } from 'react';
import {
    deleteFriend,
    requestFriend,
    deleteRequest,
    declineInvite,
    acceptInvite,
} from '../../../../services/friends';
import AcceptIcon from '../../../../assets/icons/accept.svg';
import RequestIcon from '../../../../assets/icons/request.svg';
import ApprovedIcon from '../../../../assets/icons/approved.svg';
import DeleteIcon from '../../../../assets/icons/delete.svg';
import EditIcon from '../../../../assets/icons/edit-white.svg';
import { useHistory } from 'react-router-dom';
import useConfirmBox from '../../../../contexts/confirm-box-context/useConfirmBox';
import useError from '../../../../contexts/error-context/useError';
import {
    ButtonWrapper,
    ApprovedButton,
    SmallButton,
    Button,
} from './UserProfile.styles';

const UserProfileButton = ({ setUserID, status, uid, displayName }) => {
    const history = useHistory();
    const { setConfirmInfo } = useConfirmBox();
    const { dispatchError } = useError();
    const [loading, setLoading] = useState(false);

    const handleEditProfile = (e) => {
        e.preventDefault();
        history.push('/dashboard/profile');
        setUserID('');
    };

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
        <ButtonWrapper>
            {{
                you: (
                    <>
                        <Button
                            onClick={handleEditProfile}
                            style={{ gap: '6px' }}
                            type="button"
                        >
                            <img src={EditIcon} alt="" />
                            Edit Profile
                        </Button>
                    </>
                ),
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
                            <img src={DeleteIcon} alt="Delete friend request" />
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
        </ButtonWrapper>
    );
};

export default UserProfileButton;
