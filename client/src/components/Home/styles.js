import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
 
  [theme.breakpoints.down('sm')]: {
    mainContainer: {
      flexDirection: 'column-reverse',
    }
  },

  capitalize: {
    textTransform: 'capitalize'
  },

  title: {
    background: 'white',
    padding: '0.5rem',
    marginTop: '4rem',
  }
  
}));