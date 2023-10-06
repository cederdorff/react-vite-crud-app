import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";

export default function CreatePage() {
    const navigate = useNavigate();

    async function createPost(newPost) {
        newPost.createdAt = new Date().getTime();
        newPost.uid = "fTs84KRoYw5pRZEWCq2Z"; // default user id added

        const url =
            "https://fb-rest-race-default-rtdb.firebaseio.com/posts.json";
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(newPost)
        });
        if (response.ok) {
            const data = await response.json();
            console.log("New post created: ", data);
            navigate("/");
        } else {
            console.log("Sorry, something went wrong");
        }
    }

    return (
        <section className="page">
            <h1>Create New Post</h1>
            <PostForm savePost={createPost} />
        </section>
    );
}
