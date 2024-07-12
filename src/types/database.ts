interface BaseItem {
  id: string;
  name: string;
}

export type TableNames = "computers" | "models" | "gpus" | "assignments";

type ModelType = "llm" | "diffusor" | "stt" | "tts";
export interface Model extends BaseItem {
  size: number;
  model_type: ModelType;
}

export function getModelId(
  model: Pick<Model, "id" | "name" | "size">,
  index: number
): string {
  return model.id ?? `${model.name}-${model.size}_${index}`;
}

export function getComputerlId(
  model: Pick<Computer, "id" | "name">,
  index: number
): string {
  return model.id ?? `${model.name}_${index}`;
}

export function getGpuId(
  gpu: Pick<GPU, "id" | "name" | "vram_size">,
  index: number
): string {
  return `${gpu.id}-${gpu.name}-${gpu.vram_size}_${index}`;
}

export interface GPU extends BaseItem {
  vram_size: number;
  computer_id: string;
  weight?: number;
}

export interface Computer extends BaseItem {
  edge_server_port: string;
  ip_addr: string;
}

export interface Assignment extends BaseItem {
  model_name: string;
  gpu_ids: string[];
  port: number;
}
