import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 13px;
    background:var(--colorWhite);
    position:relative;
    text-align:center;
    overflow:hidden;
    padding:3rem 1rem 2rem;
    height:34rem;
    h2{
        color:var(--darkerSecondary);
        text-transform:uppercase;
        font-weight:800;
        font-size: 1.3rem;
        margin-bottom:.5rem;
    }
    &::before{
        position:absolute;
        content:'';
        width:100%;
        height:100%;
        z-index:3;
        top:0;
        left:0;
        pointer-events:none;
        background:var(--colorWhite);
    }
    ${({status}) => status === 'public' ? `
        &::before{
            opacity:1;
        }
    ` : `
        &::before{
            opacity:0;
            transition:opacity .5s ease .3s;
        }
    `}
`;

export const CloseButton = styled.button`
    cursor:pointer;
    position:absolute;
    left: 1rem;
    top: .8rem;
    background:none;
    border:none;
    z-index:4;
    img{
        width:1.7rem;
        height:1.7rem;
    }
    @media(min-width:300px){
        left: 1.3rem;
        top: 1rem;
    }
`;

export const StatusContainer = styled.div`
    transition: all .5s ease;
    z-index:4;
    position:relative;
    ${({status}) => status === 'public' ? `
    @media(min-width:320px){
        transform:translateY(10rem) scale(1.5);
    }
    transform:translateY(10rem) scale(1.3);
    ` : `

    `}
    h3{
        display: ${({status}) => status === 'public' ? 'block' : 'none'};
        font-weight:800;
        color:var(--darkerSecondary);
        text-transform:uppercase;
        margin-bottom: .3rem;
        position:absolute;
        left:50%;
        transform:translateX(-50%);
        top:-1.7rem;
    }
`;

export const StatusButton = styled.button`
    cursor:pointer;
    color: ${({selected}) => selected ? 'var(--colorWhite)' : 'var(--darkerSecondary)'};
    background:${({selected}) => selected ? 'var(--darkerSecondary)' : 'var(--colorWhite)'};
    border:1px solid var(--darkerSecondary);
    text-transform:uppercase;
    padding: .25rem 1.4rem;
    border-radius:13px;
    box-shadow: 0px 3px 6px #00000029;
    font-weight:500;
    margin: 0 .25rem;
    font-size:.6rem;
`;

export const List = styled.ul`
    display:grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 3.75rem;
    margin:auto;
    max-width:800px;
    column-gap: 2rem;
    margin-top:1rem;
    overflow:auto;
    height:23rem;
    padding:.1rem;
    position:relative;
    @media(min-width:520px){
        grid-template-columns: 1fr 1fr;
    }
    &:empty{
        &::before{
            content:'No friends';
            color:#676767;
            font-weight:500;
            font-size:1rem;
            position:absolute;
            text-align:center;
            top:35%;
            width:100%;
        }
    }
`;

export const ListOfProjectMembers = styled(List)`
    &:empty{
        &::before{
            content:'No members';
        }
    }
`;

export const ListOfProjects = styled(List)`
    grid-template-columns:1fr!important;
    grid-auto-rows:7rem;
    margin-top:2.5rem;
    height: 25.074rem;
    gap:1.5rem;
    &:empty{
        &::before{
            content:'You Do not have any Projects!';
        }
    }
    @media(min-width:330px){
        grid-auto-rows:4.7rem;
    }
`;

export const CustomLink = styled(Link)`
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 13px;
    background:#8C8C8C;
    color:var(--colorWhite);
    text-transform: uppercase;
    padding: .3rem .7rem;
    font-weight:500;
    font-size:.6rem;
    display:flex;
    align-items:center;
    justify-content:center;
    width:fit-content;
    margin:auto;
    margin-top:.4rem;
    gap:.3rem;
    img{
        width:.7rem;
        height:.7rem;
        display:block;
    }
`;

export const ProjectContainer = styled.li`
    background:url(${({photoURL}) => photoURL});
    background-size:cover;
    background-position: center center;
    display:grid;
    box-shadow: 0px 3px 6px #00000066;
    border-radius:13px;
    height:max-content;
    min-height:4.7rem;
    &::before{
        background:rgba(14, 142, 140, 0.8);
        content:'';
        display:block;
        justify-self:stretch;
        grid-area: 1 / 1 / 2 / 2;
        border-radius:13px;
    }
    div{
        grid-area: 1 / 1 / 2 / 2;
        display:grid;
        grid-template-columns: 1fr;
        justify-items:center;
        align-items:center;
        padding: 1rem;
        gap:.6rem;
        max-width:670px;
        width:100%;
        margin:auto;
    }
    a, button{
        display:flex;
        justify-content:center;
        align-items:center;
        gap:.3rem;
        color:var(--colorWhite);
        font-weight:500;
        font-size:.6rem;
        text-transform:uppercase;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 13px;
        border:none;
        width:max-content;
        padding: .4rem .6rem;
        cursor:pointer;
        transition:transform .2s ease;
        img{
            width:.7rem;
            height:.7rem;
            display:block;
        }
        &:active{
            transform: scale(0.96);
        }
    }
    a{
        background:var(--darkerSecondary);
    }
    button{
        background:#8C8C8C;
        justify-self:center;
    }
    h3{
        text-align:center;
        font-size:.9rem;
        font-weight:500;
        color:var(--colorWhite);
        text-shadow: 0px 3px 6px #00000063;
        word-break:break-word;
        width:100%;
    }
    @media(min-width:330px){
        div{
            grid-template-columns:1fr 1fr;
        }
        h3{
            grid-column:span 2;
        }
        a{
            justify-self:end;
        }
        button{
            justify-self:start;
        }
    }
    @media(min-width:520px){
        div{
            grid-template-columns: 1fr minmax(auto, max-content) minmax(auto, max-content);
        }
        h3{
            text-align:start;
            grid-column:auto;
        }
    }
`;

export const AddEveryoneButton = styled.button`
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 13px;
    background:#8C8C8C;
    color:var(--colorWhite);
    text-transform: uppercase;
    padding: .3rem .7rem;
    font-weight:500;
    font-size:.6rem;
    display:flex;
    align-items:center;
    justify-content:center;
    width:fit-content;
    margin:auto;
    margin-top:.4rem;
    gap:.3rem;
    border:none;
    cursor:pointer;
    transition:transform .3s ease;
    img{
        width:.7rem;
        height:.7rem;
        display:block;
    }
    &:active{
        transform:scale(0.97);
    }
`;