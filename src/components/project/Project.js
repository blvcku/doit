import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase'; 

import Task from './Task';

const Project = (props) => {

    const { id } = useParams();
    const [project, setProject] = useState({});
    const [todo, setTodo] = useState([]);
    const [doing, setDoing] = useState([]);
    const [done, setDone] = useState([]);
    const [loading, setLoading] = useState(true);
    const titleRef = useRef();
    const textRef = useRef();
    const performerRef = useRef();

    useEffect(() => {
        const unsubscribe = db.collection('projects').doc(id).onSnapshot(project => {
                setProject({...project.data(), id: project.id});
                setLoading(false);
        }, error => setLoading(false))

        return unsubscribe;
    }, [id])

    useEffect(() => {
        if(project.todo){
            setTodo(project.todo);
        }
        if(project.doing){
            setDoing(project.doing);
        }
        if(project.done){
            setDone(project.done);
        }
    }, [project])

    const createTask = async e => {
        e.preventDefault();
        const tempTodo = todo;
        tempTodo.unshift({title: titleRef.current.value, text: textRef.current.value, performer: performerRef.current.value});
        try{
            await db.collection('projects').doc(id).update({todo: tempTodo});
            titleRef.current.value = '';
            textRef.current.value = ''; 
        }
        catch(error){
            console.log(error.code);
        }
    }

    return(
        <>
            {!loading ? (
                project.title ? (
                    <div>
                        <h1>Title: {project.title}</h1>
                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}} >
                            <ul>
                                <li>
                                    <form onSubmit={createTask} noValidate>
                                        <input ref={titleRef} type='text' name='title' id='title' placeholder='Title' />
                                        <input ref={textRef} type='text' name='text' id='text' placeholder='Text..' />
                                        <select ref={performerRef} name='performer' id='performer'>
                                            {project.members.map((member, index) => (
                                                <option key={index} value={member}>{member}</option>
                                            ))}
                                        </select>
                                        <input type='submit' value='Create task' />
                                    </form>
                                </li>
                                {todo.map(({title, text, performer}, index) => (
                                    <Task key={index} title={title} text={text} performer={performer}/>
                                ))}
                            </ul>
                            <ul>
                                {doing.map(({title, text, performer}, index) => (
                                    <Task key={index} title={title} text={text} performer={performer}/>
                                ))}
                            </ul>
                            <ul>
                                {done.map(({title, text, performer}, index) => (
                                    <Task key={index} title={title} text={text} performer={performer}/>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <h1>Not found</h1>
                )
            ) : (
                null
            )}
        </>
    )
}

export default Project;