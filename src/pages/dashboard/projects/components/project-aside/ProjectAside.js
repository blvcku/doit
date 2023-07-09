import { useState, useEffect } from 'react';
import { functions } from '../../../../../services/firebase';
import CalendarIcon from '../../../../../assets/icons/calendar.svg';
import PeopleAssignedIcon from '../../../../../assets/icons/people-assigned-white.svg';
import ChatIcon from '../../../../../assets/icons/chat.svg';
import { useHistory, Link } from 'react-router-dom';
import useConfirmBox from '../../../../../contexts/confirm-box-context/useConfirmBox';
import useError from '../../../../../contexts/error-context/useError';
import {
    ProjectAsideContainer,
    ProjectAsideDateContainer,
    ProjectAsideButtonsContainer,
    ProjectAsideDateIcon,
    ProjectAsideDateHeading,
    ProjectAsideDateInput,
    ProjectAsideDate,
    ProjectAsideButton,
    ProjectAsideButtonIcon,
    ProjectAsideButtonRed,
} from './ProjectAside.styles';

const ProjectAside = ({ isEditing, isOwner, date, id }) => {
    const history = useHistory();
    const { dispatchError } = useError();
    const [minDate, setMinDate] = useState('');
    const [formatedDate, setFormatedDate] = useState();
    const { setConfirmInfo } = useConfirmBox();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const today = new Date();
        setMinDate(
            `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        );
    }, []);

    useEffect(() => {
        if (date) {
            setFormatedDate(
                new Date(date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                }),
            );
        }
    }, [date]);

    const handleDeleteProject = (e) => {
        e.preventDefault();
        setConfirmInfo({
            message: 'delete this project',
            action: deleteProject,
        });
    };

    const deleteProject = async () => {
        try {
            setLoading(true);
            const deleteProjectFunction =
                functions.httpsCallable('deleteProject');
            dispatchError({ type: 'reset' });
            await deleteProjectFunction({ id: id });
            return history.push('/dashboard');
        } catch (error) {
            dispatchError({ type: 'projects/delete' });
        }
        setLoading(false);
    };

    const handleLeaveProject = (e) => {
        e.preventDefault();
        setConfirmInfo({ message: 'leave this project', action: leaveProject });
    };

    const leaveProject = async () => {
        try {
            setLoading(true);
            const leaveProjectFunction =
                functions.httpsCallable('leaveProject');
            dispatchError({ type: 'reset' });
            await leaveProjectFunction({ projectID: id });
            return history.push('/dashboard');
        } catch (error) {
            dispatchError({ type: 'projects/leave' });
        }
        setLoading(false);
    };

    return (
        <ProjectAsideContainer>
            <ProjectAsideDateContainer>
                <ProjectAsideDateIcon src={CalendarIcon} alt="" />
                <ProjectAsideDateHeading>Due:</ProjectAsideDateHeading>
                {isEditing ? (
                    <ProjectAsideDateInput
                        form="main-form"
                        defaultValue={date}
                        name="date"
                        min={minDate}
                        aria-label="Due date"
                        type="date"
                    />
                ) : (
                    <ProjectAsideDate>
                        {formatedDate ? formatedDate : 'Not set'}
                    </ProjectAsideDate>
                )}
            </ProjectAsideDateContainer>
            <ProjectAsideButtonsContainer>
                {isOwner ? (
                    <ProjectAsideButtonRed
                        disabled={loading}
                        onClick={handleDeleteProject}
                        type="button"
                        aria-label="Delete project"
                    >
                        Delete Project
                    </ProjectAsideButtonRed>
                ) : (
                    <ProjectAsideButtonRed
                        disabled={loading}
                        onClick={handleLeaveProject}
                        type="button"
                        aria-label="Delete project"
                    >
                        Leave Project
                    </ProjectAsideButtonRed>
                )}
                <ProjectAsideButton
                    as={Link}
                    to={`/dashboard/projects/${id}/members`}
                >
                    <ProjectAsideButtonIcon src={PeopleAssignedIcon} alt="" />
                    People Assigned
                </ProjectAsideButton>
                <ProjectAsideButton
                    as={Link}
                    to={`/dashboard/projects/${id}/chat`}
                >
                    <ProjectAsideButtonIcon src={ChatIcon} alt="" />
                    Chat
                </ProjectAsideButton>
            </ProjectAsideButtonsContainer>
        </ProjectAsideContainer>
    );
};

export default ProjectAside;
