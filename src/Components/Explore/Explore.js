import { Card, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPublicData } from '../../utils/Helpers'
import { paintersMenu } from '../Menu/menuSlice/updateMenu'
import './Explore.css'

function Explore() {
  const dispatch = useDispatch()
  const [explorers, setExplorers] = useState([])

  useEffect(() => {
    paintersMenu(dispatch)
    getPublicData(setExplorers, '/explorer')
  }, [])

  return (
    <div>
      <Typography>Hey</Typography>
      {explorers.map((explorer) => (
        <Card
          key={explorer.id}
          style={{ width: '33%', margin: 20, padding: 10 }}
        >
          <Typography>{explorer.title}</Typography>
          <Typography>{explorer.description}</Typography>
        </Card>
      ))}
    </div>
  )
}

export default Explore
