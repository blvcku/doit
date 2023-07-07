import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { db } from '../../../../firebase';
import useAuth from '../../../../hooks/useAuth';
import { ListOfProjects } from './AddToForm.styles';
import Loader from '../../../loading/Loader';
import Project from './Project';

const ProjectsList = ({ status, setForm, members }) => {
    const {
        currentUser: { uid },
    } = useAuth();
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const unsubscribe = db
            .collection('projects')
            .where('members', 'array-contains', uid)
            .orderBy('createdAt')
            .onSnapshot(
                (snapshot) => {
                    const projectsList = [];
                    snapshot.forEach((project) =>
                        projectsList.unshift({
                            ...project.data(),
                            id: project.id,
                        }),
                    );
                    setProjects(projectsList);
                    setLoading(false);
                },
                (error) => setLoading(false),
            );
        return unsubscribe;
    }, [uid]);

    if (status === 'public')
        return <Redirect to="/dashboard/forms/create/add" />;
    return (
        <>
            {loading && <Loader />}
            <h2>Add from project</h2>
            <ListOfProjects>
                {projects.map(
                    ({ title, photoURL, members: projectMembers, id }) => (
                        <Project
                            key={id}
                            id={id}
                            title={title}
                            photoURL={photoURL}
                            projectMembers={projectMembers}
                            members={members}
                            setForm={setForm}
                        />
                    ),
                )}
            </ListOfProjects>
        </>
    );
};

export default ProjectsList;
