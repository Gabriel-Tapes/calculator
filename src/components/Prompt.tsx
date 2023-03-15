import './styles/Prompt.css'

interface PromptProps {
  content: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Prompt = ({ content, onChange }: PromptProps) => {
  return (
    <div className="prompt">
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
