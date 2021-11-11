import React, { useEffect, useRef, useState } from 'react'

function Canvas() {
  const canvasRef = useRef(null)
  const [x, setX] = useState(undefined)
  const [y, setY] = useState(undefined)
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  function handleResize() {
    const contentContainer = document.querySelector('.content-container')
    // appBody.style.minHeight = `${bodyHeight.toString()}px`
    setHeight(window.innerHeight - 115)
    setWidth(contentContainer.offsetWidth - 70)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
  }, [])

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    context.strokeStyle = 'black'
    context.lineJoin = 'round'
    context.lineWidth = 5
    context.lineCap = 'round'

    context.beginPath()
    context.moveTo(x, y)
    context.lineTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop)
    context.closePath()

    context.stroke()

    setX(e.pageX - canvas.offsetLeft)
    setY(e.pageY - canvas.offsetTop)
  }

  function clearDrawing() {
    setX(undefined)
    setY(undefined)
  }

  return (
    <canvas
      id="canvas"
      onMouseMove={handleMouseMove}
      onMouseLeave={clearDrawing}
      ref={canvasRef}
      height={height}
      width={width}
    />
  )
}

export default Canvas
