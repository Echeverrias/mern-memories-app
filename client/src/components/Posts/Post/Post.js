import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';

import Likes from './Likes';
import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';
import { setCurrentId } from '../../../actions/currentId';
import { POST_FORM_ID } from '../../../constants/keys';
import { LOCALSTORAGE_KEY } from '../../../constants/keys';
import noImage from '../../../images/no-image.png';


const Post = ({ post }) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))?.user;
    
    const handleEdit = () => {
        dispatch(setCurrentId(post._id));
        //window.location.hash = `${POST_FORM_ID}`;
    }

    return (
        <div className="post">
            <Card className={classes.card}>
               
            <img  className={classes.image} src={post.selectedFile || noImage} alt={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">
                    {post.creatorName}
                </Typography>
                <Typography variant="body2">
                    {moment(post.createdAt).fromNow()}
                </Typography>
            </div>
            {
                (user && (user._id || user.googleId) === post.creator) && (
                <div className={classes.overlay2}>
                    <Button 
                        style={{color: 'white', minWidth:'auto'}} 
                        size='small'
                        disabled={!user || (user._id || user.googleId) !== post.creator}
                        onClick={handleEdit}
                    >
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                </div>
                )}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">
                    {post.tags.map((tag => <div className={classes.tag}>{`#${tag} `}</div>))}
                </Typography>
            </div>
            <Typography className={classes.title} variant="h2" gutterBottom>
                    {post.title}
                </Typography>
            <CardContent>
                <Typography className={classes.message} variant="body2" color="textSecondary" component="p">
                    {post.message}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" disabled={!user} color="primary" onClick={() => {dispatch(likePost(post._id))}}>
                    <Likes likes={post.likes} user={user} />
                </Button>
                {
                    (user && (user._id || user.googleId) === post.creator) && (
                <Button size="small" color="primary" onClick={() => {dispatch(deletePost(post._id))}}>
                    <DeleteIcon fontSize="small"/>
                    &nbsp; Delete 
                </Button>
                )}
            </CardActions>
            </Card> 
        </div>
    )
}

export default Post;