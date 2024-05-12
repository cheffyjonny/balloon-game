export interface IOption {
  title: string
  value: number
}

interface Props {
  list: IOption[]
  className: string
  handleClick: (option: IOption) => void
}

const Button = ({ list, className, handleClick }: Props) => {
  return (
    <div className={className}>
      {list.map((item, index) => (
        <button
          key={index}
          onClick={() => handleClick(item)}
        >
          {item.title}
        </button>
      ))}
    </div>
  )
}

export default Button
