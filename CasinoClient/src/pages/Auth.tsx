import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useAppStore } from '../infra/appState'
import { useNavigate } from 'react-router-dom'
import { LOCAL_STORAGE_TOKEN_KEY, API_BASE_URL } from '../infra/constants'
import { getLoginMutation } from '../infra/mutations/loginMutation'
import { DeviceUUID } from 'device-uuid'

interface AuthPageProps {}

const AuthPage: React.FC<AuthPageProps> = () => {
  const [username, setUsername] = React.useState('')
  const setSession = useAppStore((state: Record<string, any>) => state.setSession)
  let navigate = useNavigate()
  let deviceUUID = new DeviceUUID().get();

  const loginMutation = useMutation(getLoginMutation(deviceUUID, (data: { token: string }) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, data.token)
    setSession(data.token)
    navigate('/')
  }))

  return (
    <div className='auth-layout'>
      <div className='auth-container'>
        <h3>Enter your email to start your Jouney</h3>
        <div className='login-input-container'>
          <input
            className='login-input'
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='login-button-container'>
            <button
              className='login-button'
              onClick={() => loginMutation.mutate(username)}
            >START</button>
        </div>
      </div>
    </div>
  )
}

export default AuthPage