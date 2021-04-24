import { FC } from 'react';
import { PlayerContainer, EmptyPlayer, PlayerFooter, Progress, EmptySlider, PlayerButtons, SliderContainer } from './styles';



const Player: FC = () => {


    return (
        <PlayerContainer>
            <header>
                <img src="/podcastr/playing.svg" alt="Tocando agora" />
                <strong>Tocando agore</strong>
            </header>
            <EmptyPlayer>
                <strong>Selecione um podcast para ouvir</strong>
            </EmptyPlayer>
            <PlayerFooter>
                <Progress>
                    <span>00:00</span>
                    <SliderContainer>
                        <EmptySlider></EmptySlider>
                    </SliderContainer>
                    <span>00:00</span>
                </Progress>
                <PlayerButtons>
                    <button type="button">
                        <img src="/podcastr/shuffle.svg" alt="Embaralhar" />
                    </button>
                    <button type="button">
                        <img src="/podcastr/play-previous.svg" alt="Tocar anterior" />
                    </button>
                    <button type="button" className="playButton">
                        <img src="/podcastr/play.svg" alt="Tocar" />
                    </button>
                    <button type="button">
                        <img src="/podcastr/play-next.svg" alt="Tocar pŕxima" />
                    </button>
                    <button type="button">
                        <img src="/podcastr/repeat.svg" alt="Repetir" />
                    </button>
                </PlayerButtons>
            </PlayerFooter>

        </PlayerContainer>
    )
}

export default Player
