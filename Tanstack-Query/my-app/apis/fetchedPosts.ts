import axios from "axios"

export const fetchedPosts = async () => {
    const repsonse = await axios.get(`http://jsonplaceholder.typicode.com/posts?_limits=5`);
    return repsonse.data
};