import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root{
        --color-white: #F3FEFF;
        --color-white-dark: #E4F3F5;
        --color-accent: #23ACA8;
        --color-accent-dark: #0e8e8c;
        --color-primary: #09728C;
        --color-primary-dark: #155883;
    }
    *{
        box-sizing: border-box;
        font-family: 'Rubik', sans-serif;
        font-weight: 400;
        margin: 0;
        padding: 0;
    }
    body{
        background-color: var(--color-white-dark);
        h1,h2{
            font-weight: 700;
        }
        b{
            font-weight:700;
        }
        img{
            font-size:0;
        }
        a{
            text-decoration:none;
        }
    }
    html{
        font-size:100%;
    }
    @media (min-width: 600px){
        html{
            font-size:calc(100% + 1px);
        }
    }
    @media (min-width: 768px){
        html{
            font-size:calc(100% + 2px);
        }
    }
    @media (min-width: 992px){
        html{
            font-size:calc(100% + 3px);
        }
    }
    @media (min-width: 1200px){
        html{
            font-size:calc(100% + 4px);
        }
    }
`;

export default GlobalStyle;