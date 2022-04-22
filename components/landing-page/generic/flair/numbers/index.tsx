import { Component, useEffect, useState } from 'react'
import styles from './numbers.module.scss'

function rand (min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randByLength (length: number) {
  return rand(
    parseInt('1' + '0'.repeat(length - 1)),
    parseInt('9'.repeat(length))
  ).toString()
}

const generateNumber = () => {
  const contentTypeSeed = Math.random()
  const contentType =
    contentTypeSeed < 0.05 ? 'blank' : contentTypeSeed < 0.4 ? 'short' : 'full'

  if (contentType === 'blank') return ''
  if (contentType === 'full') return randByLength(12)

  var segment = rand(3, 9)
  return `${randByLength(segment)} ${randByLength(11 - segment)}`
}

type NumbersProps = {
  className: string
}

type NumbersState = {
  numbersLeft: string[]
  numbersRight: string[]
}

class NumbersFlair extends Component<NumbersProps, NumbersState> {
  interval: any
  constructor (props: any) {
    super(props)
    this.state = {
      numbersLeft: [
        "111111111111",
        "111111111111",
        "111111111111",
        "111111111111",
        "111111111111",
        "111111111111",
        "111111111111",
        "111111111111",
      ],
      numbersRight: [
        "111111111111",
        "111111111111",
        "111111111111",
        "111111111111",
        "111111111111",
        "111111111111",
        "111111111111",
        "111111111111",
        "111111111111"
      ]
    }
  }

  generate = () => {
    const nextLeft = generateNumber()
    const newLeft = [...this.state.numbersLeft]
    newLeft.unshift(nextLeft)
    newLeft.pop()

    const nextRight = generateNumber()
    const newRight = [...this.state.numbersRight]
    newRight.unshift(nextRight)
    newRight.pop()

    this.setState({ numbersLeft: newLeft, numbersRight: newRight })
  }

  componentDidMount = () => {
    this.interval = setInterval(this.generate, 100)
  }

  componentWillUnmount = () => clearInterval(this.interval)

  render () {
    const { className }: any = this.props
    const { numbersLeft, numbersRight }: any = this.state
    return (
      <div className={className}>
        <div className={styles.wrapper}>
          <div>
            <br />
            {numbersLeft.map((n: string, i: number) => (
              <div
                className={`${i === 2 && styles.highlight}`}
                key={`${i}-${n}`}
              >
                {!!n ? n : <br />}
              </div>
            ))}
          </div>
          <div>
            {numbersRight.map((n: string, i: number) => (
              <div
                className={`${i === 0 && styles.highlight}`}
                key={`${i}-${n}`}
              >
                {!!n ? n : <br />}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default NumbersFlair
