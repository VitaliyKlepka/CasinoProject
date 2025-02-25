import React from 'react'

interface GamePointProps {
    type?: string
    isPending?: boolean
}

const GamePoint: React.FC<GamePointProps> = ({type, isPending}) => {
    return (
        <div className='game-point'>{ isPending ? <span className="loader"></span> : type}</div>
    )
}

export default GamePoint