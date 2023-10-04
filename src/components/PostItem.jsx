import UserAvatar from "./UserAvatar";

export default function PostItem({ post }) {
    console.log(post);
    return (
        <article key={post.id}>
            <UserAvatar uid={post.uid} />
            <img src={post.image} alt={post.caption} />
            <h3>{post.caption}</h3>
        </article>
    );
}
