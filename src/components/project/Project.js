import React, { useState, useEffect, useRef } from 'react';
import { useParams, Route, Switch } from 'react-router-dom';
import { db } from '../../firebase'; 

import useAuth from '../../hooks/useAuth';
import useError from '../../hooks/useError';

import { NotFound, Form, Container, SubContainer } from './Project.styles';
import { MainContainer } from './MainContainer.styles';
import Banner from './Banner';
import Aside from './Aside';

const Project = () => {

    const { id } = useParams();
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
        try{
            await db.collection('projects').doc(id).update({
                title: title,
                description: description,
                date: date
            });
        }
        catch(error){
            dispatchError({type: 'projects/edit'});
        }
        setIsEditing(false);
    }

    // const createTask = async e => {
    //     e.preventDefault();
    //     const tempTodo = todo;
    //     tempTodo.unshift({title: titleRef.current.value, text: textRef.current.value, performer: performerRef.current.value});
    //     try{
    //         await db.collection('projects').doc(id).update({todo: tempTodo});
    //         titleRef.current.value = '';
    //         textRef.current.value = ''; 
    //     }
    //     catch(error){
    //         console.log(error.code);
    //     }
    // }

    return(
        <>
            {!loading ? (
                project.title ? (
                    <Container>
                        <SubContainer>
                            <Form id='main-form' noValidate onSubmit={handleSubmit}>
                                <Banner 
                                    isOwner={isOwner}
                                    isEditing={isEditing}
                                    titleRef={titleRef}
                                    turnOnEdit={turnOnEdit}
                                    title={project.title} 
                                    description={project.description}
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