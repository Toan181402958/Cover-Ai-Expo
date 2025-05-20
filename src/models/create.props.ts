export type PayloadCreateVoiceProps = {
  sourceUrl: string; // link youtube
  titleVideo: string; // title youtube
  dataSelect: TypeTheme | TypeVoice;
  userId: string;
  type: "model" | "model_custom";
  idCreate?: string;
};
export type PayloadCreateTextToVoiceProps = {
  enterText: string;
  dataSelect: TypeTheme | TypeVoice;
  userId?: string;
  type: "model" | "model_custom";
  idCreate?: string;
};

export type TypeTheme = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
  name?: string; // name voice
  url?: string; // url voice
  thumbnail?: string;
  demoUrl?: string; // url voice
};

export type TypeVoice = {
  id: string;
  source_url: string;
  thumbnail: string;
  name: string;
  model_name: string;
  status: "PENDING" | "COMPLETED" | "FAILED" | string;
  url: string | null;
  intervalId?: NodeJS.Timeout | null | any;
  demoUrl?: string;
};
