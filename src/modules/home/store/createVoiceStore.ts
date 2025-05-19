import { PayloadCreateVoiceProps } from "src/models/create.props"
import { generateId } from "utils/funcHelper"
import { create } from "zustand"
import { requestCreateVoice, requestStatusVideo } from "../HomeApi"
import { useHistoryStore } from "modules/history/store/historyStore"

type CreateVoiceStateProps = {
    createVoice: (payload: PayloadCreateVoiceProps) => void;
    getStatusVoice: (id: string, idCreate?: string) => void;
    
}
export const useCreateVoiceStore = create<CreateVoiceStateProps>((set, get) => ({
    createVoice: async(payload: PayloadCreateVoiceProps) => {
        const {sourceUrl, dataSelect, titleVideo, userId, type} = payload
        const newData = {
            id: '',
            idCreate: generateId().toString(),
            status: 'PENDING',
            source_url: sourceUrl,
            createdAt: new Date().getTime().toString(),
            isNotCreate: true,
            model_name: dataSelect.name,
            nameSong: titleVideo,       
            thumbnail_voice: dataSelect.thumbnail!,
            payload: {
              source_url: sourceUrl,
              model_id: dataSelect.id,
              user_id: userId,
              type,
              titleVideo,
              thumbnail_voice: dataSelect.thumbnail!,
              nameSong: titleVideo,
              model_name: dataSelect.name,
            },
          };
        console.log("🚀 ~ newData:", newData)
        useHistoryStore.getState().addItemHistory(newData)
        try{
            const headers = {
            'Content-Type': 'multipart/form-data',
            };
            const formData = new FormData();
            formData.append('source_url', sourceUrl); // link youtube
            formData.append('model_id', dataSelect.id); // id theme
            formData.append('user_id', userId);
            formData.append('type', type);

            const response = await requestCreateVoice(
                formData,
                {headers},
            );    
            if(response.id){
                const data = {
                    idCreate: newData.idCreate,
                    id: response.id,
                    status: 'PENDING',
                    source_url: sourceUrl,
                    output: '',
                    createdAt: '',
                    updataAt: '',
                    model_name: dataSelect.name,
                    nameSong: titleVideo,
                    thumbnail_voice: dataSelect.thumbnail!,
                    intervalId: null as NodeJS.Timeout | null,
                  };
                  
                data.intervalId = setInterval(() => {
                    get().getStatusVoice(data.id, data.idCreate.toString())
                }, 5000);
                useHistoryStore.getState().updateItemHistory(data, true)
            }
        }catch{

        }
    },
    getStatusVoice: async(id: string, idCreate?: string) => {
        try{
            const res = await requestStatusVideo(id)
            if(res?.result?.status == 'COMPLETED'){
                useHistoryStore.getState().clearInterval(id)
                const findItem = useHistoryStore.getState().arrHistory.find(
                    element => element.id === id,
                  );
                const data = {
                    ...res?.result,
                    idCreate: idCreate || '',
                    nameSong: findItem?.nameSong,
                    thumbnail_voice: findItem?.thumbnail_voice,
                    model_url: findItem?.model_url,
                    thumbnail: res?.result?.thumbnail || findItem?.thumbnail_voice
                }
                useHistoryStore.getState().updateItemHistory(data)
            }
        }catch{

        }
    }
}))