import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { IAppState, useAppStore } from '../infra/appState'
import { getTwistMutation } from '../infra/mutations/twistMutation'
import { useNavigate } from 'react-router-dom'
import { ISpinResponce } from '../infra/interfaces'
import { getCashOutMutation } from '../infra/mutations/cashOutMutation'
import { LOCAL_STORAGE_TOKEN_KEY } from '../infra/constants'
import { getCloseSessionMutation } from '../infra/mutations/closeSessionMutation'

interface GameBoxFooterProps {}

const GameBoxFooter: React.FC<GameBoxFooterProps> = () => {
  let navigate = useNavigate()
  const {
    session,
    credits,
    setCredits,
    delayedPointsUpdate,
    setPointsToDefault,
    twistAvailable,
    setTwistAvailable,
    setSession,
  } = useAppStore((state: IAppState) => state)
  const twistMutation = useMutation(getTwistMutation(session, (spinData: ISpinResponce) => {
    delayedPointsUpdate(spinData)
    .then(() => {
        setCredits(credits + spinData.spinCost)
        setTwistAvailable(true)
    })
  }))
  const cashOutMutation = useMutation(getCashOutMutation(session, (data: any) => {}))
  const closeSessionMutation = useMutation(getCloseSessionMutation(session, (data: any) => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
    setSession(null)
    setPointsToDefault()
    navigate('/auth')
  }))

  return (
    <div  className='game-box-footer'>
      <button
        className='game-action-button'
        disabled={cashOutMutation.isPending || closeSessionMutation.isPending}
        onClick={() => {
          cashOutMutation.mutateAsync(null)
          .then(() => closeSessionMutation.mutateAsync(null))
        }}
      >CASH-OUT</button>
      <button
        className='game-action-button'
        disabled={!twistAvailable}
        onClick={() => {
          setPointsToDefault()
          setTwistAvailable(false)
          twistMutation.mutate(null)
        }}
      >TWIST</button>
    </div>
  )
}

export default GameBoxFooter