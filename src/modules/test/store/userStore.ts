import axios from "axios"
import { create } from "zustand"

type User = {
    id: number
    name: string
    email: string
  }
  
  type UserState = {
    user: User | null
    loading: boolean
    error: string | null
    fetchUser: (id: number) => Promise<void>
  }

  export const useUserStore = create<UserState>((set) => ({
    user: null,
    loading: false,
    error: null,
    fetchUser: async(id: number) => {
        set({loading: true, error: null})
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            set({ user: res.data, loading: false })
          } catch (err: any) {
            set({ error: err.message || 'Failed to fetch', loading: false })
          }
    }
  }))