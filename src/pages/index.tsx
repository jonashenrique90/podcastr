import Head from 'next/head';
import { GetServerSideProps } from 'next';
import EpisodeProps from '../lib/utils/episodes';
import { FC } from 'react';
interface EpisodesProps {
  episodes: EpisodeProps[];
}

const Home: FC<EpisodesProps> = ({ episodes }) => {

  return (
    <>
      <Head>
        <title>🎧 Podcastr | Seu podcast de Tecnologia</title>
      </Head>
      <p>Index</p>
      {episodes && episodes.map(epi => (
        <h5>{epi.title}</h5>
      ))
      }
    </>
  );
}

export default Home

// ServerSideProps
export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
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