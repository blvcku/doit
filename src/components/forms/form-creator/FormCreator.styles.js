import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.section`
    @media (min-width: 900px) {
        margin: 85px 20px 2rem 0px;
    }
    margin: 20px;
`;

export const Form = styled.form`
    max-width: 1250px;
    width: 100%;
    @media (min-width: 520px) {
        display: grid;
        grid-template-columns: 3fr 1.2fr;
        column-gap: 2rem;
        row-gap: 1.5rem;
    }
`;

export const Header = styled.header`
    background: var(--color-primary-dark);
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 30px 30px 13px 13px;
    padding: 35px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-bottom: 1rem;
    input {
        font-size: clamp(1.4rem, 3vw, 2.35rem);
        font-weight: 500;
        text-align: center;
        color: var(--color-white);
        width: 100%;
        outline: none;
        padding: 0 10px;
        max-width: 90%;
        white-space: nowrap;
        overflow: hidden;
        background: none;
        border: none;
    }
    @media (min-width: 520px) {
        border-radius: 43px 13px 13px 13px;
        margin-bottom: 0;
        padding: 24px 5px;
    }
`;

export const QuestionsListContainer = styled.ul`
    list-style: none;
`;

export const CustomNavLink = styled(NavLink)`
    text-align: center;
    border: 2px solid var(--color-primary-dark);
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 13px;
    text-transform: capitalize;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 1rem;
    padding: 1.3rem;
    background: var(--color-white);
    font-size: 1rem;
    color: var(--color-primary-dark);
    font-weight: 500;
    text-transform: uppercase;
    &.active {
        background: var(--color-primary-dark) !important;
        color: var(--color-white) !important;
        svg {
            fill: var(--color-white) !important;
        }
    }
    svg {
        width: 30px;
        height: 30px;
        fill: var(--color-primary-dark);
    }
    @media (min-width: 520px) {
        margin-bottom: 0;
        padding: 0;
    }
`;

export const Section = styled.section`
    grid-column: span 2;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;
    margin-top: 4rem;
`;

export const CreateButton = styled.button`
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 13px;
    background: var(--color-primary-dark);
    border: none;
    padding: 12px 60px;
    cursor: pointer;
    display: block;
    width: max-content;
    position: relative;
    span {
        display: block;
        font-size: 1rem;
        color: var(--color-white);
        font-weight: 500;
        ${({ isCreating }) => isCreating && `visibility: hidden`};
    }

    svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        fill: var(--color-white);
        display: none;
        ${({ isCreating }) => isCreating && `display:block`};
    }
`;

export const AddQuestionButton = styled.button`
    background: var(--color-white);
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 13px;
    border: none;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    width: max-content;
    font-size: 0.8rem;
    color: var(--color-primary-dark);
    padding: 1.1rem 3rem;
    font-weight: 700;
    gap: 6px;
    cursor: pointer;
    img {
        width: 2rem;
        height: 2rem;
    }
    @media (min-width: 320px) {
        padding: 1.1rem 5rem;
    }
`;
