import { AppProps } from 'next/app';
import Header from '../components/common/header/header';
import Player from '../components/common/player/player';
import { AppWrapper } from '../styles/AppStyle';
import GlobalStyle from "../styles/GlobalStyle";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </AppWrapper>
    </>
  );
}

export default MyApp
