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
        text-transform: uppercase;
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

export const Wrapper = styled.div`
    width: max-content;
    grid-template-columns: 1fr 1fr 1fr;
    display: grid;
    gap: 10px;
    margin: auto;
    inset: 0;
    padding-bottom: 20px;
    padding-top: 20px;
    button {
        display: block;
        cursor: pointer;
        padding: 4px;
        aspect-ratio: 1/1;
        background: none;
        box-shadow: 0px 3px 6px #00000029;
        border: 1px solid #707070;
        border-radius: 13px;
        color: #676767;
        font-size: 0.4rem;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        @media (min-width: 310px) {
            font-size: 0.5rem;
        }
        @media (min-width: 360px) {
            padding: 10px;
        }
        @media (min-width: 470px) {
            padding: 20px;
        }
        img {
            margin: auto;
            inset: 0;
            display: block;
            margin-bottom: 6px;
            aspect-ratio: 1/1;
            max-width: 20px;
            height: auto;
            width: 100%;
            @media (min-width: 375px) {
                max-width: 25px;
            }
            @media (min-width: 410px) {
                max-width: 35px;
            }
            @media (min-width: 470px) {
                max-width: 45px;
            }
        }
    }
    @media (min-width: 275px) {
        gap: 20px;
    }
    @media (min-width: 450px) {
        gap: 40px;
        padding-bottom: 40px;
    }
`;
