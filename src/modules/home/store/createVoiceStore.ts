import {
  PayloadCreateTextToVoiceProps,
  PayloadCreateVoiceProps,
} from "src/models/create.props";
import { generateId } from "utils/funcHelper";
import { create } from "zustand";
import {
  requestCreateTextToVoice,
  requestCreateVoice,
  requestStatusVideo,
} from "../HomeApi";
import { useHistoryStore } from "modules/history/store/historyStore";
import { TYPE_STATUS_ALL } from "constants/constants";
import { useUserStore } from "src/store/userStore";

type CreateVoiceStateProps = {
  dataCreating: any;
  dataProcessingHome: any;
  createVoice: (payload: PayloadCreateVoiceProps) => void;
  createTextToVoice: (payload: PayloadCreateTextToVoiceProps) => void;
  getStatusVoice: (id: string, idCreate?: string) => void;
};
export const useCreateVoiceStore = create<CreateVoiceStateProps>(
  (set, get) => ({
    dataCreating: {},
    dataProcessingHome: {},
    createVoice: async (payload: PayloadCreateVoiceProps) => {
      const { sourceUrl, dataSelect, titleVideo, userId, type } = payload;
      console.log("🚀 ~ createVoice: ~ payload:", payload);
      const newData = {
        id: "",
        idCreate: generateId().toString(),
        status: TYPE_STATUS_ALL.PENDING,
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
      set({ dataCreating: newData, dataProcessingHome: newData });
      useHistoryStore.getState().addItemHistory(newData);
      try {
        const headers = {
          "Content-Type": "multipart/form-data",
        };
        const formData = new FormData();
        formData.append("source_url", sourceUrl);
        formData.append("model_id", dataSelect.id);
        formData.append("user_id", userId);
        formData.append("type", type);

        const response = await requestCreateVoice(formData, { headers });
        if (response.id) {
          const data = {
            idCreate: newData.idCreate,
            id: response.id,
            status: TYPE_STATUS_ALL.PENDING,
            source_url: sourceUrl,
            output: "",
            createdAt: "",
            updataAt: "",
            model_name: dataSelect.name,
            nameSong: titleVideo,
            thumbnail_voice: dataSelect.thumbnail!,
            intervalId: null as NodeJS.Timeout | null,
          };

          set({ dataCreating: data, dataProcessingHome: data });
          data.intervalId = setInterval(() => {
            get().getStatusVoice(data.id, data.idCreate.toString());
          }, 5000);
          useHistoryStore.getState().updateItemHistory(data, true);
        }
      } catch (err) {
        console.log("🚀 ~ createVoice:async ~ err:", err);
      }
    },
    createTextToVoice: async (payload: PayloadCreateTextToVoiceProps) => {
      const { enterText, dataSelect, userId, type, idCreate } = payload;
      const titleVideo = enterText.split(" ").slice(0, 3).join(" ");
      const newData = {
        id: "",
        idCreate: generateId().toString(),
        status: TYPE_STATUS_ALL.PENDING,
        source_url: null,
        createdAt: new Date().getTime().toString(),
        isNotCreate: true,
        model_name: dataSelect.name,
        nameSong: titleVideo,
        thumbnail_voice: dataSelect.thumbnail!,
        payload: {
          source_url: null,
          model_id: dataSelect.id,
          user_id: userId,
          type,
          titleVideo,
          thumbnail_voice: dataSelect.thumbnail!,
          nameSong: titleVideo,
          model_name: dataSelect.name,
        },
      };
      set({ dataCreating: newData });
      useHistoryStore.getState().addItemHistory(newData);
      try {
        const dataPayload = {
          model_id: dataSelect.id,
          user_id: userId,
          type,
          text: enterText,
        };

        const response = await requestCreateTextToVoice(dataPayload, {});
        if (response.id) {
          const data = {
            idCreate: newData.idCreate,
            id: response.id,
            status: "PENDING",
            source_url: null,
            output: "",
            createdAt: "",
            updataAt: "",
            model_name: dataSelect.name,
            nameSong: titleVideo,
            thumbnail_voice: dataSelect.thumbnail!,
            intervalId: null as NodeJS.Timeout | null,
          };
          set({ dataCreating: data });

          data.intervalId = setInterval(() => {
            get().getStatusVoice(data.id, data.idCreate.toString());
          }, 5000);
          useHistoryStore.getState().updateItemHistory(data, true);
        }
      } catch (err) {
        console.log("🚀 ~ createVoice:async ~ err:", err);
      }
    },
    getStatusVoice: async (id: string, idCreate?: string) => {
      try {
        const res = await requestStatusVideo(id);
        if (res?.result?.status == TYPE_STATUS_ALL.COMPLETED) {
          useHistoryStore.getState().clearInterval(id);
          const findItem = useHistoryStore
            .getState()
            .arrHistory.find((element) => element.id === id);
          const data = {
            ...res?.result,
            idCreate: idCreate || "",
            nameSong: findItem?.nameSong,
            thumbnail_voice: findItem?.thumbnail_voice,
            model_url: findItem?.model_url,
            thumbnail: res?.result?.thumbnail || findItem?.thumbnail_voice,
          };
          set({ dataCreating: data, dataProcessingHome: {} });
          useHistoryStore.getState().updateItemHistory(data);
          useUserStore.getState().getUserInfo();
        }
        if (res?.result?.status == TYPE_STATUS_ALL.FAILED) {
          useHistoryStore.getState().clearInterval(id);
          const findItem = useHistoryStore
            .getState()
            .arrHistory.find((element) => element.id === id);
          const data = {
            ...res?.result,
            idCreate: idCreate || "",
            nameSong: findItem?.nameSong,
            thumbnail_voice: findItem?.thumbnail_voice,
            model_url: findItem?.model_url,
            thumbnail: res?.result?.thumbnail || findItem?.thumbnail_voice,
          };
          set({ dataCreating: data, dataProcessingHome: {} });
          useHistoryStore.getState().updateItemHistory(data);
          useUserStore.getState().getUserInfo();
        }
      } catch {}
    },
  })
);
