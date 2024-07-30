import { AnimatePresence, motion } from 'framer-motion'
import { FC, useState } from 'react'
import { IconControls, IconCV, IconGithub, IconLinkedinCircled } from '../SvgIcons'
import { AnimatedHoverButton } from './MotionButton'

interface SpeedDialProps {
  showControlsButton: boolean
  onClickControls: () => void
  showGithubLinkButton: boolean
  onClickGitHub: () => void
  showLinkedInButton: boolean
  onClickLinkedIn: () => void
  showCVButton: boolean
  onClickCV: () => void
}
export enum ButtonTypes {
  None = 'NONE',
  Controls = 'CONTROLS',
  GitHub = 'GITHUB',
  LinkedIn = 'LINKEDIN',
  CV = 'CV',
}

export const SpeedDial: FC<SpeedDialProps> = ({
  showControlsButton,
  onClickControls,
  showGithubLinkButton,
  onClickGitHub,
  showLinkedInButton,
  onClickLinkedIn,
  showCVButton,
  onClickCV,
}) => {
  const [isHovered, setIsHovered] = useState<ButtonTypes>(ButtonTypes.None)
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '10px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column-reverse',
      }}
    >
      {showControlsButton && (
        <AnimatedHoverButton
          buttonType={isHovered}
          icon={<IconControls />}
          onMouseEnter={() => setIsHovered(ButtonTypes.Controls)}
          onMouseLeave={() => setIsHovered(ButtonTypes.None)}
          onClick={onClickControls}
        />
      )}
      {showGithubLinkButton && (
        <AnimatedHoverButton
          buttonType={isHovered}
          icon={<IconGithub />}
          onMouseEnter={() => setIsHovered(ButtonTypes.CV)}
          onMouseLeave={() => setIsHovered(ButtonTypes.None)}
          onClick={onClickGitHub}
        />
      )}
      {showLinkedInButton && (
        <AnimatedHoverButton
          buttonType={isHovered}
          icon={<IconLinkedinCircled />}
          onMouseEnter={() => setIsHovered(ButtonTypes.GitHub)}
          onMouseLeave={() => setIsHovered(ButtonTypes.None)}
          onClick={onClickLinkedIn}
        />
      )}
      {showCVButton && (
        <AnimatedHoverButton
          buttonType={isHovered}
          icon={<IconCV />}
          onMouseEnter={() => setIsHovered(ButtonTypes.LinkedIn)}
          onMouseLeave={() => setIsHovered(ButtonTypes.None)}
          onClick={onClickCV}
        />
      )}
    </div>
  )
}
