import styled from 'styled-components';

export const QuestionContainer = styled.li`
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 13px;
    ${({ error }) =>
        error
            ? 'border: 2px solid #DB382C;'
            : 'border: 1px solid var(--color-primary-dark);'}
    background:var(--color-white);
    text-align: start;
    padding: 1.8rem 1rem 1.4rem;
`;

export const QuestionWrapper = styled.div`
    max-width: 530px;
    margin: auto;
    h2 {
        color: var(--color-primary-dark);
        font-weight: 700;
        font-size: 1rem;
        margin-bottom: 2.3rem;
        position: relative;
        word-break: break-word;
        &::before {
            content: '';
            position: absolute;
            height: 1px;
            width: 100%;
            background: #676767;
            left: 50%;
            transform: translateX(-50%);
            bottom: -1.3rem;
            @media (min-width: 600px) {
                width: 105%;
            }
            @media (min-width: 700px) {
                width: 115%;
            }
        }
    }
    ul {
        list-style: none;
    }
`;

export const FileContainer = styled.div`
    overflow: hidden;
    text-align: center;
    outline-offset: -1px;
    box-shadow: 0px 3px 6px #0000004f;
    margin-bottom: 1.3rem;
    max-width: 100%;
    ${({ type }) =>
        type && type.startsWith('audio')
            ? `
        border-radius:35px;
        outline:3px solid var(--color-primary-dark);
        width:100%;
    `
            : `
        border-radius:13px;
        outline:2px solid var(--color-primary-dark);
        width:fit-content;
    `}
    img {
        display: block;
        max-width: 100%;
        height: auto;
        object-fit: contain;
        object-position: center center;
        cursor: pointer;
        max-height: 600px;
    }
    video {
        display: block;
        width: 100%;
        height: auto;
        max-height: 600px;
    }
    audio {
        width: 100%;
        display: block;
    }
`;

export const AnswerContainer = styled.li`
    margin-top: 0.35rem;
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;
    column-gap: 0.8rem;
    row-gap: 0.2rem;
    input[type='text'] {
        grid-column: 2 / 2;
        max-width: 250px;
        width: 100%;
        font-size: 0.8rem;
        padding: 0.25rem 0.8rem;
        border-radius: 13px;
        border: 1px solid var(--color-primary-dark);
        outline: none;
        background: var(--color-white-dark);
        color: #676767;
        transition: max-width 0.3s ease;
        &:focus {
            max-width: 350px;
        }
    }
    input[type='checkbox'],
    input[type='radio'] {
        width: 1rem;
        height: 1rem;
        appearance: none;
        position: relative;
        cursor: pointer;
        overflow: hidden;
        border: 2px solid var(--color-primary-dark);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2px;
        border-radius: 1px;
        &:checked::before {
            background: var(--color-primary-dark);
            content: '';
            width: 100%;
            height: 100%;
            border-radius: 1px;
        }
    }
    input[type='radio'] {
        border-radius: 50%;
        &:checked::before {
            border-radius: 50%;
        }
    }
    input[type='checkbox']:checked + label,
    input[type='radio']:checked + label {
        font-weight: 500;
    }
    label {
        color: #676767;
        font-weight: 400;
        font-size: 0.9rem;
        word-break: break-word;
    }
`;

export const InputFieldLabel = styled.label`
    font-weight: 400;
    font-size: 0.9rem;
    color: #676767;
    margin-top: 0.7rem;
    display: block;
    input {
        display: block;
        max-width: 250px;
        width: 100%;
        transition: max-width 0.3s ease;
        font-size: 0.75rem;
        background: #eaf4f5;
        border: none;
        border-bottom: 1px solid var(--color-primary-dark);
        outline: none;
        padding: 0.25rem 0.5rem;
        border-radius: 3px 3px 0px 0px;
        color: #676767;
        margin-top: 0.2rem;
        &:focus {
            max-width: 350px;
        }
    }
`;
