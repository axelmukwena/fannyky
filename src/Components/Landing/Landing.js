import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { paintersMenu } from '../Menu/menuSlice/updateMenu'
import Canvas from './Canvas'

function Landing({ h, w }) {
  const dispatch = useDispatch()

  useEffect(() => {
    paintersMenu(dispatch)
  }, [])

  return (
    <div className="canvas">
      <Canvas h={h} w={w} />
    </div>
  )
}

export default Landing
