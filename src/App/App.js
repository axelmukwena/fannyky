import React, { useEffect, useState } from 'react'
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
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  function handleResize() {
    const appBody = document.querySelector('.app-body')
    const mainNav = document.querySelector('.main-nav').offsetHeight
    const footer = document.querySelector('.footer').offsetHeight
    const windowHeight = window.innerHeight

    const bodyHeight = windowHeight - (mainNav + footer)
    appBody.style.minHeight = `${bodyHeight.toString()}px`
    setHeight(bodyHeight)
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    authorizeUser(dispatch)
    handleResize()
    window.addEventListener('resize', handleResize)
  })

  return (
    <Router className={clsx(classes.container)}>
      <MainNav />
      <div className="app-body" style={{ minHeight: `calc(100vh - 400px)` }}>
        <Switch>
          <Route exact path="/">
            <Landing h={height} w={width} />
          </Route>
          <Route exact path="/explore">
            <Explore />
          </Route>
          <Route path="/:painterID" component={Painter} key="painter" />
        </Switch>
      </div>
      <Footer />
    </Router>
  )
}
export default App
