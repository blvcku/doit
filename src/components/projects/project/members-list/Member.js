import { useState } from 'react';
import { db, fb } from '../../../../firebase';
import PlusIcon from '../../../../assets/icons/plus-green.svg';
import MinusIcon from '../../../../assets/icons/minus.svg';
import useError from '../../../../hooks/useError';
import useConfirmBox from '../../../../hooks/useConfirmBox';
import useUserProfile from '../../../../hooks/useUserProfile';
import { MemberContainer, MemberButton } from './Members.styles';

const Member = ({ status, uid, photoURL, displayName, isOwner, projectID }) => {
    const [loading, setLoading] = useState(false);
    const { dispatchError } = useError();
    const { setConfirmInfo } = useConfirmBox();
    const { setUserID } = useUserProfile();

    const openUserProfile = (e) => {
        e.preventDefault();
        setUserID(uid);
    };

    const handleDeleteMember = (e) => {
        e.preventDefault();
        if (!isOwner) return;
        if (loading) return;
        setConfirmInfo({
            message: `delete ${displayName} from your project`,
            action: deleteMember,
        });
    };

    const deleteMember = async () => {
        if (!isOwner) return;
        if (loading) return;
        try {
            setLoading(true);
            dispatchError({ type: 'reset' });
            await db
                .collection('projects')
                .doc(projectID)
                .update({
                    members: fb.firestore.FieldValue.arrayRemove(uid),
                });
        } catch (error) {
            dispatchError({ type: 'projects/delete-member' });
        }
        setLoading(false);
    };

    const handleInvite = async (e) => {
        e.preventDefault();
        if (!isOwner) return;
        if (loading) return;
        try {
            setLoading(true);
            dispatchError({ type: 'reset' });
            await db
                .collection('projects')
                .doc(projectID)
                .update({
                    invites: fb.firestore.FieldValue.arrayUnion(uid),
                });
        } catch (error) {
            dispatchError({ type: 'projects/invite' });
        }
        setLoading(false);
    };

    const handleDeleteInvite = async (e) => {
        e.preventDefault();
        if (!isOwner) return;
        if (loading) return;
        try {
            setLoading(true);
            dispatchError({ type: 'reset' });
            await db
                .collection('projects')
                .doc(projectID)
                .update({
                    invites: fb.firestore.FieldValue.arrayRemove(uid),
                });
        } catch (error) {
            dispatchError({ type: 'projects/delete-invite' });
        }
        setLoading(false);
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
            {isOwner &&
                {
                    member: (
                        <MemberButton
                            disabled={loading}
                            onClick={handleDeleteMember}
                            type="button"
                        >
                            <img
                                src={MinusIcon}
                                alt="Delete member from project"
                            />
                        </MemberButton>
                    ),
                    friend: (
                        <MemberButton
                            disabled={loading}
                            onClick={handleInvite}
                            type="button"
                        >
                            <img src={PlusIcon} alt="Send invite to project" />
                        </MemberButton>
                    ),
                    invited: (
                        <MemberButton
                            disabled={loading}
                            onClick={handleDeleteInvite}
                            type="button"
                        >
                            <img
                                src={MinusIcon}
                                alt="Cancel invite to project"
                            />
                        </MemberButton>
                    ),
                    owner: null,
                }[status]}
        </MemberContainer>
    );
};

export default Member;
