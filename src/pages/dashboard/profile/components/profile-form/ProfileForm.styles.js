import styled from 'styled-components';

export const ProfileFormContainer = styled.form`
    background: var(--color-white);
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 13px;
    text-align: center;
    padding: 45px 0px;
    position: relative;
    overflow: hidden;
    &:nth-child(2) {
        @media (min-width: 1300px) {
            grid-row: span 2;
        }
    }
    &:nth-child(3) {
        order: -1;
        @media (min-width: 1300px) {
            grid-row: span 2;
            order: 0;
        }
    }
`;

export const ProfileFormHeading = styled.h3`
    color: var(--color-primary);
    font-size: 1.2rem;
    font-weight: 700;
    padding: 0px 15px;
    @media (min-width: 360px) {
        font-size: 1.4rem;
    }
`;

export const ProfileFormInputsContainer = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    max-width: 430px;
    width: 100%;
    margin: auto;
    margin-top: 30px;
    padding: 0px 15px;
    inset: 0;
    text-align: start;
    row-gap: 7px;
    align-items: center;
    @media (min-width: 290px) {
        padding: 0px 30px;
    }
    @media (min-width: 400px) {
        grid-template-columns: 120px 1fr;
        row-gap: 40px;
        margin-top: 60px;
    }
`;

export const ProfileFormSuccesMessage = styled.p`
    position: absolute;
    left: 50%;
    bottom: -30px;
    transform: translateX(-50%);
    font-size: 0.7rem;
    color: #018c5c;
    width: 100%;
    padding: 0 5px;
    text-align: center;
    @media (min-width: 400px) {
        bottom: -40px;
    }
`;
