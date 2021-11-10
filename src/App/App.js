import React, { useEffect } from 'react'
import './App.css'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Grid } from '@material-ui/core'
import Explore from '../Components/Explore/Explore'
import Landing from '../Components/Landing/Landing'
import { authorizeUser } from '../currentUser/authorize'
import Painter from '../Components/Painter/Painter'
import SideMenu from '../Components/Menu/SideMenu'

const useStyles = makeStyles(() => ({
  container: {},
}))

function App() {
  const classes = useStyles()

  const dispatch = useDispatch()

  useEffect(() => {
    authorizeUser(dispatch)
  }, [dispatch])

  return (
    <div className="app-container">
      <Router className={clsx(classes.container)}>
        <Grid container spacing={4}>
          <Grid item xs={2}>
            <SideMenu />
          </Grid>
          <Grid item xs>
            <div className="content-container">
              <Switch>
                <Route exact path="/">
                  <Landing />
                </Route>
                <Route exact path="/explore">
                  <Explore />
                </Route>
                <Route path="/:painterID" component={Painter} key="painter" />
              </Switch>
            </div>
          </Grid>
        </Grid>
      </Router>
    </div>
  )
}
export default App
