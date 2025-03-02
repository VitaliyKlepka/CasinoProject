import React, { useEffect } from 'react'
import { IAppState, useAppStore } from '../infra/appState'
import InfoBox from './InfoBox'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAccountQuery } from '../infra/queries/getAccount'
import { getDepositMutation } from '../infra/mutations/depositMutation'

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
  const queryClient = useQueryClient()
  const depositMutation = useMutation(getDepositMutation(session, (data: any) => {}))

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
      <button
        className='game-action-button'
        disabled={depositMutation.isPending || account?.stats.ballance === 0}
        onClick={() => {
          depositMutation.mutateAsync(null)
          .then(() => queryClient.invalidateQueries({ queryKey: ['account'] }))
        }}
      >DEPOSIT</button>
    </div>
  )
}

export default GameBoxHeader