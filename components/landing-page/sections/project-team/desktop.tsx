import { useEffect } from 'react'
import ScrollFader from '../../generic/scrollFader'
import styles from './projectTeam.module.scss'
import TeamCard from './teamCard'

const ProjectTeamDesktop = ({ projectTeam, progress, toggle }: any) => {
  useEffect(() => {
    const isDesktop = window.innerWidth > 1200
    toggle(!isDesktop || !(progress > 0 && progress < 1))
  }, [progress])

  const range = 0.2

  const width = 100 / Math.ceil(projectTeam.length / 2)
  const height = 35

  const calcLeft = (i: number) => {
    const index = i % Math.ceil(projectTeam.length / 2)
    return `${(width * index).toFixed(2)}%`
  }
  const calcTop = (i: number) => {
    const row = Math.round(i / projectTeam.length)
    const top = 20 + row * 40
    return `${top}%`
  }
  const calcMin = (i: number) => (i / projectTeam.length) * range
  const calcMax = (i: number) =>
    1 - ((projectTeam.length - i) / projectTeam.length) * range

  return (
    <div className={styles.projectTeam}>
      <ScrollFader
        scaleIn={1}
        top='12.5%'
        left='50%'
        progress={progress}
        scrollVisibleDistance={0}
        max={1 - range}
      >
        <div className={styles.teamTitle}>
          Project <span>Team</span>
        </div>
      </ScrollFader>
      {projectTeam.map((team: any, i: number) => (
        <ScrollFader
          key={i}
          progress={progress}
          scrollVisibleDistance={0}
          scaleIn={1}
          width={`${width.toFixed(2)}%`}
          height={`${height.toFixed(2)}%`}
          left={calcLeft(i)}
          top={calcTop(i)}
          noTransform
          min={calcMin(i)}
          max={calcMax(i)}
        >
          <TeamCard key={i} card={team} />
        </ScrollFader>
      ))}
    </div>
  )
}
export default ProjectTeamDesktop
