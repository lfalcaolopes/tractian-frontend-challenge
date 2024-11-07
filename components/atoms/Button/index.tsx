import React from 'react'

import * as Styled from './styles'
import Image, { StaticImageData } from 'next/image'

interface ButtonProps {
  name: string
  onClick: () => void
  icon: StaticImageData
  theme: 'white' | 'blue'
  isSelected: boolean
}


const Button: React.FC<ButtonProps> = ({ name, onClick, icon, theme, isSelected }) => {
  return (
    <Styled.Button onClick={onClick} theme={theme} $isSelected={isSelected}>
      <Image src={icon} alt={name} />
        
      {name}
    </ Styled.Button>
  )
}

export default Button