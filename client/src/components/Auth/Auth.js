import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { auth, signUp, signIn } from '../../actions/auth';
import Input from './Input';
import Icon from './icon';
import useStyles from './styles';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const Auth = () => {
    
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false); //%
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();
    const state = null; //%
    const classes = useStyles();
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp){
            if (formData.password === formData.confirmPassword){
                dispatch(signUp(formData, history));
            }else{
                alert("The passwords don't match!");
            }    
        }else{
            dispatch(signIn(formData, history));
        }
    }
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const user = res?.profileObj;
        const token = res?.tokenId;
        try{
            dispatch(auth({ user, token }));
            history.push('/');
        }
        catch(error){
            console.log(error);
        }

    }
    const googleFailure = (error) => {
        console.log(error);
        console.log('Google Sign In was unsuccessful. Try again later')
    }

    return (
        <div className="auth">
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant='h5'>
                        {isSignUp? 'Sign Up' : 'Sign In'}
                    </Typography>
                    <form
                        className={classes.form}
                        onSubmit={handleSubmit}
                    >
                        <Grid container spacing={2}>
                            {
                                isSignUp && (
                                    <>
                                        <Input 
                                            name="firstName" 
                                            label="First Name" 
                                            handleChange={handleChange}
                                            autoFocus
                                            half
                                        />
                                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                    </>
                            )}    
                            <Input type="email" name="email" label="Email Address"  handleChange={handleChange} />
                            <Input type={showPassword ? 'text' : 'password'} name="password" label="Password" handleChange={handleChange} handleShowPassword={handleShowPassword} />
                            { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} />}
                        </Grid>
                        <Button type='submit' fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignUp? 'Sign Up' : 'Sign In'}
                        </Button>{
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_ID}
                            render={(renderProps) => (
                                <Button 
                                    className={classes.googleButton} 
                                    color="primary" 
                                    fullWidth 
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    startIcon={<Icon />}
                                    variant="contained"
                                >
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />}
                        <Grid container justify='flex-end'>
                            <Grid item>
                                <Button className={isSignUp? classes.switchModeSignIn : classes.switchModeSignUp} onClick={switchMode}  fullWidth variant="contained">
                                    { isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                                </Button>        
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
            </div>
    )
}

export default Auth;