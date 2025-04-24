import {useFetch} from '../useFetch.jsx';

function UsersCustom() {
    const users = useFetch("https://jsonplaceholder.typicode.com/users");

    return <div>{users.length > 0 ? "Users loaded" : "Loading ..."}</div>
}

export default UsersCustom;