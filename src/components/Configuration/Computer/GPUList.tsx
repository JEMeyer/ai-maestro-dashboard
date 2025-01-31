import React from "react";
import styled from "styled-components";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import {
  DraggableIdPrefix,
  DroppableIdPrefix,
  DroppableType,
} from "../../../types/draggable";
import { List } from "../../UI/List";
import { AssignedModelsList } from "./AssignedModelsList";
import { useGpusForComputer } from "../../../state/gpus";

const GPUContainer = styled.div`
  margin: 4px;
  padding: 8px;
  border: 1px solid lightgray;
  border-radius: 4px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

const GPUName = styled.div`
  font-size: 1em;
  font-weight: 500;
  padding: 4px;
  min-width: 100px;
`;

const AssignmentsContainer = styled.div`
  flex-grow: 1;
  min-height: 60px;
  background: white;
  border-radius: 4px;
  padding: 4px;
`;

export const GPUList: React.FC<{ computerId: number }> = ({ computerId }) => {
  const gpus = useGpusForComputer(computerId);

  if (gpus == null) return <span>Loading gpus...</span>;

  return (
    <>
      {gpus.map((gpu, index) => (
        <Draggable
          key={gpu.id}
          draggableId={DraggableIdPrefix.GPU + gpu.id}
          index={index}>
          {(provided) => (
            <GPUContainer
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}>
              <GPUName>{gpu.name}</GPUName>
              <AssignmentsContainer>
                <Droppable
                  type={DroppableType.ASSIGNMENT}
                  droppableId={DroppableIdPrefix.ASSIGNMENT_LIST + gpu.id}>
                  {(provided, snapshot) => (
                    <List
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      $isDraggingOver={snapshot.isDraggingOver}
                      $isDraggingOverLegalItem={
                        snapshot.isDraggingOver &&
                        snapshot.draggingFromThisWith != null
                      }>
                      <AssignedModelsList gpuId={gpu.id} />
                      {provided.placeholder}
                    </List>
                  )}
                </Droppable>
              </AssignmentsContainer>
            </GPUContainer>
          )}
        </Draggable>
      ))}
    </>
  );
};
