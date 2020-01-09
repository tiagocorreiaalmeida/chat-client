import { Container, withStyles } from '@material-ui/core';

const StyledContainer = withStyles({
  root: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
})(Container);

export default StyledContainer;
