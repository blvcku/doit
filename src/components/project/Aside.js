import { useState, useEffect } from 'react';
import CalendarIcon from './calendar.svg';
import PersonIcon from './person.svg';

import { AsideContainer, DateContainer, DeleteButton, PeopleAssignedButton, SecondContainer } from "./Project.styles";

const Aside = ({isEditing, isOwner, date}) => {

    const [minDate, setMinDate] = useState('');
    const [formatedDate, setFormatedDate] = useState();

    useEffect(() => {
        const today = new Date();
        setMinDate(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`)
    }, [])

    useEffect(() => {
        if(date){
            setFormatedDate(new Date(date));
        }
    }, [date])

    return(
        <AsideContainer isOwner={isOwner}>
            <DateContainer>
                <img src={CalendarIcon} alt='Calendar'/>
                <h2>Due:</h2>
                {isEditing ? (
                    <input defaultValue={date} name='date' min={minDate} aria-label='Due date' type='date' />
                ) : (
                    <p>{formatedDate ? formatedDate.toLocaleDateString('en-US', {day: 'numeric', month: 'short', year: 'numeric'}) : 'Not set'}</p>
                )}
            </DateContainer>
            <SecondContainer>
                {isOwner ? (
                        <DeleteButton type='button' aria-label='Delete project'>
                            Delete Project
                        </DeleteButton>
                    ) : (
                        null
                )}
                <PeopleAssignedButton isOwner={isOwner}>
                    <img src={PersonIcon} alt='Person' />
                    <p>People Assigned</p>
                </PeopleAssignedButton>
            </SecondContainer>
        </AsideContainer>
    )
}

export default Aside;