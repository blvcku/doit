import styled from 'styled-components';

export const ProjectAsideContainer = styled.aside`
    grid-area: aside;
    background: var(--color-white);
    box-shadow: 0px 3px 6px #00000066;
    padding: 1.9rem 1rem;
    border-radius: 13px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    align-items: center;
    height: max-content;
    @media (min-width: 370px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 1300px) {
        padding: 0 0.4rem;
        grid-template-columns: 1fr;
        gap: 4.3rem;
        min-height: 26.5rem;
    }
`;

export const ProjectAsideDateContainer = styled.div`
    text-align: center;
    color: var(--color-primary-dark);
    width: 100%;
    @media (min-width: 1300px) {
        margin-top: 60px;
    }
`;

export const ProjectAsideDateIcon = styled.img``;

export const ProjectAsideDateHeading = styled.h2`
    margin-top: 2px;
`;

export const ProjectAsideDate = styled.p`
    margin-top: 4px;
`;

export const ProjectAsideDateInput = styled.input`
    margin-top: 4px;
`;

export const ProjectAsideButtonsContainer = styled.div`
    justify-self: center;
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    gap: 1rem;
    width: 100%;
    max-width: 9rem;
    text-align: center;
    @media (min-width: 1300px) {
        margin-bottom: 160px;
    }
`;

export const ProjectAsideButton = styled.button`
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 13px;
    background: #0e8e8c;
    border: none;
    color: var(--color-white);
    padding: 0.4rem 0;
    font-size: 0.65rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 500;
    gap: 0.3rem;
    &:active {
        transform: scale(0.97);
    }
    &:disabled {
        opacity: 0.7;
    }
`;

export const ProjectAsideButtonIcon = styled.img`
    width: 0.8rem;
    height: auto;
    display: block;
`;

export const ProjectAsideButtonRed = styled(ProjectAsideButton)`
    background: #db382c;
`;
