import axios from 'axios';

const url = `${process.env.REACT_APP_SERVER_URL}/posts`;

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const updatePost = (id, postData) => axios.patch(`${url}/${id}`, postData);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
