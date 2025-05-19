import { useCounterStore } from "../store/counterStore"

export const useCounter = () => {
    const count = useCounterStore(state => state.count);
    const increment = useCounterStore(state => state.increment);
    const reset = useCounterStore(state => state.reset);
    return {count, increment, reset}
}