import { sanityClient, urlFor } from "../../sanity"
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Comment from '../../components/Comment'
import SanityMuxPlayer from 'sanity-mux-player'

const Video = ({
    title,
    asset,
    thumbnail,
    date,
    description,
    author,
    interactions,
}) => {

    const sentimentCount = (interactions, sentiment) => {
        return interactions.filter( interaction => interaction.sentiment == sentiment).length
    }

    const isMultiple = (value) => (value === 0 || value > 1 ? "s" : "")

    return (
        <div className="video">

            <SanityMuxPlayer
                assetDocument={asset}
                autoload={true}
                autoplay={false}
                loop={false}
                muted={false}
                showControls={true}
            />

            <h3>{title}</h3>
            <div className="video-info">
                <h6>Released on {date}</h6>
                <div className="sentiment">
                    <h3><FontAwesomeIcon className="icon" icon={faThumbsUp}/>{sentimentCount(interactions, 'like')}</h3>
                    <h3><FontAwesomeIcon className="icon" icon={faThumbsDown}/>{sentimentCount(interactions, 'dislike')}</h3>
                </div>
            </div>

            <div className="author-info">
                <img src={urlFor(author.avatar)}/>
                <div>
                    <h4>{author.username}</h4>
                    <h6>{author.subscribers} Subscriber{isMultiple(author.subscribers)}</h6>
                    <p>{description}</p>
                </div>
            </div>
            <h3>{interactions.length} Comment{isMultiple(interactions.length)}</h3>
            <hr />
            {interactions.map((interaction, _id) => <Comment key={_id} interaction={interaction}/>)}
        </div>
    )
}

export const getServerSideProps = async (pageContext) => {
    const pageSlug = pageContext.query.slug

    const query = `*[ _type == "video" && slug.current == $pageSlug][0]{
        title,
        id,
        "asset": videoAsset.asset->,
        thumbnail,
        date,
        description,
        author->{
            id,
            username,
            slug,
            avatar,
            banner,
            subscribers,
        },
        interactions[]{
        ...,
        commenter->{
            id,
            username,
            slug,
            avatar,
            banner
            }
        }
  }`

    const video = await sanityClient.fetch(query, { pageSlug})

    if (!video) {
        return {
            props: null,
            notFound: true
        }
    } else {
        return {
            props: {
                title: video.title,
                id: video.id,
                asset: video.asset,
                thumbnail: video.thumbnail,
                date: video.date,
                description: video.description,
                author: video.author,
                interactions: video.interactions,
            }
        }
    }
}

export default Video
