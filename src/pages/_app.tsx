import { AppProps } from 'next/app';
import { useState } from 'react';
import Header from '../components/common/header/header';
import Player from '../components/common/player/player';
import { PlayerContext } from '../hooks/PlayerContext';
import { AppWrapper } from '../styles/AppStyle';
import GlobalStyle from "../styles/GlobalStyle";

function MyApp({ Component, pageProps }: AppProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  return (
    <>
      <GlobalStyle />
      <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play, isPlaying, togglePlay, setPlayingState }}>
        <AppWrapper>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>
          <Player />
        </AppWrapper>
      </PlayerContext.Provider>
    </>
  );
}

export default MyApp
