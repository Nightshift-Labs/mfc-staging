import styles from './projectTeam.module.scss'
import TeamCard from './teamCard'

const ProjectTeamMobile = ({ projectTeam }: any) => {
  return (
      <div className={styles.projectTeamMobileWrapper}>
        <div className={styles.teamTitleMobile}>
          Project <span>Team</span>
        </div>
        {projectTeam.map((team: any, i: number) => (
          <div className={styles.mobileCardContainer} key={i}>
            <TeamCard card={team} />
          </div>
        ))}
      </div>
  )
}

export default ProjectTeamMobile
