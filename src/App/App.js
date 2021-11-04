import React, { useEffect } from 'react'
import './App.css'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Explore from '../Components/Explore/Explore'
import Landing from '../Components/Landing/Landing'
import Footer from '../Components/Footer/Footer'
import { authorizeUser } from '../currentUser/authorize'
import MainNav from '../Components/Menu/MainNav'
import Painter from '../Components/Painter/Painter'

const useStyles = makeStyles(() => ({
  container: {},
}))

function App() {
  const classes = useStyles()

  const dispatch = useDispatch()

  useEffect(() => {
    authorizeUser(dispatch)
  })

  return (
    <Router className={clsx(classes.container)}>
      <MainNav />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/explore">
          <Explore />
        </Route>
        <Route path="/:painterID" component={Painter} key="painter" />
      </Switch>
      <Footer />
    </Router>
  )
}
export default App
