export default function PostItem({ post }) {
    return (
        <article key={post.id}>
            <img src={post.image} alt={post.caption} />
            <h3>{post.caption}</h3>
        </article>
    );
}
