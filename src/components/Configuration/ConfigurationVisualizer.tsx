import React from "react";
import { ComputerList } from "./Computer/ComputerList";
import { ModelList } from "./ModelList";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { DroppableIdPrefix, DroppableType } from "../../types/draggable";
import { List } from "../UI/List";
import { useFetchAndSetAllData } from "../../state/useFetchAndSetAllData";
import { useDragEndHandler } from "../../hooks/useDragHandlers";
import AddAssignmentButton from "./AddAssignmentButton";

export const ConfigurationVisualizer: React.FC = () => {
  useFetchAndSetAllData();
  const handleDragEnd = useDragEndHandler();

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <AddAssignmentButton />
      <Droppable
        droppableId={DroppableIdPrefix.COMPUTER_LIST}
        type={DroppableType.COMPUTER}>
        {(provided, snapshot) => (
          <List
            ref={provided.innerRef}
            {...provided.droppableProps}
            $isDraggingOver={snapshot.isDraggingOver}
            $isDraggingOverLegalItem={
              snapshot.isDraggingOver && snapshot.draggingFromThisWith != null
            }>
            <ComputerList />
            {provided.placeholder}
          </List>
        )}
      </Droppable>
      <ModelList />
    </DragDropContext>
  );
};
