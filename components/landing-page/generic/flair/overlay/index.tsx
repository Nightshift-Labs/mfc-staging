import styles from './overlay.module.scss'
import numbers from '../../../../../public/images/flair/numbers.svg'
import borderCircle from '../../../../../public/images/flair/border-circle.svg'
import mouse from '../../../../../public/images/flair/mouse.svg'
import finger from '../../../../../public/images/flair/finger.svg'
import { useContext, useEffect, useState } from 'react'
import Sidebar from '../sidebar'
import { UserContext } from '../../../../../contexts/user-context'
import { MintStatusAPIResponse } from '../../../../../interfaces/api/MintStatusAPIResponse'
import { api } from '../../../../../pages/_app'
import { SetupTopBarContext } from '../../../../../contexts/topbar-context'

function randomInteger (min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const genNum = () => {
  const random = randomInteger(100000000000, 999999999999).toString()
  const space = randomInteger(3, 10)
  return random.slice(0, space) + ' ' + random.slice(space)
}

const FlairOverlay = ({ height, visible, sidebarValue }: any) => {
  const {text: topBarText} = useContext(SetupTopBarContext);

  // Params
  const fadePoint = height - 1000

  const getOpacity = () =>
    Math.max(Math.min((window.scrollY - height) / (fadePoint - height), 1), 0)

  const topInit = [randomInteger(30, 50), randomInteger(40, 80)]
  const cap = [randomInteger(1, 5), randomInteger(1, 5)]

  const [num, setNum] = useState(['', ''])
  const [top, setTop] = useState([-100, -100])
  const [opacity, setOpacity] = useState(1)

  const onScroll = () => {
    const newOpacity = getOpacity()
    if (opacity !== newOpacity) setOpacity(newOpacity)

    if (window.scrollY > height * 1.1) return
    setTop([
      topInit[0] - (window.scrollY / height) * cap[0],
      topInit[1] - (window.scrollY / height) * cap[1]
    ])
    setNum([genNum(), genNum()])
  }
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])



  return (
    <div
      className={`${styles.wrapper} ${
        visible === false ? styles.hideWrapper : ''
      }`}
    >
      <Sidebar value={sidebarValue} />
      <div className={`${styles.borderline} ${styles.left}`} />
      <div className={`${styles.borderline} ${styles.right}`} />
      <div style={{ opacity }}>
        <div className={`${styles.borderLine} ${!!topBarText ? styles.borderLineTopBar : ''}`} />
        <div className={`${styles.borderLine} ${styles.borderLineBottom}`} />
        <div className={styles.borderNumberLeft} style={{ top: ` ${top[0]}%` }}>
          {num[0]}
        </div>
        <div
          className={styles.borderNumberRight}
          style={{ top: ` ${top[1]}%` }}
        >
          {num[1]}
        </div>
        <img className={styles.numbers} src={numbers.src} alt='' />
        <img className={styles.borderCircle} src={borderCircle.src} alt='' />
        <img className={styles.mouse} src={mouse.src} alt='' />
        <img className={styles.finger} src={finger.src} alt='' />
      </div>
    </div>
  )
}

export default FlairOverlay
