import { db, fb } from '../../../../../services/firebase';
import useError from '../../../../../contexts/error-context/useError';
import useConfirmBox from '../../../../../contexts/confirm-box-context/useConfirmBox';
import Member from '../../../components/member/Member';

const ProjectMember = ({
    isOwner,
    status,
    uid,
    photoURL,
    displayName,
    projectID,
}) => {
    const { dispatchError } = useError();
    const { setConfirmInfo } = useConfirmBox();

    const handleDeleteMember = (e) => {
        setConfirmInfo({
            message: `delete ${displayName} from your project`,
            action: deleteMember,
        });
    };

    const deleteMember = async () => {
        try {
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
    };

    const handleInvite = async () => {
        try {
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
    };

    const handleDeleteInvite = async () => {
        try {
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
    };

    const memberData = { photoURL, displayName, uid }

    return (
        <>
            {
                {
                    member: (
                        <Member {...memberData} buttonType={isOwner ? 'delete' : null} buttonClickHandler={handleDeleteMember}/>
                    ),
                    friend: (
                        <Member {...memberData} buttonType={isOwner ? 'add' : null} buttonClickHandler={handleInvite}/>
                    ),
                    invited: (
                        <Member {...memberData} buttonType={isOwner ? 'delete' : null} buttonClickHandler={handleDeleteInvite}/>
                    ),
                    owner: <Member {...memberData} buttonType={null} />,
                }[status]
            }
        </>
    );
};

export default ProjectMember;
