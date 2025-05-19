import { create } from "zustand";
import { requestDataCategory, requestModel } from "../HomeApi";
import { TypeCategory, TypeTheme } from "../model/index.props";

type CategoryWithModel = TypeCategory & {
    dataModel?: any;
  };

type CategoryStateProps = {
    data: CategoryWithModel[];
    isLoading: boolean;
    error?: boolean;
    getDataCategory: () => void;
}

export const useCategoryStore = create<CategoryStateProps>((set, get) => ({
    data: [],
    isLoading: true,
    error: false,
    getDataCategory: async() => {
        set({ isLoading: true, error: false });
        try {
            const response = await requestDataCategory();
            const categoryMyVoice = {
                id: '-1',
                name: 'My voice',
            };
            const tempData = [categoryMyVoice, ...response.map((item: TypeCategory) => ({
                ...item,
                isLoadingModel: true
              }))];
            set({
                data: tempData,
                isLoading: false,
                error: false
            })
            const categoryWithModel = await Promise.all(response.map(async(val: TypeCategory) => {
                try{
                    const resModel = await requestModel(val.id);
                    return { ...val, dataModel: resModel };
                }catch{
                    return val
                }
                
            }))
            set({
                data: [categoryMyVoice, ...categoryWithModel.map(val => ({...val, isLoadingModel: false}))],
                isLoading: false,
                error: false,
            });
            console.log('result category', get().data)
        } catch (error) {
            set({error: true, isLoading: false})
        }
    },
}))