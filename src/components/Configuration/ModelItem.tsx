import React from "react";
import { Model } from "../../types";
import styled from "styled-components";
import { Draggable } from "@hello-pangea/dnd";
import { DraggableIdPrefix } from "../../types/draggable";

const Container = styled.div<{ $isDragging: boolean }>`
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.$isDragging ? "lightGreen" : "white")};
`;

type Props = {
  model: Model;
  index: number;
};

export const ModelItem: React.FC<Props> = ({ model, index }) => {
  return (
    <Draggable draggableId={DraggableIdPrefix.MODEL + model.name} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          $isDragging={snapshot.isDragging}
        >
          {model.name}
        </Container>
      )}
    </Draggable>
  );
};
