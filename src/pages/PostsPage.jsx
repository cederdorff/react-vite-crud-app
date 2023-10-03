import { useEffect, useState } from "react";
import PostItem from "../components/PostItem";

export default function PostsPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const url = "https://fb-rest-race-default-rtdb.firebaseio.com/posts.json";
            const response = await fetch(url, {
                method: "GET"
            });
            const data = await response.json();
            const postsArray = Object.keys(data).map(key => ({ id: key, ...data[key] })); // from object to array

            console.log(data);
            console.log(postsArray);
            setPosts(postsArray);
        }

        getPosts();
    }, []);

    return (
        <section className="page">
            <h1>Posts</h1>
            <section className="grid">
                {posts.map(post => (
                    <PostItem post={post} key={post.id} />
                ))}
            </section>
        </section>
    );
}
