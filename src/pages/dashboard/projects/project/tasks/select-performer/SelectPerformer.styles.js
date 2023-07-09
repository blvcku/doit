import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    text-align: center;
    padding-bottom: 10px;
    h2 {
        font-size: 1rem;
        color: var(--color-primary);
        font-weight: 700;
        margin-bottom: 15px;
    }
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    position: absolute;
    left: -0.5rem;
    top: -1.5rem;
    cursor: pointer;
    padding: 5px;
    img {
        width: 1.5rem;
        height: 1.5rem;
    }
    @media (min-width: 560px) {
        left: -1.3rem;
        top: -1rem;
    }
`;

export const Wrapper = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: 1fr;
    max-width: 500px;
    width: 100%;
    margin: auto;
    inset: 0;
    column-gap: 80px;
    padding: 0px 5px 10px;
    max-height: 300px;
    min-height: 100px;
    overflow: auto;
    @media (min-width: 340px) {
        padding: 0px 20px 10px;
    }
    @media (min-width: 750px) {
        grid-template-columns: 1fr 1fr;
        max-width: 700px;
    }
    @media (min-width: 900px) {
        grid-template-columns: 1fr;
        max-width: 500px;
    }
    @media (min-width: 1470px) {
        grid-template-columns: 1fr 1fr;
        max-width: 700px;
    }
`;
