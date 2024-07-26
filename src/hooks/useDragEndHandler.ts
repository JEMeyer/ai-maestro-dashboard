import { DropResult } from "@hello-pangea/dnd";
import { DroppableType } from "../types/draggable";
import { useModels } from "../state/models";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Item {
  id: string;
  type: DroppableType;
  content: string;
}

const useDragEndHandler = () => {
  const { reorderModels } = useModels();

  const handleDragEnd = (result: DropResult) => {
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
      case DroppableType.ASSIGNMENT:
        reorderItems(result);
        break;
      case DroppableType.MODEL:
        performModelAction(result);
        break;
      default:
        break;
    }
  };

  //   const reorderItems = (startIndex: number, endIndex: number) => {
  //     const newItems = Array.from(items);
  //     const [movedItem] = newItems.splice(startIndex, 1);
  //     newItems.splice(endIndex, 0, movedItem);

  //     setItems(newItems);

  const reorderItems = (result: DropResult) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { destination, source, type } = result;

    switch (type) {
      case DroppableType.COMPUTER:
        reorderModels();
    }

    setModels((prev) => {
      if (prev == null) return prev;

      // const sourceIndex = prev.findIndex((model) => model.name === draggableId);
      // const indexDelta = source.index - destination.index;
      // const destinationIndex = sourceIndex - indexDelta;

      const updatedModels = [...prev];
      // const sourceElement = updatedModels.splice(sourceIndex, 1)[0];
      // updatedModels.splice(destinationIndex, 0, sourceElement);
      return updatedModels;
    });
  };

  const performModelAction = (result: DropResult) => {
    // Stub for performing an action when a model is dragged and dropped
    console.log(`Performing action for model: ${result}`);
    // Add your custom logic here
  };

  return handleDragEnd;
};

export default useDragEndHandler;
