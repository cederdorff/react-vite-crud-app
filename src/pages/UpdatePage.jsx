import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdatePage() {
    const [post, setPost] = useState({});
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState("");
    const params = useParams();
    const navigate = useNavigate();
    const url = `
    https://fb-rest-race-default-rtdb.firebaseio.com/posts/${params.postId}.json
    `;

    useEffect(() => {
        async function getPost() {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setPost(data);
            setCaption(post.caption);
            setImage(post.image);
        }

        getPost();
    }, [post.caption, post.image, url]);

    async function handleSubmit(event) {
        event.preventDefault();
        const postToUpdate = {
            caption: caption,
            image: image,
            uid: post.uid
        };

        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(postToUpdate)
        });

        if (response.ok) {
            navigate("/");
        } else {
            console.log("Something went wrong");
        }
    }

    async function handleDelete() {
        const wantToDelete = confirm("Are you sure you want to delete?");

        if (wantToDelete) {
            const response = await fetch(url, {
                method: "DELETE"
            });

            if (response.ok) {
                navigate("/");
            } else {
                console.log("Something went wrong");
            }
        }
    }

    return (
        <section className="page">
            <h1>Update Page</h1>
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
                <img className="image-preview" src={image} alt="Choose" />

                <button>Save</button>
            </form>
            <button onClick={handleDelete}>Delete</button>
        </section>
    );
}
