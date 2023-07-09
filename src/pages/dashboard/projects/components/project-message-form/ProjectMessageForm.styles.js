import styled from 'styled-components';

export const ProjectMessageFormContainer = styled.form`
    position: sticky;
    bottom: 0;
    padding: var(--chatPadding);
    max-width: var(--chatMaxWidth);
    display: flex;
    gap: 0.4rem;
    width: 100%;
`;

export const ProjectMessageFormInputsContainer = styled.div`
    position: relative;
    width: 100%;
`;

export const ProjectMessageFormInput = styled.input`
    border-radius: 22px;
    background: var(--color-white);
    color: #8c8c8c;
    border: none;
    width: 100%;
    font-size: 0.9rem;
    padding: 0.45rem 2.8rem 0.45rem 1.5rem;
    outline: none;
    box-shadow: ${({ scrolledToBottom }) =>
        scrolledToBottom ? '0px 3px 6px #0000001F' : '0px 3px 6px #00000066'};
    transition: box-shadow 0.3s ease;
`;

export const ProjectMessageFormFileInput = styled.input`
    display: none;
`;

export const ProjectMessageFormLabel = styled.label`
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0.9rem;
    transform: translateY(-50%);
`;

export const ProjectMessageFormLabelIcon = styled.img`
    width: 1rem;
    height: 1rem;
    display: block;
`;

export const ProjectMessageFormButton = styled.button`
    background: var(--color-primary-dark);
    border: none;
    padding: 0 0.8rem;
    box-shadow: ${({ scrolledToBottom }) =>
        scrolledToBottom ? '0px 3px 6px #0000001F' : '0px 3px 6px #00000066'};
    border-radius: 22px;
    cursor: pointer;
    transition:
        transform 0.2s ease,
        box-shadow 0.3s ease;
    &:active {
        transform: scale(0.95);
    }
    &:disabled {
        opacity: 0.9;
    }
`;

export const ProjectMessageFormButtonIcon = styled.img`
    width: 1rem;
    height: 1rem;
    display: block;
`;
