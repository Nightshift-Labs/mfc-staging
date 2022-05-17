import styles from './scene.module.scss'
import { Player } from '@lottiefiles/react-lottie-player'
import anim from '../../public/animations/Anim-Loading.json'

const loader = ({ loading }: any) => {
  if (!loading) return null

  return (
    <div className={`${styles.loader} ${!!loading && styles.loaderActive}`}>
      <Player
        loop
        autoplay
        src={anim}
        style={{ height: '100vh', width: '100vw' }}
      />
    </div>
  )
}

export default loader
