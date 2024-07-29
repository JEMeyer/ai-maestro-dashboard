import { DropResult } from "@hello-pangea/dnd";
import { useModels } from "../state/models";
import { DroppableIdPrefix, DroppableType } from "../types/draggable";
import { useReorderComputers } from "../state/computers";
import { useReorderAssignments } from "../state/assignment";
import { ModelType } from "../types";
import { useGpus } from "../state/gpus";

const useDragEndHandler = () => {
  const { reorderModels } = useModels();
  const reorderComputers = useReorderComputers();
  const { reorderGpus } = useGpus();
  const reorderAssignments = useReorderAssignments();

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, type } = result;

    // Dropped outside list
    if (!destination) return;

    // Dropped in same spot
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // Find out what action needs to be taken
    switch (type) {
      case DroppableType.COMPUTER:
      case DroppableType.GPU:
      case DroppableType.ASSIGNMENT: {
        // Only invoke re-order if we actually dropped within our list
        if (destination.droppableId === source.droppableId)
          await reorderItems(result);
        break;
      }
      case DroppableType.MODEL:
        await performModelAction(result);
        break;
      default:
        break;
    }
  };

  const reorderItems = async ({ destination, source, type }: DropResult) => {
    switch (type) {
      case DroppableType.COMPUTER:
        return await reorderComputers(source.index, destination?.index ?? 0);
      case DroppableType.ASSIGNMENT: {
        const gpuId = Number(
          source.droppableId.replace(DroppableIdPrefix.ASSIGNMENT_LIST, "")
        );
        return await reorderAssignments(
          source.index,
          destination?.index ?? 0,
          gpuId
        );
      }
      case DroppableType.GPU: {
        const computerId = Number(
          source.droppableId.replace(DroppableIdPrefix.GPU_LIST, "")
        );
        return await reorderGpus(
          source.index,
          destination?.index ?? 0,
          computerId
        );
      }
      case DroppableType.MODEL:
      default:
        throw new Error(`Invalid type ${type} for reorderItem`);
    }
  };

  const performModelAction = async ({ destination, source }: DropResult) => {
    // See if we are in our same list (we are reordering)
    if (destination?.droppableId === source.droppableId) {
      let modelType: ModelType | null = null;
      if (source.droppableId.startsWith(DroppableIdPrefix.STT_LIST)) {
        modelType = "stt";
      } else if (
        source.droppableId.startsWith(DroppableIdPrefix.DIFFUSOR_LIST)
      ) {
        modelType = "diffusor";
      } else if (source.droppableId.startsWith(DroppableIdPrefix.TTS_LIST)) {
        modelType = "tts";
      } else if (source.droppableId.startsWith(DroppableIdPrefix.LLM_LIST)) {
        modelType = "llm";
      }

      console.log("modelType after droppableId lookup: ", modelType);

      if (modelType == null) return;

      return await reorderModels(source.index, destination?.index, modelType);
    }

    // Otherwise see if we just got dragged to a gpu's assignment list
    if (
      destination?.droppableId.startsWith(DroppableIdPrefix.ASSIGNMENT_LIST)
    ) {
      console.log("Begin assignment creation flow.");
    }
  };

  return handleDragEnd;
};

export default useDragEndHandler;
