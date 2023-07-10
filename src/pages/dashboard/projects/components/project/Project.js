import React, { useState, useEffect, useRef } from 'react';
import {
    useParams,
    Route,
    Switch,
    useRouteMatch,
    Redirect,
} from 'react-router-dom';
import { db } from '../../../../../services/firebase';
import useAuth from '../../../../../contexts/auth-context/useAuth';
import useError from '../../../../../contexts/error-context/useError';
import useTitle from '../../../../../hooks/useTitle';
import {
    ProjectWrapper,
    ProjectContainer,
    ProjectForm,
    ProjectContentContainer,
} from './Project.styles';
import ProjectBanner from '../project-banner/ProjectBanner';
import ProjectAside from '../project-aside/ProjectAside';
import ProjectMembersList from '../project-members-list/ProjectMembersList';
import ProjectTasksList from '../project-tasks-list/ProjectTasksList';
import ProjectChat from '../project-chat/ProjectChat';

const Project = () => {
    const { id } = useParams();
    const { path } = useRouteMatch();
    const { currentUser } = useAuth();
    const { dispatchError } = useError();
    const { setTitle } = useTitle();
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const titleRef = useRef();

    useEffect(() => {
        const unsubscribe = db
            .collection('projects')
            .doc(id)
            .onSnapshot(
                (project) => {
                    setProject({ ...project.data(), id: project.id });
                    setLoading(false);
                },
                (error) => setLoading(false),
            );

        return unsubscribe;
    }, [id]);

    useEffect(() => {
        if (project.authorID === currentUser.uid) {
            setIsOwner(true);
        } else {
            setIsOwner(false);
        }
    }, [project, currentUser]);

    useEffect(() => {
        if (isEditing) {
            titleRef.current.focus();
        }
    }, [isEditing]);

    useEffect(() => {
        setTitle(project.title || 'DOIT');
    }, [project.title, setTitle]);

    const turnOnEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isOwner) return;
        setIsEditing(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isOwner) return;
        const form = e.target;
        const { value: title } = form.elements['title'];
        const { value: description } = form.elements['description'];
        const { value: date } = form.elements['date'];
        editProject(title, description, date);
    };

    const editProject = async (title, description, date) => {
        dispatchError({ type: 'reset' });
        if (title.trim().length === 0)
            return dispatchError({ type: 'projects/title-too-short' });
        if (description.trim().length === 0)
            return dispatchError({ type: 'projects/description-too-short' });
        try {
            await db.collection('projects').doc(id).update({
                title: title.trim(),
                description: description.trim(),
                date: date,
            });
        } catch (error) {
            dispatchError({ type: 'projects/edit' });
        }
        setIsEditing(false);
    };

    return (
        <>
            {!loading ? (
                project.title ? (
                    <ProjectWrapper>
                        <ProjectContainer>
                            {/* id is used for date element outside form */}
                            <ProjectForm
                                id="main-form"
                                noValidate
                                onSubmit={handleSubmit}
                            >
                                <ProjectBanner
                                    id={id}
                                    isOwner={isOwner}
                                    isEditing={isEditing}
                                    titleRef={titleRef}
                                    turnOnEdit={turnOnEdit}
                                    title={project.title}
                                    description={project.description}
                                    background={project.photoURL}
                                />
                            </ProjectForm>
                            <ProjectAside
                                id={id}
                                isEditing={isEditing}
                                isOwner={isOwner}
                                date={project.date}
                            />
                            <ProjectContentContainer>
                                <Switch>
                                    <Route
                                        exact
                                        path={`${path}/members`}
                                        render={() => (
                                            <ProjectMembersList
                                                authorID={project.authorID}
                                                isOwner={isOwner}
                                                membersIDs={project.members}
                                                invites={project.invites}
                                                projectID={id}
                                            />
                                        )}
                                    />
                                    <Route
                                        exact
                                        path={`${path}/chat`}
                                        render={() => (
                                            <ProjectChat
                                                title={project.title}
                                                id={id}
                                            />
                                        )}
                                    />
                                    <Route
                                        path={path}
                                        render={() => (
                                            <ProjectTasksList
                                                members={project.members}
                                                isOwner={isOwner}
                                                id={id}
                                            />
                                        )}
                                    />
                                </Switch>
                            </ProjectContentContainer>
                        </ProjectContainer>
                    </ProjectWrapper>
                ) : (
                    <Redirect to="/dashboard/projects" />
                )
            ) : null}
        </>
    );
};

export default Project;
