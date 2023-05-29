import styled, { css } from "styled-components";

export const CanvasRendererContainer = styled.div`
    display: grid;
    margin-top: 30px;
    width: 100%;
    gap: 25px;
    @media (min-width: 1300px) {
        grid-template-columns: 1fr 70px;
        gap: 40px;
        margin-top: 60px;
    }
`;

export const CanvasRendererWrapper = styled.div`
    aspect-ratio: 1100/600;
    width: 100%;
    background: #ffffff;
    outline: 2px solid #707070;
    outline-offset: -2px;
    border-radius: 13px;
    box-shadow: 0px 3px 6px #00000029;
    overflow: hidden;
`;

export const CanvasRendererToolsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, auto);
    justify-content: center;
    align-items: center;
    column-gap: 25px;
    row-gap:35px;
    @media (min-width: 600px) {
        row-gap:25px;
        display: flex;
        justify-content: center;
        align-items: start;
    }
    @media (min-width: 1300px) {
        justify-content: flex-start;
        flex-direction: column;
    }
`;

export const CanvasRendererToolButton = styled.button`
    border: none;
    aspect-ratio: 1/1;
    padding: 15px;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 13px;
    cursor: pointer;
    ${({ active }) =>
        active
            ? css`
                  background-color: var(--color-primary);
                  img,
                  svg {
                      color: var(--color-white);
                  }
              `
            : css`
                  background-color: transparent;
                  outline: 2px solid var(--color-primary);
                  outline-offset: -2px;
                  img,
                  svg {
                      color: var(--color-primary);
                  }
              `}
    img,svg {
        width: 30px;
        display: block;
    }

    @media(min-width:320px) {
        img,svg {
            width: 40px;
        }
    }
`;

export const CanvasRendererDeleteButton = styled(CanvasRendererToolButton)`
    outline: none;
    background-color: #db382c;
`;

export const CanvasRendererSizeSelectorContainer = styled.div`
    position: relative;
    margin-inline: 5px;
    margin-block: 5px;
    align-self: end;
    grid-column: span 3;
    & > p {
        position: absolute;
        text-align: center;
        font-weight: 700;
        color: var(--color-primary);
        bottom: 25px;
    }

    & > p:nth-of-type(1) {
        right: 0;
    }
    & > p:nth-of-type(2) {
        left: 0;
    }

    @media (min-width: 1300px) {
        width: 100%;
        margin-inline: 0;
        & > p {
            width: calc(100% - 35px);
        }
        & > p:nth-of-type(1) {
            top: 0;
            left: 35px;
        }
        & > p:nth-of-type(2) {
            bottom: 0;
            left: 35px;
            top: auto;
        }
    }
`;

export const CanvasRendererSizeSelector = styled.input`
    background: transparent;
    cursor: pointer;
    display: block;
    width:100%;
    &::-webkit-slider-runnable-track,
    &::-moz-range-track {
        outline: 2px solid var(--color-primary);
        outline-offset: -2px;
        background: none;
        height: 100%;
        width: 100%;
        border-radius: 13px;
        padding-block: 5px;
        padding-inline: 5px;
        box-shadow: 0px 3px 6px #00000029;
    }
    &::-webkit-slider-thumb,
    &::-moz-range-thumb {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: var(--color-primary);
    }

    @media (min-width: 1300px) {
        appearance: slider-vertical;
        width: 30px;
        &::-webkit-slider-runnable-track,
        &::-moz-range-track {
            padding-inline: 0;
        }
    }
`;
