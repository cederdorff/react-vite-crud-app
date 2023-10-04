import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
    const navigate = useNavigate();
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState("");

    async function createPost(event) {
        event.preventDefault();
        const newPost = {
            caption: caption,
            image: image,
            uid: "fTs84KRoYw5pRZEWCq2Z"
        };

        const url = "https://fb-rest-race-default-rtdb.firebaseio.com/posts.json";
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(newPost)
        });
        if (response.ok) {
            const data = await response.json();
            console.log("New post created: ", data);
            navigate("/");
        }
    }
    return (
        <section className="page">
            <h1>Create New Post</h1>
            <form onSubmit={createPost}>
                <label>
                    Caption
                    <input type="text" value={caption} placeholder="Type a caption" onChange={e => setCaption(e.target.value)} />
                </label>
                <label>
                    Image
                    <input type="url" value={image} placeholder="Paste image uirl" onChange={e => setImage(e.target.value)} />
                </label>
                <label>
                    <img className="image-preview" src={image} alt="Choose" />
                </label>
                <button type="submit">Save</button>
            </form>
        </section>
    );
}
