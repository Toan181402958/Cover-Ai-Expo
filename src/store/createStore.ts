import { PayloadCreateVoiceProps } from "src/models/create.props"
import { generateId } from "utils/funcHelper"
import { create } from "zustand"

type CreateStateProps = {
    createVoice: (payload: PayloadCreateVoiceProps) => void
}
export const useCreateStore = create<CreateStateProps>((set, get) => ({
    createVoice: (payload: PayloadCreateVoiceProps) => {
        
    }
}))