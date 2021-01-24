import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';
import { setCurrentId } from '../../../actions/currentId';

const Post = ({ post }) => {

    const dispatch = useDispatch();
    const classes = useStyles();
    
    return (
        <div className="post">
            <Card className={classes.card}>
                <CardMedia 
                    className={classes.media}
                    image={post.selectedFile}
                    title={post.title}
                />
            <div className={classes.overlay}>
                <Typography variant="h6">
                    {post.creator}
                </Typography>
                <Typography variant="body2">
                    {moment(post.createdAt).fromNow()}
                </Typography>
            </div>
            <div className={classes.overlay2}>
                <Button 
                    style={{color: 'white'}} 
                    size='small'
                    onClick={()=> {dispatch(setCurrentId(post._id))}}
                >
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">
                    {post.tags.map((tag => <div className={classes.tag}>{`#${tag}`}</div>))}
                </Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>
                    {post.title}
                </Typography>
            <CardContent>
                <Typography className={classes.message} variant="body2" color="textSecondary" component="p">
                    {post.message}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => {dispatch(likePost(post._id))}}>
                    <ThumbUpAltIcon fontSize="small"/>
                    &nbsp; Like &nbsp;
                    {post.likeCount}
                </Button>
                <Button size="small" color="primary" onClick={() => {dispatch(deletePost(post._id))}}>
                    <DeleteIcon fontSize="small"/>
                    &nbsp; Delete 
                </Button>
            </CardActions>
            </Card> 
        </div>
    )
}

export default Post;