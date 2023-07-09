import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ProjectsList from './components/projects-list/ProjectsList';
import Project from './project/Project';

const Projects = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path} component={ProjectsList} />
            <Route path={`${path}/:id`} component={Project} />
        </Switch>
    );
};

export default Projects;
