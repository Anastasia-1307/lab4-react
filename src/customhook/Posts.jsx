import {useState, useEffect} from 'react';

function Posts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
        .then((data) => setPosts(data));
    }, []);
    return <div>{posts.length > 0 ? "Posts loaded" : "Loading ..."}</div>
}

export default Posts;