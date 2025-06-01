import "../../SammiReusables.css";
import { useEffect, useState } from "react";
import { QUERY_USER, QUERY_ORG } from '../../utils/queries';
import { FOLLOW_AS_USER, UNFOLLOW_AS_USER, FOLLOW_AS_ORG, UNFOLLOW_AS_ORG } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import Feed from "../../components/Reusables/Feed";
import UserPlaceHolder from "../../images/person_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg";
import { UserType } from "../../types/UserType";

type ProfileDetailsProps = {
  profileUserId: string;
  profileAccountType: string;
}

export default function ProfileDetails({ profileUserId, profileAccountType }: ProfileDetailsProps) {
  const userId = localStorage.getItem('userId');
  const accountType = localStorage.getItem('accountType');
  const userType = accountType === "org" ? "Org" : "User";

  if (!profileAccountType) return null;

  const queryToUse = profileAccountType === "Org" ? QUERY_ORG : QUERY_USER;
  const variables = profileAccountType === "Org"
    ? { orgId: profileUserId }
    : { userId: profileUserId };

  const { data, loading, error } = useQuery(queryToUse, { variables });

  const [user, setUser] = useState<UserType | undefined>();
  const [isFollowing, setIsFollowing] = useState(false);

  // Set user and follow state when data changes
  useEffect(() => {
    if (data) {
      const profileData = data.user || data.org;
      setUser(profileData);
      setIsFollowing(
        profileData?.followedBy?.some((follower: any) => follower?.refID?._id === userId) || false
      );
    }
  }, [data, userId]);

  // Mutations
  const [followAsUser] = useMutation(FOLLOW_AS_USER);
  const [unfollowAsUser] = useMutation(UNFOLLOW_AS_USER);
  const [followAsOrg] = useMutation(FOLLOW_AS_ORG);
  const [unfollowAsOrg] = useMutation(UNFOLLOW_AS_ORG);

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

      // Uncomment below if you want server sync after mutation
      // await refetch();

    } catch (err) {
      console.error("Follow/Unfollow error:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div className="profile-background">
      <div className="profile-ctn">
        <div className="profile-item-ctn">
          <img src={user.avatar?.url || UserPlaceHolder} alt="User avatar" className="profile-user-img" />
          <div className="profile-user-title">
            <span className="profile-md-fnt">{user.username || user.orgName}</span>
          </div>
          <div className="profile-btn-ctn">
            {userId !== profileUserId && (
              <button
                className={isFollowing ? "unfollow-btn" : "follow-btn"}
                onClick={handleFollowToggle}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
        </div>

        <div className="profile-bio-ctn profile-sm-fnt">
          <span>{user.about}</span>
        </div>

        <div className="profile-item-ctn profile-sm-fnt">
          <span>{user.followingCount || '0'} followers</span>
          <span>{user.followedByCount || '0'} following</span>
        </div>

        <div className="profile-item-ctn profile-md-fnt">
          {user.pets.map(pet => (
            <div className="profile-pet-ctn" key={pet._id}>
              <img className="profile-pet-img" src={pet.profilePhoto?.url} alt={`${pet.name} profile`} />
              <span>{pet.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="profile-feed-bg">
        <Feed
          initialFeedArray={user.posts}
          itemStyle="post-card"
          containerStyle="profile-feed-container"
        />
      </div>
    </div>
  );
}