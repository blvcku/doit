import styled from 'styled-components';

export const ProjectTasksListContainer = styled.ul`
    list-style: none;
    position: relative;
    min-height: 200px;
    &:empty {
        font-size: 1rem;
        border-radius: 13px;
        &::before {
            content: 'There are no tasks in this project yet';
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            text-align: center;
        }
        color: #676767;
        @media (min-width: 1300px) {
            height: 500px;
        }
    }
`;

export const ProjectTasksListTaskCreatorContainer = styled.li`
    margin-bottom: 1rem;
`;

export const ProjectTasksListTaskCreateButton = styled.button`
    box-shadow: 0px 3px 6px #00000029;
    display: block;
    width: 100%;
    border: none;
    padding: 30px 0px;
    background: var(--color-white);
    border-radius: 13px;
    box-shadow: 0px 3px 6px #00000029;
    border: 1px solid var(--color-primary-dark);
    cursor: pointer;
`;

export const ProjectTasksListTaskCreateButtonIcon = styled.img`
    width: 40px;
    height: 40px;
`;

export const ProjectTasksListTaskCreateButtonText = styled.span`
    display: block;
    font-size: 0.8rem;
    color: var(--color-primary);
    font-weight: 700;
    margin-top: 7px;
`;
