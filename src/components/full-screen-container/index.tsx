import React from 'react'
import { useAutoFix } from '@/hooks/auto-fix'

interface IProps {
  width: number
  height: number
  children?: React.ReactNode
}
const FullScreenContainer: React.FC<IProps> = (props) => {
  const { canvasStyle, canvasWidth, canvasHeight } = useAutoFix({ width: props.width, height: props.height })

  return (
    <div
      className="full-screen-container"
      style={{
        width: `${canvasWidth}px`,
        height: `${canvasHeight}px`,
        ...canvasStyle
      }}
    >
      {props.children}
    </div>
  )
}

export default FullScreenContainer
