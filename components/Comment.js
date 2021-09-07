import { urlFor } from '../sanity'

const Comment = ({ interaction }) => {
    return (
        <div className="comment">
            <img src={urlFor(interaction.commenter.avatar)} alt="user avatar"/>
            <div>
                <h5>{interaction.commenter.username}</h5>
                <p>{interaction.comment}</p>
            </div>
        </div>
    )
}

export default Comment