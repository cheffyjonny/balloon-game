export interface IOption {
  title: string
  value: string // select, custom, back, start
  rows?: number
  cols?: number
}
interface Props {
  list: IOption[]
  className: string
  handleClick: (option: IOption) => void
}

const Option = ({ list, className, handleClick }: Props) => {
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

export default Option
