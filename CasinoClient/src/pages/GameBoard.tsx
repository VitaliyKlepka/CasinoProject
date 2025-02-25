import React, { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import GameBoxHeader from '../features/GameBoxHeader'
import GameBoxFooter from '../features/GameBoxFooter'
import GameBoxPoints from '../features/GameBoxPoints'
import { IAppState, useAppStore } from '../infra/appState'

interface GameBoardProps {}

const gameBoardLayoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '500px',
    width: '700px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
}

const GameBoard: React.FC<GameBoardProps> = () => {
  const queryClient = useQueryClient()
  const {
    session,
    credits,
    balance,
    account,
  } = useAppStore((state: IAppState) => state)
//   const accQuery = useQuery({

  useEffect(() => {
    if (session && (credits === 0 || balance === 0)) {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['account'] })
    }
  }, [])

  return (
    // @ts-ignore
    <div style={gameBoardLayoutStyle}>
      <GameBoxHeader />
      <GameBoxPoints />
      <GameBoxFooter />
    </div>
    )
}

export default GameBoard