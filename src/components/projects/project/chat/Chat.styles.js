import styled from 'styled-components';

export const Container = styled.div`
    background: #E4EFF0;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 13px;
    position:relative;
`;

export const Banner = styled.div`
    background:var(--darkerSecondary);
    box-shadow: 0px 3px 6px #0000003B;
    border-radius: 13px;
    position:relative;
    padding:1.3rem 1rem;
    display:flex;
    gap:1rem;
    @media(min-width:320px){
        gap:1.5rem;
    }
    @media(min-width:520px){
        display:block;
    }
    text-align:center;
    h2{
        color:var(--colorWhite);
        font-size:1.25rem;
        font-weight:500;
        word-break:break-word;
    }
    button{
        background:none;
        border:none;
        cursor:pointer;
        img{
            width:1.5rem;
            height:1.5rem;
            display:block;
        }
        @media(min-width:520px){
            position:absolute;
            left:1.3rem;
            top:50%;
            transform:translateY(-50%);
        }
    }
`;

export const ChatContainer = styled.div`
    --chatMaxWidth: 750px;
    --chatPadding: 0 1rem;
    overflow:auto;
    height:469px;
    padding-bottom:1rem;
    display:flex;
    flex-direction:column;
    align-items:center;
    @media(min-width:1300px){
        padding-bottom:1.7rem;
    }
`;

export const MessagesContainer = styled.ul`
    width:100%;
    list-style:none;
    max-width: var(--chatMaxWidth);
    margin-top:1rem;
    padding:var(--chatPadding);
    padding-bottom:2rem;
    display:flex;
    flex-direction:column;
    position:relative;
    gap:.5rem;
    flex:1;
    &:empty{
        height:100%;
        margin-top:0;
        padding-bottom:0!important;
        &::before{
            content:'Your messages will appear here..';
            color:#676767;
            position:absolute;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
        }
    }
    @media(min-width:1300px){
        padding-bottom:4rem;
    }
    @media(min--moz-device-pixel-ratio:0){
        padding-bottom:5rem;
        @media(min-width:1300px){
            padding-bottom:8rem;
        }
    }
`;

export const Form = styled.form`
    position:sticky;
    bottom:0;
    padding: var(--chatPadding);
    max-width: var(--chatMaxWidth);
    display:flex;
    gap:.4rem;
    width:100%;
    div{
        position:relative;
        width:100%;
        input{
            border-radius:22px;
            background:var(--colorWhite);
            color:#8C8C8C;
            border:none;
            width:100%;
            font-size:.9rem;
            padding: .45rem 2.8rem .45rem 1.5rem;
            outline:none;
            box-shadow:${({scrolledToBottom}) => scrolledToBottom ? '0px 3px 6px #0000001F' : '0px 3px 6px #00000066'};
            transition:box-shadow .3s ease;
        }
        label{
            cursor:pointer;
            position:absolute;
            top:50%;
            right:.9rem;
            transform:translateY(-50%);
            input{
                display:none;
            }
            img{
                width:1rem;
                height:1rem;
                display:block;
            }
        }
    }
    button{
        background:var(--darkerSecondary);
        border:none;
        padding: 0 .8rem;
        box-shadow:${({scrolledToBottom}) => scrolledToBottom ? '0px 3px 6px #0000001F' : '0px 3px 6px #00000066'};
        border-radius:22px;
        cursor:pointer;
        transition:transform .2s ease, box-shadow .3s ease;
        &:active{
            transform:scale(0.95);
        }
        img{
            width:1rem;
            height:1rem;
            display:block;
        }
        &:disabled{
            opacity:.9;
        }
    }
`;

export const MessageWrapper = styled.li`
    max-width:360px;
    width:100%;
    ${({isAuthor}) => isAuthor ? `
        align-self:end;
        padding-left:2rem;
    ` : `
        align-self:start;
        padding-right:2rem;
    `}
`;

export const MessageInformations = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:.5rem;
    margin-bottom:.2rem;
    img{
        width:1.1rem;
        height:1.1rem;
        object-fit:cover;
        border-radius:50%;
    }
    p{
        font-size:.6rem;
        color:#8C8C8C;
    }
    div:nth-child(1){
        ${({isAuthor}) => isAuthor && 'order: 2;' }
        display:flex;
        align-items:center;
        gap:.3rem;
    }
`;

export const MessageContainer = styled.div`
    max-width:100%;
    padding:.7rem;
    box-shadow: 0px 3px 6px #0000001A;
    ${({isAuthor}) => isAuthor ? `
        background: #D1F8FD;
        border-radius: 4px 4px 4px 13px;
    ` : `
        background: #5FA4CF;
        border-radius: 4px 4px 13px 4px;
    `}
    ${({nextSameAuthor}) => nextSameAuthor && 'border-radius:4px;'}
    p{
        font-size:.65rem;
        word-break:break-word;
    }
    img{
        display:block;
        width:max-content;
        max-width:100%;
        height:auto;
        object-fit:contain;
        object-position:center center;
        cursor:pointer;
    }
    video{
        display:block;
        width:100%;
        height:auto;
        aspect-ratio:16/9;
    }
    audio{
        width:100%;
        display:block;
    }
`;
