import { useEffect, useRef, useState } from 'react'

type ScrollCanvasProps = {
  frames: string[]
  progress: number
  min?: number
  max?: number
}

const ScrollCanvas = ({
  frames,
  progress,
  min = 0,
  max = 1
}: ScrollCanvasProps) => {
  const [frame, setFrame] = useState(0)
  const [src, setSrc]: any = useState(frames[0])
  const imageCount = frames.length

  useEffect(() => {
    frames.forEach(f => {
      const img = new Image()
      img.src = f
    })
  }, [])

  useEffect(() => {
    const p = Math.min(1, Math.max(0, (progress - min) / (max - min)))
    const currFrame = Math.min(
      Math.max(Math.round(p * imageCount), 0),
      imageCount - 1
    )
    if (frame === currFrame) return
    requestAnimationFrame(() => setFrame(currFrame))
  }, [progress])
  return (
    <>
      {frames.map((f: any, n: number) => 
        <img
          key={n}
          src={f}
          height='100%'
          width='100%'
          style={{
            objectFit: 'cover',
            height: '100vh',
            width: '100%',
            position: 'absolute',
            opacity: n === frame ? 1 : 0
          }}
        />
      )}
    </>
  )
}

export default ScrollCanvas
