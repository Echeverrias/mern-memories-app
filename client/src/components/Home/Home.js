import React, { useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles';

const Home = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const tag = useLocation().pathname.replace('/', '').replace('memorias-', '');//useTag(); 
    const geoLocation = tag? tag.charAt(0).toUpperCase() + tag.slice(1) : 'Madrid';

    console.log('Home tag:', tag);
    console.log('Home location:', useLocation());
 
    const currentId=null;
    useEffect(() => {
        console.log('useEffect', tag);
        dispatch(getPosts(tag));
    }, [currentId, dispatch, tag]);

    return (
        <div className='home'>
          
          { geoLocation === 'Madrid'? 
             <Helmet>
                <title>🏅 Memorias de Madrid | Compartir fotos con miles de personas nunca fue tan fácil</title>
                <meta name="description" content="Sube tus fotos y comparte fotografías de Madrid, imagenes de Móstoles, Alcorcón, guarda tus recuerdos y haz que todo el mundo las vea 👆" />
             </Helmet>   
                :
                <Helmet>
                  <title>{`🏅 Memorias de ${geoLocation} - Comparte tus fotos con miles de personas | Memorias de Madrid`}</title>
                  <meta name="description" content={`Sube tus fotos y comparte fotografías de ${geoLocation}, guarda tus recuerdos y haz que todo el mundo las vea 👆`} />
                </Helmet>
          }  
            
            <Grow in>
            <Container>
              <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={7}>
                  <Posts />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Form />
                  <div className={classes.title}>
                    <h1>{`Compartir tus recuerdos de ${geoLocation} nunca fue tan fácil, sube tus fotografías de los lugares más turísticos para que así la gente los pueda visitar`}</h1>
                  </div> 
                </Grid>
              </Grid>
            </Container>
        </Grow>
        </div>
    )
}

export default Home
