import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        const newPost = {
            caption: caption,
            image: image,
            uid: "ZfPTVEMQKf9vhNiUh0bj"
        };

        const url =
            "https://fb-rest-race-default-rtdb.firebaseio.com/posts.json";

        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(newPost)
        });

        if (response.ok) {
            navigate("/");
        } else {
            console.log("Something went wrong");
        }
    }

    return (
        <section className="page">
            <h1>Create New Post</h1>
            <form onSubmit={handleSubmit}>
                <label>Caption</label>
                <input
                    type="text"
                    placeholder="Type a caption"
                    value={caption}
                    required
                    onChange={event => setCaption(event.target.value)}
                />
                <label>Image</label>
                <input
                    type="url"
                    placeholder="Paste an image url"
                    value={image}
                    required
                    onChange={event => setImage(event.target.value)}
                />
                <button>Create</button>
            </form>
        </section>
    );
}
