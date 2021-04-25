import { FC, useContext, useEffect, useRef } from 'react';
import Image from 'next/image';
import Slider from 'rc-slider';
import "rc-slider/assets/index.css";
import { PlayerContext } from '../../../hooks/PlayerContext';
import { PlayerContainer, EmptyPlayer, PlayerFooter, Progress, EmptySlider, PlayerButtons, SliderContainer, CurrentEpisode } from './styles';



const Player: FC = () => {
    const { episodeList, currentEpisodeIndex, isPlaying, togglePlay, setPlayingState } = useContext(PlayerContext);
    const audioRef = useRef<HTMLAudioElement>(null);

    const episode = episodeList[currentEpisodeIndex];

    useEffect(() => {
        if (!audioRef.current) {
            return;
        }
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying])

    return (
        <PlayerContainer>
            <header>
                <img src="/podcastr/playing.svg" alt="Tocando agora" />
                <strong>Tocando agora</strong>
            </header>
            {episode ? (
                <CurrentEpisode>
                    <Image
                        width={592}
                        height={592}
                        src={episode.thumbnail}
                        objectFit="cover"
                    />
                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>
                </CurrentEpisode>

            ) : (
                <EmptyPlayer>
                    <strong>Selecione um podcast para ouvir</strong>
                </EmptyPlayer>
            )}
            <PlayerFooter className={!episode ? 'empty' : ''}>
                <Progress>
                    <span>00:00</span>
                    <SliderContainer>
                        {episode ? (
                            <Slider
                                trackStyle={{ backgroundColor: '#04D361' }}
                                railStyle={{ backgroundColor: '#9F75FF' }}
                                handleStyle={{ borderColor: '#04D361', borderWidth: 4 }}
                            />
                        ) : (
                            <EmptySlider></EmptySlider>
                        )}
                    </SliderContainer>
                    <span>00:00</span>
                </Progress>
                {episode && (
                    <audio
                        ref={audioRef}
                        src={episode.url}
                        autoPlay
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                    />
                )}
                <PlayerButtons>
                    <button type="button" disabled={!episode}>
                        <img src="/podcastr/shuffle.svg" alt="Embaralhar" />
                    </button>
                    <button type="button" disabled={!episode}>
                        <img src="/podcastr/play-previous.svg" alt="Tocar anterior" />
                    </button>
                    <button type="button" className="playButton" disabled={!episode} onClick={togglePlay}>
                        {isPlaying ? (
                            <img src="/podcastr/pause.svg" alt="Pause" />
                        ) : (
                            <img src="/podcastr/play.svg" alt="Tocar" />
                        )}
                    </button>
                    <button type="button" disabled={!episode}>
                        <img src="/podcastr/play-next.svg" alt="Tocar pŕxima" />
                    </button>
                    <button type="button" disabled={!episode}>
                        <img src="/podcastr/repeat.svg" alt="Repetir" />
                    </button>
                </PlayerButtons>
            </PlayerFooter>

        </PlayerContainer>
    )
}

export default Player
