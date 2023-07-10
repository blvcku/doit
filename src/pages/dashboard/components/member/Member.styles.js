import styled from 'styled-components';

export const MemberContainer = styled.li`
    border-bottom: 1px solid #707070;
    display: flex;
    align-items: center;
    padding-bottom: 0.7rem;
    justify-content: space-between;
    margin-bottom: 25px;
    margin-top: 5px;
    height: max-content;
`;

export const MemberInformationsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
    position: relative;
    &::before {
        content: '';
        position: absolute;
        width: 19px;
        left: 0;
        height: 5px;
        background: var(--color-white);
        bottom: -0.9rem;
        @media (min-width: 300px) {
            width: 29px;
        }
        @media (min-width: 320px) {
            width: 34px;
        }
    }
`;

export const MemberProfileImage = styled.img`
    cursor: pointer;
    width: 20px;
    height: 20px;
    object-fit: cover;
    aspect-ratio: 1/1;
    outline: 1px solid var(--color-primary-dark);
    border-radius: 50%;
    @media (min-width: 300px) {
        width: 30px;
        height: 30px;
    }
    @media (min-width: 320px) {
        width: 35px;
        height: 35px;
    }
`;

export const MemberProfileName = styled.p`
    font-size: 0.8rem;
    color: #676767;
    font-weight: 400;
    max-width: 100%;
    text-overflow: ellipsis;
`;

export const MemberButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    padding: 0px;
    &:disabled {
        opacity: 0.5;
    }
`;

export const MemberButtonIcon = styled.img`
    display: block;
    width: 20px;
    height: 20px;
    outline: none;
    @media (min-width: 300px) {
        width: 25px;
        height: 25px;
    }
`;
