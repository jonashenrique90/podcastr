import { FC, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Slider from 'rc-slider';
import "rc-slider/assets/index.css";
import { usePlayer } from '../../../hooks/PlayerContext';
import { PlayerContainer, EmptyPlayer, PlayerFooter, Progress, EmptySlider, PlayerButtons, SliderContainer, CurrentEpisode } from './styles';
import { convertDurationToTimeString } from '../../../lib/utils/convertDurationToTimeString';

const Player: FC = () => {
    const {
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        togglePlay,
        setPlayingState,
        playNext,
        playPrevious,
        toggleLoop,
        toggleShuffle,
        hasNext,
        hasPrevious,
        isLooping,
        isShuffling,
        clearPlayerState
    } = usePlayer();

    const [progress, setProgress] = useState(0);
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

    function setupProgressListener() {
        audioRef.current.currentTime = 0;
        audioRef.current.addEventListener('timeupdate', () => {
            setProgress(Math.floor(audioRef.current.currentTime));
        })
    }

    function handleSeek(amount: number) {
        audioRef.current.currentTime = amount;
        setProgress(amount);
    }
    function handleEpisodeEnded() {
        if (hasNext) {
            playNext();
        } else {
            clearPlayerState();
        }
    }

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
                    <span>{convertDurationToTimeString(progress)}</span>
                    <SliderContainer>
                        {episode ? (
                            <Slider
                                max={episode.duration}
                                value={progress}
                                onChange={handleSeek}
                                trackStyle={{ backgroundColor: '#04D361' }}
                                railStyle={{ backgroundColor: '#9F75FF' }}
                                handleStyle={{ borderColor: '#04D361', borderWidth: 4 }}
                            />
                        ) : (
                            <EmptySlider></EmptySlider>
                        )}
                    </SliderContainer>
                    <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
                </Progress>
                {episode && (
                    <audio
                        ref={audioRef}
                        src={episode.url}
                        autoPlay
                        onEnded={handleEpisodeEnded}
                        loop={isLooping}
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                        onLoadedMetadata={setupProgressListener}
                    />
                )}
                <PlayerButtons>
                    <button type="button" disabled={!episode || episodeList.length === 1} onClick={toggleShuffle} className={isShuffling ? 'isActive' : ''}>
                        <img src="/podcastr/shuffle.svg" alt="Embaralhar" />
                    </button>
                    <button type="button" onClick={playPrevious} disabled={!episode || !hasPrevious}>
                        <img src="/podcastr/play-previous.svg" alt="Tocar anterior" />
                    </button>
                    <button type="button" className="playButton" disabled={!episode} onClick={togglePlay}>
                        {isPlaying ? (
                            <img src="/podcastr/pause.svg" alt="Pause" />
                        ) : (
                            <img src="/podcastr/play.svg" alt="Tocar" />
                        )}
                    </button>
                    <button type="button" disabled={!episode || !hasNext} onClick={playNext}>
                        <img src="/podcastr/play-next.svg" alt="Tocar pŕxima" />
                    </button>
                    <button type="button" className={isLooping ? 'isActive' : ''} disabled={!episode} onClick={toggleLoop}>
                        <img src="/podcastr/repeat.svg" alt="Repetir" />
                    </button>
                </PlayerButtons>
            </PlayerFooter>

        </PlayerContainer>
    )
}

export default Player
