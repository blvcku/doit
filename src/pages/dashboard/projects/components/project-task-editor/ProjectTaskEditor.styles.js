import styled from 'styled-components';
import { ProjectTaskHeadHeading } from '../project-task/ProjectTask.styles';

export const ProjectTaskEditorContainer = styled.form``;

export const ProjectTaskEditorHeading = styled(ProjectTaskHeadHeading)`
    overflow: visible;
    position: relative;
    &::before {
        position: absolute;
        content: 'Performer:';
        font-size: 0.7rem;
        font-weight: 500;
        color: var(--color-primary-dark);
        top: -0.75rem;
        left: 0;
    }
`;

export const ProjectTaskEditorButton = styled.button`
    padding: 7px 17px;
    border-radius: 13px;
    box-shadow: 0px 3px 6px #00000029;
    background: var(--color-primary-dark);
    border: none;
    font-size: 12px;
    color: var(--color-white);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
`;

export const ProjectTaskEditorButtonIcon = styled.img`
    width: 14px;
    height: 14px;
`;
