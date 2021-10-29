import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { defaultMenu } from '../Menu/menuSlice/updateMenu'

function Landing() {
  const dispatch = useDispatch()

  useEffect(() => {
    defaultMenu(dispatch)
  }, [])

  return (
    <div>
      <h1>Landing</h1>
    </div>
  )
}

export default Landing