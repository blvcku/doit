import styled from 'styled-components';
import { Project } from '../projects-list/ProjectsList.styles';

export const ProjectInviteContainer = styled(Project)`
    div {
        grid-area: 1 / 1 / 2 / 2;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        div {
            position: absolute;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            bottom: 14%;
            button {
                opacity: ${({ loading }) => (loading ? '0.7' : '1')};
                font-size: 0.75rem;
                font-weight: 700;
                color: var(--color-white);
                padding: 10px 7px;
                border-radius: 13px;
                border: none;
                background: transparent;
                cursor: pointer;
            }
            button:nth-child(2) {
                background-color: var(--color-white);
                color: var(--color-accent-dark);
            }
        }
    }
`;
