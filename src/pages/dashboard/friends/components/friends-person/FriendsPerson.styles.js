import styled from 'styled-components';

export const FriendContainer = styled.li`
    position: relative;
    overflow: hidden;
    border: 2px solid var(--color-accent-dark);
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 13px;
    background: var(--color-white);
    padding: 15px 10px 2px;
    figcaption {
        font-size: 0.9rem;
        color: #676767;
        width: 100%;
        word-break: break-all;
    }
    figure {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    div:nth-child(2) {
        justify-content: center;
        transform: translateY(-15%);
        display: flex;
        align-items: center;
        gap: 7px;
        min-height: 25px;
        align-items: stretch;
    }
    @media (min-width: 500px) {
        padding: 20px 5px 25px;
        text-align: center;
        figure {
            display: block;
        }
        div:nth-child(2) {
            transform: none;
            margin-top: 30px;
            min-height: 30px;
        }
        figcaption {
            margin-top: 8px;
        }
    }
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

export const ImageContainer = styled.div`
    max-width: 50px;
    width: 100%;
    margin-top: 0px !important;
    display: grid !important;
    position: relative;
    margin: auto;
    img {
        outline: 1px solid var(--color-primary);
        object-fit: cover;
        height: 100%;
        max-width: 100%;
        width: 100%;
        border-radius: 50%;
        grid-area: 1 / 1 / 2 / 2;
        display: block;
        aspect-ratio: 1/1;
    }
    &::before {
        padding-bottom: 100%;
        content: '';
        display: block;
        grid-area: 1 / 1 / 2 / 2;
    }
    @media (min-width: 500px) {
        max-width: 80px;
    }
    @media (min-width: 700px) {
        max-width: 100px;
    }
    @media (min-width: 1300px) {
        max-width: 120px;
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
