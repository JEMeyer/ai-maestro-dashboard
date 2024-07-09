interface BaseItem {
  id?: string;
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
  gpu: Pick<GPU, "id" | "name" | "vramSize">,
  index: number
): string {
  return gpu.id ?? `${gpu.name}-${gpu.vramSize}_${index}`;
}

export interface GPU extends BaseItem {
  vramSize: number;
  computerId: string;
  weight?: number;
}

export interface Computer extends BaseItem {
  ipAddr: string;
}

export interface Assignment extends BaseItem {
  modelName: string;
  gpuIds: string[];
  port: number;
}
