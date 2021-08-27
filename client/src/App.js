
import './App.css';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { navbarStyles } from './styles/styles'

import Student from './components/showStudent/showStudent.js';
import CreateStudent from './components/createStudent/createStudent.js';

function App() {

  const classes = navbarStyles();

  return (
    <div className="App">
      <Container maxWidth="lg">
          <AppBar className={classes.appBar} position="static" color="inherit">
              <Typography className={classes.heading} variant="h2" align="center">
                Students Create and Show
              </Typography>
          </AppBar>
          <Grow in>
            <Container>
              <Grid container justify="space-between" alignItems="stretch">
                <Grid item xs={12} sm={7}>
                  <AppBar className={classes.appBar} position="static" color="inherit">
                    <Student />
                  </AppBar>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <AppBar className={classes.appBar} position="static" color="inherit">
                    <CreateStudent />
                  </AppBar>
                </Grid>
              </Grid>
            </Container>
          </Grow>
      </Container>
    </div>
  );
}

export default App;
