import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Typography, Toolbar, Button, Avatar, Popper, Grow, Paper, MenuList, MenuItem, Menu, ClickAwayListener } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import 'react-jsx-html-comments';
import decode from 'jwt-decode';

import memories from '../../images/memories.png';
import { LOCALSTORAGE_KEY } from '../../constants/keys';
import { logout } from '../../actions/auth';
import './styles.css';
import useStyles from './styles';


const NavBar = () => {
    
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    
    useEffect(() => {
        const token = auth?.token;
        if(token){
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()){
                handleLogout()
            }
        }
        setAuth(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
    },[location]);

    const getShortName = (name) => {
        let parts = name.split(' ');
        if (parts.length >= 2){
            return `${parts[0]} ${parts[1]}`;
        }
        else{
            return name;
        }
    }

    const handleLogout = () => {
        dispatch(logout());
        history.push('/');
        setAuth(null);
    }

    const handleClickLogout = (e) => {
        e.preventDefault();
        handleLogout();
    }

    const handleClickMenu = (e) => {
        e.preventDefault();
        setOpen(prevOpen => !prevOpen);
    }

    const handleClose = (e) => {
        e.preventDefault();
        setOpen(prevOpen => !prevOpen);
    }

    const handleListKeyDown = (e) => {

    }

    return (
        <div className='navBar'>
            <AppBar className={classes.appBar}  position="static" color="inherit">
                <div className={classes.brandContainer}> 
                    <Typography 
                        component={Link} 
                        to='/' 
                        className={classes.heading} 
                        variant="h2" 
                        align="center"
                        >
                            Memorias
                        </Typography>
                    <img className={classes.image} src={memories} alt="memories" height="60" />
                </div>
                <div id='menu'>
                    <ul className={classes.menu}>
                        <li>
                        Ciudades 
                        <ul className={classes.menuContent}>
                            <li><a className={classes.menuItem} href={'/mostoles'}>Móstoles</a></li>
                            <li><a className={classes.menuItem} href={'/memorias-alcorcon'}>Alcorcón</a></li>
                        </ul>
                        </li>
                    </ul>
                </div>
                <react-comment>
                    <Button
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleClickMenu}
                        variant='contained'
                        color='blue'
                    >
                        Ciudades
                    </Button>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                <MenuItem onClick={handleClose}><Link to='/mostoles'>Móstoles</Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link to='/memorias-alcorcon'>Alcorcón</Link></MenuItem>
                            </MenuList>
                            </ClickAwayListener>
                        </Paper>
                        </Grow>
                    )}
                    </Popper>
                </react-comment>    
                <Toolbar className={classes.toolBar} >
                    {auth? (
                        <div className={classes.profile}>
                            <Avatar 
                                className={classes.purple} 
                                alt={auth.user.name} src={auth.user.imageUrl}
                            >
                                {auth.user.name.charAt(0)}
                            </Avatar>
                            <Typography
                                className={classes.username}
                                variant='h6'
                            >
                                {getShortName(auth.user.name)}        
                            </Typography>
                            <Button
                                variant='contained'
                                className={classes.logout}
                                color="secondary"
                                onClick={handleClickLogout}
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Button
                            component={Link}
                            to='/auth'
                            variant='contained'
                            className={classes.logout}
                            color="primary"
                           
                        >
                            Sign In
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar
