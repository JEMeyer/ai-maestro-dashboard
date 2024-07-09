import { DragDropContext } from "@hello-pangea/dnd";
import { ConfigurationVisualizer } from "./config/ConfigurationVisualizer";
import useDragHandlers from "../hooks/useDragEndHandler";

const ConfigEditor = () => {
  const handleDragEnd = useDragHandlers();

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ConfigurationVisualizer />
    </DragDropContext>
  );
};

export default ConfigEditor;
