import { AppProps } from 'next/app';
import Header from '../components/common/header/header';
import Player from '../components/common/player/player';
import { PlayerContextProvider } from '../hooks/PlayerContext';
import { AppWrapper } from '../styles/AppStyle';
import GlobalStyle from "../styles/GlobalStyle";

function MyApp({ Component, pageProps }: AppProps) {


  return (
    <>
      <GlobalStyle />
      <PlayerContextProvider>
        <AppWrapper>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>
          <Player />
        </AppWrapper>
      </PlayerContextProvider>
    </>
  );
}

export default MyApp
