import { create } from "zustand";

type CounterStateProps = {
    count: number;
    increment: () => void;
    reset: () => void;
}

export const useCounterStore = create<CounterStateProps>((set) => ({
    count: 0,
    increment: () => set((state) => (({count: state.count + 1}))),
    reset: () => set({count: 0})
}))