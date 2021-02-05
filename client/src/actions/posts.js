import * as api from '../api';
import { actionTypes } from '../constants/actionTypes';

export const getPosts = (tag) => async (dispatch) => {
    try{
        console.log(`action-getPosts ${tag}`)
        const { data } = tag? await api.fetchTagPosts(tag) : await api.fetchPosts();
        dispatch({type: actionTypes.FETCH_ALL, payload: data})
    }
    catch (error) {
        console.log(error) // error give more info that error.message
    }
};

export const createPost = (post) => async (dispatch) => {
    try{
        const { data } = await api.createPost(post);
        dispatch({type: actionTypes.CREATE, payload: data})
    }
    catch (error) {
        console.log(error)
    }
};

export const deletePost = (id) => async (dispatch) => {
    try{
        const { data } = await api.deletePost(id);
        dispatch({type: actionTypes.DELETE, payload: data})
    }
    catch (error) {
        console.log(error)
    }
};

export const updatePost = (id, postData) => async (dispatch) => {
    try{
        const { data } = await api.updatePost(id, postData);
        dispatch({type: actionTypes.UPDATE, payload: data})
    }
    catch (error) {
        console.log(error)
    }
};

export const likePost = (id) => async (dispatch) => {
    try{
        const { data } = await api.likePost(id);
        dispatch({type: actionTypes.LIKE, payload: data})
    }
    catch (error) {
        console.log(error)
    }
};