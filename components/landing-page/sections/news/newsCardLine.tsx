import styles from './news.module.scss'
import useFitText from 'use-fit-text'
import React from 'react'

const NewsCardLine = ({ content, className, maxFontSize }: any) => {
  const { fontSize, ref } = useFitText()
  return (
    <div
      style={{
        fontSize: maxFontSize,
        width: '100%',
        height: '100%',
        position: 'relative'
      }}
    >
      <div ref={ref} className={styles[className]} style={{ fontSize }}>
        {content
          .split('__')
          .map((c: string, i: number) =>
            i % 2 === 0 ? (
              <React.Fragment key={i}>{c}</React.Fragment>
            ) : (
              <span key={i}>{c}</span>
            )
          )}
      </div>
    </div>
  )
}

export default NewsCardLine
