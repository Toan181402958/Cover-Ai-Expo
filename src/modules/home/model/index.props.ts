export type TypeCategory = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
  isLoadingModel?: boolean;
  name?: string;
  dataThemeGet?: Array<TypeTheme>;
  dataModel?: Array<TypeTheme>;
  selectedMModelId?: string | undefined;
};

export type TypeTheme = {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    isDeleted?: boolean;
    name?: string; // name voice
    url?: string; // url voice
    thumbnail?: string;
    demoUrl?: string; // url voice
  };