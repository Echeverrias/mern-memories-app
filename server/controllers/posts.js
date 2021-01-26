import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'

// https://www.restapitutorial.com/httpstatuscodes.html

export const getPosts2 = async (req, res) => {
    try{
        const posts = await PostMessage.find();
        res.status(200).json(posts);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}

export const getPosts = (req, res) => {
    console.log('getPosts');
    PostMessage.find()
        .then((posts) => res.status(200).json(posts))
        .catch((error) => res.status(404).json({message: error.message}));
}

export const createPost =async (req, res) => {
    console.log('createPost');
    const post = req.body;
    if(!req.userId) return res.json({message: 'Unauthenticated'});
    const newPostMessage = new PostMessage({...post, creator: req.userId}); // El campo creator realmente se específica en el backend 
    newPostMessage.save()
        .then((newPost) => res.status(201).json(newPost))
        .catch((error) => res.status(409).json({message: error.message}));
}

export const deletePost = (req, res) => {
    console.log('deletePost');
    const { id :_id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.send(`No post with id ${_id}`);
    PostMessage.findByIdAndDelete(_id)
        .then((deletedPost) => {console.log(`deletedPost ${deletedPost.id}`); res.status(200).json(deletedPost)})
        .catch((error) => res.status(400).json({message: error.message}));
}

export const updatePost = (req, res) => {
    console.log('updatePost');
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.send(`No post with id ${_id}`);
    const body = req.body;
    const post = {_id, ...body};
    PostMessage.findByIdAndUpdate(_id, post ,{new: true}) // {new: true} to receive the updated post
        .then((updatedPost) => res.status(200).json(updatedPost))
        .catch((error) => res.status(400).json({message: error.message}));
}

export const likePost = (req, res) => {
    console.log('likePost');
    const { id: _id } = req.params;
    if(!req.userId) return res.json({message: 'Unauthenticated'});

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.satus.send(`No post with id ${_id}`);
    PostMessage.findById(_id)
        .then((post) => {
            const index = post.likes.findIndex((id) => id === String(req.userId));
            if (index === -1){
                post.likes.push(String(req.userId));
            }else{
                post.likes = post.likes.filter((id) => id !== String(req.userId));
            }
            PostMessage.findByIdAndUpdate(_id, post ,{new: true})
                .then((post) => res.status(200).json(post))
                .catch((error) => res.status(400).json({message: error.message}));
        }) 
        .catch((error) => res.status(500).json({message: error.message}));
}