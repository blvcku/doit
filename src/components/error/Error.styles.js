import styled from "styled-components";

export const Wrapper = styled.div`
    position:fixed;
    top:0;
    right:50%;
    transform:translateX(50%);
    padding:5px;
    width:100%;
    max-width:340px;
    max-height:170px;
    height:100%;
    font-size:var(--fontSmall);
    color: var(--colorWhite);
    z-index:500;

    @media (min-width: 768px){
        right:0;
        transform:none;
    }
`;

export const Card = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;
    text-align:center;
    padding:15px 14px;
    background-color:var(--colorWhite);
    opacity:0.9;
    border-radius:13px;
    width:100%;
    height:100%;
    overflow:hidden;
    color: var(--colorRed);
    animation: appear-animation .5s ease forwards;

    button{
        align-self:start;
        background:none;
        border:none;
        img{
            width:22px;
            height:22px;
        }
        cursor:pointer;
    }

    p{
        color: var(--colorSecondary);
        font-weight:700;
        margin:9px 0px;
        max-height:50px;
        height:100%;
        font-size: clamp(.7rem,4vw,.8rem);
        max-width:80%;
    }

    div{
        background-color: var(--colorSecondary);
        position: relative;
        width:90%;
        height: 7px;
        border-radius:10px;
        overflow:hidden;
        border:2px solid var(--colorSecondary);
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

    @keyframes appear-animation{
        from {transform:translateY(-200%)}
        to {transform:translateY(0)}
    }
`;
