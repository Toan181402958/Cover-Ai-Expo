export type TypeMyVoice = {
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
