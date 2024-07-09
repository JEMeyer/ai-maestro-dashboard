import { DropResult } from "@hello-pangea/dnd";
import { useAllModels } from "../state/models";
import { getModelId } from "../types/database";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Item {
  id: string;
  type: "computer" | "gpu" | "model";
  content: string;
}

const useDragEndHandler = () => {
  const { setModels } = useAllModels();

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Dropped outside list
    if (!destination) return;

    // Dropped in same spot
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    setModels((prev) => {
      if (prev == null) return prev;

      const sourceIndex = prev.findIndex(
        (model) => getModelId(model, source.index) === draggableId
      );
      const indexDelta = source.index - destination.index;
      const destinationIndex = sourceIndex - indexDelta;

      const updatedModels = [...prev];
      const sourceElement = updatedModels.splice(sourceIndex, 1)[0];
      updatedModels.splice(destinationIndex, 0, sourceElement);
      return updatedModels;
    });
  };

  //   switch (draggedItem.type) {
  //     case "computer":
  //     case "gpu":
  //       reorderItems(source.index, destination.index);
  //       break;
  //     case "model":
  //       performModelAction(draggedItem);
  //       break;
  //     default:
  //       break;

  //   const reorderItems = (startIndex: number, endIndex: number) => {
  //     const newItems = Array.from(items);
  //     const [movedItem] = newItems.splice(startIndex, 1);
  //     newItems.splice(endIndex, 0, movedItem);

  //     setItems(newItems);
  //   };

  //   const performModelAction = (item: Item) => {
  //     // Stub for performing an action when a model is dragged and dropped
  //     console.log(`Performing action for model: ${item.content}`);
  //     // Add your custom logic here
  //   };

  return handleDragEnd;
};

export default useDragEndHandler;
