import { ApiClient } from "./NetWork/ApiService";

export const requestGetUserInfo = (payload: any) => ApiClient.put('users', payload)
