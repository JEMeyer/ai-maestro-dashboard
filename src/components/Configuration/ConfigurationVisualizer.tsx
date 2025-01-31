import React from "react";
import { ComputerList } from "./Computer/ComputerList";
import { ModelList } from "./ModelList";
import { Droppable } from "@hello-pangea/dnd";
import { DroppableIdPrefix, DroppableType } from "../../types/draggable";
import { List } from "../UI/List";
import { useFetchAndSetAllData } from "../../state/useFetchAndSetAllData";
import AssignmentController from "./AssignmentController";

export const ConfigurationVisualizer: React.FC = () => {
  useFetchAndSetAllData();

  return (
    <AssignmentController>
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
    </AssignmentController>
  );
};
