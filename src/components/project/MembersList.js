import React, { useState, useEffect } from "react";
import { functions } from "../../firebase";

const MembersList = ({membersIDs}) => {
    
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const getUsersData = functions.httpsCallable('getUsersData');
        const getData = async () => {
            try{
                const { data } = await getUsersData({uids: membersIDs});
                setMembers(data);
            }
            catch(error){
                console.error(error);
            }
        }
        getData();
    }, [membersIDs])

    return(
        <ul>
            {members.map(({displayName}, index) => (
                <li key={index}>{displayName}</li>
            ))}
        </ul>
    )
}

export default MembersList;