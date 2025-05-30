import { Comment } from "../../mockdata/mocktypes/PostDetails"
import heart from "../../images/favorite_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"

export default function Replies( { comment }: { comment: Comment } ) {
  return (
    <div className="comment-page-container">
        <div className="replies-box">
            {comment.replies?.map((reply, index) => (
                <div className="reply-container" key={index}>
                    <div className="comment-row">
                        <div className="reply-img">
                            <img src={reply.avatar}></img>
                        </div>
                        <div className="reply-content">
                            <div>{reply.user}</div> 
                            <div>{reply.comment}</div>
                            <div className="reply-icon-row">
                            <div className="reply-likes-container">
                                <img src={heart} alt="heart icon" />
                                <button>{reply.likeCount}</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
