import styled from "styled-components";

export const MembersContainer = styled.div`
    background:var(--color-white);
    box-shadow: 0px 3px 6px #00000066;
    border-radius:13px;
    position:relative;
    text-align:center;
    overflow:hidden;
    padding: 35px 7px 7px;
    
    @media(min-width:490px){
        padding: 35px 60px 40px;
    }
    @media(min-width:1000px){
        padding: 35px 18px 40px;
    }

    @media(min-width:1550px){
        height:550px;
        padding: 35px 75px 40px;
    }
    h2{
        font-weight:700;
        font-size:1.15rem;
        text-transform: uppercase;
        color:var(--color-primary);
    }
`;

export const MemberContainer = styled.li`
    border-bottom: 1px solid #707070;
    display:flex;
    align-items:center;
    padding-bottom:.7rem;
    justify-content:space-between;
    margin-bottom:25px;
    margin-top:5px;
    height:max-content;
    img{
        width:20px;
        height:20px;
        object-fit:cover;
        aspect-ratio:1/1;
        outline:1px solid var(--color-primary-dark);
        border-radius:50%;
        @media(min-width:300px){
            width:30px;
            height:30px;
        }
        @media(min-width:320px){
            width:35px;
            height:35px;
        }
    }
    p{
        font-size:.8rem;
        color:#676767;
        font-weight:400;
        max-width:100%;
        text-overflow: ellipsis;
    }
    div{
        display:flex;
        align-items:center;
        gap:7px;
        position:relative;
        &::before{
            content: '';
            position:absolute;
            width:19px;
            left:0;
            height:5px;
            background:var(--color-white);
            bottom:-.9rem;
            @media(min-width:300px){
                width:29px;
            }
            @media(min-width:320px){
                width:34px;
            }
        }
    }
`;

export const CloseButton = styled.button`
    background:none;
    border:none;
    position:absolute;
    left:10px;
    top:10px;
    cursor:pointer;
    padding:5px;
    img{
        width:1.5rem;
        height:1.5rem;
        display:block;
    }
`;

export const MembersWrapper = styled.div`
    margin-top:14px;
    box-shadow: 0px 3px 6px #00000029;
    border: 1px solid #707070;
    border-radius: 13px;
    gap:30px;
    position:relative;
    display:block;

    ul{
        list-style:none;
    }

    h3{
        font-weight:700;
        color: var(--color-primary);
        text-transform: uppercase;
        font-size:.9rem;
        margin-top:25px;
    }

    &::before{
        visibility:hidden;
        position:absolute;
        content:'';
        height:80%;
        width:${({isOwner}) => isOwner ? '1px' : '0px'};
        background: #707070;
        left:50%;
        top:15%;
        transform:translateX(-50%);
    }

    @media(min-width:720px){
        display:flex;
        &::before{
            visibility:visible;
        }
    }
    @media(min-width:900px){
        display:block;
        &::before{
            visibility:hidden;
        }
    }
    @media(min-width:1000px){
        display:flex;
        &::before{
            visibility:visible;
        }
    }
`;

export const MembersGroup = styled.div`
    width:100%;
`;

export const List = styled.ul`
    padding: 0px 15px;

    ${({emptyInformation}) => emptyInformation && `
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

export const OverflowContainer = styled.div`
    overflow:auto;
    margin:auto;
    margin-top:18px;
    max-width:400px;

    h4, h5{
        font-weight:500;
        color: var(--color-primary);
        text-transform: uppercase;
        font-size:.7rem;
        text-align:start;
        margin-left:40px;
    }

    ${({isOwner}) => isOwner ? `
        @media(min-width:720px){
            height:350px;
        }
        @media(min-width:900px){
            height:auto;
        }
        @media(min-width:1000px){
            height:350px;
        }
    ` : `
        @media(min-width:1300px){
            height:350px;
        }
    `}
`;

export const MemberButton = styled.button`
    border:none;
    background:none;
    cursor:pointer;
    padding:0px;
    img{
        display:block;
        width:20px;
        height:20px;
        outline:none;
        @media(min-width:300px){
            width:25px;
            height:25px;
        }
    }

    &:disabled{
        opacity:0.5;
    }
`;