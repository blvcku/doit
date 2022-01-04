import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { db, fb, functions } from '../../firebase';
import SearchIcon from '../../images/projectsList/search.svg';
import PlusIcon from '../../images/projectsList/plus.svg';
import DefaultImage from '../../images/projectsList/defaultProject.jpg';

import useAuth from "../../hooks/useAuth";
import useError from '../../hooks/useError';

import { Container, SearchBar, ProjectsContainer, CreateProject, Project } from "./ProjectsList.styles";
import ProjectInvite from "./ProjectInvite";

const ProjectsList = () => {

    const { currentUser: {uid} } = useAuth();
    const { dispatchError } = useError();
    const history = useHistory();
    const [projects, setProjects] = useState([]);
    const [searchFilter, setFilter] = useState('');
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [projectInvites, setProjectInvites] = useState([]);
    const [filteredProjectInvites, setFilteredProjectInvites] = useState([]);

    const createProject = async e => {
        e.preventDefault();
        dispatchError({type: 'reset'});
        try{
            const { id } = await db.collection('projects').add({
                title: 'Project Title',
                description: 'Description', 
                authorID: uid,
                createdAt: fb.firestore.FieldValue.serverTimestamp(), 
                members: [
                    uid
                ],
                invites: []
            });
            dispatchError({type: 'reset'});
            return history.push(`/dashboard/projects/${id}`);
        }
        catch(error){
            dispatchError({type: 'projects/failed'});
        }
    }

    const handleFilterChange = e => {
        e.preventDefault();
        setFilter(e.target.value);
    }

    useEffect(() => {
        const unsubscribe = db.collection('projects').where('members', 'array-contains', uid).orderBy('createdAt').onSnapshot(snapshot => {
            const projectsList = [];
            snapshot.forEach(project => projectsList.unshift({...project.data(), id: project.id}));
            setProjects(projectsList);
        })     
        return unsubscribe;
    }, [uid])

    useEffect(() => {
        const getData = async () => {
            try{
                const getProjectInvites = functions.httpsCallable('getProjectInvites');
                const { data } = await getProjectInvites();
                setProjectInvites(data);
            }
            catch(error){
                console.error(error);
            }
        }
        getData();
    }, [uid])

    useEffect(() => {
        const matchesFilter = new RegExp(searchFilter.trim(), 'i');
        const items = projects.filter(({title}) => matchesFilter.test(title));
        const invites = projectInvites.filter(({title}) => matchesFilter.test(title));
        setFilteredProjects(items);
        setFilteredProjectInvites(invites);
    }, [searchFilter, projects, projectInvites]);

    return(
        <Container>
            <nav>
                <SearchBar noValidate>
                    <input placeholder='Search' type='text' name='search' id='search' value={searchFilter} onChange={handleFilterChange} />
                    <img src={SearchIcon} alt='Search' />
                </SearchBar>
            </nav>
            <ProjectsContainer>
                <CreateProject>
                    <button aria-label='Create new project' type='button' onClick={createProject}>
                        <img src={PlusIcon} alt='Plus icon'/>
                        <p>Create Project</p>
                    </button>
                </CreateProject>
                {filteredProjectInvites.map(({title, id, photoURL}, index) => (
                    <ProjectInvite 
                        title={title} 
                        id={id} 
                        photoURL={photoURL} 
                        index={index} 
                        key={id}
                        projectInvites={projectInvites}
                        setProjectInvites={setProjectInvites}
                    />
                ))}
                {filteredProjects.map(({title, id, photoURL}) => (
                    <Project background={photoURL || DefaultImage} key={id}>
                        <Link to={`/dashboard/projects/${id}`}>
                            <p>{title}</p>
                        </Link>
                    </Project>
                ))}
            </ProjectsContainer>
        </Container>
    )
}

export default ProjectsList;