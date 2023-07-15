import styled from 'styled-components';

export const ConfirmBoxWrapper = styled.div`
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

export const ConfirmBoxContainer = styled.div`
    box-shadow: 0px 3px 6px #0000005e;
    background: var(--color-white);
    padding: 40px 30px;
    border-radius: 13px;
    margin: 30px 10px;
    max-width: 480px;
    width: 100%;
    text-align: center;
    animation: confirm-box-pop-up 0.5s cubic-bezier(0, 0.67, 0.29, 1.3) forwards;
    @media (min-width: 400px) {
        padding: 50px 40px;
    }
    @keyframes confirm-box-pop-up {
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
    }
`;

export const ConfirmBoxTitle = styled.p`
    font-size: clamp(0.9rem, 2vw, 1.1rem);
    color: var(--color-primary);
    font-weight: 500;
    margin-bottom: 30px;
`;

export const ConfirmBoxButton = styled.button`
    padding: 11px 45px;
    border: none;
    background: none;
    font-size: 1rem;
    color: var(--color-accent-dark);
    border-radius: 12px;
    cursor: pointer;
    &:nth-of-type(2) {
        background: var(--color-accent-dark);
        margin-left: 5px;
        color: var(--color-white);
    }
`;
