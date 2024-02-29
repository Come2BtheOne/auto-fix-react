import { useState, useEffect } from 'react'

interface IOptions {
  /**
   * 设计图宽度
   */
  width: number
  /**
   * 设计图高度
   */
  height: number
}

export function useAutoFix(options: IOptions = { width: 1920, height: 1080 }) {
  // 1280*720、1920*1080
  // 画布实际宽高
  const [canvasWidth, setCanvasWidth] = useState(options.width)
  const [canvasHeight, setCanvasHeight] = useState(options.height)

  // 整体等比例缩放
  const [canvasStyle, setCanvasStyle] = useState({
    transform: 'scale(1, 1)',
    transformOrigin: `left top`
  })
  const equalScale = () => {
    // 当前窗口宽高比例
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const windowRatio = windowWidth / windowHeight
    // 画布原始宽高比例
    const canvasRatio = canvasWidth / canvasHeight
    // 计算画布适应后的新宽高
    let newCanvasWidth = 0
    let newCanvasHeight = 0
    // windowWidth / windowHeight = canvasWidth / canvasHeight
    if (canvasRatio > windowRatio) {
      // 画布的宽高比大于屏幕的宽高比
      // 画布的宽度调整为屏幕的宽度
      newCanvasWidth = windowWidth
      // 画布的高度根据画布原比例进行缩放
      newCanvasHeight = windowWidth / canvasRatio
    } else {
      // 画布的宽高比小于屏幕的宽高比
      // 画布的高度调整为屏幕的高度
      newCanvasHeight = windowHeight
      // 画布的宽度根据画布原比例进行缩放
      newCanvasWidth = windowHeight * canvasRatio
    }
    // 相对于画布原始宽高的缩放比例
    const scaleX = newCanvasWidth / canvasWidth
    const scaleY = newCanvasHeight / canvasHeight
    // 居中
    const translateX = (windowWidth - newCanvasWidth) / 2 / scaleX
    const translateY = (windowHeight - newCanvasHeight) / 2 / scaleY
    setCanvasStyle({
      transform: `scale(${scaleX}, ${scaleY}) translate(${translateX}px, ${translateY}px)`,
      transformOrigin: 'left top'
    })
  }

  // 复位
  const reset = () => {
    setCanvasWidth(options.width)
    setCanvasHeight(options.height)
    setCanvasStyle({
      transform: 'scale(1, 1)',
      transformOrigin: `left top`
    })
  }

  const fit = () => {
    reset()
    equalScale()
  }

  useEffect(() => {
    fit()

    window.addEventListener('resize', fit)

    return () => {
      window.removeEventListener('resize', fit)
    }
  }, [])

  return {
    canvasStyle,
    canvasWidth,
    canvasHeight
  }
}
