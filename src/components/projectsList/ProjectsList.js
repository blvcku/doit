import React from "react";

import useAuth from "../../hooks/useAuth";

const ProjectsList = (props) => {

    const { currentUser }  = useAuth();

    return(
        <>
            <h1>Dashboard</h1>
            <h3>{currentUser.email}</h3>
            <h4>{currentUser.displayName}</h4>
        </>
    )
}

export default ProjectsList;