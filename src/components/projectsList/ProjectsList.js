import React, { useState, useRef, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { db, fb } from '../../firebase';

import useAuth from "../../hooks/useAuth";

const ProjectsList = (props) => {

    const { currentUser: {uid} } = useAuth();
    const { url } = useRouteMatch();
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
        <>
            <h1>Dashboard</h1>
            <form onSubmit={createProject}>
                <input type='text' name='projectTitle' id='projectTitle' ref={projectTitle} />
                <input type='submit' value='Create Project' /> 
            </form>
            <ul>
                {projects.map(({title, id}, index) => (
                    <li key={index}>
                        <Link to={`${url}/${id}`}>
                            <p>{title}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ProjectsList;