import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    overflow: auto;
    z-index: 500;
    background: rgba(78, 82, 80, 0.6);
    padding: 1rem;
    @media (min-height: 430px) {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const Wrapper = styled.div`
    position: relative;
    max-width: 500px;
    width: 100%;
    box-shadow: 0px 3px 6px #0000005e;
    border-radius: 13px;
    background: var(--color-white);
    text-align: center;
    padding: 2rem 1rem;
    overflow: hidden;
    margin: auto;
    p {
        color: var(--color-primary);
        font-weight: 500;
        font-size: 1.2rem;
        margin-top: 0.7rem;
        @media (min-width: 300px) {
            font-size: 1.4rem;
        }
    }
`;

export const UserImage = styled.img`
    width: 10rem;
    height: 10rem;
    border: 3px solid var(--color-primary);
    border-radius: 50%;
    object-fit: cover;
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 0.9rem;
    left: 0.9rem;
    border: none;
    background: none;
    cursor: pointer;
    img {
        width: 1.5rem;
        height: 1.5rem;
        display: block;
    }
`;

export const ButtonWrapper = styled.div`
    justify-content: center;
    display: flex;
    align-items: center;
    gap: 7px;
    min-height: 30px;
    align-items: stretch;
    margin-top: 4rem;
`;

export const SmallButton = styled.button`
    box-shadow: 0px 3px 6px #00000029;
    background: #db382c;
    border: none;
    border-radius: 12px;
    padding: 0px 10px;
    cursor: pointer;
    img {
        width: 17px;
        height: 17px;
    }
    &:disabled {
        opacity: 0.7;
    }
`;

export const ApprovedButton = styled.button`
    box-shadow: 0px 3px 6px #00000029;
    border: 1px solid var(--color-accent-dark);
    background: none;
    border-radius: 13px;
    color: var(--color-accent-dark);
    display: flex;
    gap: 3px;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    font-weight: 400;
    padding: 5px 9px;
    img {
        width: 14px;
        height: 14px;
    }
    &:disabled {
        opacity: 0.7;
    }
`;

export const Button = styled(ApprovedButton)`
    border: none;
    background: var(--color-accent-dark);
    color: var(--color-white);
    padding: 0px 20px;
    cursor: pointer;
    &:disabled {
        opacity: 0.7;
    }
`;
