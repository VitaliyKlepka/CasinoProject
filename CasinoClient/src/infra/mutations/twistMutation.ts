import { useNavigate } from "react-router-dom"
import { API_BASE_URL } from "../constants"
import { ISpinResponce } from '../interfaces'

export const getTwistMutation = (
    session: string,
    onSuccess: (data: ISpinResponce, variables?: any, context?: any) => void,
    onError?: (err: any) => void
) => {
    let navigate = useNavigate()
    return {
        mutationFn: async () => {
          const response = await fetch(`${API_BASE_URL}/game/twist`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session}`,
            },
          })
          if (!response.ok) {
            if (response.status === 401) {
              navigate('/auth')
            }
            throw new Error('Network response was not ok')
          }
          return response.json()
        },
        onSuccess,
        ...(onError ? {onError} : {})
      }
}