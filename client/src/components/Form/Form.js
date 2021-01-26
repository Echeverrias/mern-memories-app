import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import 'react-jsx-html-comments'

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import { setCurrentId } from '../../actions/currentId';
import { POST_FORM_ID, LOCALSTORAGE_KEY } from '../../constants/keys';


const Form = () => {
    
    const currentId = useSelector((state) => state.currentId);
    const post = useSelector((state) => currentId? state.posts.filter((post) => post._id === currentId)[0]:null);
    const authState = useSelector((state) => state.auth);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))?.user);

    const [postData, setPostData] = useState({
        creatorName: user?.name,
        title: '',
        message: '',
        tags: [],
        selectedFile: '',
    })
    const location = useLocation();
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        let user_ = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))?.user;
        setUser(user_);
        if(!user_){
            console.log('Not auth');
            setPostData({
                creatorName: '',
                title: '',
                message: '',
                tags: [],
                selectedFile: '',
            })
        }
        else if(post) {
            setPostData({
                creatorName: post.creatorName,
                title: post.title,
                message: post.message,
                tags: post.tags,
                selectedFile: post.selectedFile,
            })
        }    
    }, [location, currentId, post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId){
            dispatch(updatePost(currentId, {...postData, creatorName: user?.name}))
        }else{    
            dispatch(createPost({...postData, creatorName: user?.name}));
        }
        clear();    
    }

    const clear = () => {
        
        dispatch(setCurrentId(null));
        
        setPostData({
            creatorName: user? user.name : '',
            title: '',
            message: '',
            tags: [],
            selectedFile: '',
        })
        
    }

    if (!user){
        return(
            <Paper className={classes.paper}>
                <Typography variant="h6" align='center'>
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        )
    }
    return (
        <div id={POST_FORM_ID} className="form">
            <Paper className={classes.paper}>
                <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography 
                        variant="h6"
                    >
                    {currentId? 'Editing a Memory' :  'Creating a Memory'}
                    </Typography>
                    <react-comment>
                        <TextField 
                            name="creatorName" 
                            variant="outlined" 
                            label="Creator name" 
                            fullWidth 
                            value={postData.creatorName}
                            onChange={(e) => setPostData({...postData, creatorName: e.target.value})}
                            disabled={user? true: false}
                        />
                    </react-comment>
                    <TextField 
                        name="title" 
                        variant="outlined" 
                        label="Title" 
                        fullWidth 
                        value={postData.title}
                        onChange={(e) => setPostData({...postData, title: e.target.value})}
                    />
                    <TextField 
                        name="message" 
                        variant="outlined" 
                        label="Message" 
                        fullWidth 
                        value={postData.message}
                        onChange={(e) => setPostData({...postData, message: e.target.value})}
                    />
                     <TextField 
                        name="tags" 
                        variant="outlined" 
                        label="Tags" 
                        fullWidth 
                        value={postData.tags.join(',')}
                        onChange={(e) => setPostData({...postData, tags: e.target.value.replace(', ', ',').split(',')})}
                    />
                    <div className={classes.fileInput}>
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                        />
                    </div>   
                    <Button
                        className={classes.buttonSubmit}
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        fullWidth
                    >
                        Submit
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={clear}
                        fullWidth
                    >
                        Clear
                    </Button>
                </form>
            </Paper>
        </div>
    )
}

export default Form;