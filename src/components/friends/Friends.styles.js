import styled from "styled-components";

export const Container = styled.section`
    margin: 20px;
    @media(min-width:900px){
        margin: 80px 30px 20px 0;
    }
`;

export const Wrapper = styled.div`
    max-width:1250px;
    width:100%;
`;

export const Nav = styled.nav`
    display:grid;
    grid-template-columns: 1fr;
    gap:10px;
    @media(min-width:310px){
        grid-template-columns: 1fr 1fr;
        gap:15px;
    }
    @media(min-width:1300px){
        grid-template-columns: 2fr 1fr 1fr;
    }
    a{
        padding:25px 0 18px;
        box-shadow: 0px 3px 6px #00000029;
        text-align:center;
        border-radius:13px;
        border:2px solid var(--colorSecondary);
        text-decoration:none;
        color: var(--colorSecondary);
        font-weight:500;
        svg{
            width:30px;
            height:30px;
            fill: var(--colorSecondary);
        }
    }
    form{
        box-shadow: 0px 3px 6px #00000066;
        background:var(--colorSecondary);
        display:flex;
        justify-content:center;
        align-items:center;
        padding: 40px 20px;
        gap:10px;
        border-radius: 30px 30px 13px 13px;
        button{
            padding:6px 15px;
            border-radius: 13px;
            background:none;
            border:none;
            cursor:pointer;
            background: var(--colorWhite);
            img{
                display:block;
                width:.95rem;
                height:.95rem;
            }
        }
        input{
            width:100%;
            font-size:.7rem;
            border-radius:20px;
            border:none;
            background:var(--colorDarkerWhite);
            padding: 7px 0px 7px 20px;
            outline:none;
            color: #676767;
        }
        @media(min-width:310px){
            grid-column: span 2;
        }
        @media(min-width:350px){
            padding: 40px 50px;
        }
        @media(min-width:500px){
            padding:40px 100px;
        }
        @media(min-width:1300px){
            border-radius: 43px 13px 13px 13px;
            grid-column: auto;
        }
    }
`;

export const Section = styled.section`
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 13px;
    background:var(--colorWhite);
    margin-top:15px;
    padding:15px 5px;
    position:relative;
    overflow:hidden;
    @media(min-width:500px){
        padding: 25px 20px;
    }
    @media(min-width:650px){
        margin-top:30px;
        padding: 40px 85px;
    }
    @media(min-width:900px){
        padding: 25px 15px;
    }
    @media(min-width:1100px){
        padding: 40px 85px;
    }
    @media(min-width:1300px){
        min-height:681px;
    }

    h2{
        color: var(--colorSecondary);
        font-size:1.1rem;
        margin-left:20px;
    }
`;

export const OverflowContainer = styled.div`
    overflow:hidden;
    margin-top:25px;
    min-height:200px;
    @media(min-width:900px){
        min-height:300px;
    }
`;

export const FlexContainer = styled.div`
    display:flex;
    flex-direction:column;
    gap:18px;
    @media(min-width:1500px){
        transform: translateX(${({currentSlide}) => `${currentSlide * (-100)}%`});
        flex-direction:row;
        gap:0px;
    }
    &:empty{
        text-align:center;
        flex-direction:column;
        &::before{
            text-align:center;
            content: 'No friends';
            color:var(--colorSecondary);
            align-self:center;
            transform:translateY(110%);
            @media(min-width:900px){
                transform:translateY(400%);
            }
            @media(min-width:1300px){
                transform:translateY(850%);
            }
        }
    }
`;

export const GridContainer = styled.ul`
    padding: 0px 5px;
    flex-shrink:0;
    display:grid;
    width:100%;
    list-style:none;
    grid-template-columns: 1fr;
    gap:18px;
    @media(min-width:500px){
        grid-template-columns: repeat(2, minmax(50px, 1fr));
    }
    @media(min-width:1200px){
        column-gap:50px;
        row-gap:30px;
    }
    @media(min-width:1500px){
        grid-template-columns: repeat(4, minmax(50px, 1fr));
        grid-template-rows: 1fr 1fr;
        row-gap:35px;
        column-gap: 18px;
    }
`;

export const FriendContainer = styled.li`
    position:relative;
    overflow:hidden;
    border: 2px solid var(--colorThird);
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 13px;
    background:var(--colorWhite);
    padding: 15px 10px 2px;
    figcaption{
        font-size:.9rem;
        color:#676767;
        width:100%;
        word-break: break-all;
    }
    figure{
        display:flex;
        align-items:center;
        gap:5px;
    }
    div:nth-child(2){
        justify-content:center;
        transform: translateY(-15%);
        display:flex;
        align-items:center;
        gap:7px;
        min-height:25px;
        align-items:stretch;
    }
    @media(min-width:500px){
        padding: 20px 5px 25px;
        text-align:center;
        figure{
            display:block;
        }
        div:nth-child(2){
            transform:none;
            margin-top:30px;
            min-height:30px;
        }
        figcaption{
            margin-top:8px;
        }
    }
`;

export const ImageContainer = styled.div`
    max-width:50px;
    width:100%;
    margin-top:0px!important;
    display:grid!important;
    position:relative;
    margin:auto;
    img{
        outline: 1px solid var(--colorSecondary);
        object-fit:cover;
        height:100%;
        max-width:100%;
        width:100%;
        border-radius:50%;
        grid-area: 1 / 1 / 2 / 2;
        display:block;
    }
    &::before{
        padding-bottom:100%;
        content:'';
        display:block;
        grid-area: 1 / 1 / 2 / 2;
    }
    @media(min-width:500px){
        max-width:80px;
    }
    @media(min-width:700px){
        max-width:100px;
    }
    @media(min-width:1300px){
        max-width:120px;
    }
`;

export const SmallButton = styled.button`
    box-shadow: 0px 3px 6px #00000029;
    background:#DB382C;
    border:none;
    border-radius:12px;
    padding:0px 10px;
    cursor:pointer;
    img{
        width:17px;
        height:17px;
    }
    &:disabled{
        opacity:0.7;
    }
`;

export const ApprovedButton = styled.button`
    box-shadow: 0px 3px 6px #00000029;
    border:1px solid var(--colorThird);
    background:none;
    border-radius:13px;
    color: var(--colorThird);
    display:flex;
    gap:3px;
    align-items:center;
    justify-content:center;
    font-size: .6rem;
    font-weight:400;
    padding: 5px 9px;
    img{
        width:14px;
        height:14px;
    }
    &:disabled{
        opacity:0.7;
    }
`;

export const Button = styled(ApprovedButton)`
    border:none;
    background: var(--colorThird);
    color:var(--colorWhite);
    padding: 0px 20px;
    cursor:pointer;
    &:disabled{
        opacity:0.7;
    }
`;

export const NextButton = styled.button`
    position:absolute;
    right:13px;
    border:none;
    background:none;
    top:45%;
    opacity:0.2;
    cursor:pointer;
    transition: opacity .3s ease;
    display:none;
    svg{
        width:70px;
        height:70px;
    }
    &:hover{
        opacity:0.5;
    }
    @media(min-width:1500px){
        display:${({hide}) => hide ? 'none' : 'block'};
    }
`;

export const PrevButton = styled(NextButton)`
    left:13px;
    right:auto;
`;