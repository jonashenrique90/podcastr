import { FC } from 'react';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import { HeaderContainer } from './styles';

const Header: FC = () => {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR,
    });

    return (
        <HeaderContainer>
            <img src="/podcastr/logo.svg" alt="Podcastr" />
            <p>O melhor para você ouvir, sempre</p>
            <span>{currentDate}</span>
        </HeaderContainer>
    )
}

export default Header
