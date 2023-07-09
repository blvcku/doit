import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.section`
    margin: 20px;
    @media (min-width: 900px) {
        margin: 80px 30px 20px 0;
    }
`;

export const Wrapper = styled.div`
    max-width: 1250px;
    width: 100%;
`;

export const Nav = styled.nav`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    @media (min-width: 310px) {
        grid-template-columns: 1fr 1fr;
        gap: 15px;
    }
    @media (min-width: 1300px) {
        grid-template-columns: 2fr 1fr 1fr;
    }
    form {
        box-shadow: 0px 3px 6px #00000066;
        background: var(--color-primary);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px 20px;
        gap: 10px;
        border-radius: 30px 30px 13px 13px;
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
        input {
            width: 100%;
            font-size: 0.7rem;
            border-radius: 20px;
            border: none;
            background: var(--color-white-dark);
            padding: 7px 0px 7px 20px;
            outline: none;
            color: #676767;
        }
        @media (min-width: 310px) {
            grid-column: span 2;
        }
        @media (min-width: 350px) {
            padding: 40px 50px;
        }
        @media (min-width: 500px) {
            padding: 40px 100px;
        }
        @media (min-width: 1300px) {
            border-radius: 43px 13px 13px 13px;
            grid-column: auto;
        }
    }
`;

export const CustomNavLink = styled(NavLink)`
    padding: 25px 0 18px;
    box-shadow: 0px 3px 6px #00000029;
    text-align: center;
    border-radius: 13px;
    border: 2px solid var(--color-primary);
    text-decoration: none;
    color: var(--color-primary);
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5px;
    svg {
        width: 30px;
        height: 30px;
        fill: var(--color-primary);
    }
    &.active {
        color: var(--color-white) !important;
        background: var(--color-primary) !important;
        svg {
            fill: var(--color-white) !important;
        }
    }
`;

export const Section = styled.section`
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 13px;
    background: var(--color-white);
    margin-top: 15px;
    padding: 15px 5px;
    position: relative;
    overflow: hidden;
    @media (min-width: 500px) {
        padding: 25px 20px;
    }
    @media (min-width: 650px) {
        margin-top: 30px;
        padding: 40px 85px;
    }
    @media (min-width: 900px) {
        padding: 25px 15px;
    }
    @media (min-width: 1100px) {
        padding: 40px 85px;
    }
    @media (min-width: 1300px) {
        min-height: 685px;
    }

    h2 {
        color: var(--color-primary);
        font-size: 1.1rem;
        margin-left: 20px;
    }
`;

export const OverflowContainer = styled.div`
    overflow: hidden;
    margin-top: 25px;
    min-height: 200px;
    @media (min-width: 900px) {
        min-height: 300px;
    }
`;

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    @media (min-width: 1500px) {
        transform: translateX(
            ${({ currentSlide }) => `${currentSlide * -100}%`}
        );
        flex-direction: row;
        gap: 0px;
    }
    &:empty {
        text-align: center;
        flex-direction: column;
        &::before {
            text-align: center;
            content: 'No friends';
            color: var(--color-primary);
            align-self: center;
            transform: translateY(300%);
            @media (min-width: 900px) {
                transform: translateY(500%);
            }
            @media (min-width: 1300px) {
                transform: translateY(850%);
            }
        }
    }
`;

export const GridContainer = styled.ul`
    padding: 0px 5px;
    flex-shrink: 0;
    display: grid;
    width: 100%;
    list-style: none;
    grid-template-columns: 1fr;
    gap: 18px;
    @media (min-width: 500px) {
        grid-template-columns: repeat(2, minmax(50px, 1fr));
    }
    @media (min-width: 1200px) {
        column-gap: 50px;
        row-gap: 30px;
    }
    @media (min-width: 1500px) {
        grid-template-columns: repeat(4, minmax(50px, 1fr));
        grid-template-rows: 1fr 1fr;
        row-gap: 35px;
        column-gap: 18px;
    }
`;

export const NextButton = styled.button`
    position: absolute;
    right: 13px;
    border: none;
    background: none;
    top: 45%;
    opacity: 0.2;
    cursor: pointer;
    transition: opacity 0.3s ease;
    display: none;
    svg {
        width: 70px;
        height: 70px;
    }
    &:hover {
        opacity: 0.5;
    }
    @media (min-width: 1500px) {
        display: ${({ hide }) => (hide ? 'none' : 'block')};
    }
`;

export const PrevButton = styled(NextButton)`
    left: 13px;
    right: auto;
`;
