import styled from 'styled-components';

export const ProjectChatContainer = styled.div`
    background: #e4eff0;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 13px;
    position: relative;
`;

export const ProjectChatBannerContainer = styled.div`
    background: var(--color-primary-dark);
    box-shadow: 0px 3px 6px #0000003b;
    border-radius: 13px;
    position: relative;
    padding: 1.3rem 1rem;
    display: flex;
    gap: 1rem;
    text-align: center;
    @media (min-width: 320px) {
        gap: 1.5rem;
    }
    @media (min-width: 520px) {
        display: block;
    }
`;

export const ProjectChatBannerHeading = styled.h2`
    color: var(--color-white);
    font-size: 1.25rem;
    font-weight: 500;
    word-break: break-word;
`;

export const ProjectChatBannerButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    @media (min-width: 520px) {
        position: absolute;
        left: 1.3rem;
        top: 50%;
        transform: translateY(-50%);
    }
`;

export const ProjectChatBannerButtonIcon = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    display: block;
`;

export const ProjectChatWrapper = styled.div`
    --chatMaxWidth: 750px;
    --chatPadding: 0 1rem;
    overflow: auto;
    height: 469px;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 1300px) {
        padding-bottom: 1.7rem;
    }
`;

export const ProjectChatMessagesContainer = styled.ul`
    width: 100%;
    list-style: none;
    max-width: var(--chatMaxWidth);
    margin-top: 1rem;
    padding: var(--chatPadding);
    padding-bottom: 2rem;
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 0.5rem;
    flex: 1;
    &:empty {
        height: 100%;
        margin-top: 0;
        padding-bottom: 0 !important;
        &::before {
            text-align: center;
            content: 'Your messages will appear here..';
            color: #676767;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    @media (min-width: 1300px) {
        padding-bottom: 4rem;
    }
    @media (min--moz-device-pixel-ratio: 0) {
        padding-bottom: 5rem;
        @media (min-width: 1300px) {
            padding-bottom: 8rem;
        }
    }
`;
