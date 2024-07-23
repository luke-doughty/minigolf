import { FC } from 'react'
import './ScoreCard.css'

interface ScoreCardProps {
  shotTotal: number
  holeTotal: number
  holePar: number
  holeNumber: number
}

export const ScoreCard: FC<ScoreCardProps> = ({
  shotTotal,
  holeTotal,
  holePar,
  holeNumber,
}) => {
  return (
    <div className='score-card-background'>
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
  )
}
