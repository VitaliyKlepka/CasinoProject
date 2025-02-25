import { API_BASE_URL } from "../constants"

export const getAccountQuery = (session: string) => {
    return {
        queryKey: ['account', { session }],
        queryFn: async () => {
            if (!session) return null
            const response = await fetch(`${API_BASE_URL}/account`, {
                headers: {
                    'Authorization': `Bearer ${session}`,
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        },
    }
}