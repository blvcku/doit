import styled from 'styled-components';

export const ProjectTaskEditorBodyContainer = styled.div`
    margin: auto;
    inset: 0;
    max-width: 650px;
    padding: 0px 0px 20px;
    display: grid;
    grid-template-columns: 1fr;
    @media (min-width: 350px) {
        padding: 0px 20px 20px;
    }
    @media (min-width: 480px) {
        grid-template-columns: 1fr 1fr;
    }
`;

export const ProjectTaskEditorBodyLabel = styled.label`
    font-weight: 700;
    color: #676767;
    display: block;
    margin-bottom: 7px;
    @media (min-width: 480px) {
        grid-column: span 2;
    }
`;

export const ProjectTaskEditorBodyInput = styled.input`
    width: 100%;
    border-radius: 10px;
    border: 1px solid #707070;
    font-size: 0.9rem;
    padding: 4px 11px;
    outline: none;
    margin-top: 12px;
    color: #676767;
`;

export const ProjectTaskEditorBodyTextarea = styled.textarea`
    resize: none;
    width: 100%;
    border-radius: 10px;
    border: 1px solid #707070;
    min-height: 90px;
    font-size: 0.9rem;
    padding: 4px 11px;
    outline: none;
    margin-top: 12px;
    color: #676767;
`;

export const ProjectTaskEditorBodyAddStepButton = styled.button`
    background: var(--color-accent-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 13px;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-white);
    padding: 9px 20px;
    box-shadow: 0px 3px 6px #0000004f;
    border-radius: 13px;
    border: none;
    cursor: pointer;
    transition: transform 0.3s ease;
    justify-self: center;
    margin-top: 5px;
    max-width: 160px;
    width: 100%;
    &:active {
        transform: scale(0.97);
    }
    @media (min-width: 480px) {
        justify-self: start;
        margin-top: 25px;
        width: auto;
    }
`;

export const ProjectTaskEditorBodyAddStepButtonIcon = styled.img`
    width: 1.2rem;
    height: 1.2rem;
`;

export const ProjectTaskEditorBodyAddFileLabel = styled.label`
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
    max-width: 160px;
    width: 100%;
    justify-self: center;
    grid-row: 5/6;
    margin-top: 10px;
    ${({ file }) =>
        file
            ? `
        background:var(--color-primary);
        color:var(--color-white);
    `
            : `
        background:var(--color-white);
        color:var(--color-primary);
        outline: 2px solid var(--color-primary);
        outline-offset: -2px;
    `}
    &:active {
        transform: scale(0.97);
    }
    @media (min-width: 480px) {
        justify-self: end;
        margin-top: 25px;
        grid-row: auto;
        max-width: 210px;
    }
`;

export const ProjectTaskEditorBodyAddFileLabelText = styled.p`
    font-weight: 500;
    text-overflow: ellipsis;
    max-width: 100px;
    overflow: hidden;
    white-space: nowrap;
`;

export const ProjectTaskEditorBodyAddFileLabelInput = styled.input`
    display: none;
`;

export const ProjectTaskEditorBodyAddFileLabelIcon = styled.img`
    width: 1.2rem;
    height: 1.2rem;
`;

export const ProjectTaskEditorBodyStepsContainer = styled.ul`
    margin-top: 15px;
    max-height: 135px;
    overflow: auto;
    max-width: 450px;
    width: 100%;
    @media (min-width: 480px) {
        grid-column: span 2;
        margin-top: 20px;
    }
    &:empty {
        margin-top: 5px;
    }
`;

export const ProjectTaskEditorBodyStepContainer = styled.li`
    margin-bottom: 15px;
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
    &:nth-last-child(1) {
        margin-bottom: 5px;
    }
`;

export const ProjectTaskEditorBodyStepInput = styled.input`
    border-radius: 10px;
    border: 1px solid #707070;
    font-size: 0.9rem;
    padding: 4px 35px 4px 11px;
    outline: none;
    color: #676767;
    width: 100%;
`;

export const ProjectTaskEditorBodyStepIndicator = styled.div`
    color: var(--color-white);
    background: var(--color-accent-dark);
    max-width: 1.3rem;
    width: 100%;
    height: 1.3rem;
    box-sizing: content-box;
    border-radius: 50%;
    font-size: 0.6rem;
    display: grid;
    place-items: center;
`;

export const ProjectTaskEditorBodyStepButton = styled.button`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
`;

export const ProjectTaskEditorBodyStepButtonIcon = styled.img`
    display: block;
    width: 1rem;
    height: 1rem;
`;
