import React from 'react';
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import useStyles from './styles';
import './index.css';

function App() {
  const classes = useStyles();
  
  return (
    <div className='app'>
      <HashRouter>
        <Container maxwidth='lg'>
          <NavBar />
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/auth' exact component={Auth}/>
          </Switch>
        </Container>
      </HashRouter>
    </div>
  );
}

export default App;