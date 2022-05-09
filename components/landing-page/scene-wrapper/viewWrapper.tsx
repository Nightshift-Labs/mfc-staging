import React, { useEffect } from 'react'
import styles from '../scene.module.scss'

type ViewWrapper = {
  desktop?: boolean
  single?: boolean
  child: React.ReactElement
  progress: number
  updateSidebar: any
}

const ViewWrapper = ({
  desktop,
  child,
  single,
  progress,
  updateSidebar
}: ViewWrapper) => {
  useEffect(() => {
    if (!!updateSidebar && progress > 0 && progress < 1) updateSidebar(progress)
  }, [updateSidebar, progress])
  return (
    <div
      className={`${styles.viewWrapper} ${
        !single ? (desktop ? styles.desktop : styles.mobile) : null
      }`}
    >
      {React.cloneElement(child, { progress })}
    </div>
  )
}

export default ViewWrapper
