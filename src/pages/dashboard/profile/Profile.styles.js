import styled from 'styled-components';

export const ProfileWrapper = styled.section`
    margin: 20px 20px 20px 20px;
    @media (min-width: 900px) {
        margin: 80px 30px 20px 0;
    }
`;

export const ProfileContainer = styled.div`
    display: grid;
    gap: 30px;
    @media (min-width: 1300px) {
        max-width: 1250px;
        width: 100%;
        grid-template-columns: 5fr 4fr;
        grid-template-rows: 260px 90px 380px;
    }
`;

export const ProfileAsideContainer = styled.aside`
    order: -1;
    background: var(--color-primary);
    border-radius: 43px 43px 13px 13px;
    box-shadow: 0px 3px 6px #00000066;
    display: grid;
    place-items: center;
    text-align: center;
    @media (max-width: 1300px) {
        padding: 60px 0;
    }
`;

export const ProfileAsideWrapper = styled.div``;

export const ProfileIcon = styled.img`
    width: 45px;
    height: 45px;
    @media (min-width: 360px) {
        width: 60px;
        height: 60px;
    }
`;

export const ProfileHeading = styled.h2`
    color: var(--color-white);
    font-size: 1.6rem;
    @media (min-width: 360px) {
        font-size: 2rem;
    }
`;

export const ProfileButtonsContainer = styled.div`
    max-width: 220px;
    margin: auto;
    margin-top: 25px;
    padding: 0 1rem;
    button:nth-child(2) {
        margin-top: 15px;
    }
    button {
        display: block;
        width: 100%;
        margin-top: 0px;
        padding: 9px 0px;
    }
`;

export const ProfileImageContainer = styled.figure`
    margin-top: 20px;
`;

export const ProfileName = styled.figcaption`
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-primary);
    margin-top: 6px;
    word-break: break-word;
    @media (min-width: 310px) {
        font-size: 1.35rem;
    }
    @media (min-width: 400px) {
        font-size: 1.9rem;
    }
    @media (min-width: 1500px) {
        font-size: 2.1rem;
    }
    padding: 0px 10px;
`;

export const ProfileImage = styled.img`
    object-fit: cover;
    width: 150px;
    height: 150px;
    aspect-ratio: 1/1;
    outline: 2px solid var(--color-primary);
    border-radius: 50%;
    @media (min-width: 400px) {
        width: 200px;
        height: 200px;
    }
`;

export const ProfileFileLabel = styled.label`
    font-size: 0.9rem;
    font-weight: 500;
    text-decoration: underline;
    color: var(--color-primary);
    cursor: pointer;
    display: block;
    margin-top: 3px;
`;

export const ProfileFileInput = styled.input`
    display: none;
`;
