import { useEffect, useState } from 'react';
import styles from './progress.module.scss'

const ProgressFlair = ({ className }: any) => {
    const initalState = 0;
    const [prog, setProg] = useState(initalState);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setProg(prog === 100 ? 0 : prog + 1);
      }, 100);
      return () => clearInterval(interval)
    }, [prog]);


  return (
    <div className={className}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div>Loading...</div>
          <div>{prog}%</div>
        </div>
        <div className={styles.progress}>
          <div className={styles.complete} style={{width: `${prog}%`}} />
        </div>
      </div>
    </div>
  )
}

export default ProgressFlair
