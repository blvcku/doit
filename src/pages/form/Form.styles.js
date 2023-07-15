import styled from 'styled-components';

export const FormContainer = styled.div`
    max-width: 1250px;
    width: 100%;
    margin: auto;
    padding: 0 1rem 2rem;
`;

export const FormHeaderContainer = styled.header`
    background: var(--color-primary-dark);
    margin-top: 2.5rem;
    text-align: center;
    padding: 2rem 1rem;
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 43px 43px 13px 13px;
`;

export const FormTitle = styled.h1`
    font-size: clamp(1.4rem, 3vw, 2.35rem);
    font-weight: 500;
    color: var(--color-white);
`;

export const FormContentContainer = styled.main`
    margin-top: 1.3rem;
    text-align: center;
`;

export const FormQuestionsContainer = styled.ul`
    display: grid;
    gap: 2.3rem;
    max-width: 750px;
    width: 100%;
    margin: auto;
    list-style: none;
`;

export const FormElement = styled.form``;
