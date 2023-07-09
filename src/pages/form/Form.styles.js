import styled from 'styled-components';

export const FormContainer = styled.div`
    max-width: 1250px;
    width: 100%;
    margin: auto;
    padding: 0 1rem 2rem;
`;

export const FormBanner = styled.header`
    background: var(--color-primary-dark);
    margin-top: 2.5rem;
    text-align: center;
    padding: 2rem 1rem;
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 43px 43px 13px 13px;
    h1 {
        font-size: clamp(1.4rem, 3vw, 2.35rem);
        font-weight: 500;
        color: var(--color-white);
    }
`;

export const FormMain = styled.main`
    margin-top: 1.3rem;
    text-align: center;
`;

export const FormSubmit = styled.button`
    border: none;
    background: var(--color-primary-dark);
    padding: 0.7rem 1.75rem;
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 13px;
    margin-top: 3.5rem;
    cursor: pointer;
    position: relative;
    span {
        display: block;
        font-size: 1.1rem;
        font-weight: 500;
        color: var(--color-white);
        ${({ isSubmitting }) => isSubmitting && `visibility: hidden`};
    }
    svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        fill: var(--color-white);
        display: none;
        ${({ isSubmitting }) => isSubmitting && `display:block`};
    }
`;

export const QuestionsList = styled.ul`
    display: grid;
    gap: 2.3rem;
    max-width: 750px;
    width: 100%;
    margin: auto;
    list-style: none;
`;
