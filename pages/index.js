import { sanityClient, urlFor } from "../sanity";
import Link from 'next/link'

const Home = ({ videos }) => {

  return (
    <div className="video-feed">
      {videos.map(video => (
        <Link href={`/video/${video.slug.current}`}>
          <div className="video-card">
            <img src={urlFor(video.thumbnail)} alt={video.title} className="thumbnail"/>
            <h3>{video.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = '*[ _type == "video"]'
  const videos = await sanityClient.fetch(query)

  if(!videos.length) {
    return {
      props: {
        videos: []
      }
    }
  } else {
    return {
      props: {
        videos
      }
    }
  }
}

export default Home