import axios from 'axios';
import { LOCALSTORAGE_KEY } from '../constants/keys';

const BASE_URL = `${process.env.REACT_APP_SERVER_URL}`;

const API = axios.create({baseURL: BASE_URL})
API.interceptors.request.use((req) => {
    if(localStorage.getItem(LOCALSTORAGE_KEY)) {
        let token = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).token;
        req.headers.Authorization = `Bearer ${token}` // In the backend the headers properties are received in lower case always!!!
    }
    return req;
})

export const fetchPosts = () => API.get(`/posts`);
export const createPost = (newPost) => API.post(`/posts`, newPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const updatePost = (id, postData) => API.patch(`/posts/${id}`, postData);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const signIn = (formData) => API.post(`/users/signIn`, formData);
export const signUp = (formData) => API.post(`/users/signUp`, formData);

/*
export const fetchPosts = () => axios.get(`${BASE_URL}/posts`);
export const createPost = (newPost) => axios.post(`${BASE_URL}/posts`, newPost);
export const deletePost = (id) => axios.delete(`${BASE_URL}/posts/${id}`);
export const updatePost = (id, postData) => axios.patch(`${BASE_URL}/posts/${id}`, postData);
export const likePost = (id) => axios.patch(`${BASE_URL}/posts/${id}/likePost`);
export const signIn = (formData) => axios.post(`${BASE_URL}/users/signIn`, formData);
export const signUp = (formData) => axios.post(`${BASE_URL}/users/signUp`, formData);
*/