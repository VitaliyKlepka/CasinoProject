import React from 'react'
import LemonIcon from '../assets/lemon_icon.svg'
import OrangeIcon from '../assets/orange_icon.svg'
import CherryIcon from '../assets/cherry_icon.svg'
import WatermelonIcon from '../assets/watermelon_icon.svg'
// <img src={reactLogo} className="logo react" alt="React logo" />

interface GamePointProps {
  type?: string
  isPending?: boolean
}

const imageByType = (type?: string) => {
  switch (type) {
    case 'lemon':
      return <img src={LemonIcon} className="game-poiny-image" alt={type} />
    case 'orange':
        return <img src={OrangeIcon} className="game-poiny-image" alt={type} />
    case 'cherry':
        return <img src={CherryIcon} className="game-poiny-image" alt={type} />
    case 'watermelon':
        return <img src={WatermelonIcon} className="game-poiny-image" alt={type} />
    default:
      return null
  }
}

const GamePoint: React.FC<GamePointProps> = ({type, isPending}) => {
    return (
        <div className='game-point'>{ isPending ? <span className="loader"></span> : imageByType(type)}</div>
    )
}

export default GamePoint