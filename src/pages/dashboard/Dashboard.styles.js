import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    @media (min-width: 900px) {
        grid-template-columns: 300px 1fr;
        display: grid;
        gap: 3rem;
    }
    @media (min-width: 1200px) {
        gap: 5rem;
    }
    @media (min-width: 1500px) {
        gap: 7rem;
    }
    @media (min-width: 2100px) {
        & > main {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            & > section {
                display: flex;
                justify-content: center;
                & > div {
                    width: 100%;
                }
            }
        }
    }
`;
