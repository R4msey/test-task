import { FC } from 'react'

interface IButton {
  title: string
  onClick?: any
}

export const Button:FC<IButton> = ({
  title,
  onClick
}) => {

  return(
    <div 
      className='button' 
      onClick={onClick}
    >
      {title}
    </div>
  )
}