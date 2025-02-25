import React, { useEffect } from 'react'
import { IAppState, useAppStore } from '../infra/appState'
import InfoBox from './InfoBox'
import { useQuery } from '@tanstack/react-query'
import { getAccountQuery } from '../infra/queries/getAccount'

interface GameBoxHeaderProps {}

const GameBoxHeader: React.FC<GameBoxHeaderProps> = () => {
  const {
    credits,
    setCredits,
    balance,
    setBalance,
    setAccount,
    session,
  } = useAppStore((state: IAppState) => state)
  const { data: account, isLoading } = useQuery(getAccountQuery(session))

  useEffect(() => {
    if (account) {
      setCredits(account.stats.credits)
      setBalance(account.stats.ballance)
      setAccount(account)
    }
  }, [account])

  return (
    <div className='game-box-header'>
      <InfoBox type='credits' content={isLoading ? '...' : `${credits} credits`} />
      <InfoBox type='balance' content={isLoading ? '...' : `$${balance}`} />
    </div>
  )
}

export default GameBoxHeader