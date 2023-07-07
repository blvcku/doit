import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.section`
    margin: 20px;
    @media (min-width: 900px) {
        margin: 80px 30px 50px 0;
    }
`;

export const SubContainer = styled.div`
    max-width: 1250px;
`;

export const Nav = styled.nav`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
    @media (min-width: 330px) {
        grid-template-columns: repeat(2, 1fr);
        a:nth-child(3) {
            grid-column: span 2;
        }
    }
    @media (min-width: 500px) {
        grid-template-columns: repeat(3, 1fr);
        a:nth-child(3) {
            grid-column: 3;
        }
    }
    @media (min-width: 1100px) {
        grid-template-columns: repeat(4, 1fr);
        a:nth-child(3) {
            grid-column: 4;
        }
    }
`;

export const CustomNavLink = styled(NavLink)`
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 13px;
    border: 2px solid var(--color-primary);
    display: block;
    background: var(--color-white);
    text-align: center;
    padding: 25px 0px 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5px;
    font-size: 1rem;
    color: var(--color-primary);
    font-weight: 500;
    text-transform: uppercase;
    svg {
        fill: var(--color-primary);
        width: 30px;
        height: 30px;
    }
    &.active {
        background: var(--color-primary) !important;
        color: var(--color-white) !important;
        svg {
            fill: var(--color-white) !important;
        }
    }
`;

export const Form = styled.form`
    margin-top: 1rem;
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 13px;
    background: var(--color-white);
    text-align: center;
    padding: 1rem 1rem 1.8rem;
    position: relative;
    h3 {
        color: #676767;
        font-weight: 500;
        font-size: 1.3rem;
        text-transform: uppercase;
    }
`;

export const TitleInput = styled.input`
    color: #676767;
    outline: none;
    border: none;
    background: none;
    font-weight: 500;
    font-size: 1.3rem;
    text-align: center;
    width: 90%;
`;

export const Label = styled.label`
    display: block;
    text-align: start;
    max-width: 1000px;
    margin: auto;
    margin-top: 1.6rem;
    textarea {
        margin-top: 0.4rem;
        resize: none;
        display: block;
        width: 100%;
        height: 17ch;
        border-radius: 13px;
        border: 2px solid var(--color-primary);
        color: #676767;
        padding: 0.4rem 0.5rem;
        font-size: 0.8rem;
        outline: none;
    }
    p {
        font-weight: 500;
        color: #676767;
        font-size: 0.9rem;
        margin-left: 0.5rem;
    }
`;

export const FileContainer = styled.div`
    label {
        display: flex;
        gap: 0.4rem;
        background: var(--color-primary);
        width: max-content;
        margin: auto;
        margin-top: 1rem;
        color: var(--color-white);
        font-weight: 500;
        font-size: 0.9rem;
        align-items: center;
        box-shadow: 0px 3px 6px #0000004f;
        border-radius: 13px;
        padding: 0.5rem 1.7rem;
        cursor: pointer;
        img {
            width: 1.1rem;
            height: 1.1rem;
        }
        input {
            display: none;
        }
    }
    div {
        max-width: 700px;
        width: 100%;
        margin: auto;
        margin-top: 0.7rem;
        outline-offset: -1px;
        overflow: hidden;
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
    }
`;

export const SubmitButton = styled.button`
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 13px;
    background: var(--color-primary-dark);
    border: none;
    padding: 0.7rem 3.5rem;
    cursor: pointer;
    margin-top: 2rem;
    position: relative;
    span {
        display: block;
        font-size: 1rem;
        color: var(--color-white);
        font-weight: 500;
        ${({ $loading }) => $loading && `visibility: hidden`};
    }

    svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        fill: var(--color-white);
        display: none;
        ${({ $loading }) => $loading && `display:block`};
    }
`;

export const SearchBar = styled.form`
    background: var(--color-primary);
    max-width: 450px;
    width: 100%;
    box-shadow: 0px 3px 6px #00000033;
    border-radius: 25px;
    display: flex;
    gap: 8px;
    padding: 14px 18px;
    margin-top: 1rem;
    input {
        width: 100%;
        max-width: 300px;
        font-size: 0.7rem;
        border-radius: 20px;
        border: none;
        background: var(--color-white-dark);
        padding: 7px 0px 7px 20px;
        color: #676767;
    }
    input:focus {
        outline: none;
    }
    button {
        padding: 6px 15px;
        border-radius: 13px;
        background: none;
        border: none;
        cursor: pointer;
        background: var(--color-white);
        img {
            display: block;
            width: 0.95rem;
            height: 0.95rem;
        }
    }
`;

export const PostsContainer = styled.ul`
    list-style: none;
    &:empty {
        height: 200px;
        position: relative;
        &::before {
            content: 'No Posts';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #676767;
        }
        @media (min-width: 1100px) {
            height: 400px;
        }
    }
    li {
        margin-top: 1rem;
    }
`;

export const PostContainer = styled.div`
    box-shadow: 0px 3px 6px #00000066;
    background: var(--color-white);
    border-radius: 13px;
    text-align: center;
    padding: 1rem 1rem 2rem;
    position: relative;
    overflow: hidden;
    h3 {
        font-weight: 500;
        font-size: 1.3rem;
        color: #676767;
        word-break: break-word;
        margin-bottom: 0.5rem;
        @media (min-width: 500px) {
            margin: auto;
        }
    }
    @media (min-width: 370px) {
        padding: 1rem 1rem 2.5rem;
    }
`;

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1050px;
    margin: auto;
    position: relative;
    @media (min-width: 370px) {
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
    }
    &::before {
        position: absolute;
        content: '';
        height: 1px;
        background: #676767;
        width: 100%;
        bottom: -1rem;
        @media (min-width: 1620px) {
            width: 106%;
            left: 0;
            transform: translateX(-3%);
        }
    }
`;

export const AuthorInformations = styled.div`
    display: grid;
    grid-template-columns: 2.5rem 1fr;
    column-gap: 0.5rem;
    align-items: center;
    text-align: start;
    img {
        grid-row: span 2;
        width: 100%;
        height: auto;
        aspect-ratio: 1/1;
        object-fit: cover;
        border-radius: 50%;
        outline-offset: -1px;
        outline: 1px solid var(--color-primary);
    }
    h4 {
        color: #676767;
        font-size: 0.9rem;
        font-weight: 500;
        align-self: end;
    }
    p {
        color: #676767;
        font-size: 0.7rem;
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 0.65rem;
    align-items: center;
    align-self: flex-end;
    button {
        background: none;
        border: none;
        cursor: pointer;
        img {
            width: 1rem;
            height: 1rem;
            display: block;
        }
    }
    @media (min-width: 370px) {
        align-self: auto;
    }
`;

export const DeleteButton = styled.button`
    box-shadow: 0px 3px 6px #00000029;
    background: #db382c !important;
    border-radius: 12px;
    padding: 0.25rem 0.5rem;
    img {
        width: 1rem;
        height: 1rem;
    }
`;

export const ExpandButton = styled.button`
    transform: rotate(${({ expanded }) => (expanded ? '180deg' : '0deg')});
    transition: transform 0.3s ease;
`;

export const Description = styled.p`
    text-align: start;
    max-width: 700px;
    margin: auto;
    color: #676767;
    font-size: 0.85rem;
    margin-top: 2.5rem;
    word-break: break-word;
`;

export const ContactButton = styled.button`
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 13px;
    background: var(--color-primary);
    border: none;
    padding: 0.5rem 3.5rem;
    color: var(--color-white);
    font-size: 1rem;
    font-weight: 500;
    margin-top: 2rem;
    cursor: pointer;
`;

export const ContactButtonsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    width: fit-content;
    margin: auto;
    margin-top: 3rem;
    button:nth-child(1) {
        background: #db382c;
    }
    button {
        background: var(--color-primary);
        border: none;
        box-shadow: 0px 3px 6px #00000029;
        padding: 0.5rem 3rem;
        color: var(--color-white);
        border-radius: 13px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
    }
    @media (min-width: 400px) {
        grid-template-columns: 1fr 1fr;
    }
`;
