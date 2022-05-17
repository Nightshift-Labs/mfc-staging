import dynamic from 'next/dynamic'
import Modal from 'react-modal'
import { TransactionModalProps } from '../../interfaces/TransactionModalProps'
import { PurchaseStatus } from '../../utils/constants'

const Button = dynamic(() => import('../shared/button'))

//ASSETS
import styles from '../../styles/components/transactionModal.module.scss'

Modal.setAppElement('body')

const customStyles = {
  content: {
    border: 'none',
    padding: '0',
    overflow: 'initial',
    height: 'fit-content',
    top: '50%',
    background: 'transparent',
    transform: 'translate(0, -50%)',
    maxWidth: '750px',
    margin: '0 auto',
    maxHeight: 'calc(100vh - 100px)',
    width: '100%',
    left: '0'
  },
  overlay: {
    background: 'rgba(0,0,0, 0.85)',
    backdropFilter: 'blur(5px)',
    zIndex: '999'
  }
}

const TransactionModal = ({
  isOpen,
  closeModal,
  status,
  onViewTransactions,
  disabled
}: TransactionModalProps) => {
  const getTransactionTitle = () => {
    switch (status) {
      case PurchaseStatus.Waiting:
        return 'Transaction in Progress'
      case PurchaseStatus.Confirmed:
        return 'Payment Confirmed'
      case PurchaseStatus.Transferring:
        return 'Now Transferring'
      case PurchaseStatus.Completed:
        return 'Transaction Completed'
      case PurchaseStatus.Expired:
        return 'Transaction Has Expired'
      default:
        return 'Payment in Progress'
    }
  }
  const getTransactionMessage = () => {
    switch (status) {
      case PurchaseStatus.Waiting:
        return 'Your transaction will be completed soon. We will let you know if there are any unexpected problems.'
      case PurchaseStatus.Confirmed:
        return 'We have successfully confirmed your payment. We are preparing to send your mint confirmation!'
      case PurchaseStatus.Transferring:
        return 'We are transferring your mint confirmation to your wallet. WARNING: Attempting to sell or transfer your mint confirmation may void your EGG mint.'
      case PurchaseStatus.Completed:
        return ''
      case PurchaseStatus.Expired:
        return ''
      default:
        return 'We are processing your payment. Once your payment and transaction is complete, you will be sent your mint confirmation!'
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case PurchaseStatus.Waiting:
        return <div className={styles.statusWaiting} />
      case PurchaseStatus.Confirmed:
        return <div className={styles.statusConfirmed} />
      case PurchaseStatus.Transferring:
        return <div className={styles.statusTransferring} />
      case PurchaseStatus.Completed:
        return <div className={styles.statusConfirmed} />
      case PurchaseStatus.Expired:
        return <div className={styles.statusExpired} />
      default:
        return <div className={styles.statusWaiting} />
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={500}
    >
      <div className={styles.outline}>
        <h3>{getTransactionTitle()}</h3>
        <p>{getTransactionMessage()}</p>
        <div className={styles.status}>{getStatusIcon()}</div>
        <div className={styles.buttonWrapper}>
          <Button
            click={() => onViewTransactions()}
            text='View Transactions'
            type='primary'
            disabled={disabled}
            icon={false}
            link=''
          />
        </div>
      </div>
    </Modal>
  )
}

export default TransactionModal
