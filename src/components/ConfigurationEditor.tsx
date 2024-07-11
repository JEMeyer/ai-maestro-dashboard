import { DragDropContext } from "@hello-pangea/dnd";
import useDragHandlers from "../hooks/useDragEndHandler";
import { ConfigurationVisualizer } from "./Config/ConfigurationVisualizer";

const ConfigurationEditor = () => {
  const handleDragEnd = useDragHandlers();

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ConfigurationVisualizer />
    </DragDropContext>
  );
};

export default ConfigurationEditor;
