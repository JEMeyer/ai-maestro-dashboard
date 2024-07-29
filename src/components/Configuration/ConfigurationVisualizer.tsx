import React from "react";
import { ComputerList } from "./Computer/ComputerList";
import { ModelList } from "./ModelList";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { DroppableIdPrefix, DroppableType } from "../../types/draggable";
import { List } from "../UI/List";
import { useFetchAndSetAllData } from "../../state/useFetchAndSetAllData";
import {
  useDragEndHandler,
  useDragUpdateHandler,
} from "../../hooks/useDragHandlers";

export const ConfigurationVisualizer: React.FC = () => {
  useFetchAndSetAllData();
  const handleDragEnd = useDragEndHandler();
  const handleDragUpdate = useDragUpdateHandler();

  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragUpdate={handleDragUpdate}>
      <Droppable
        droppableId={DroppableIdPrefix.COMPUTER_LIST}
        type={DroppableType.COMPUTER}
      >
        {(provided, snapshot) => (
          <List
            ref={provided.innerRef}
            {...provided.droppableProps}
            $isDraggingOver={snapshot.isDraggingOver}
            $isDraggingOverLegalItem={
              snapshot.isDraggingOver && snapshot.draggingFromThisWith != null
            }
          >
            <ComputerList />
            {provided.placeholder}
          </List>
        )}
      </Droppable>
      <ModelList />
    </DragDropContext>
  );
};
