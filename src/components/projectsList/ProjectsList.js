import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, fb } from '../../firebase';
import SearchIcon from './search.svg';
import PlusIcon from './plus.svg';
import DefaultImage from './default.jpg';

import useAuth from "../../hooks/useAuth";

import { Container, SearchBar, ProjectsContainer, CreateProject, Project } from "./ProjectsList.styles";

const ProjectsList = (props) => {

    const { currentUser: {uid} } = useAuth();
    const projectTitle = useRef();
    const [projects, setProjects] = useState([]);

    const createProject = async e => {
        e.preventDefault();
        try{
            await db.collection('projects').add({
                title: projectTitle.current.value, 
                authorID: uid,
                createdAt: fb.firestore.FieldValue.serverTimestamp(), 
                members: [
                    uid
                ]
            });
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        const unsubscribe = db.collection('projects').where('members', 'array-contains', uid).orderBy('createdAt').onSnapshot(snapshot => {
            const projectsList = [];
            snapshot.forEach(project => projectsList.unshift({...project.data(), id: project.id}));
            setProjects(projectsList);
        })     
        return unsubscribe;
    }, [uid])

    return(
        <Container>
            <nav>
                <SearchBar noValidate>
                    <input placeholder='Search' type='text' name='search' id='search'/>
                    <img src={SearchIcon} alt='Search' />
                </SearchBar>
            </nav>
            <ProjectsContainer>
                <CreateProject>
                    <Link to='/dashboard/projects/create'>
                        <img src={PlusIcon} alt='Plus icon'/>
                        <p>Create Project</p>
                    </Link>
                </CreateProject>
                {projects.map(({title, id, photoURL}, index) => (
                    <Project background={photoURL ? photoURL : DefaultImage} key={index}>
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