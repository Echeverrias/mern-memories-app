import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import { setCurrentId } from '../../actions/currentId';


const Form = () => {
    
    const currentId = useSelector((state) => state.currentId);
    const post = useSelector((state) => currentId? state.posts.filter((post) => post._id === currentId)[0]:null);
    const [postData, setPostData] = useState({
        creatorName: '',
        title: '',
        message: '',
        tags: [],
        selectedFile: '',
    })
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        if(post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId){
            dispatch(updatePost(currentId, postData))
        }else{    
            dispatch(createPost(postData));
        }
        clear();    
    }

    const clear = () => {
        
        dispatch(setCurrentId(null));
        
        setPostData({
            creatorName: '',
            title: '',
            message: '',
            tags: [],
            selectedFile: '',
        })
        
    }

    return (
        <div className="form">
            <Paper className={classes.paper}>
                <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography 
                        variant="h6"
                    >
                    {currentId? 'Editing a Memory' :  'Creating a Memory'}
                    </Typography>
                    <TextField 
                        name="creatorName" 
                        variant="outlined" 
                        label="Creator" 
                        fullWidth 
                        value={postData.creatorName}
                        onChange={(e) => setPostData({...postData, creatorName: e.target.value})}
                    />
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
                        onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}
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