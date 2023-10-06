import { useEffect, useState } from "react";
import PostItem from "../components/PostItem";

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");

    useEffect(() => {
        async function getPosts() {
            const url =
                "https://fb-rest-race-default-rtdb.firebaseio.com/posts.json";
            const response = await fetch(url);
            const data = await response.json();
            const postsArray = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            })); // from object to array
            setPosts(postsArray);
        }

        getPosts();
    }, []);

    let postsToDisplay = [...posts];

    if (searchValue) {
        postsToDisplay = postsToDisplay.filter(post =>
            post.caption.toLowerCase().includes(searchValue)
        );
    }
    postsToDisplay.sort((post1, post2) => {
        console.log(sortBy);
        if (sortBy === "caption") {
            return post1[sortBy].localeCompare(post2[sortBy]);
        } else if (sortBy === "createdAt") {
            return post2[sortBy] - post1[sortBy];
        }
    });

    return (
        <section className="page">
            <h1>Posts</h1>
            <section className="filters-pane">
                <label>
                    Sort by
                    <select onChange={e => setSortBy(e.target.value)}>
                        <option value="createdAt" selected>
                            Newest
                        </option>
                        <option value="caption">Caption</option>
                    </select>
                </label>
                <input
                    type="search"
                    placeholder="Search by caption"
                    onChange={e => setSearchValue(e.target.value.toLowerCase())}
                />
            </section>
            <section className="grid">
                {postsToDisplay.map(post => (
                    <PostItem post={post} key={post.id} />
                ))}
            </section>
        </section>
    );
}
