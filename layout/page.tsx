import dynamic from 'next/dynamic'

import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/shared/navbar'
import { LayoutProps } from '../interfaces/LayoutProps'
import { MagicLinkModalContext } from '../contexts/magic-link-modal-context'
import { CompleteSignUpModalContext } from '../contexts/complete-signup-modal-context'
import { PaymentWalletModalContext } from '../contexts/payment-wallet-modal-context'
import pageStyles from '../styles/components/page.module.scss';

const Footer = dynamic(() => import('../components/shared/footer'))
const TopBar = dynamic(() => import('../components/shared/topbar'))
const MagicLinkModal = dynamic(() =>
  import('../components/modals/magic-link-modal')
)
const CompleteSignUpModal = dynamic(() =>
  import('../components/modals/complete-signup-modal')
)
const PaymentWalletModal = dynamic(() =>
  import('../components/modals/payment-wallet-modal')
)

const Page = ({ children, footer = true }: LayoutProps) => {
  const {
    isOpen: isMagicLinkModalOpen,
    closeModal: closeMagicLinkModal
  } = useContext(MagicLinkModalContext)
  const {
    isOpen: isCompleteSignUpModalOpen,
    closeModal: closeCompleteSignUpModal
  } = useContext(CompleteSignUpModalContext)
  const {
    isOpen: isPaymentWalletModalOpen,
    closeModal: closePaymentWalletModal
  } = useContext(PaymentWalletModalContext)
  const [hideFooter, setHideFooter] = useState(false)
  useEffect(() => {
    setHideFooter(!['mint'].includes(!!window ? window.location.href : ''))
  }, [])

  return (
    <>
      <div className={pageStyles.header}>
        <TopBar />
        <Navbar />
      </div>
      <main>{children}</main>
      {isMagicLinkModalOpen && closeMagicLinkModal && (
        <MagicLinkModal
          isOpen={isMagicLinkModalOpen}
          closeModal={closeMagicLinkModal}
        />
      )}
      {isCompleteSignUpModalOpen && closeCompleteSignUpModal && (
        <CompleteSignUpModal
          isOpen={isCompleteSignUpModalOpen}
          closeModal={closeCompleteSignUpModal}
        />
      )}
      {isPaymentWalletModalOpen && closePaymentWalletModal && (
        <PaymentWalletModal
          isOpen={isPaymentWalletModalOpen}
          closeModal={closePaymentWalletModal}
        />
      )}
      {!!footer ? <Footer /> : <></>}
    </>
  )
}

export default Page
