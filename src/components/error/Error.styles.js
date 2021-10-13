import styled from "styled-components";

export const Wrapper = styled.div`
    position:fixed;
    top:0;
    right:50%;
    transform:translateX(50%);
    padding:5px;
    width:100%;
    max-width:300px;
    max-height:140px;
    height:100%;
    overflow:hidden;
    font-size:var(--fontSmall);
    color: var(--colorWhite);

    @media (min-width: 768px){
        right:0;
        transform:none;
    }
`;

export const Card = styled.div`
    display:flex;
    align-items:center;
    text-align: center;
    padding:0 35px;
    background-color:hsl(200, 21%, 9%);
    opacity:0.9;
    border-radius:7px;
    width:100%;
    height:100%;
    font-weight:700;
    position:relative;
    overflow:hidden;
    gap:6px;
    color: var(--colorRed);

    p{
        color: var(--colorWhite);
    }

    div{
        background-color: hsl(0, 0%, 24%);
        position: absolute;
        bottom:10px;
        width:85%;
        height: 10px;
        border-radius:10px;
        left:50%;
        transform:translateX(-50%);
        overflow:hidden;
    }

    .fa-times{
        color: var(--colorMuted);
        position:absolute;
        top:5px;
        right:8px;
        cursor:pointer;
    }

    div:before{
        border-radius:10px;
        content:'';
        position:absolute;
        bottom:0;
        left:0;
        width:100%;
        height:100%;
        background-color: var(--colorWhite);
        animation: error-bar-animation 10s linear;
    }

    @keyframes error-bar-animation{
        from {transform:translateX(-100%)}
        to {transform:translateX(0%)}
    }
`;
