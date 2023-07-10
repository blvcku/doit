import DefaultImage from '../../../../../assets/images/default-project.jpg';
import { functions } from '../../../../../services/firebase';
import { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import useError from '../../../../../contexts/error-context/useError';
import {
    ProjectsListInviteButton,
    ProjectsListInviteButtonsContainer,
    ProjectsListInviteContainer,
    ProjectsListInviteTitle,
    ProjectsListInviteWrapper,
} from './ProjectsListInvite.styles';

const ProjectsListInvite = ({
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
        <ProjectsListInviteWrapper background={photoURL || DefaultImage}>
            <ProjectsListInviteContainer>
                <ProjectsListInviteTitle>{title}</ProjectsListInviteTitle>
                <ProjectsListInviteButtonsContainer>
                    <ProjectsListInviteButton
                        loading={loading}
                        onClick={handleDeclineInvite}
                        type="button"
                    >
                        Decline
                    </ProjectsListInviteButton>
                    <ProjectsListInviteButton
                        loading={loading}
                        onClick={handleAcceptInvite}
                        type="button"
                    >
                        Accept
                    </ProjectsListInviteButton>
                </ProjectsListInviteButtonsContainer>
            </ProjectsListInviteContainer>
        </ProjectsListInviteWrapper>
    );
};

export default ProjectsListInvite;
