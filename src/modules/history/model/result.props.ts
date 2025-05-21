import { ImageSourcePropType } from "react-native";

export type TypeCreate = {
  id?: string;
  idCreate?: string;
  status?: "FAILED" | "PENDING" | "COMPLETED" | string;
  source_url?: string; // link youtube
  output?: string | null; // result
  createdAt?: string;
  updataAt?: string;
  model_name?: string;
  nameSong?: string; // title youtube
  thumbnail_voice?: string; // image youtube
  intervalId?: NodeJS.Timeout | null | any;
  isNotCreate?: boolean;
  payload?: {
    source_url?: string;
    model_id?: string;
    user_id?: string;
    type?: string;
    titleVideo?: string;
    thumbnail_voice?: string;
    nameSong?: string;
    model_name?: string;
  };
  text?: string; // template
  typeResult?: "audio" | "video"; // type create: "video_to_speech" | "text_to_speech"
  model_url?: string;
  thumbnail?: string;
};

export type TypeVoice = {
  id: string;
  source_url: string;
  thumbnail: string | ImageSourcePropType | undefined;
  name: string;
  model_name: string;
  status: "PENDING" | "COMPLETED" | "FAILED" | string;
  url: string | null;
  intervalId?: NodeJS.Timeout | null | any;
  demoUrl?: string;
  isCreate?: boolean;
};
