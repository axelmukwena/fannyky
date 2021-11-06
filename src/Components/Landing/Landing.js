import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateSiteName } from '../Menu/menuSlice/currentMenuSlice'
import { paintersMenu } from '../Menu/menuSlice/updateMenu'
import Canvas from './Canvas'

function Landing({ h, w }) {
  const dispatch = useDispatch()

  useEffect(() => {
    paintersMenu(dispatch)
    dispatch(updateSiteName('Fanny & Ky'))
  }, [])

  return (
    <div className="canvas">
      <Canvas h={h} w={w} />
    </div>
  )
}

export default Landing
