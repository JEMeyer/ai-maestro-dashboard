import { DragDropContext } from "react-beautiful-dnd";
import { ModelList } from "./config/ModelList";

const ConfigEditor = () => {
  const onDragEnd = () => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ModelList />
    </DragDropContext>
  );
};

export default ConfigEditor;
