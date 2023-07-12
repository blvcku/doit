import styled, { css } from 'styled-components';

export const ProjectMembersListContainer = styled.div`
    background: var(--color-white);
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 13px;
    position: relative;
    text-align: center;
    overflow: hidden;
    padding: 35px 7px 7px;

    @media (min-width: 490px) {
        padding: 35px 60px 40px;
    }
    @media (min-width: 1000px) {
        padding: 35px 18px 40px;
    }

    @media (min-width: 1550px) {
        height: 550px;
        padding: 35px 75px 40px;
    }
`;

export const ProjectMembersListIcon = styled.img``;

export const ProjectMembersListHeading = styled.h2`
    font-weight: 700;
    font-size: 1.15rem;
    text-transform: uppercase;
    color: var(--color-primary);
`;

export const ProjectMembersListCloseButton = styled.button`
    background: none;
    border: none;
    position: absolute;
    left: 10px;
    top: 10px;
    cursor: pointer;
    padding: 5px;
`;

export const ProjectMembersListCloseButtonIcon = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    display: block;
`;

export const ProjectMembersListWrapper = styled.div`
    margin-top: 14px;
    box-shadow: 0px 3px 6px #00000029;
    border: 1px solid #707070;
    border-radius: 13px;
    gap: 30px;
    position: relative;
    display: block;
    &::before {
        visibility: hidden;
        position: absolute;
        content: '';
        height: 80%;
        width: ${({ isOwner }) => (isOwner ? '1px' : '0px')};
        background: #707070;
        left: 50%;
        top: 15%;
        transform: translateX(-50%);
    }

    @media (min-width: 720px) {
        display: flex;
        &::before {
            visibility: visible;
        }
    }
    @media (min-width: 900px) {
        display: block;
        &::before {
            visibility: hidden;
        }
    }
    @media (min-width: 1000px) {
        display: flex;
        &::before {
            visibility: visible;
        }
    }
`;

export const ProjectMembersListGroup = styled.div`
    width: 100%;
`;

export const ProjectMembersListGroupHeading = styled.h3`
    font-weight: 700;
    color: var(--color-primary);
    text-transform: uppercase;
    font-size: 0.9rem;
    margin-top: 25px;
`;

export const ProjectMembersListList = styled.ul`
    padding: 0px 15px;
    list-style: none;

    ${({ emptyInformation }) =>
        emptyInformation &&
        `
        &:empty{
            height:70px;
            position:relative;
            &::before{
                content:'${emptyInformation}';
                display:block;
                position:absolute;
                font-size:.8rem;
                color:var(--color-primary);
                top:40%;
                left:50%;
                transform:translate(-50%,-50%);
            }
        }
    `}
`;

export const ProjectMembersListOverflowContainer = styled.div`
    overflow: auto;
    margin: auto;
    margin-top: 18px;
    max-width: 400px;
    ${({ isOwner }) =>
        isOwner
            ? css`
                  @media (min-width: 720px) {
                      height: 350px;
                  }
                  @media (min-width: 900px) {
                      height: auto;
                  }
                  @media (min-width: 1000px) {
                      height: 350px;
                  }
              `
            : css`
                  @media (min-width: 1300px) {
                      height: 350px;
                  }
              `}
`;

export const ProjectMembersListGroupHeadingSmall = styled.h4`
    font-weight: 500;
    color: var(--color-primary);
    text-transform: uppercase;
    font-size: 0.7rem;
    text-align: start;
    margin-left: 40px;
`;
