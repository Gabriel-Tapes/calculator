import { useState } from 'react'
import { Keyboard } from './Keyboard'
import { Prompt } from './Prompt'
import './styles/Calculator.css'

type Operation = '+' | '-' | '*' | '/' | '%' | ''

export const Calculator = () => {
  const [content, setContent] = useState<string>('')
  const [num1, setNum1] = useState<number>(NaN)
  const [operation, setOperation] = useState<Operation>('')

  const handleClick = {
    operation: (target: HTMLButtonElement) => {
      operation !== ''
        ? setNum1(equals[operation](num1, Number(content)))
        : setNum1(Number(content))

      setContent('')
      setOperation(target.id as Operation)
    },
    number: (target: HTMLButtonElement) => {
      setContent(content => Number(content + target.id).toString())
    },
    dot: () => {
      content.includes('.')
        ? setContent(content)
        : setContent(content => (content || '0') + '.')
    },
    clear: () => {
      setContent('')
      setNum1(NaN)
      setOperation('')
    },
    del: () => {
      setContent(content => content.slice(0, -1))
    },
    sign: () => {
      if (content !== '') setContent(content => String(-Number(content)))
    },
    equal: () => {
      if (!isNaN(Number(content)) && operation !== '') {
        const result = equals[operation](num1, Number(content))
        setContent(result.toString())
        setNum1(result)
        setOperation('')
      }
    }
  }

  return (
    <div className="calculator">
      <Prompt
        content={content}
        onChange={e => {
          setContent(
            e.target.value.match(/[0-9]/)
              ? e.target.value
              : e.target.value.slice(0, -1)
          )
        }}
      />
      <Keyboard handleClick={handleClick} />
    </div>
  )
}

const equals = {
  '+': (num1: number, num2: number) => num1 + num2,
  '-': (num1: number, num2: number) => num1 - num2,
  '*': (num1: number, num2: number) => num1 * num2,
  '/': (num1: number, num2: number) => num1 / num2,
  '%': (num1: number, num2: number) => num1 * num2 * 0.01,
  '': (num1: number, num2: number) => 'Invalid Operator'
}
