import React from "react";
import styled from "styled-components";
import { Draggable } from "@hello-pangea/dnd";
import { GPU } from "../../../types";
import { DraggableIdPrefix } from "../../../types/draggable";

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
            </GPUContainer>
          )}
        </Draggable>
      ))}
    </>
  );
};
