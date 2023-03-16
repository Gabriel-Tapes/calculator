import './styles/Prompt.css'

interface PromptProps {
  content: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  expression: string
}

export const Prompt = ({ content, onChange, expression }: PromptProps) => {
  return (
    <div className="prompt">
      <p className="expression">{expression}</p>
      <input
        type="text"
        value={content}
        onChange={e => {
          onChange(e)
        }}
      />
    </div>
  )
}
