import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import EpisodeProps from '../lib/utils/episodes';
import { FC } from 'react';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { api } from '../services/api';
import { convertDurationToTimeString } from '../lib/utils/convertDurationToTimeString';
import { HomePageContainer, LatestEpisodes, AllEpisodes, EpisodeDetails } from '../styles/HomePage';
interface EpisodesProps {
  latestEpisodes: EpisodeProps[];
  allEpisodes: EpisodeProps[];
}

const Home: FC<EpisodesProps> = ({ latestEpisodes, allEpisodes }) => {

  return (
    <>
      <Head>
        <title>🎧 Podcastr | Seu podcast de Tecnologia</title>
      </Head>
      <HomePageContainer>
        <LatestEpisodes>
          <h2>Últimos Lançamentos</h2>
          <ul>
            {latestEpisodes.map(episode => {
              return (
                <li key={episode.id}>
                  <Image
                    width={192}
                    height={192}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                  />
                  <EpisodeDetails>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                    <p>{episode.members}</p>
                    <span>{episode.publishedAt}</span>
                    <span>{episode.duration}</span>
                  </EpisodeDetails>
                  <button type="button">
                    <img src="/podcastr/play-green.svg" alt="Tocar episodio" />
                  </button>
                </li>
              )
            })}
          </ul>
        </LatestEpisodes>
        <AllEpisodes>
          <h2>Todos Episódios</h2>
          <table cellSpacing={0}>
            <thead>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </thead>
            <tbody>
              {allEpisodes.map(episode => {
                return (
                  <tr key={episode.id}>
                    <td>
                      <Image
                        width={120}
                        height={120}
                        src={episode.thumbnail}
                        alt={episode.title}
                        objectFit="cover"
                      />
                    </td>
                    <td>
                      <Link href={`/episodes/${episode.id}`}>
                        <a>{episode.title}</a>
                      </Link>
                    </td>
                    <td>{episode.members}</td>
                    <td>{episode.publishedAt}</td>
                    <td>{episode.duration}</td>
                    <td>
                      <button type="button">
                        <img src="/podcastr/play-green.svg" alt="Tocar episodio" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </AllEpisodes>
      </HomePageContainer>
    </>
  );
}

export default Home

// ServerSideProps
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yyyy', {
        locale: ptBR,
      }),
      duration: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url,
    }
  })
  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes
    }
  }
}

// Only in production
// export async function getStaticProps() {

//   const response = await fetch('http://localhost:3333/episodes')
//   const data = await response.json()

//   return {
//     props: {
//       episodes: data,
//     },
//     revalidate: 60 * 60 * 8,
//   }
// }