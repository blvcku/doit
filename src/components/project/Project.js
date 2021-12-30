import React, { useState, useEffect, useRef } from 'react';
import { useParams, Route, Switch, useRouteMatch } from 'react-router-dom';
import { db } from '../../firebase'; 

import useAuth from '../../hooks/useAuth';
import useError from '../../hooks/useError';

import { NotFound, Form, Container, SubContainer } from './Project.styles';
import { MainContainer } from './MainContainer.styles';
import Banner from './Banner';
import Aside from './Aside';
import MembersList from './MembersList';
import TasksList from './tasks/TasksList';

const Project = () => {

    const { id } = useParams();
    const { path } = useRouteMatch();
    const { currentUser } = useAuth();
    const { dispatchError } = useError();
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const titleRef = useRef();

    useEffect(() => {
        const unsubscribe = db.collection('projects').doc(id).onSnapshot(project => {
                setProject({...project.data(), id: project.id});
                setLoading(false);
        }, error => setLoading(false))

        return unsubscribe;
    }, [id])

    useEffect(() => {
        if(project.authorID === currentUser.uid){
            setIsOwner(true);
        }
        else{
            setIsOwner(false);
        }
    }, [project, currentUser])

    useEffect(() => {
        if(isEditing){
            titleRef.current.focus();
        }
    }, [isEditing])

    const turnOnEdit = e => {
        e.preventDefault();
        e.stopPropagation();
        if(!isOwner) return;
        setIsEditing(true);
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        if(!isOwner) return;
        const form = e.target;
        const { value:title } = form.elements['title'];
        const { value:description } = form.elements['description'];
        const { value:date } = form.elements['date'];
        editProject(title, description, date);
    }

    const editProject = async(title, description, date) => {
        dispatchError({type: 'reset'});
        if(title.trim().length > 20) return dispatchError({type: 'projects/title-too-long'});
        if(title.trim().length < 6) return dispatchError({type: 'projects/title-too-short'});
        if(description.trim().length > 80) return dispatchError({type: 'projects/description-too-long'});
        if(description.trim().length < 6) return dispatchError({type: 'projects/description-too-short'});
        try{
            await db.collection('projects').doc(id).update({
                title: title.trim(),
                description: description.trim(),
                date: date
            });
            dispatchError({type: 'reset'});
        }
        catch(error){
            dispatchError({type: 'projects/edit'});
        }
        setIsEditing(false);
    }

    return(
        <>
            {!loading ? (
                project.title ? (
                    <Container>
                        <SubContainer>
                            <Form id='main-form' noValidate onSubmit={handleSubmit}>
                                <Banner
                                    id={id}
                                    isOwner={isOwner}
                                    isEditing={isEditing}
                                    titleRef={titleRef}
                                    turnOnEdit={turnOnEdit}
                                    title={project.title} 
                                    description={project.description}
                                    background={project.photoURL}
                                />
                            </Form>
                            <Aside
                                id={id} 
                                isEditing={isEditing}
                                isOwner={isOwner}
                                date={project.date}
                            />
                            <MainContainer>
                                <Switch>
                                    <Route exact path={`${path}/members`} render={() => (<MembersList membersIDs={project.members}/>)} />
                                    <Route path={path} render={() => (<TasksList members={project.members} isOwner={isOwner} id={id} />)} />
                                </Switch>
                            </MainContainer>
                        </SubContainer>
                    </Container>
                ) : (
                    <NotFound>404: Not found</NotFound>
                )
            ) : (
                null
            )}
        </>
    )
}

export default Project;