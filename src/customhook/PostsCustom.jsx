import {useFetch} from '../useFetch.jsx';

function PostsCustom() {
    const posts = useFetch("https://jsonplaceholder.typicode.com/posts");
    return <div>{posts.length > 0 ? "Posts loaded" : "Loading ..."}</div>;
}

export default PostsCustom;
