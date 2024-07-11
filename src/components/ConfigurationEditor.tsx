import { DragDropContext } from "@hello-pangea/dnd";
import useDragHandlers from "../hooks/useDragEndHandler";
import { ConfigurationVisualizer } from "./Configuration/ConfigurationVisualizer";

const ConfigurationEditor = () => {
  const handleDragEnd = useDragHandlers();

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ConfigurationVisualizer />
    </DragDropContext>
  );
};

export default ConfigurationEditor;
