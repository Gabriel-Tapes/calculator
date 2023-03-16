import { useState } from 'react'
import { Keyboard } from './Keyboard'
import { Prompt } from './Prompt'
import './styles/Calculator.css'

type Operation = '+' | '-' | '*' | '/' | '%' | ''

export const Calculator = () => {
  const [content, setContent] = useState<string>('')
  const [expression, setExpression] = useState<string>('')
  const [num1, setNum1] = useState<number>(NaN)
  const [operation, setOperation] = useState<Operation>('')

  const handleClick = {
    operation: (target: HTMLButtonElement) => {
      operation !== ''
        ? setNum1(equals[operation](num1, Number(content)))
        : setNum1(Number(content))
      setContent('')
      setExpression(
        expression => `${expression}${target.id}${target.id === '%' ? '*' : ''}`
      )
      setOperation(target.id as Operation)
    },
    number: (target: HTMLButtonElement) => {
      setContent(content =>
        num1 === Number(content) && !operation
          ? target.id
          : Number(content + target.id).toString()
      )
      setExpression(expression =>
        num1 === Number(content) && !operation
          ? target.id
          : expression + target.id
      )
    },
    dot: () => {
      if (content.includes('.')) {
        setContent(content)
        setExpression(expression)
      } else {
        setContent(content => (content || '0') + '.')
        setExpression(expression => (expression || '0') + '.')
      }
    },
    clear: () => {
      setContent('')
      setNum1(NaN)
      setOperation('')
      setExpression('')
    },
    del: () => {
      setContent(content => content.slice(0, -1))
      setExpression(expression =>
        !isNaN(Number(expression.slice(-1)))
          ? expression.slice(0, -1)
          : expression
      )
    },
    sign: () => {
      if (content !== '') {
        setContent(content => String(-Number(content)))
        setExpression(expression =>
          !operation
            ? `-${expression}`
            : expression.replace(
                /(\d+\.?\d*)([+\-*/%])(-?\d+\.?\d*)$/,
                (match, n1: string, op: string, n2: string) =>
                  `${n1}${op}(-${n2}`
              )
        )
      }
    },
    equal: () => {
      if (!isNaN(Number(content)) && operation !== '') {
        const result = equals[operation](num1, Number(content))
        setContent(`${Math.round(result * 10000) / 10000}`)
        setNum1(result)
        setExpression(`${Math.round(result * 10000) / 10000}`)
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
        expression={expression}
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
  '%': (num1: number, num2: number) => num1 * num2 * 0.01
}
