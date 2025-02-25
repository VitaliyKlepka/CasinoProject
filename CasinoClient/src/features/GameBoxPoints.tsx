import React from 'react'
import { IAppState, useAppStore } from '../infra/appState'
import GamePoint from './GamePoint'

interface GameBoxPointsProps {}

const GameBoxPoints: React.FC<GameBoxPointsProps> = () => {
  const {
    pointOne,
    pointTwo,
    pointThree,
    twistAvailable,
  } = useAppStore((state: IAppState) => state)

  return (
    <div className='game-box-points'>
      <GamePoint type={pointOne} isPending={!twistAvailable && !pointOne} />
      <GamePoint type={pointTwo} isPending={!twistAvailable && !pointTwo} />
      <GamePoint type={pointThree} isPending={!twistAvailable && !pointThree} />
    </div>
  )
}

export default GameBoxPoints