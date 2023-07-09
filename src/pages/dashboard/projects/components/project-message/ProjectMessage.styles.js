import styled from 'styled-components';

export const ProjectMessageWrapper = styled.li`
    max-width: 360px;
    width: 100%;
    ${({ isAuthor }) =>
        isAuthor
            ? `
        align-self:end;
        padding-left:2rem;
    `
            : `
        align-self:start;
        padding-right:2rem;
    `}
`;

export const ProjectMessageInformations = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.2rem;
`;

export const ProjectMessageAuthorContainer = styled.div`
    ${({ isAuthor }) => isAuthor && 'order: 2;'}
    display:flex;
    align-items: center;
    gap: 0.3rem;
`;

export const ProjectMessageAuthorImage = styled.img`
    width: 1.1rem;
    height: 1.1rem;
    object-fit: cover;
    border-radius: 50%;
`;

export const ProjectMessageAuthor = styled.p`
    font-size: 0.6rem;
    color: #8c8c8c;
`;

export const ProjectMessageDate = styled.p`
    font-size: 0.6rem;
    color: #8c8c8c;
`;

export const ProjectMessageContainer = styled.div`
    max-width: 100%;
    padding: 0.7rem;
    box-shadow: 0px 3px 6px #0000001a;
    ${({ isAuthor }) =>
        isAuthor
            ? `
        background: #D1F8FD;
        border-radius: 4px 4px 4px 13px;
    `
            : `
        background: #5FA4CF;
        border-radius: 4px 4px 13px 4px;
    `}
    ${({ nextSameAuthor }) => nextSameAuthor && 'border-radius:4px;'}
    img {
        display: block;
        width: max-content;
        max-width: 100%;
        height: auto;
        object-fit: contain;
        object-position: center center;
        cursor: pointer;
    }
    video {
        display: block;
        width: 100%;
        height: auto;
        aspect-ratio: 16/9;
    }
    audio {
        width: 100%;
        display: block;
    }
`;

export const ProjectMessageParagraph = styled.p`
    font-size: 0.65rem;
    word-break: break-word;
`;
