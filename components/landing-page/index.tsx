import { Controller } from 'react-scrollmagic'
import SceneWrapper from './scene-wrapper'
import FlairOverlay from './generic/flair/overlay'
import IntroSection from './sections/intro'
import styles from './scene.module.scss'
import landingPage from './landing-page.json'

import MechaSection from './sections/mecha'
import TitleSection from './sections/title'
import InfoSection from './sections/info'
import DetailsSection from './sections/details'
import DetailsText from './sections/details/detailsText'

import InfoCardsMobile from './sections/info-cards/mobile'
import InfoCardsSection from './sections/info-cards'
import { useEffect, useState } from 'react'
import NewsSection from './sections/news'
import ReleaseSection from './sections/release'
import ProjectTeamDesktop from './sections/project-team/desktop'
import ProjectTeamMobile from './sections/project-team/mobile'
import MediaMobile from './sections/media/mobile'
import MediaDesktop from './sections/media/desktop'
import InvestorsSection from './sections/investors'
import FooterSection from './sections/footer'
import Header from '../shared/header'
import Loader from './loader'
import ReleaseMobile from './sections/release/mobile'
import NewsMobile from './sections/news/newsMobile'

const LandingPage = () => {
  const [overlayVisible, setOverlayVisible] = useState(true)
  const [pageLoading, setPageLoading] = useState(true)
  const [sidebarValue, setSidebarValue] = useState(0)

  const onStateChange = () => {
    setPageLoading(document.readyState !== 'complete')
  }

  const updateSidebar = (initial: number, progress: number) => {
    setSidebarValue(initial + progress)
  }

  useEffect(() => {
    var checkInterval = setInterval(() => {
      if (document.readyState === 'complete') {
        setPageLoading(false)
        clearInterval(checkInterval)
      }
    }, 100)
    return () => clearInterval(checkInterval)
  }, [])

  return (
    <div className={`${styles.pageCursor} ${styles.pageWrapper}`}>
      <Header title='Landing Page' />
      <Loader loading={pageLoading} />
      <FlairOverlay
        height={3000}
        visible={overlayVisible}
        sidebarValue={sidebarValue}
      />
      <Controller>
        <SceneWrapper
          id={'landing-intro'}
          desktop={<IntroSection pageLoading={pageLoading} />}
          duration={1000}
          updateSidebar={(p: any) => updateSidebar(1, p)}
        />

        <SceneWrapper
          id={'landing-mecha'}
          desktop={<MechaSection frames={landingPage.mecha} />}
          duration={2500}
          updateSidebar={(p: any) => updateSidebar(2, p)}
        />

        <SceneWrapper
          id={'landing-title'}
          desktop={<TitleSection />}
          duration={3000}
          updateSidebar={(p: any) => updateSidebar(3, p)}
        />

        <SceneWrapper
          id={'landing-info'}
          desktop={<InfoSection />}
          duration={3000}
          updateSidebar={(p: any) => updateSidebar(4, p)}
        />

        <SceneWrapper
          id={'landing-details'}
          desktop={<DetailsSection toggle={setOverlayVisible}  />}
          duration={5000}
          updateSidebar={(p: any) => updateSidebar(5, p)}
        />

        <InfoCardsMobile
          toggle={setOverlayVisible}
          cards={landingPage.infoCards}
        />
        <SceneWrapper
          id={'landing-infocards'}
          desktop={
            <InfoCardsSection
              toggle={setOverlayVisible}
              cards={landingPage.infoCards}
            />
          }
          hideOnMobile={true}
          duration={2000}
          updateSidebar={(p: any) => updateSidebar(6, p)}
        />

        <NewsMobile news={landingPage.news} />
        <SceneWrapper
          id={'landing-news'}
          hideOnMobile={true}
          desktop={<NewsSection news={landingPage.news} />}
          duration={landingPage.news.length * 1000}
          updateSidebar={(p: any) => updateSidebar(7, p)}
        />

        <ReleaseMobile />
        <SceneWrapper
          id={'landing-release'}
          hideOnMobile={true}
          desktop={<ReleaseSection/>}
          duration={2000}
          updateSidebar={(p: any) => updateSidebar(8, p)}
        />

        <ProjectTeamMobile projectTeam={landingPage.projectTeam} />
        <SceneWrapper
          id={'landing-team'}
          desktop={
            <ProjectTeamDesktop
              toggle={setOverlayVisible}
              projectTeam={landingPage.projectTeam}
            />
          }
          hideOnMobile={true}
          duration={3000}
          updateSidebar={(p: any) => updateSidebar(9, p)}
        />

        <MediaMobile mediaCards={landingPage.mediaCards} />
        <SceneWrapper
          id={'landing-media'}
          desktop={<MediaDesktop mediaCards={landingPage.mediaCards} />}
          hideOnMobile={true}
          duration={3000}
          updateSidebar={(p: any) => updateSidebar(10, p)}
        />

        <SceneWrapper
          id={'landing-investors'}
          desktop={<InvestorsSection imgs={landingPage.investors} />}
          duration={2000}
          updateSidebar={(p: any) => updateSidebar(11, p)}
        />

        <FooterSection />
      </Controller>
    </div>
  )
}

export default LandingPage
