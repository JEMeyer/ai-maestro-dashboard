import React from "react";
import { getModelId, Model } from "../../types/database";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

type Props = {
  model: Model;
  index: number;
};

export const ModelItem: React.FC<Props> = ({ model, index }) => {
  return (
    <Draggable draggableId={getModelId(model)} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {model.name}
        </Container>
      )}
    </Draggable>
  );
};
