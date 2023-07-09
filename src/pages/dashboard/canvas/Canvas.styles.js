import styled from 'styled-components';

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

export const Banner = styled.header`
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 43px 43px 13px 13px;
    background-color: var(--color-primary);
    padding: 24px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    & > input {
        font-size: clamp(1.4rem, 3vw, 2.35rem);
        text-align: center;
        color: var(--color-white);
        outline: none;
        background: none;
        border: none;
        font-weight: 700;
    }
`;
