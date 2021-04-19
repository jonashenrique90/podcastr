import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --white: #FFF;
    --gray-100: #E1E1E6;
    --gray-300: #A8A8B3;
    --gray-700: #29292E;
    --gray-800: #1F2729;
    --gray-900: #121214;
    --cyan-500: #61DAFB;
    --yellow-500: #EBA417;
}

@media (max-width: 1080px) {
    html {
        font-size: 93.75%;
    }
}

@media (max-width: 720px) {
    html {
        font-size: 87.5%;
    }
}

body {
    background: var(--gray-900);
    color: var(--white);
}

body,
input,
textarea,
select,
button {
    font-family: 'Roboto Slab', Arial, Helvetica, sans-serif;
}

button {
    cursor: pointer;
}

a {
    color: inherit;
    text-decoration: none;
}
`