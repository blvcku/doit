import React, { useState, useEffect } from 'react';
import { functions } from '../../firebase';

const Task = ({title, text, performer}) => {

    const [performerData, setPerformerData] = useState({});

    useEffect(() => {
        const getUserData = functions.httpsCallable('getUserData');
        const getPerformerData = async () => {
            try{
                const { data } = await getUserData({uid: performer});
                setPerformerData(data);
            }
            catch(error){
                console.log(error.code);
            }
        }
        getPerformerData();
    }, [performer])

    useEffect(() => console.log(performerData), [performerData]);

    return(
        <li>
            <h4>{title}</h4>
            <p>{text}</p>
            {performerData ? <p>{performerData.displayName}</p> : null}
        </li>
    )
}

export default Task;