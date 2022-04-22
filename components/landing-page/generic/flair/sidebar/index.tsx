import { useEffect, useState } from 'react'
import styles from './scroll.module.scss'

function getScrollPos () {
  var h = document.documentElement,
    b = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight'
  return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)
}

const PageSideBar = ({ value }: any) => {
  const [pos, setPos] = useState(0)
  const [coverActive, setCoverActive] = useState(false);
  const fadePoint = 0.05
  const opacityTop = Math.min(1, pos / fadePoint)
  const opacityBottom = Math.max(Math.min((1 - pos) / fadePoint, 1), 0)
  const opacity = Math.min(opacityTop, opacityBottom)

  const updatePos = () => {
    setPos(getScrollPos());
  }
  
  const onClick = (id: string, offset: number) => {
    const amount = (document.getElementById(id)?.offsetTop ?? 0) + offset;
    window.scrollTo(0, amount)
    setCoverActive(true);
    setTimeout(() => {setCoverActive(false)}, 1000);
  }

  useEffect(() => {
    window.addEventListener('scroll', updatePos)
    updatePos()
    return () => window.removeEventListener('scroll', updatePos)
  }, [])

  return (
    <>
      <div className={`${styles.pageCover} ${coverActive ? styles.pageCoverActive : ''}`} />
      <div className={styles.pageScroller} style={{ opacity }}>
        <SidebarSegment
          value={value - 2}
          title='Welcome'
          onClick={() => onClick('landing-mecha', 300)}
        />
        <SidebarSegment
          value={value - 3}
          title='MFC'
          onClick={() => onClick('landing-title', 500)}
        />
        <SidebarSegment
          value={value - 4}
          title='What is MFC'
          onClick={() => onClick('landing-info', 500)}
        />
        <SidebarSegment
          value={value - 5}
          title='Exploring'
          onClick={() => onClick('landing-details', 200)}
        />
        <SidebarSegment
          value={value - 6}
          title='About'
          onClick={() => onClick('landing-infocards', 1000)}
        />
        <SidebarSegment
          value={value - 7}
          title='Roadmap'
          onClick={() => onClick('landing-news', 500)}
        />
        <SidebarSegment
          value={value - 8}
          title='Release'
          id='landing-release'
          offset={400}
          onClick={() => onClick('landing-release', 400)}
        />
        <SidebarSegment
          value={value - 9}
          title='Project Team'
          onClick={() => onClick('landing-team', 1000)}
        />
        <SidebarSegment
          value={value - 10}
          title='Press & Media'
          onClick={() => onClick('landing-media', 1000)}
        />
        <SidebarSegment
          value={value - 11}
          title='Investors'
          onClick={() => onClick('landing-investors', 500)}
        />
        <SidebarSegment
          value={value - 12}
          title='Sign Up'
          footer
          onClick={() => onClick('landing-footer', 0)}
        />
      </div>
    </>
  )
}

const SidebarSegment = ({
  value,
  title,
  id,
  onClick,
  footer = false
}: any) => {
  const active = value > 0
  const indicatorVisible = value > 0.05 && value < 0.95

  if (footer) {
    return (
      <div className={styles.segment} onClick={onClick}>
        <div className={`${styles.title} ${styles.footerTitle}`}>{title}</div>
        <div
          className={`${active ? styles.footerActive : styles.footerDefault} ${
            styles.footerIcon
          }`}
        />
      </div>
    )
  }

  return (
    <div className={styles.segment} onClick={onClick}>
      <div className={styles.title}>{title}</div>
      <div
        className={`${
          active ? styles.segmentIconActive : styles.segmentIconDefault
        } ${styles.segmentIcon}`}
      />
      <div className={styles.line}>
        {value > 0.05 && (
          <div
            className={styles.activeLine}
            style={{ height: `${value * 100}%` }}
          />
        )}
        {indicatorVisible && (
          <div
            className={styles.activeIndicator}
            style={{ top: `${value * 100}%` }}
          />
        )}
      </div>
    </div>
  )
}

export default PageSideBar
