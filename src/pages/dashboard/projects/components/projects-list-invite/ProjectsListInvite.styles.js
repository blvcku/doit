import styled from 'styled-components';
import { ProjectsListProjectWrapper } from '../projects-list/ProjectsList.styles';

export const ProjectsListInviteWrapper = styled(ProjectsListProjectWrapper)``;

export const ProjectsListInviteContainer = styled.div`
    grid-area: 1 / 1 / 2 / 2;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

export const ProjectsListInviteTitle = styled.p`
    color: var(--color-white);
    font-weight: 700;
    text-overflow: ellipsis;
    word-break: break-word;
    padding: 0px 10px;
    text-align: center;
    text-shadow: 0px 3px 6px #00000063;
`;

export const ProjectsListInviteButtonsContainer = styled.div`
    position: absolute;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    bottom: 14%;
`;

export const ProjectsListInviteButton = styled.button`
    opacity: ${({ loading }) => (loading ? '0.7' : '1')};
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--color-white);
    padding: 10px 7px;
    border-radius: 13px;
    border: none;
    background: transparent;
    cursor: pointer;
    &:nth-child(2) {
        background-color: var(--color-white);
        color: var(--color-accent-dark);
    }
`;
