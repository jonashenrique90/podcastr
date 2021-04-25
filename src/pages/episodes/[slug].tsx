import { FC } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { GetServerSideProps, GetStaticPaths } from 'next';
import EpisodeProps from '../../lib/utils/episodes';
import { api } from '../../services/api';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { convertDurationToTimeString } from '../../lib/utils/convertDurationToTimeString';
import { EpisodeContainer, ThumbnailContainer, Description } from './styles';

interface EpisodeProp {
    episode: EpisodeProps;
}

const Episode: FC<EpisodeProp> = ({ episode }) => {

    return (
        <EpisodeContainer>
            <ThumbnailContainer>
                <Link href="/">
                    <button type="button">
                        <img src="/podcastr/arrow-left.svg" alt="voltar" />
                    </button>
                </Link>
                <Image
                    width={700}
                    height={160}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit="cover"
                />
                <button type="button">
                    <img src="/podcastr/play.svg" alt="Tocar episódio" />
                </button>
            </ThumbnailContainer>
            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.duration}</span>
            </header>
            <Description
                dangerouslySetInnerHTML={{ __html: episode.description }}
            />

        </EpisodeContainer>
    )
}

export default Episode

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.params;
    const { data } = await api.get(`episodes/${slug}`)

    const episode = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MMM yyyy', {
            locale: ptBR,
        }),
        duration: convertDurationToTimeString(Number(data.file.duration)),
        description: data.description,
        url: data.file.url,
    }

    return {
        props: {
            episode,
        }
    }
}

// export const getStaticPaths: GetStaticPaths = async () => {
//     return {
//         paths: [],
//         fallback: 'blocking'
//     }
// }

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
