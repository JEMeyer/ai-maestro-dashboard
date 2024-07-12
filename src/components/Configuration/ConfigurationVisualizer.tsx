import React from "react";
import { ComputerList } from "./Computer/ComputerList";
import { ModelList } from "./ModelList";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import useDragEndHandler from "../../hooks/useDragEndHandler";
import { DroppableIdPrefix } from "../../types/draggable";
import { List } from "../UI/List";

export const ConfigurationVisualizer: React.FC = () => {
  const handleDragEnd = useDragEndHandler();

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={DroppableIdPrefix.COMPUTER_LIST}>
        {(provided, snapshot) => (
          <List
            ref={provided.innerRef}
            {...provided.droppableProps}
            $isDraggingOver={snapshot.isDraggingOver}
          >
            <ComputerList />
          </List>
        )}
      </Droppable>
      <ModelList />
    </DragDropContext>
  );
};
