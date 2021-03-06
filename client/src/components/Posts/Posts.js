import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import useStyles from './styles';
import Post from './Post/Post';


const Posts = () => {
    
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    
    return (
        <div className="posts">
            {
              posts?  
                <Grid 
                    className={classes.container}
                    container
                    alignItems="stretch"
                    spacing={3}
                >
                    {posts.map(post => 
                        <Grid
                            key={post._id}
                            item
                            xs={12}
                            sm={6}
                        >
                            <Post post={post}/>
                        </Grid>
                    )}
                </Grid>
              :<CircularProgress/>
            }
        </div>
    )
}

export default Posts;