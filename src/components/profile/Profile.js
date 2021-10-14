import React from "react";

import useAuth from "../../hooks/useAuth";

const Profile = (props) => {

    const { currentUser } = useAuth();

    return(
        <>
            <h1>Your profile</h1>
            <h3>{currentUser.email}</h3>
            <h4>{currentUser.displayName}</h4>
        </>
    )
}

export default Profile;