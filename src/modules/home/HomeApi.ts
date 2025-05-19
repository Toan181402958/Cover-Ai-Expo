import { ApiClient } from "src/services/NetWork/ApiService";

export const getDataYoutube = (payload: any) => ApiClient.get('youtube', {params: payload})
export const requestDataCategory = () => ApiClient.get('categories-model')
export const requestModel = (modelId?: string) => ApiClient.get(`model/${modelId}`)
export const requestCreateVoice = (payload: any, options: any) => ApiClient.post(`video/create`, payload, options)
export const requestStatusVideo = (id: any) => ApiClient.get(`video/get-status/${id}`)