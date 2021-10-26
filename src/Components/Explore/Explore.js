import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { defaultMenu } from '../Menu/menuSlice/updateMenu'
import './Explore.css'

function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    defaultMenu(dispatch)
  }, [])

  return (
    <div>
      <h1>Hey</h1>
    </div>
  )
}

export default Home
