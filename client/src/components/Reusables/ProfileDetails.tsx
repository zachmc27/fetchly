import "../../main.css";
import { useEffect, useState, useMemo } from "react";
import { QUERY_USER, QUERY_ORG, QUERY_PET} from '../../utils/queries';
import { FOLLOW_AS_USER, UNFOLLOW_AS_USER, FOLLOW_AS_ORG, UNFOLLOW_AS_ORG } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import UserPlaceHolder from "../../images/person_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import { UserType } from "../../types/UserType";
import { Pet }  from "../../types/PetTypes";
import { format } from 'date-fns';

type ProfileDetailsProps = {
  profileUserId: string;
  profileAccountType: string;
}

export default function ProfileDetails({ profileUserId, profileAccountType }: ProfileDetailsProps) {
  // These should not depend on early return or condition
  const userId = localStorage.getItem('userId');
  const accountType = localStorage.getItem('accountType');
  const userType = accountType === "org" ? "Org" : "User";

  const queryToUse = profileAccountType === "Org" 
    ? QUERY_ORG
    : profileAccountType === "Pet"
    ? QUERY_PET
    : QUERY_USER;

  const variables = useMemo(() => {
    if (profileAccountType === "Org") return { orgId: profileUserId };
    if (profileAccountType === "Pet") return { petId: profileUserId };
    return { userId: profileUserId };
  }, [profileUserId, profileAccountType]);

  // Hooks must be called unconditionally:
  const { data, loading, error } = useQuery(queryToUse, { variables });
  const [user, setUser] = useState<UserType | Pet | undefined>();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (data) {
      const profileData = data.user || data.org || data.pet;

      setUser(prev => {
        if (JSON.stringify(prev) !== JSON.stringify(profileData)) {
          return profileData;
        }
        return prev;
      });

      setIsFollowing(prev => {
        const shouldFollow = Array.isArray(profileData?.followedBy) &&
          profileData.followedBy.some((follower: { refID?: { _id?: string } }) => follower?.refID?._id === userId);

        if (prev !== shouldFollow) {
          return shouldFollow;
        }
        return prev;
      });
    }
  }, [data, userId]);

  // Mutations
  const [followAsUser] = useMutation(FOLLOW_AS_USER, {
    refetchQueries: ["Users"],
  });
  const [unfollowAsUser] = useMutation(UNFOLLOW_AS_USER, {
    refetchQueries: ["Users"],
  });
  const [followAsOrg] = useMutation(FOLLOW_AS_ORG, {
    refetchQueries: ["Orgs"],
  });
  const [unfollowAsOrg] = useMutation(UNFOLLOW_AS_ORG, {
    refetchQueries: ["Orgs"],
  });

  const handleFollowToggle = async () => {
    if (!userId) return;

    const input = {
      refId: profileUserId,
      refModel: profileAccountType,
    };

    try {
      if (!isFollowing) {
        if (userType === "User") await followAsUser({ variables: { userId, input } });
        else if (userType === "Org") await followAsOrg({ variables: { orgId: userId, input } });
      } else {
        if (userType === "User") await unfollowAsUser({ variables: { userId, input } });
        else if (userType === "Org") await unfollowAsOrg({ variables: { orgId: userId, input } });
      }

      // Update local state optimistically
      setIsFollowing(!isFollowing);
      setUser(prev => prev ? {
        ...prev,
        followedByCount: (prev.followedByCount || 0) + (isFollowing ? -1 : 1),
      } : prev);

    } catch (err) {
      console.error("Follow/Unfollow error:", err);
    }
  };
  
  const isPet = profileAccountType === "Pet";
  if(isPet){
    console.log("posts: ", (user as Pet)?.taggedPosts);
  } else {
    console.log("posts: ", (user as UserType)?.posts);
  }
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!user) return <p>User not found.</p>;



return (
  <div className="mini-profile-background">
    <div className="mini-profile-ctn">
      <div className="mini-profile-item-ctn">
        <img
          src={
            isPet
              ? (user as Pet).profilePhoto?.url || UserPlaceHolder
              : (user as UserType).avatar?.url || UserPlaceHolder
          }
          alt="Profile"
          className="mini-profile-user-img"
        />
        <div className="mini-profile-user-title">
          <span className="mini-profile-md-fnt">
            {isPet
              ? (user as Pet).name
              : (user as UserType).username || (user as UserType).orgName}
          </span>
        </div>
        {/* Only show follow button for user/org */}
        {!isPet && userId !== profileUserId && (
          <div className="mini-profile-btn-ctn">
            <button
              className={isFollowing ? "mini-unfollow-btn" : "mini-follow-btn"}
              onClick={handleFollowToggle}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        )}
      </div>

      <div className="mini-profile-bio-ctn mini-profile-sm-fnt">
        <span>{user.about}</span>
      </div>

      {/* Only show followers/following for user/org */}
      {!isPet && (
        <div className="mini-profile-item-ctn mini-profile-sm-fnt">
          <span>{(user as UserType).followingCount || '0'} followers</span>
          <span>{user.followedByCount || '0'} following</span>
        </div>
      )}

      {/* Only show pets for user/org */}
      {!isPet && (
        <div className="mini-profile-item-ctn mini-profile-md-fnt">
          {(user as UserType).pets?.map(pet => (
            <div className="mini-profile-pet-ctn" key={pet._id}>
              {/* ...pet rendering... */}
            </div>
          ))}
        </div>
      )}
    </div>
    {/* Only show posts for user/org */}
    {!isPet ? (
      <div className="mini-profile-feed-bg">
        {(user as UserType).posts?.map(post => (
          <div key={post._id} className="foreign-post">
            <div className="foreign-feed-date">
              <p>{format(new Date(Number(post.createdAt)), 'MMM d, yyyy') }</p>
            </div>
            <p>{post.contentText}</p>
          </div>
        ))}
      </div>
    ) : (
      <div className="mini-profile-feed-bg">
        {(user as Pet).taggedPosts.map(post => (
          <div key={post._id}>
            {!post.createdAt && (
              <div>
                <p>{"now"}</p>
              </div>
            )}
            <p>{post.contentText}</p>
            
          </div>
        ))}
      </div>
    )}
  </div>
);
}