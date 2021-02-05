import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row', 
    [theme.breakpoints.down('sm')]: { 
      flexDirection: 'column',
    },
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
    [theme.breakpoints.down('xs')]: { 
      fontSize: '2.5rem',
    },
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down('xs')]: { 
      width: '100%',
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    [theme.breakpoints.down('xs')]: { 
      alignItems: 'center',
      width: '15.5rem',
    },
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: { 
      fontSize: '1em',
    },
    margin: '10px',
    
  },
  logout: {

  },
  menu: {
    listStyle: 'none',
  },
  menuContent: {
    display: 'none',
      '&:hover': {
        display: 'block',
      },
  },
  menuItem: {
    textDecoration: 'none',
  }
}));