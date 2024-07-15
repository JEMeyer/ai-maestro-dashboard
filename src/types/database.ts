interface BaseItem {
  id: number;
  name: string;
  display_order: number;
}

export type ApiEndpoints = "computers" | "models" | "gpus" | "assignments";

export type ModelType = "llm" | "diffusor" | "stt" | "tts";
export interface Model extends BaseItem {
  size: number;
  model_type: ModelType;
}

export interface GPU extends BaseItem {
  vram_size: number;
  computer_id: number;
  weight?: number;
}

export interface Computer extends BaseItem {
  edge_server_port: number;
  ip_addr: string;
}

export interface Assignment extends BaseItem {
  model_name: string;
  gpuIds: number[];
  port: number;
}
