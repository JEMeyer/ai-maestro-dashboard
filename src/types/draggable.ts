export enum DroppableType {
  COMPUTER = "computer_list",
  GPU = "gpu_list",
  MODEL = "model_list",
  ASSIGNMENT = "assignment_list",
}

export enum DraggableIdPrefix {
  GPU = "draggable_gpu_",
  COMPUTER = "draggable_computer_",
  MODEL = "draggable_model_",
  ASSIGNMENT = "draggable_assignment_",
}

export enum DroppableIdPrefix {
  COMPUTER_LIST = "droppable_computer_list",
  GPU_LIST = "droppable_gpu_list_computer_",
  ASSIGNMENT_LIST = "droppable_assignment_list_gpu_",
  LLM_LIST = "droppable_llm_list",
  DIFFUSOR_LIST = "droppable_diffusor_list",
  STT_LIST = "droppable_stt_list",
  TTS_LIST = "droppable_tts_list",
}
