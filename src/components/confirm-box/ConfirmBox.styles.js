import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(78, 82, 80, 0.6);
    z-index: 999;
`;

export const Box = styled.div`
    box-shadow: 0px 3px 6px #0000005e;
    background: var(--color-white);
    padding: 40px 30px;
    border-radius: 13px;
    margin: 30px 10px;
    max-width: 480px;
    width: 100%;
    text-align: center;
    animation: pop-up 0.5s cubic-bezier(0, 0.67, 0.29, 1.3) forwards;
    p {
        font-size: clamp(0.9rem, 2vw, 1.1rem);
        color: var(--color-primary);
        font-weight: 500;
        margin-bottom: 30px;
    }
    button:nth-child(3) {
        background: var(--color-accent-dark);
        margin-left: 5px;
        color: var(--color-white);
    }
    button {
        padding: 11px 45px;
        border: none;
        background: none;
        font-size: 1rem;
        color: var(--color-accent-dark);
        border-radius: 12px;
        cursor: pointer;
    }
    @media (min-width: 400px) {
        padding: 50px 40px;
    }

    @keyframes pop-up {
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
    }
`;
