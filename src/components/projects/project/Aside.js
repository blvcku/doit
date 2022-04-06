import { useState, useEffect } from 'react';
import { functions } from '../../../firebase';
import CalendarIcon from '../../../images/calendar.svg';
import PeopleAssignedIcon from '../../../images/peopleassignedwhite.svg';
import DeleteIcon from '../../../images/delete.svg';
import ChatIcon from '../../../images/chat.svg';
import { useHistory, Link } from 'react-router-dom';
import useConfirmBox from '../../../hooks/useConfirmBox';
import useError from '../../../hooks/useError';
import { AsideContainer, DateContainer, ButtonsContainer } from "./Project.styles";

const Aside = ({isEditing, isOwner, date, id}) => {

    const history = useHistory();
    const { dispatchError } = useError();
    const [minDate, setMinDate] = useState('');
    const [formatedDate, setFormatedDate] = useState();
    const { setConfirmInfo } = useConfirmBox();

    useEffect(() => {
        const today = new Date();
        setMinDate(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`)
    }, [])

    useEffect(() => {
        if(date){
            setFormatedDate(new Date(date).toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'}));
        }
    }, [date])

    const handleDeleteProject = e => {
        e.preventDefault();
        setConfirmInfo({message: 'delete this project', action: deleteProject});
    }

    const deleteProject = async () => {
        try{
            const deleteProjectFunction = functions.httpsCallable('deleteProject');
            dispatchError({type: 'reset'});
            history.push('/dashboard');
            await deleteProjectFunction({id: id});
        }
        catch(error){
            dispatchError({type: 'projects/delete'});
        }
    }

    const handleLeaveProject = e => {
        e.preventDefault();
        setConfirmInfo({message: 'leave this project', action: leaveProject});
    }

    const leaveProject = async () => {
        try{
            const leaveProjectFunction = functions.httpsCallable('leaveProject');
            dispatchError({type: 'reset'});
            history.push('/dashboard');
            await leaveProjectFunction({projectID: id});
        }
        catch(error){
            dispatchError({type: 'projects/leave'});
        }
    }

    return(
        <AsideContainer>
            <DateContainer>
                <img src={CalendarIcon} alt='Calendar'/>
                <h2>Due:</h2>
                {isEditing ? (
                    <input form='main-form' defaultValue={date} name='date' min={minDate} aria-label='Due date' type='date' />
                ) : (
                    <p>{formatedDate ? formatedDate : 'Not set'}</p>
                )}
            </DateContainer>
            <ButtonsContainer>
                {isOwner ? (
                        <button style={{background: '#DB382C'}} onClick={handleDeleteProject} type='button' aria-label='Delete project'>
                            <img src={DeleteIcon} alt='delete' />
                            Delete Project
                        </button>
                    ) : (
                        <button style={{background: '#DB382C'}} onClick={handleLeaveProject} type='button' aria-label='Delete project'>
                            Leave Project
                        </button>
                )}
                <Link to={`/dashboard/projects/${id}/members`}>
                    <img src={PeopleAssignedIcon} alt='People Assigned' />
                    People Assigned
                </Link>
                <Link to={`/dashboard/projects/${id}/chat`}>
                    <img src={ChatIcon} alt='chat' />
                    Chat
                </Link>
            </ButtonsContainer>
        </AsideContainer>
    )
}

export default Aside;