// this component is meant to be flexibly used for viewing a post, meetup post, or adoption post
// each post type will require more or less post details

// Pass back a prop that takes an object containing info about a post and its type (postType = "adoption", postType = "freeflow" etc)
// conditionally render certain attributes based on if the prop passed back has a certain type
// example: IF post.postType === "adoption" RENDER <p> Breed: post.breed </p>
export default function PostDetails() {
  return (
    <div>PostDetails</div>
  )
}
