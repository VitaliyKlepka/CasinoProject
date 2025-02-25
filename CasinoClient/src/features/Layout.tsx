import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { useAppStore } from '../infra/appState'
import { LOCAL_STORAGE_TOKEN_KEY } from '../infra/constants'

interface AppLayoutProps {}

const AppLayout: React.FC<AppLayoutProps> = () => {
  const { session, setSession } = useAppStore((state: Record<string, any>) => state)
  let navigate = useNavigate()

  useEffect(() => {
    const localToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    if (localToken) {
      const decodedToken: Record<string, any> = jwtDecode(localToken);
      if (decodedToken.exp < Date.now() / 1000) { // TODO: compare with UTC time. POTENTIALLY REDUNDANT
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
        setSession(null)
        navigate('/auth')
      }
      !session && setSession(localToken)
    } else {
      setSession(null)
      navigate('/auth')
    }
  }, [])

  return (
    <div className='general-layout'>
      <Outlet />
    </div>
  )
}

export default AppLayout