import React from "react"
import styles from '../scene.module.scss';

type ViewWrapper = {
  desktop?: boolean
  single?:boolean
  child: React.ReactElement
  progress: number
}

const ViewWrapper = ({ desktop, child, single, progress }: ViewWrapper) => {
  return (
    <div className={`${styles.viewWrapper} ${!single ? desktop ? styles.desktop : styles.mobile : null}`}>
      {React.cloneElement(child, { progress })}
    </div>
  )
}

export default ViewWrapper
