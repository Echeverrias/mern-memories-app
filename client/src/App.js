import React from 'react';
import { BrowserRouter, HashRouter, Switch, Route, useLocation } from 'react-router-dom';
import { Container } from '@material-ui/core';

import {TagProvider} from './contexts/TagProvider';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import useStyles from './styles';
import './index.css';

function App() {
  const classes = useStyles();
  const location = useLocation();
  console.log('App location', location)
  

  return (
    <div className='app'>
      
        <TagProvider location={location}>
          <Container maxwidth='lg'>
            <NavBar />
            <Switch>
              <Route path='/' exact component={Home}/>
              <Route path='/mostoles' component={Home}/>
              <Route path='/memorias-alcorcon' exact component={Home}/>
              <Route path='/auth' exact component={Auth}/>
            </Switch>
          </Container>
          </TagProvider>
     
    </div>
  );
}

export default App;