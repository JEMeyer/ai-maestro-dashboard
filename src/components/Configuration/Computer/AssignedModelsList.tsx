import React from "react";
import styled from "styled-components";
import { Draggable } from "@hello-pangea/dnd";
import { DraggableIdPrefix } from "../../../types/draggable";
import { useAssignmentsForGpu } from "../../../state/assignment";

const ModelContainer = styled.div`
  margin: 4px;
  padding: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModelName = styled.div`
  font-size: 1em;
`;

export const AssignedModelsList: React.FC<{
  gpuId: number;
}> = ({ gpuId }) => {
  const assignments = useAssignmentsForGpu(gpuId);

  if (assignments == null) return <span>Loading assignments...</span>;

  return (
    <>
      {assignments.map((assignment, index) => (
        <Draggable
          key={`assigned_model_${assignment.id}_${gpuId}`}
          draggableId={DraggableIdPrefix.ASSIGNMENT + assignment.id}
          index={index}
        >
          {(provided) => (
            <ModelContainer
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <ModelName>{assignment.model_name}</ModelName>
            </ModelContainer>
          )}
        </Draggable>
      ))}
    </>
  );
};
