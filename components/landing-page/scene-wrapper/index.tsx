import { Scene } from 'react-scrollmagic'
import React, { useEffect, useRef } from 'react'

import styles from '../scene.module.scss'
import ViewWrapper from './viewWrapper'

type Props = {
  desktop: React.ReactElement
  mobile?: React.ReactElement
  duration: number
  hideOnMobile?: boolean
  updateSidebar?: any
  id: string
}

const SceneWrapper = ({
  id,
  desktop,
  mobile,
  duration,
  updateSidebar,
  hideOnMobile = false
}: Props) => {
  const displayRef: any = useRef()

  // Check if hideOnMobile element hidden
  let itemHidden = false
  if (
    typeof window !== 'undefined' &&
    !!hideOnMobile &&
    !!displayRef &&
    !!displayRef.current
  )
    itemHidden = window.getComputedStyle(displayRef?.current).display === 'none'

  return (
    <div
      ref={displayRef}
      className={`${!!hideOnMobile ? styles.hideOnMobile : ''}`}
      id={id}
    >
      <Scene
        duration={duration}
        pin={true}
        enabled={true}
        triggerHook='onLeave'
      >
        {(progress: number) => (
          <div className={styles.wrapper}>
            {!!updateSidebar &&
              progress > 0 &&
              progress < 1 &&
              updateSidebar(progress)}
            {mobile ? (
              <>
                <ViewWrapper
                  desktop={true}
                  progress={itemHidden ? 0 : progress}
                  child={desktop}
                />
                <ViewWrapper
                  desktop={false}
                  progress={itemHidden ? 0 : progress}
                  child={mobile ?? desktop}
                />
              </>
            ) : (
              <ViewWrapper
                single={true}
                progress={itemHidden ? 0 : progress}
                child={desktop}
              />
            )}
          </div>
        )}
      </Scene>
    </div>
  )
}

export default SceneWrapper
