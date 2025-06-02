import heart from "../../images/favorite_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { QUERY_POST } from "../../utils/queries";
import UserPlaceHolder from "../../assets/react.svg";
import { format } from 'date-fns';

type Reply = {
  _id?: string;
  poster?: {
    refId?: {
        username?: string;
        orgName?: string;
        avatar?: {
            url?: string
        };
    }
  }
  contentText: string;
  likesCount: number;
  createdAt: Date;
};

type RepliesProps = {
  replyIds: string[];
};

export default function Replies({ replyIds }: RepliesProps) {
  const client = useApolloClient();
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchReplies = async () => {
        setLoading(true);
        setError(null);
        try {
            const results = await Promise.all(
            replyIds.map((id) =>
                client.query({
                query: QUERY_POST,
                variables: { postId: id },
                })
            )
            );
            const repliesData = results.map((r) => r.data.post);
            setReplies(repliesData);
        } catch (err: unknown) {
            console.error("Error fetching replies", err);
            setError("Failed to load replies.");
        } finally {
            setLoading(false);
        }
    };

    if (replyIds.length > 0) {
      fetchReplies();
    }
  }, [replyIds, client]);

  if (loading) return <div>Loading replies...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="comment-page-container">
      <div className="replies-box">
        {replies.map((reply, index) => (
          <div className="reply-container" key={index}>
            <div className="comment-row">
              <div className="reply-img">
                <img src={reply.poster?.refId?.avatar?.url || UserPlaceHolder } alt="avatar" />
              </div>
              <div className="reply-content">
                <div>{reply.poster?.refId?.username || reply.poster?.refId?.orgName || "Unknown User"}</div>
                <div>{format(new Date(reply.createdAt), 'MMM d, yyyy') }</div>
                <div>{reply.contentText}</div>
                <div className="reply-icon-row">
                  <div className="reply-likes-container">
                    <img src={heart} alt="heart icon" />
                    <button>{reply.likesCount}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}