import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateSiteName } from '../Menu/menuSlice/currentMenuSlice'
import { paintersMenu } from '../Menu/menuSlice/updateMenu'
import Canvas from './Canvas'

function Landing() {
  const dispatch = useDispatch()

  useEffect(() => {
    paintersMenu(dispatch)
    dispatch(updateSiteName(['buda fans', '/']))
  }, [dispatch])

  return (
    <div className="canvas">
      <Canvas />
    </div>
  )
}

export default Landing
