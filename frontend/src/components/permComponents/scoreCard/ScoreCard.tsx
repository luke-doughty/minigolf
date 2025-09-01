import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
} from '@chakra-ui/react'
import { FC } from 'react'
import { IconVolume, IconVolumeMute } from '../SvgIcons'
import './ScoreCard.css'

interface ScoreCardProps {
  shotTotal: number
  holeTotal: number
  holePar: number
  holeNumber: number
  initialVolumne: number
  updateVolume: (newVolume: number) => void
}

export const ScoreCard: FC<ScoreCardProps> = ({
  shotTotal,
  holeTotal,
  holePar,
  holeNumber,
  initialVolumne,
  updateVolume,
}) => {
  return (
    <div className='score-card-background'>
      <div className='score-card-background-layout'>
        <div className='score-card-hole-number'>Hole {holeNumber}</div>
        <div className='score-card-stats'>
          <div className='score-card-inner-text'>
            <div className='score-card-inner-text-title-total'>Total: </div>
            <div className='score-card-inner-text-total-score'>{shotTotal}</div>
          </div>
          <div className='score-card-inner-text'>
            <div className='score-card-inner-text-title-total'>Hole: </div>
            <div className='score-card-inner-text-total-score'>{holeTotal}</div>
          </div>
          <div className='score-card-inner-text'>
            <div className='score-card-inner-text-title-total'>Par: </div>
            <div className='score-card-inner-text-total-score'>{holePar}</div>
          </div>
        </div>
      </div>
      <div className='score-card-inner-volume-slider' style={{ minHeight: '30px', justifyContent: 'center' }}>
        <Slider
          aria-label='volume-slider'
          defaultValue={initialVolumne}
          onChange={(volume) => updateVolume(volume)}
          width={'85%'}
        >
          <SliderTrack backgroundColor={'#d6915a'} height={'12px'} borderRadius={5}>
            <SliderFilledTrack backgroundColor={'#cc6514'} />
          </SliderTrack>
          <SliderThumb
            boxSize={6}
            borderRadius={5}
          >
            {initialVolumne === 0 ? <IconVolumeMute /> : <IconVolume />}
          </SliderThumb>
        </Slider>
      </div>
    </div>
  )
}
