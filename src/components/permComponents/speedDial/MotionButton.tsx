import React, { useState } from 'react'
import { Button, useTheme } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

interface AnimatedHoverButtonProps {
  buttonType: string
  icon: JSX.Element
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}

// @ts-ignore
// dumb but has to be done
const MotionButton = motion(Button)

export const AnimatedHoverButton: React.FC<AnimatedHoverButtonProps> = ({
  buttonType,
  icon,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState<string | null>(null)

  return (
    <AnimatePresence>
      <MotionButton
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.75 }}
        bg={
          isHovered === buttonType
            ? 'rgba(255, 255, 255, 0.8)'
            : 'rgba(255, 255, 255, 0.58)'
        }
        boxShadow={isHovered === buttonType ? '2px 2px 2px rgba(0,0,0,0.1)' : ''}
        onMouseEnter={() => {
          setIsHovered(buttonType)
          onMouseEnter()
        }}
        onMouseLeave={() => {
          setIsHovered(null)
          onMouseLeave()
        }}
        onClick={onClick}
        backdropFilter={'blur(4px)'}
        height={'65px'}
        width={'75px'}
        borderRadius={'10%'}
        margin={'6px'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {icon}
      </MotionButton>
    </AnimatePresence>
  )
}
