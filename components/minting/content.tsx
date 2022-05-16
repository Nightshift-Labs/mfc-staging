import { useState } from 'react'
import Button from '../shared/button'
import CoinbaseCommerceButton from 'react-coinbase-commerce'

import { MintingProps } from '../../interfaces/MintingProps'

import styles from '../../styles/components/minting.module.scss'
import buttonStyles from '../../styles/components/button.module.scss'

const MintingContent = ({
  title,
  pending,
  mintedAmount,
  mintedTotal,
  priceInSol,
  priceInUsd,
  text,
  buttonA,
  buttonB,
  buttonSideText,
  windowTitle,
  windowText,
  hideMinted,
  commerceData
}: MintingProps) => {
  const showCommerceButton = !!commerceData?.showCommerceButton
  const [paymentSuccessful, setPaymentSuccessful] = useState(false)

  return (
    <div className={styles.content}>
      <div className={styles.logo}>
        <video autoPlay playsInline loop muted={true}>
          <source type='video/mp4' src='images/mint.mp4' />
        </video>
      </div>
      <div className={styles.layoutWrapper}>
        <div className={styles.layout}>
          {/* Green Title */}
          <div className={styles.minting}>MINTING</div>
          {/* Large title */}
          <div className={styles.title}>{title}</div>
          {/* Minted and Pricing */}
          {hideMinted !== true && (
            <div className={styles.amount}>
              <div>
                <div className={styles.amountTitle}>Minted</div>
                <div className={styles.amountContent}>
                  {mintedAmount?.toLocaleString()} /{' '}
                  {mintedTotal?.toLocaleString()}{' '}
                </div>
                <div>({pending} pending)</div>
              </div>
              <div>
                <div className={styles.amountTitle}>Price</div>
                <div className={styles.amountContent}>
                  <div className={styles.amountCurrency}>
                    <div className={styles.iconSol} />
                    <span>{priceInSol}</span>
                    <span className={styles.or}>OR</span>
                    <div className={styles.iconDollar} />
                    <span>{priceInUsd?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* General Text */}
          <div className={styles.text}>{text}</div>

          {/* Buttons */}
          {!!buttonA && (
            <div className={styles.btns}>
              {buttonA && (
                <div>
                  <Button
                    click={buttonA.click}
                    text={!!buttonA.loading ? 'Loading...' : buttonA.text}
                    disabled={!!buttonA.disabled || showCommerceButton}
                    link=''
                    type='primary'
                    icon={false}
                  />
                </div>
              )}
              {!!showCommerceButton ? (
                <div>
                  <CoinbaseCommerceButton
                    chargeId={commerceData?.coinbaseChargeId}
                    onChargeFailure={() => setPaymentSuccessful(false)}
                    onModalClosed={() => {
                      commerceData?.setShowCommerceButton(false)
                      setPaymentSuccessful(false)
                    }}
                    onPaymentDetected={() => {
                      commerceData?.setShowCommerceButton(false)
                      commerceData?.startTransactionModal()
                      setPaymentSuccessful(false)
                    }}
                    className={buttonStyles.secondary}
                  >
                    Confirm Payment
                  </CoinbaseCommerceButton>
                </div>
              ) : !!buttonB ? (
                <div>
                  <Button
                    click={buttonB.click}
                    text={!!buttonB.loading ? 'Loading...' : buttonB.text}
                    link=''
                    type='secondary'
                    icon={false}
                    disabled={!!buttonB.disabled}
                  />
                </div>
              ) : (
                <div className={styles.btnsSideText}>
                  <span>{buttonSideText}</span>
                </div>
              )}
            </div>
          )}

          {/* Window Live */}
          <div className={styles.live}>
            {windowTitle && (
              <div className={styles.liveTitle}>
                <div className={styles.icon} />
                <span>{windowTitle}</span>
              </div>
            )}
            <div className={styles.liveText}>{windowText}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MintingContent
