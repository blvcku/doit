import styled from 'styled-components';

export const ProjectBannerContainer = styled.header`
    background: ${({ background }) =>
        background ? `url(${background})` : 'var(--color-primary)'};
    background-size: cover;
    background-position: center center;
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 43px 43px 13px 13px;
    display: grid;
    overflow: hidden;
    &::before {
        background: rgba(9, 114, 140, 0.8);
        content: '';
        display: block;
        grid-area: 1 / 1 / 2 / 2;
        justify-self: stretch;
    }
`;

export const ProjectBannerTitle = styled.input`
    overflow-wrap: break-word;
    width: 100%;
    display: block;
    background: none;
    border: none;
    color: var(--color-white);
    font-weight: 700;
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    text-shadow: 0px 3px 6px #00000063;
    &:focus {
        outline: none;
    }
`;

export const ProjectBannerDescription = styled.textarea`
    text-shadow: 0px 3px 6px #00000063;
    overflow-wrap: break-word;
    resize: none;
    height: max-content;
    margin-top: 10px;
    font-size: clamp(0.8rem, 2vw, 1.3rem);
    width: 100%;
    display: block;
    background: none;
    border: none;
    color: var(--color-white);
    font-weight: 700;
    &:focus {
        outline: none;
    }
`;

export const ProjectBannerButton = styled.button`
    background: none;
    border: none;
    margin-right: 6px;
    padding: 7px;
    cursor: pointer;
`;

export const ProjectBannerButtonImage = styled.img`
    width: 29px;
    height: 29px;
`;

export const ProjectBannerLabel = styled.label`
    padding: 7px;
    display: block;
    cursor: pointer;
`;

export const ProjectBannerFileInput = styled.input`
    display: none;
`;

export const ProjectBannerContentContainer = styled.div`
    grid-area: 1 / 1 / 2 / 2;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: end;
    gap: 10px;
    padding: 40px 0px 0px;
    @media (min-width: 700px) {
        flex-direction: row;
        gap: 40px;
        padding: 120px 0px 20px;
    }
`;

export const ProjectBannerTextContainer = styled.div`
    padding: 0px 25px 0px 25px;
    width: 100%;
    @media (min-width: 1300px) {
        padding: 0px 0px 0px 100px;
    }
`;

export const ProjectBannerButtonsContainer = styled.div`
    padding: 0px 25px 0px 25px;
    display: flex;
    margin-bottom: 1.2rem;
    &:empty {
        margin-bottom: 2.4rem;
    }
    @media (min-width: 1300px) {
        padding: 0px 100px 0px 0px;
    }
`;
