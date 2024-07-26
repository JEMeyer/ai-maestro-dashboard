import React, { useEffect } from "react";
import { ComputerList } from "./Computer/ComputerList";
import { ModelList } from "./ModelList";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import useDragEndHandler from "../../hooks/useDragEndHandler";
import { DroppableIdPrefix, DroppableType } from "../../types/draggable";
import { List } from "../UI/List";
import { useFetchAndSetAllModels } from "../../state/models";

export const ConfigurationVisualizer: React.FC = () => {
  const handleDragEnd = useDragEndHandler();
  const fetchAndSetAllModels = useFetchAndSetAllModels();

  useEffect(() => {
    fetchAndSetAllModels();
  }, [fetchAndSetAllModels]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId={DroppableIdPrefix.COMPUTER_LIST}
        type={DroppableType.COMPUTER}
      >
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
