import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root{
        --fontSuperBig: 2.2rem;
        --fontBig: 1.5rem;
        --fontMed: 1rem;
        --fontSmall: 0.7rem;
        --colorBlue: hsl(249, 87%, 66%);
        --colorLightBlue: hsl(249, 82%, 78%);
        --colorWhite: #fff;
        --colorMuted: hsl(0, 0%, 60%);
        --colorRed: hsl(0, 89%, 41%);
        --colorDarkerWhite: #E4F3F5;
        --colorMain: #23ACA8;
    }
    *{
        box-sizing: border-box;
        font-family: 'Rubik', sans-serif;
        font-weight: 400;
        margin: 0;
        padding: 0;
    }
    body{
        background-color: var(--colorDarkerWhite);
        h1{
            font-size: var(--fontSuperBig);
            font-weight: 700;
            margin:0;
        }
        h2{
            font-size: var(--fontBig);
            font-weight: 700;
            margin: 0;
        }
        h3{
            font-size: var(--fontMed);
            font-weight: 400;
            margin:0;
        }
        p{
            font-size:var(--fontSmall);
        }
        a{
            color: var(--colorLightBlue);
        }
        label{
            font-size: var(--fontMed);
        }
        input{
            font-size: var(--fontMed);
        }
    }
    html{
        font-size:16px;
    }
    
    @media (min-width: 600px){
        html{
            font-size:17px
        }
    }
    @media (min-width: 768px){
        html{
            font-size:18px
        }
    }
    @media (min-width: 992px){
        html{
            font-size:19px
        }
    }
    @media (min-width: 1200px){
        html{
            font-size:20px
        }
    }
`;

export default GlobalStyle;