import { useState } from 'react'
import './App.css'

export const App = () => {
  const [content, setContent] = useState<string>('')
  const [num1, setNum1] = useState<number>(NaN)
  const [operation, setOperation] = useState<string>('')

  const handleClick = (target: HTMLButtonElement) => {
    if (target.className === 'number') {
      if (target.id === '.')
        if (content.includes('.')) setContent(content)
        else setContent(content => (content || '0') + target.id)
      else setContent(content => Number(content + target.id).toString())
    } else if (target.className === 'operation') {
      setNum1(Number(content))

      if (operation !== '') {
        const result = equals(num1, Number(content), operation)
        setContent(result.toString())
        setNum1(result)
        setOperation('')
      }
      setContent('')

      setOperation(target.id)
    } else if (target.className === 'special') {
      switch (target.id) {
        case 'clear':
          setContent('')
          setNum1(NaN)
          setOperation('')
          break
        case 'del':
          setContent(content => content.slice(0, -1))
          break
        case 'sign':
          if (content !== '') setContent(content => String(-Number(content)))
          break
        case 'equal':
          if ((isNaN(num1) || isNaN(Number(content))) && operation !== '')
            alert('invalid operators')
          else if (!isNaN(Number(content)) && operation === '')
            setContent(content)
          else {
            const result = equals(num1, Number(content), operation)
            setContent(result.toString())
            setNum1(result)
            setOperation('')
          }
      }
    }
  }

  return (
    <div className="calculator">
      <div className="prompt">
        <input
          type="text"
          value={content}
          onFocus={e => {
            e.preventDefault()
          }}
          onChange={e => {
            setContent(e.target.value)
          }}
        />
      </div>
      <div className="keyboard">
        {buttons.map((button, index) => {
          return (
            <button
              type="button"
              className={button.className}
              id={button.id}
              key={index}
              onClick={e => {
                handleClick(e.target as HTMLButtonElement)
              }}
            >
              {button.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

interface Button {
  label: string
  className: string
  id: string
}

const buttons: Button[] = [
  { className: 'special', id: 'clear', label: 'CE' },
  { className: 'special', id: 'del', label: '⌫' },
  { className: 'operation', id: '%', label: '%' },
  { className: 'operation', id: '/', label: '/' },
  { className: 'number', id: '7', label: '7' },
  { className: 'number', id: '8', label: '8' },
  { className: 'number', id: '9', label: '9' },
  { className: 'operation', id: '*', label: 'x' },
  { className: 'number', id: '4', label: '4' },
  { className: 'number', id: '5', label: '5' },
  { className: 'number', id: '6', label: '6' },
  { className: 'operation', id: '-', label: '-' },
  { className: 'number', id: '1', label: '1' },
  { className: 'number', id: '2', label: '2' },
  { className: 'number', id: '3', label: '3' },
  { className: 'operation', id: '+', label: '+' },
  { className: 'special', id: 'sign', label: '+/-' },
  { className: 'number', id: '0', label: '0' },
  { className: 'number', id: '.', label: ',' },
  { className: 'special', id: 'equal', label: '=' }
]

const equals = (num1: number, num2: number, operator: string) => {
  switch (operator) {
    case '+':
      return num1 + num2
    case '-':
      return num1 - num2
    case '*':
      return num1 * num2
    case '/':
      return num1 / num2
    case '%':
      return num1 * num2 * 0.01
    default:
      throw new Error('invalid operator')
  }
}
