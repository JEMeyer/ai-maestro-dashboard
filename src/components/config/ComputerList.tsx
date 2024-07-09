import React from "react";
import styled from "styled-components";
import { Droppable } from "@hello-pangea/dnd";
import { useAllComputers } from "../../state/computers";
import { useAllGpus } from "../../state/gpus";
import { GPUList } from "./GPUList";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
`;

const Title = styled.h3`
  padding: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const List = styled.div`
  padding: 8px;
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

export const ComputerList: React.FC = () => {
  const computers = useAllComputers();
  const gpus = useAllGpus();

  if (computers == null || gpus == null) {
    return <span>Loading computers...</span>;
  }

  return (
    <>
      {computers.map((computer) => {
        <Container key={computer.id ?? computer.name + computer.ipAddr}>
          <Title>{computer.name}</Title>
          <Droppable droppableId={`computer_${computer.name}_${computer.id}`}>
            {(provided) => (
              <List ref={provided.innerRef} {...provided.droppableProps}>
                <GPUList
                  gpus={gpus.filter(
                    ({ computerId }) => computer.id === computerId
                  )}
                />
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </Container>;
      })}
    </>
  );
};
