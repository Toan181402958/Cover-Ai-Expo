import { useUserStore } from "../store/userStore"

export const useUser = () => {
    const user =  useUserStore(state => state.user)
    const loading =  useUserStore(state => state.loading)
    const error =  useUserStore(state => state.error)
    const fetchUser =  useUserStore(state => state.fetchUser)
    return {user, loading, error, fetchUser}
}