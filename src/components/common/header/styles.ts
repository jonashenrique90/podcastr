import styled from 'styled-components';

export const HeaderContainer = styled.header`
    display: flex;
    background: var(--white);
    height: 6.5rem;
    align-items: center;
    padding: 2rem 4rem;
    border-bottom: 1px solid var(--gray-100);

    p {
        margin-left: 2rem;
        padding: 0.25rem 0 0.25rem 2rem;
        border-left: 1px solid var(--gray-100);
    }

    span {
        margin-left: auto;
        text-transform: capitalize;
    }
`;