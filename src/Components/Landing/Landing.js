import { Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { paintersMenu } from '../Menu/menuSlice/updateMenu'

function Landing() {
  const dispatch = useDispatch()

  useEffect(() => {
    paintersMenu(dispatch)
  }, [])

  return (
    <div>
      <Typography>Landing</Typography>
    </div>
  )
}

export default Landing
