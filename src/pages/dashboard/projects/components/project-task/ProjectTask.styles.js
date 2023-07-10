import styled from 'styled-components';

export const ProjectTaskContainer = styled.li`
    overflow: hidden;
    padding: 33px 20px 0px 20px;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 13px;
    background: var(--color-white);
    margin-bottom: 1rem;
    position: relative;
    @media (min-width: 560px) {
        padding: 33px 41px 0px 41px;
    }
`;

export const ProjectTaskHeadContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    border-bottom: 1px solid #707070;
    margin-bottom: 33px;
    gap: 10px;
    align-items: center;
    @media (min-width: 500px) {
        grid-template-columns: minmax(min-content, auto) 1fr;
    }
`;

export const ProjectTaskHeadHeading = styled.h3`
    color: #676767;
    font-size: 0.9rem;
    font-weight: 400;
    word-break: break-word;
    max-width: max-content;
`;

export const ProjectTaskPerformerName = styled.figcaption`
    display: none;
    position: absolute;
    bottom: -1.6rem;
    border-radius: 8px;
    left: 0;
    z-index: 50;
    background: #333331;
    opacity: 0.8;
    font-size: 0.7rem;
    color: var(--color-white);
    padding: 5px 10px;
    white-space: nowrap;
`;

export const ProjectTaskPerformerProfileImage = styled.img`
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 50%;
    outline: 1px solid var(--color-primary-dark);
`;

export const ProjectTaskPerformerContainer = styled.figure`
    min-width: 2.5rem;
    height: 2.5rem;
    position: relative;
    &:hover {
        ${ProjectTaskPerformerName} {
            display: block;
        }
    }
`;

export const ProjectTaskSmallButton = styled.button`
    box-shadow: 0px 3px 6px #00000029;
    background: ${({ color }) => (color ? color : 'var(--color-primary-dark)')};
    border: none;
    border-radius: 12px;
    padding: 4px 10px;
    cursor: pointer;
`;

export const ProjectTaskSmallButtonIcon = styled.img`
    width: 17px;
    height: 17px;
`;

export const ProjectTaskStatusButton = styled.button`
    padding: 7px 8px;
    border-radius: 13px;
    box-shadow: 0px 3px 6px #00000029;
    background: ${({ color }) => color};
    border: none;
    font-size: 0.5rem;
    color: var(--color-white);
    cursor: ${({ isOwner, isPerformer }) =>
        isOwner || isPerformer ? 'pointer' : 'default'};
    display: flex;
    align-items: center;
    gap: 5px;
    text-transform: uppercase;
`;

export const ProjectTaskStatusButtonIcon = styled.img`
    width: 14px;
    height: 14px;
`;

export const ProjectTaskButton = styled.button`
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    margin-top: 4px;
    transform: rotate(${({ expanded }) => (expanded ? '180deg' : '0deg')});
    transition: transform 0.3s ease;
`;

export const ProjectTaskButtonIcon = styled.img``;

export const ProjectTaskStepContainer = styled.li`
    display: flex;
    align-items: center;
    gap: 7px;
    margin-top: 10px;
`;

export const ProjectTaskStepLabel = styled.label`
    font-size: 0.8rem;
    color: #676767;
    font-weight: 400;
    word-break: break-word;
    overflow-wrap: break-word;
    pointer-events: none;
`;

export const ProjectTaskStepInput = styled.input`
    min-width: 1.1rem;
    height: 1.1rem;
    appearance: none;
    border: 2px solid var(--color-accent-dark);
    border-radius: 2px;
    cursor: pointer;
    display: inline-block;
    position: relative;
    overflow: hidden;
    &::before {
        box-shadow: inset 1em 1em var(--color-accent-dark);
        content: '';
        position: absolute;
        width: 80%;
        height: 80%;
        left: 0.1rem;
        top: 0.1rem;
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    }
    &::after {
        width: 100%;
        height: 100%;
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        background: var(--color-white);
        transition: transform 0.2s ease;
    }
    &:checked::after {
        transform: translateX(100%);
    }
    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

export const ProjectTaskBodyContainer = styled.div`
    margin: auto;
    inset: 0;
    max-width: 650px;
    padding: 0px 0px 30px;
    display: grid;
    column-gap: 10px;
    grid-template-columns: 1fr;
    @media (min-width: 350px) {
        padding: 0px 20px 40px;
    }
    @media (min-width: 520px) {
        grid-template-columns: 2fr 1.1fr;
    }
`;

export const ProjectTaskBodyDescriptionContainer = styled.div`
    @media (min-width: 520px) {
        grid-column: span 2;
    }
`;

export const ProjectTaskBodyStepsWrapper = styled.div`
    margin-top: 20px;
`;

export const ProjectTaskFileDownloadContainer = styled.div`
    margin-top: 20px;
    @media (min-width: 520px) {
        justify-self: end;
    }
`;

export const ProjectTaskBodyStepsContainer = styled.ul`
    list-style: none;
`;

export const ProjectTaskBodyHeading = styled.h4`
    color: #676767;
    font-weight: 700;
    margin-bottom: 15px;
    font-size: 1rem;
`;

export const ProjectTaskBodyDescription = styled.p`
    font-size: 0.8rem;
    color: #676767;
    font-weight: 400;
`;

export const ProjectTaskFileDownloadButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 13px;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 9px 20px;
    border-radius: 13px;
    box-shadow: 0px 3px 6px #0000004f;
    cursor: pointer;
    transition: transform 0.3s ease;
    min-width: 170px;
    max-width: 170px;
    width: 100%;
    background: var(--color-primary);
    @media (min-width: 480px) {
        min-width: 170px;
        max-width: 170px;
    }
    @media (min-width: 1200px) {
        min-width: 210px;
        max-width: 210px;
    }
`;

export const ProjectTaskFileDownloadButtonText = styled.p`
    font-size: 0.8rem;
    font-weight: 500;
    text-overflow: ellipsis;
    max-width: 100px;
    overflow: hidden;
    white-space: nowrap;
    color: var(--color-white);
`;

export const ProjectTaskFileDownloadButtonIcon = styled.img``;

export const ProjectTaskPerformerWrapper = styled.div`
    gap: 15px;
    justify-content: start;
    display: flex;
    align-items: center;
    @media (min-width: 500px) {
        justify-content: auto;
        margin-bottom: 20px;
    }
`;

export const ProjectTaskButtonsContainer = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
`;

export const ProjectTaskButtonsWrapper = styled.div`
    display: flex;
    gap: 10px;
`;
