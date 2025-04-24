import {useState, useEffect} from "react";

function Users() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => setUsers(data));
    }, []);
    return <div>{users.length > 0 ? "Users loaded" : "Loading ..."}</div>
}

export default Users;