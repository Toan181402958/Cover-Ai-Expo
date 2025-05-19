import { getObjectDataLocal, KEY_STORAGE, saveObjectDataLocal } from "src/services/AsyncStorage";
import { create } from "zustand";

type HistoryStateProps = {
    arrHistory: Array<any>;
    getDataLocal: () => void; 
    addItemHistory: (item: any) => void;
    updateItemHistory: (item: any, isUpdateCreate?: boolean) => void;
    deleteItemsHistory: (item: any) => void;
    clearInterval: (id: string) => void
}
export const useHistoryStore = create<HistoryStateProps>((set, get) => ({
    arrHistory: [],
    getDataLocal: () => {
      getObjectDataLocal(KEY_STORAGE.LOCAL_HISTORY).then(res => {
        if (res) {
          console.log('🚀 ~ CreateStore ~ getObjectDataLocal ~ res:', res);
          // runInAction(() => (this.arrHistoryGenerated = res));
          // this.arrHistoryGenerated = this.arrHistoryGenerated.filter(item => {
          //   let now = new Date().getTime();
  
          //   // Delete items created more than 3 days ago
          //   return (
          //     item?.createdAt &&
          //     new Date(item.createdAt).getTime() > now - 3 * 24 * 60 * 60 * 1000
          //   );
          // });
          // this.arrHistoryGenerated.forEach((el: TypeCreate) => {
          //   if (el.status === 'PENDING' && !el?.isNotCreate) {
          //     this._getStatusRequest(el.id, false, el?.idCreate);
          //   }
          // });
          // const listResume = this.arrHistoryGenerated.filter(
          //   val => val.status == TYPE_STATUS_ALL.PENDING && !!val?.isNotCreate,
          // );
          // if (!!listResume?.length) {
          //   this._onCreateResume(listResume);
          // }
          set({arrHistory: res})
          saveObjectDataLocal(KEY_STORAGE.LOCAL_HISTORY, res);
        }
      });
    },
    addItemHistory: (item) => {
        set({
            arrHistory: [item, ...get().arrHistory]
        })
        saveObjectDataLocal(KEY_STORAGE.LOCAL_HISTORY, get().arrHistory);
    },
    updateItemHistory: (item, isUpdateCreate) => {
        var indexTarget = 0;
        const arrHistoryGenerated = get().arrHistory
        if (!!isUpdateCreate) {
          indexTarget = arrHistoryGenerated.findIndex(
            element => element.idCreate == item.idCreate,
          );
        } else {
          indexTarget = arrHistoryGenerated.findIndex(
            element => element.id === item.id,
          );
        }
        const arrIntermediate = [...arrHistoryGenerated];
        arrIntermediate.splice(indexTarget, 1, item);
        set({arrHistory: [...arrIntermediate]})
        saveObjectDataLocal(KEY_STORAGE.LOCAL_HISTORY, get().arrHistory);
    },
    deleteItemsHistory: (arrItems: Array<any>) => {
      let arrIntermediate = [...get().arrHistory];
        arrIntermediate = get().arrHistory.filter(
          element =>
            arrItems.find(val => val.idCreate === element.idCreate) === undefined,
        );
        set({arrHistory: [...arrIntermediate]})
      saveObjectDataLocal(KEY_STORAGE.LOCAL_HISTORY, get().arrHistory);
    },
    clearInterval: (id) => {
        if(!!id){
            const item = get().arrHistory.find(
                element => element.id === id,
              );
              console.log("🚀 ~ item:", item)
              clearInterval(item?.intervalId);
        }
    }
}))