import { API_BASE_URL } from "../constants"

export const getLoginMutation = (
    did: string,
    onSuccess: (data: { token: string }, variables: any, context: any) => void,
    onError?: () => void
) => {
    return {
        mutationFn: async (login) => {
          const response = await fetch(`${API_BASE_URL}/auth/init`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-did': did,
            },
            body: JSON.stringify({ email: login }),
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