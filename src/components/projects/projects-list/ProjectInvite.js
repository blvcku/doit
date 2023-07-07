import DefaultImage from '../../../assets/images/default-project.jpg';
import { functions } from '../../../firebase';
import { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import useError from '../../../hooks/useError';
import { ProjectInviteContainer } from './ProjectsList.styles';

const ProjectInvite = ({
    title,
    id,
    index,
    photoURL,
    projectInvites,
    setProjectInvites,
}) => {
    const { dispatchError } = useError();
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { path } = useRouteMatch();

    const handleAcceptInvite = async (e) => {
        e.preventDefault();
        if (loading) return;
        dispatchError({ type: 'reset' });
        setLoading(true);
        try {
            const acceptProjectInvitation = functions.httpsCallable(
                'acceptProjectInvitation',
            );
            await acceptProjectInvitation({ projectID: id });
            return history.push(`${path}/${id}`);
        } catch (error) {
            dispatchError({ type: 'projects/accept-invite' });
            setLoading(false);
        }
    };

    const handleDeclineInvite = async (e) => {
        e.preventDefault();
        if (loading) return;
        dispatchError({ type: 'reset' });
        setLoading(true);
        try {
            const declineProjectInvitation = functions.httpsCallable(
                'declineProjectInvitation',
            );
            await declineProjectInvitation({ projectID: id });
            const tempInvites = [...projectInvites];
            tempInvites.splice(index, 1);
            setProjectInvites(tempInvites);
        } catch (error) {
            dispatchError({ type: 'projects/decline-invite' });
            setLoading(false);
        }
    };

    return (
        <ProjectInviteContainer
            loading={loading}
            background={photoURL || DefaultImage}
        >
            <div>
                <p>{title}</p>
                <div>
                    <button onClick={handleDeclineInvite} type="button">
                        Decline
                    </button>
                    <button onClick={handleAcceptInvite} type="button">
                        Accept
                    </button>
                </div>
            </div>
        </ProjectInviteContainer>
    );
};

export default ProjectInvite;
