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
    color: hsl(217, 2%, 40%);

    @media (min-width: 768px){
        right:0;
        transform:none;
    }
`;

export const Card = styled.div`
    text-align: center;
    padding:30px 20px 0px;
    background-color:hsl(200, 23%, 15%);
    opacity:0.9;
    border-radius:10px;
    width:100%;
    height:100%;
    font-weight:700;
    position:relative;
    overflow:hidden;

    &:after, &:before{
        content:'';
        position:absolute;
        bottom:0;
        left:0;
        width:100%;
        height:7px;
    }

    &:before{
        background-color:hsl(200, 23%, 30%);
    }

    &:after{
        background-color:hsl(200, 10%, 70%);
        animation: error-bar-animation 10s linear forwards;
    }

    @keyframes error-bar-animation{
        from {transform:translateX(0%)}
        to {transform:translateX(100%)}
    }
`;
