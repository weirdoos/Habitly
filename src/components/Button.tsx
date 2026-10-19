

interface Props {
    name:string,
    onClick: () => void,
    classname: string

}

const Button = ({onClick, name, classname}:Props) => {
  return (
    <button className={classname} type="button" onClick={onClick} >{name}</button>
  )
}

export default Button