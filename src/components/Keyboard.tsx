import './styles/Keyboard.css'

interface KeyboardProps {
  handleClick: {
    operation: (target: HTMLButtonElement) => void
    number: (target: HTMLButtonElement) => void
    dot: () => void
    clear: () => void
    del: () => void
    sign: () => void
    equal: () => void
  }
}

export const Keyboard = ({ handleClick }: KeyboardProps) => {
  return (
    <div className="keyboard">
      {buttons.map((button, index) => {
        return (
          <button
            type="button"
            className={button.className}
            id={button.id}
            key={index}
            onClick={e => {
              handleClick[button.className](e.target as HTMLButtonElement)
            }}
          >
            {button.label}
          </button>
        )
      })}
    </div>
  )
}

interface Button {
  label: string
  className: 'number' | 'operation' | 'clear' | 'del' | 'sign' | 'equal' | 'dot'
  id: string
}

const buttons: Button[] = [
  { className: 'clear', id: 'clear', label: 'CE' },
  { className: 'del', id: 'del', label: '⌫' },
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
  { className: 'sign', id: 'sign', label: '+/-' },
  { className: 'number', id: '0', label: '0' },
  { className: 'dot', id: '.', label: ',' },
  { className: 'equal', id: 'equal', label: '=' }
]
