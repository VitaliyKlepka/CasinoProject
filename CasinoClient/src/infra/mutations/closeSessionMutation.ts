import { API_BASE_URL } from "../constants"

export const getCloseSessionMutation = (
  session: string,
  onSuccess: (data: any, variables: any, context: any) => void,
  onError?: (err: any) => void
) => {
    return {
        mutationFn: async () => {
          const response = await fetch(`${API_BASE_URL}/auth/close`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session}`,
            },
          })
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        },
        onSuccess,
        ...(onError ? {onError} : {})
    }
}