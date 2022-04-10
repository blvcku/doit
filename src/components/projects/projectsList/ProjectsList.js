import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { db, fb, functions } from '../../../firebase';
import SearchIcon from '../../../images/searchwhite.svg';
import PlusIcon from '../../../images/pluswhite.svg';
import DefaultImage from '../../../images/defaultProject.jpg';
import useAuth from "../../../hooks/useAuth";
import useError from '../../../hooks/useError';
import useFilter from '../../../hooks/useFilter';
import useTitle from '../../../hooks/useTitle';
import { Container, SearchBar, ProjectsContainer, CreateProject, Project } from "./ProjectsList.styles";
import ProjectInvite from "./ProjectInvite";

const ProjectsList = () => {

    const { currentUser: {uid} } = useAuth();
    const { dispatchError } = useError();
    const { setTitle } = useTitle();
    const history = useHistory();
    const [projects, setProjects] = useState([]);
    const [projectInvites, setProjectInvites] = useState([]);
    const { setData, filter, setFilter, filteredData } = useFilter();

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
            return history.push(`/dashboard/projects/${id}`);
        }
        catch(error){
            dispatchError({type: 'projects/create'});
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
        setData([...projectInvites, ...projects]);
    }, [projects, projectInvites, setData]);

    useEffect(() => {
        setTitle('Projects');
    }, [setTitle]);

    return(
        <Container>
            <nav>
                <SearchBar onSubmit={e => e.preventDefault()} noValidate>
                    <input placeholder='Search' type='text' name='search' id='search' value={filter} onChange={handleFilterChange} />
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
                {filteredData.map(({title, id, photoURL, invite}, index) => {
                    if(invite) return(
                        <ProjectInvite 
                            title={title} 
                            id={id} 
                            photoURL={photoURL} 
                            index={index} 
                            key={id}
                            projectInvites={projectInvites}
                            setProjectInvites={setProjectInvites}
                        />
                    )
                    return(
                        <Project background={photoURL || DefaultImage} key={id}>
                            <Link to={`/dashboard/projects/${id}`}>
                                <p>{title}</p>
                            </Link>
                        </Project>
                    )
                })}
            </ProjectsContainer>
        </Container>
    )
}

export default ProjectsList;