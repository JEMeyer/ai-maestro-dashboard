import React from "react";
import styled from "styled-components";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { GPU } from "../../../types";
import { DraggableIdPrefix, DroppableIdPrefix } from "../../../types/draggable";
import { List } from "../../UI/List";
import { AssignedModelsList } from "./AssignedModelsList";
import { useAssignmentsForGpus } from "../../../state/assignment";

const GPUContainer = styled.div`
  margin: 4px;
  padding: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GPUName = styled.div`
  font-size: 1em;
`;

export const GPUList: React.FC<{ gpus: GPU[] }> = ({ gpus }) => {
  const assignmentsForGpuIds = useAssignmentsForGpus(gpus.map(({ id }) => id));
  return (
    <>
      {gpus.map((gpu, index) => (
        <Draggable
          key={gpu.id}
          draggableId={DraggableIdPrefix.GPU + gpu.id}
          index={index}
        >
          {(provided) => (
            <GPUContainer
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <GPUName>{gpu.name}</GPUName>
              <Droppable
                droppableId={DroppableIdPrefix.ASSIGNMENT_LIST + gpu.id}
              >
                {(provided, snapshot) => (
                  <List
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    $isDraggingOver={snapshot.isDraggingOver}
                  >
                    <AssignedModelsList
                      gpuId={gpu.id}
                      assignments={assignmentsForGpuIds.get(gpu.id) ?? []}
                    />
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </GPUContainer>
          )}
        </Draggable>
      ))}
    </>
  );
};
