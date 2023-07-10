import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { db, fb, functions } from '../../../../../services/firebase';
import SearchIcon from '../../../../../assets/icons/search-white.svg';
import PlusIcon from '../../../../../assets/icons/plus-white.svg';
import DefaultImage from '../../../../../assets/images/default-project.jpg';
import useAuth from '../../../../../contexts/auth-context/useAuth';
import useError from '../../../../../contexts/error-context/useError';
import useFilter from '../../../../../hooks/useFilter';
import useTitle from '../../../../../hooks/useTitle';
import {
    ProjectsListWrapper,
    ProjectsListSearchContainer,
    ProjectsListSearchInput,
    ProjectsContainer,
    ProjectsListContainer,
    ProjectsListSearchIcon,
    ProjectsListSearchWrapper,
    ProjectsListProjectWrapper,
    ProjectsListProjectContainer,
    ProjectsListProjectTitle,
    ProjectsListCreateProjectButton,
    ProjectsListCreateProjectContainer,
    ProjectsListCreateProjectButtonIcon,
    ProjectsListCreateProjectButtonText,
} from './ProjectsList.styles';
import ProjectsListInvite from '../projects-list-invite/ProjectsListInvite';

const ProjectsList = () => {
    const {
        currentUser: { uid },
    } = useAuth();
    const { dispatchError } = useError();
    const { setTitle } = useTitle();
    const history = useHistory();
    const [projects, setProjects] = useState([]);
    const [projectInvites, setProjectInvites] = useState([]);
    const { setData, filter, setFilter, filteredData } = useFilter();

    const createProject = async (e) => {
        e.preventDefault();
        dispatchError({ type: 'reset' });
        try {
            const { id } = await db.collection('projects').add({
                title: 'Project Title',
                description: 'Description',
                authorID: uid,
                createdAt: fb.firestore.FieldValue.serverTimestamp(),
                members: [uid],
                invites: [],
            });
            return history.push(`/dashboard/projects/${id}`);
        } catch (error) {
            dispatchError({ type: 'projects/create' });
        }
    };

    const handleFilterChange = (e) => {
        e.preventDefault();
        setFilter(e.target.value);
    };

    useEffect(() => {
        const unsubscribe = db
            .collection('projects')
            .where('members', 'array-contains', uid)
            .orderBy('createdAt')
            .onSnapshot((snapshot) => {
                const projectsList = [];
                snapshot.forEach((project) =>
                    projectsList.unshift({ ...project.data(), id: project.id }),
                );
                setProjects(projectsList);
            });
        return unsubscribe;
    }, [uid]);

    useEffect(() => {
        const getData = async () => {
            try {
                const getProjectInvites =
                    functions.httpsCallable('getProjectInvites');
                const { data } = await getProjectInvites();
                setProjectInvites(data);
            } catch (error) {
                console.error(error);
            }
        };
        getData();
    }, [uid]);

    useEffect(() => {
        setData([...projectInvites, ...projects]);
    }, [projects, projectInvites, setData]);

    useEffect(() => {
        setTitle('Projects');
    }, [setTitle]);

    return (
        <ProjectsListWrapper>
            <ProjectsListContainer>
                <ProjectsListSearchWrapper>
                    <ProjectsListSearchContainer onSubmit={(e) => e.preventDefault()} noValidate>
                        <ProjectsListSearchInput
                            placeholder="Search"
                            type="text"
                            name="search"
                            id="search"
                            value={filter}
                            onChange={handleFilterChange}
                        />
                        <ProjectsListSearchIcon src={SearchIcon} alt="" />
                    </ProjectsListSearchContainer>
                </ProjectsListSearchWrapper>
                <ProjectsContainer>
                    <ProjectsListCreateProjectContainer>
                        <ProjectsListCreateProjectButton type="button" onClick={createProject}>
                            <ProjectsListCreateProjectButtonIcon src={PlusIcon} alt="" />
                            <ProjectsListCreateProjectButtonText>Create Project</ProjectsListCreateProjectButtonText>
                        </ProjectsListCreateProjectButton>
                    </ProjectsListCreateProjectContainer>
                    {filteredData.map(
                        ({ title, id, photoURL, invite }, index) => {
                            if (invite)
                                return (
                                    <ProjectsListInvite
                                        title={title}
                                        id={id}
                                        photoURL={photoURL}
                                        index={index}
                                        key={id}
                                        projectInvites={projectInvites}
                                        setProjectInvites={setProjectInvites}
                                    />
                                );
                            return (
                                <ProjectsListProjectWrapper
                                    background={photoURL || DefaultImage}
                                    key={id}
                                >
                                    <ProjectsListProjectContainer to={`/dashboard/projects/${id}`}>
                                        <ProjectsListProjectTitle>{title}</ProjectsListProjectTitle>
                                    </ProjectsListProjectContainer>
                                </ProjectsListProjectWrapper>
                            );
                        },
                    )}
                </ProjectsContainer>
            </ProjectsListContainer>
        </ProjectsListWrapper>
    );
};

export default ProjectsList;
